


export abstract class VerifyToken {
    token: string;
    constructor(token: string) {
        this.token = token;
    }

    abstract verifyAccessToken(): any;
}

