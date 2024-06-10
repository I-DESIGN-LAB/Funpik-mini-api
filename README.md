# iDesignlab Funpik mini app

NodeJS, ExpressJS RESTful API

## Development Environment

NodeJS 22.2.0 버전에서 개발

## DB

[LowDB](https://github.com/typicode/lowdb)

## API Specifications

- [login](#login)
- [create_user](#create_user)
- [check_nickname](#check_nickname)
- [get_user](#get_user)
- [get_user_info](#get_user_info)

---

### **login**

#### Summary

userId와 password 일치 여부를 리턴한다.

#### URL

GET /login

#### Parameters

|name|description|
|-|-|
|userId|userId|
|pass|password|

#### Request Example

GET /login?userId=funpik1&pass=funpik123

#### Response

```json
{
  "result": true,
  "message": "success",
  "data": {
    "result": true
  }
}
```

#### Error Response

400

```json
{
  "result": false,
  "message": "login failed",
  "data": {
    "result": false
  }
}
```

---

### **create_user**

#### Summary

해당 정보를 통하여 유저 정보를 생성합니다.

#### URL

- POST /create_user

#### Query Parameters

#### Request Body

|Name|Description|
|-|-|
|userId|userid|
|password|password|
|name|user nickname|
|email|user email|

#### Request Example

POST /create_user

```json
{
  "userId": "funpik1",
  "password": "funpik123",
  "name": "funpik",
  "email": "funpik@idesignlab.net"
}
```

#### Response

```json
{
  "result": true,
  "message": "User created successfully",
  "data": {
    "userId": "funpik1",
    "name": "funpik",
    "email": "funpik@idesignlab.net"
  }
}
```

#### Error Response

##### 409

```json
{
  "result": false,
  "message": "User already exists",
  "data": null
}
```

##### 400

```json
{
  "result": false,
  "message": "Invalid request",
  "data": null
}
```

---

### **check_nickname**

#### Summary

해당 userId가 현재 쓰이고 있는지 중복 체크를 합니다.

#### URL

GET /check_nickname

#### Query parameters

|Name|Description|
|-|-|
|userId|userId|

#### Request Example

GET /check_nickname?userId=funpik8

#### Response

```json
{
  "result": true,
  "message": "success",
  "data": {
    "result": true
  }
}
```

#### Error Response

409

```json
{
  "result": false,
  "message": "already exists userId",
  "data": {
    "result": false
  }
}
```

---

### **get_user**

#### Summary

해당 userId의 모든 정보를 불러옵니다.

#### URL

GET /get_user

#### Query parameters

|Name|Description|
|-|-|
|userId|userId|

#### Request Example

GET /get_user?userId=funpik1

#### Response

```json
{
  "result": true,
  "message": "success",
  "data": {
    "userId": "funpik1",
    "password": "funpik123",
    "name": "funpik",
    "email": "funpik@idesignlab.net",
    "info": {
      "tier": 6,
      "topikExpectedRating": 4,
      "thisWeekStudyTime": 236121,
      "totalStudyTime": 123400673,
      "weeklyStudyCount": 2,
      "totalStudyCount": 50,
      "readingAccuracyRate": 98.49637307586883,
      "listeningAccuracyRate": 30.169021245284533,
      "writingAccuracyRate": 19.89178079840812
    }
  }
}
```

#### Error Response

404

```json
{
  "result": false,
  "message": "User not found",
  "data": null
}
```

---

### **get_user_info**

#### Summary

해당 userId의 학습 정보를 불러옵니다.

#### URL

GET /get_user_info

#### Query parameters

|Name|Description|
|-|-|
|userId|userId|

#### Request Example

GET /get_user_info?userId=funpik1

#### Response

```json
{
  "result": true,
  "message": "success",
  "data": {
    "tier": 6,
    "topikExpectedRating": 4, // 토픽 예측값
    "weeklyStudyTime": 236121, // 이번주 학습 시간 (ms)
    "totalStudyTime": 123400673, // 총 학습 시간 (ms)
    "weeklyStudyCount": 2, // 이번주 학습 횟수
    "totalStudyCount": 50, // 총 학습 횟수
    "readingAccuracyRate": 98.49637307586883, //읽기 정답률
    "listeningAccuracyRate": 30.169021245284533, // 듣기 정답률
    "writingAccuracyRate": 19.89178079840812 // 쓰기 정답률
  }
}
```

#### Error Response

404

```json
{
  "result": false,
  "message": "User not found",
  "data": null
}
```