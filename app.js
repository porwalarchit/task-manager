const express = require("express");
const app = express();
const connectDB = require("./db/conn");
const tasks = require("./routes/tasks.js");
// console.log("Hello");
require("dotenv").config();

// middleware
app.use(express.json());

app.use('/api/v1/tasks', tasks);

// Setting up Database and Server to run in async
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Connection to DB successful")
        const port = 3000;
        app.listen(port, () => {
            console.log(`Server running at port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}
start();

// app.get('/api/v1/tasks')         -get all the tasks
// app.post('/api/v1/tasks')        -create a new task
// app.get('/api/v1/tasks/:id')     -get task by id
// app.patch('/api/v1/tasks/:id')   -update task by id
// app.delete('/api/v1/tasks/:id')  -delele task by id