import { RandomNumberGenerator } from "..";

class FixedDigitRandomNumberGenerator extends RandomNumberGenerator {
    constructor(digits: number) {
        super(digits);
    }

    generateRandomNumber(): number {
        const min = Math.pow(10, this.digits - 1);
        const max = Math.pow(10, this.digits) - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};


export default FixedDigitRandomNumberGenerator;