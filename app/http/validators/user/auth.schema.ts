import Joi from "@hapi/joi";

export const getOtpSchema = Joi.object({
  mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نمی باشد"))
});

export const checkOtpSchema = Joi.object({
  mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نمی باشد")),
  code: Joi.string().min(4).max(6).error(new Error("کد ارسال شده صحیح نمی باشد"))
});
