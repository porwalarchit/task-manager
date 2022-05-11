const Task = require("../models/task.js")

const getAllTasks = (req, res)=>{
    res.send("All Items from controller");
}

const createTask = async(req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({
        message: "Task Created",
        task
    }); 
}

const getTask = (req, res) => {
    res.send("Get Task"); 
}

const updateTask = (req, res) => {
    res.send("Update Task"); 
}

const deleteTask = (req, res) => {
    res.send("Delete Task"); 
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};