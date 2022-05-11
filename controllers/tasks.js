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
        const getTaskbyId = await Task.findOne({ _id: taskID });

        if (!getTaskbyId) {
            return res.status(404).json({
                message: `Task doesn't exist with Id: ${taskID}`,
            })
        }
        res.status(200).json({ getTaskbyId });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// Delete task by Id
const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const deleteTask = await Task.findOneAndDelete({ _id: taskID });
        if (!deleteTask) {
            return res.status(404).json({
                message: `No task with Id: ${taskID}`
            })
        }
        res.status(200).json({ 
            message:"Task Deleted",
            deleteTask 
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
        const updateTask = await Task.findOneAndUpdate({_id:taskID}, req.body,{
            new:true,
            runValidators:true
        });

        if(!updateTask){
            return res.status(404).json({
                message: `No task with Id: ${taskID}`
            })
        }

        res.status(200).json({
            message:"Task Updated",
            updateTask
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