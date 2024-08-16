import { ConstantsValues } from "../constant";

describe('ConstantsValues', () => {
    test('should create an instance with correct values', () => {
        const expiresIn = 120000;
        const userRole = "USER";

        const constants = new ConstantsValues(expiresIn, userRole);

        expect(constants.EXPIRES_IN).toBe(expiresIn);
        expect(constants.USER_ROLE).toBe(userRole);
    });

    test('getValues should return correct values', () => {
        const expiresIn = 120000;
        const userRole = "USER";

        const constants = new ConstantsValues(expiresIn, userRole);
        const values = constants.getValues();

        expect(values).toEqual([expiresIn, userRole]);
    });
});
