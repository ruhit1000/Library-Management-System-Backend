import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.PORT as string,
  nodeENV: process.env.NODE_ENV as string,
  connection_string: process.env.DATABASE_URL as string,
  jwt_secret: process.env.JWT_SECRET as string
};

export default config;
