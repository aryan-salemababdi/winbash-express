import Joi from "@hapi/joi";

export const createCategorySchema = Joi.object({
  title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمی باشد")),
  parentId: Joi.string().allow("").error(new Error("شناسه وارد شده صحیح نمی باشد"))
});


export const updateCategorySchema = Joi.object({
  title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمی باشد")),
  parentId: Joi.string().allow("").error(new Error("شناسه وارد شده صحیح نمی باشد"))
})