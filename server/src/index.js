import dotenv from "dotenv";
dotenv.config();

import sequelize from "./db/index.js";
import "./models/user.model.js";
import { app } from "./app.js";

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connected Successfully");

    await sequelize.sync();
    console.log("Models synced");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();
