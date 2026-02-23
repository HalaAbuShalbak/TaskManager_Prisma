import express from "express";
import 'dotenv/config'
import cors from "cors";

const app = express();
//built-in middleware
app.use(express.json());
app.use(cors());
//routers
import authRouter from "./src/routes/authRouter.js";
import taskRouter from "./src/routes/taskRouter.js";
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);









// router middleware




// Handles any other endpoints [unassigned - endpoints]
app.use("", (req, res) =>{
  res.status(404).json("NO content at this path")
} );



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});