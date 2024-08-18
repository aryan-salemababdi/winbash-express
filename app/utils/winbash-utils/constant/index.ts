import { Constants } from "..";


export class ConstantsValues extends Constants {
    constructor(EXPIRES_IN: number, USER_ROLE: "USER" | "ADMIN") {
        super(EXPIRES_IN, USER_ROLE);
    }

    getValues(): [number, string] {
        return [this.EXPIRES_IN, this.USER_ROLE];
    }
}

const constants = new ConstantsValues(new Date().getTime() + 1200000, "USER");
export const constantValues = constants.getValues();