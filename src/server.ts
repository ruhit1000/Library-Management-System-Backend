import app from "./app";
import config from "./config";
import { pool } from "./db";

const port = config.port;

const main =async () => {
  try {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed To Connect Server", error);
  }
};

main();
