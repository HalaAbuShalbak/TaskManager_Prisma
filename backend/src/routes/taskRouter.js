import express from "express";
import taskController from "../controllers/taskController.js";
import { authenticateToken } from "../middlewares/authMW.js";
import { authorizeRole } from "../middlewares/roleMW.js";
const taskRouter = express.Router();
taskRouter.get("/", authenticateToken, taskController.getTasks);
taskRouter.post("/", authenticateToken, taskController.createTask);
taskRouter.put("/:id", authorizeRole("ADMIN"), taskController.updateTask);
taskRouter.delete("/:id", authorizeRole("ADMIN"), taskController.deleteTask);
taskRouter.post(
  "/:taskId/assign",
  authorizeRole("ADMIN"),
  taskController.assignUserToTask,
);
// there is a problem in this endpoint, it is not working as expected, it is not adding multiple users for the same task and the logic has to be update not create a new schema for the userTask but append the task to the user schema in task field and append the user to the task schema in user field
taskRouter.delete(
  "/:taskId/remove/:userId",
  authorizeRole("ADMIN"),
  taskController.removeUserFromTask,
);
export default taskRouter;
