const express = require("express");
const todoItemsRouter = express.Router();

const todoItemsController = require("../controller/todoItemsControllers");

todoItemsRouter.get("/", todoItemsController.getTodoItems);
todoItemsRouter.post("/", todoItemsController.createTodoItem);
todoItemsRouter.delete("/:id", todoItemsController.deleteTodoItem);
todoItemsRouter.put("/:id/completed", todoItemsController.updateTodoItem);


module.exports = todoItemsRouter;
