const res = require("express/lib/response");
const { findOneAndDelete } = require("../models/taskSchema.js");
const Task = require("../models/taskSchema.js")

// get all the tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// Create a new task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({
            message: "Task Created",
            task
        });
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

// Get a particular task by Id
const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });

        if (!task) {
            return res.status(404).json({
                message: `Task doesn't exist with Id: ${taskID}`,
            })
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// Delete task by Id
const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({
                message: `No task with Id: ${taskID}`
            })
        }
        res.status(200).json({ 
            message:"Task Deleted",
            task 
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

// Update task by Id
const updateTask = async(req, res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body,{
            new:true,
            runValidators:true
        });

        if(!task){
            return res.status(404).json({
                message: `No task with Id: ${taskID}`
            })
        }

        res.status(200).json({
            message:"Task Updated",
            task
        })
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};