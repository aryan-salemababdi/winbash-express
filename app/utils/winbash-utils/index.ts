export abstract class RandomNumberGenerator {
    digits: number;
    constructor(digits: number) {
        if (digits < 1) throw new Error("digits must be bigger than 1");
        this.digits = digits;
    }

    abstract generateRandomNumber(): number;
};


export abstract class Constants {
    EXPIRES_IN: number;
    USER_ROLE: string;

    constructor(EXPIRES_IN: number, USER_ROLE: "USER" | "ADMIN") {
        this.EXPIRES_IN = EXPIRES_IN;
        this.USER_ROLE = USER_ROLE;
    }
};


export abstract class AccessToken {
    userId: number | string;
    constructor(userId: number | string) {
        this.userId = userId;
    }
    abstract signAccessToken(): Promise<string | undefined>;

};

