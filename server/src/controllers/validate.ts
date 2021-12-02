import Joi from "joi";

type Obj = {
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
  address: string;
  phone: string;
}

export const signUpValidate = (data: Obj) => {
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(50),
    email: Joi.string().required().min(2).max(50),
    password: Joi.string().required().min(6).max(100),
    state: Joi.string().required().min(3).max(20),
    city: Joi.string().required().min(3).max(20),
    address: Joi.string().required().min(6).max(50),
    phone: Joi.string().required().min(15).max(15),
  });
  return schema.validate(data);
};

export const loginValidate = (data: Obj) => {
  const schema = Joi.object({
    email: Joi.string().required().min(2).max(50),
    password: Joi.string().required().min(6).max(100),
  });
  return schema.validate(data);
};
