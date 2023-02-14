import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import postRoutes from "./routes/postRoutes.js";
import openaiRoutes from "./routes/openaiRoutes.js";
import connectDB from "./mongodb/connect.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));

app.use("/api/post", postRoutes);
app.use("/api/openai", openaiRoutes);

//display on localhost
app.get("/", async(req, res) => {
  res.status(200).json({
    message: "Deyyy welcome",
  });
});

//display on terminal
const startServer = async () => {
  try {
    app.listen(8080, () => console.log("Server http://localhost:8080"))
    connectDB(process.env.MONGODB_URL)
  } catch (error) {
    console.log(error);
  }
};

startServer();