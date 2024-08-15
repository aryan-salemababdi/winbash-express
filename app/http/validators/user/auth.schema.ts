import Joi from "@hapi/joi";

const authSchema = Joi.object({
  mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نمی باشد"))
});

export default authSchema;