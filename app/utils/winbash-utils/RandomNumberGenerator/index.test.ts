import  FixedDigitRandomNumberGenerator  from "."

describe('FixedDigitRandomNumberGenerator', () => {
    it('should generate a random number with the correct number of digits', () => {
        const digits = 5;
        const rng = new FixedDigitRandomNumberGenerator(digits);
        const randomNumber = rng.generateRandomNumber();

        expect(randomNumber).toBeGreaterThanOrEqual(Math.pow(10, digits - 1));
        expect(randomNumber).toBeLessThanOrEqual(Math.pow(10, digits) - 1);
    });

    it('should throw an error if digits is less than 1', () => {
        expect(() => {
            new FixedDigitRandomNumberGenerator(0);
        }).toThrow('digits must be bigger than 1');
    });
});
