import { pool } from "../../db";
import { jwtHelpers } from "../../utils/jwtHelper";
import { passwordHelper } from "../../utils/passwordHelper";
import { IUser, LogInCredential } from "./auth.interface";

const registerUserToDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  const hashedPassword = await passwordHelper.hashPassword(password);
  const result = await pool.query(
    `
        
        INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, COALESCE($4, 'member')) RETURNING id, name, email, role, created_at, updated_at;
        `,
    [name, email, hashedPassword, role],
  );
  return result.rows[0];
};

const loginUserToDB = async (payload: LogInCredential) => {
  const { email, password } = payload;
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email],
  );

  if (user.rowCount === 0) {
    throw new Error("Invalid Credentials!!");
  }

  const matchPassword = await passwordHelper.comparePassword(
    password,
    user.rows[0].password,
  );

  if (!matchPassword) {
    throw new Error("Invalid Credentials!!");
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };

  const accessToken = await jwtHelpers.generateToken(jwtPayload);

  delete user.rows[0].password;

  return { accessToken, user: user.rows[0] };
};

export const authService = {
  registerUserToDB,
  loginUserToDB,
};
