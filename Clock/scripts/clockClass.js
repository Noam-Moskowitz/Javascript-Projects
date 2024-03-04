export class Clock {
    city;
    utcOffset;
    time;
    constructor(city, utcOffset) {
        this.city = city;
        this.utcOffset = utcOffset;
    }



    createTime(hour) {

        return `${hrs}:${mns}:${scnds}`
    }
}