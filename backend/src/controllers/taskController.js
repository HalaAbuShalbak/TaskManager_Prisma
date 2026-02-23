import { prisma } from "../Database/db.js";
const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

taskController.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        status,
        priority,
      },
    });
    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

taskController.assignUserToTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;
   
    const assignment = await prisma.userTask.create({
      data: {
        taskId: parseInt(taskId),
        userId: parseInt(userId),
      },
    });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

taskController.removeUserFromTask = async (req, res) => {
  try {
    const { taskId, userId } = req.params;
    await prisma.userTask.delete({
      where: {
        taskId_userId: {
          taskId: parseInt(taskId),
          userId: parseInt(userId),
        },
      },
    });
    res.json({ message: "User removed from task successfully" });
  } catch (error) {
    console.error("Error removing user from task:", error);
    res.status(500).json({ error: "Failed to remove user from task" });
  }
};

export default taskController;