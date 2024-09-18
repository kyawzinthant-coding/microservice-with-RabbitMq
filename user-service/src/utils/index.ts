import bcrypt from "bcryptjs";

class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    statusCode: number,
    message: string | undefined,
    isOperational: boolean = true,
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const encryptPassword = async (password: string) => {
  const encryptedPassword = await bcrypt.hash(password, 12);
  return encryptedPassword;
};

const isPasswordMatch = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export { ApiError, encryptPassword, isPasswordMatch };
