import Joi from 'joi';

// Font validation schema
export const fontSchema = Joi.object({
  mimetype: Joi.string().valid('font/ttf', 'application/x-font-ttf', 'application/octet-stream').required(),
  size: Joi.number().max(5242880).required(), // 5MB max
  originalname: Joi.string().pattern(/\.ttf$/i).required()
});

// Font group validation schema
export const fontGroupSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(1000).optional().allow(''),
  font_ids: Joi.array().items(Joi.string().uuid()).min(2).required()
});

// Font group update schema (all fields optional)
export const fontGroupUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(255).optional(),
  description: Joi.string().max(1000).optional().allow(''),
  font_ids: Joi.array().items(Joi.string().uuid()).min(2).optional()
}).min(1);

export const validateFont = (file: Express.Multer.File) => {
  return fontSchema.validate(file);
};

export const validateFontGroup = (data: any, isUpdate = false) => {
  const schema = isUpdate ? fontGroupUpdateSchema : fontGroupSchema;
  return schema.validate(data);
};