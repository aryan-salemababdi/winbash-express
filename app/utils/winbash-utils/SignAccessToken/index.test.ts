import { SignAccessToekn } from ".";
import JWT from "jsonwebtoken";
import { pool } from "../../db";


jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
}));

jest.mock('../../db', () => ({
    pool: {
        query: jest.fn()
    }
}));

describe('SignAccessToekn', () => {
    const userId = 1;
    const mockToken = 'mockToken';
    const mockUser = {
        id: userId,
        mobile: '09927023902',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should generate a token if user exists', async () => {
        (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });

        (JWT.sign as jest.Mock).mockImplementation((payload, secret, options, callback) => {
            callback(null, mockToken);
        });

        const signAccessToken = new SignAccessToekn(userId);
        const token = await signAccessToken.signAccessToken();

        expect(token).toBe(mockToken);
        expect(JWT.sign).toHaveBeenCalledWith(
            { mobile: mockUser.mobile, userID: userId },
            process.env.SECRET_KEY,
            { expiresIn: '1h' },
            expect.any(Function)
        );
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE id = $1', [userId]);
    });

    it('should throw an error if user does not exist', async () => {
        (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

        const signAccessToken = new SignAccessToekn(userId);

        await expect(signAccessToken.signAccessToken()).rejects.toThrow('User not found');
    });

    it('should throw an error if JWT.sign fails', async () => {
        (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });
        (JWT.sign as jest.Mock).mockImplementation((payload, secret, options, callback) => {
            callback(new Error('JWT Error'), null);
        });

        const signAccessToken = new SignAccessToekn(userId);

        await expect(signAccessToken.signAccessToken()).rejects.toThrow('Server Error');
    });
});
