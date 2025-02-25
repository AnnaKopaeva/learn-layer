import * as yup from "yup";

export const schema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(16, "Username must be at most 16 characters")
      .matches(/^[a-zA-Z0-9]*$/, "Username must be alphanumeric only"),
    password: yup
      .string()
      .required("Please enter your password.")
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: yup
      .string()
      .required("Please retype your password.")
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
  })
  .required();
