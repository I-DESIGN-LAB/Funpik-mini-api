import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { access, constants } from 'node:fs/promises'
import path from 'node:path'
import { StatusCodes } from 'http-status-codes';
import { UserInfo } from './data/userinfo.js';

const filePath = path.join(process.cwd(), 'db.json');

try {
  await access(filePath, constants.F_OK);
  console.log(`File ${filePath} exists`);
} catch (err) {
  console.error(`File ${filePath} does not exist`);
}

// Initialize Express app
const app = express();
const port = 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize LowDB
const adapter = new JSONFile('db.json');
const db = new Low(adapter, { users: [] });

// Function to initialize the database with default data
async function initializeDB() {
  await db.read();
  console.log('initializeDB');
  db.data ||= { users: [] }; // Set default data if JSON file is empty
  console.log(db.data);
  await db.write();
}

// Initialize the database
initializeDB().then(() => {

  // Get User API
  app.get('/check_nickname', (req, res) => {
    console.log("/check_nickname");
    console.log(req.query);
    const id = req.query.userId;
    const user = db.data.users.find(user => user.userId === id);
    if (user) {
      res.status(StatusCodes.CONFLICT).send({
        result: false,
        message: 'already exists userId',
        data: { result: false }
      });
    } else {
      res.status(StatusCodes.OK).send({
        result: true,
        message: 'success',
        data: { result: true }
      });
    }
  });

  // Create User API
  app.post('/create_user', async (req, res) => {
    console.log("/create_user");
    console.log(req.body);
    const { userId, password, name, email } = req.body;
    const user = db.data.users.find(user => user.userId === userId);
    if (user) {
      res.status(StatusCodes.CONFLICT).send({
        result: false,
        message: 'User already exists',
        data: null
      });
      return;
    }

    if (userId && password && name && email) {
      const info = new UserInfo();
      db.data.users.push({ userId, password, name, email, info });
      await db.write();

      res.status(StatusCodes.OK).send({
        result: true,
        message: 'User created successfully',
        data: { userId: userId, name: name, email: email }
      });

      return;
    }

    res.status(StatusCodes.BAD_REQUEST).send({
      result: false,
      message: 'Invalid Parameters',
      data: null
    });
    return;
  });

  // Get User API
  app.get('/get_user', (req, res) => {
    console.log("/get_user");
    console.log(req.query);
    const id = req.query.userId;
    // const id = req.params.id;
    const user = db.data.users.find(user => user.userId === id);
    if (user) {
      res.status(StatusCodes.OK).send({
        result: true,
        message: 'success',
        data: user
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).send({
        result: false,
        message: 'User not found',
        data: null
      });
    }
  });

  // Get User Info API
  app.get('/get_user_info', (req, res) => {
    console.log("/get_user_info");
    console.log(req.query);

    const id = req.query.userId;
    const user = db.data.users.find(user => user.userId === id);

    if (user) {
      const userInfo = user.info;
      res.status(StatusCodes.OK).send({
        result: true,
        message: 'success',
        data: userInfo
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).send({
        result: false,
        message: 'User not found',
        data: null
      });
    }
  });

  // Login API
  app.get('/login', (req, res) => {
    console.log("/get_user_info");
    console.log(req.query);

    const id = req.query.userId;
    const pass = req.query.pass;

    const user = db.data.users.find(user => user.userId === id);
    if (user.password === pass) {
      res.status(StatusCodes.OK).send({
        result: true,
        message: 'success',
        data: { result: true }
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({
        result: false,
        message: 'login failed',
        data: { result: false}
      });
    }
  });



  // Start server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to initialize the database:', err);
});