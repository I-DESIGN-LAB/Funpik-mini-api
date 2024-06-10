export class UserInfo {
    /// on db
    constructor() {
        this.tier = Math.floor(Math.random() * 10);
        this.topikExpectedRating = 4;
        this.weeklyStudyTime = Math.floor(Math.random() * 23321450) + 10000;
        this.totalStudyTime = Math.floor(Math.random() * 332145031) + 100000;
        this.weeklyStudyCount = 2;
        this.totalStudyCount = 50;
        this.readingAccuracyRate = Math.random() * 100;
        this.listeningAccuracyRate = Math.random() * 100;
        this.writingAccuracyRate = Math.random() * 100;
    }
}
