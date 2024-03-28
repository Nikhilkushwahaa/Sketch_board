// const express = require("express");
// const socket = require("socket.io");


// const app = express();
// app.use(express.static("public"))



// let PORT = 3000;
// let server = app.listen(PORT,()=>{
// console.log("Listning on PORT" + PORT);
// })

// let io = socket(server);

// io.on("connection",(socket)=>{

//     console.log("Socket connection done");

    
// // Received data
// socket.on("beginPath", (data) => {
//     // data -> data from frontend
//     // Now transfer data to all connected computers
//     io.sockets.emit("beginPath", data);
// })
// socket.on("drawStroke", (data) => {
//     io.sockets.emit("drawStroke", data);
// })
// socket.on("redoUndo", (data) => {
//     io.sockets.emit("redoUndo", data);
// })
// })



// const express = require("express");
// const socket = require("socket.io");
// const cors = require("cors"); // Import the cors middleware

// const app = express();
// app.use(cors()); // Apply CORS middleware
// app.use(express.static("public"));

// const PORT = 3000;
// const server = app.listen(PORT, () => {
//     console.log("Listening on PORT " + PORT);
// });

// const io = socket(server);

// io.on("connection", (socket) => {
//     console.log("Socket connection done");

//     // Received data
//     socket.on("beginPath", (data) => {
//         // data -> data from frontend
//         // Now transfer data to all connected computers
//         io.sockets.emit("beginPath", data);
//     });
//     socket.on("drawStroke", (data) => {
//         io.sockets.emit("drawStroke", data);
//     });
//     socket.on("redoUndo", (data) => {
//         io.sockets.emit("redoUndo", data);
//     });
// });

const express = require("express"); // Access
const socket = require("socket.io");

const app = express(); //Initialized and server ready

app.use(express.static("public"));

let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
    console.log("Listening to port" + port);
})

let io = socket(server);

io.on("connection", (socket) => {
    console.log("Made socket connection");
    // Received data
    socket.on("beginPath", (data) => {
        // data -> data from frontend
        // Now transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })
    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})