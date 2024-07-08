import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const createUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .messages({
      "string.empty": "Email field is required",
      "string.email": "email must be a valid email",
    }),
  password: passwordComplexity({
    min: 6,
    max: 20,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 6,
  }).messages({
    "string.empty": "password field is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .messages({
      "string.empty": "Email field is required",
      "string.email": "email must be a valid email",
    }),
  password: passwordComplexity({
    min: 6,
    max: 20,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 6,
  }).messages({
    "string.empty": "password field is required",
  }),
});

export const emailSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
});

export const updateSchema = Joi.object({
  password: passwordComplexity({
    min: 6,
    max: 20,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 6,
  }),
  Cpassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Retyped password must match the password",
  }),
});

export const changePasswordSchema = Joi.object({
  Newpassword: passwordComplexity({
    min: 6,
    max: 20,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 6,
  }),
  Cpassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Retyped password must match the password",
  }),
});

export const userName = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "firstname field is required",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "lastname field is required",
  }),
});

export const location = Joi.object({
  state: Joi.string().required().messages({
    "string.empty": "This field is required",
  }),
  postal_code: Joi.string().required().messages({
    "string.empty": "This field is required",
  }),
});

export const JobDetails = Joi.object({
  JobTitle: Joi.string().required().messages({
    "string.empty": "JobTitle is required",
  }),
  Company: Joi.string().required().messages({
    "string.empty": "Company name is required",
  }),
  WorkPlaceType: Joi.string().required().messages({
    "string.empty": "Work place type is required",
  }),
  JobLocation: Joi.string().required().messages({
    "string.empty": "Job location is required",
  }),
});

export const JobDetails2 = Joi.object({
  Description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
});

export const JobDetails3 = Joi.object({
  JobType: Joi.string().required().messages({
    "string.empty": "JobType is required",
  }),

  Skills: Joi.array().items(Joi.string()).required().messages({
    "string.empty": "Skills is required",
  }),
});

export const JobDetails4 = Joi.object({
  RecieveApplicant: Joi.string().required().messages({
    "string.empty": "ApplicantEmail is required",
  }),
});
