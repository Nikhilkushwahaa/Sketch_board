// const { Socket } = require("socket.io");

let canvas = document.querySelector("canvas");

//with this canvas width and height code canvas will cover whole width and height of screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseDown = false

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");


let penColor = "red"; //by default color
let eraserColor = "white";
let penWidth = pencilWidthElem.value; //bydefault size of line size
let eraserWidth = eraserWidthElem.value;
 


let undoRedoTracker = []; //Data
let track = 0; // Represent which action from tracker array and data



//API
let tool = canvas.getContext("2d")//here throught this line of code we are accessing tool only by this tool we can make lines and do further things

//to giving white background on downloading
tool.fillStyle = 'white';
tool.fillRect(0, 0, canvas.width, canvas.height);

//commented reaseon below
// tool.beginPath(); //with this we will start from a path begin from here new path 

// tool.moveTo(10,10) // making line and (10,10) is start point of line  moveTo-> start of line

// tool.lineTo(100,150); //till here line will end lineTo-> end of line

// tool.stroke(); //this will fill color in line (fill graphic )
//SO WE COMMENTED ABOVE PART BECAUSE THAT WAS JUST TO TAKE TRIAL THAT HOW THESE lineto etc function works but below we will make them actually work and add them with our mouse event 



canvas.addEventListener("mousedown",(e)=>{
    mouseDown = true;
let data = {
    x: e.clientX,
    y: e.clientY
}
// send data to server
socket.emit("beginPath", data);

})


canvas.addEventListener("mousemove",(e)=>{
    if(mouseDown){ 
let data = { 
    x: e.clientX,
    y: e.clientY,
color: eraserFlag ? eraserColor : penColor,
width: eraserFlag ? eraserWidth : penWidth
}
socket.emit("drawStroke", data);

    } 
}) 

function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}
function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    // here strokeObj.x, strokeObj.y  x will denote here we declared above that what these x and y denote in canvas.adeventlistner functions
    tool.stroke();
}

 // so with this function line will start creating but it will keep on making even if we normally move our mouse so to overcome this problem we will make MOUSEDOWN = FALSE and after that we will create mousedown function and also put mousemove function in if statement that if mousedown is true only then lineTo will work else not ..

canvas.addEventListener("mouseup" ,(e)=>{
//mouseup means releasing mouse button 
mouseDown = false;

//so till this mouseDown = false some actions are performed so we will store this data for undo redo 
let url = canvas.toDataURL();
undoRedoTracker.push(url);
track = undoRedoTracker.length - 1; //updating track also lenth - 1 means last index
})

undo.addEventListener("click", (e) => {
    if(track > 0) track--;

 // track action
 let data = {
    trackValue: track,
    undoRedoTracker
}

socket.emit("redoUndo", data);
})

redo.addEventListener("click", (e) => {
    if(track < undoRedoTracker - 1) track++;

 // track action
 let data = {
    trackValue: track,
    undoRedoTracker
}
socket.emit("redoUndo", data);
})





//now to perform actions we are creating this function
//this trackObj will information of track and also array of undoReaderTracker 
function undoRedoCanvas(trackObj) {
    
    track = trackObj.trackValue; //he re we are giving track all values in trackObj
    undoRedoTracker = trackObj.undoRedoTracker; //same undoreaderTracker data also putting in trackObj


    let url = undoRedoTracker[track];
    let img = new Image(); // new image reference element
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    } 
}








//setting pencolor
pencilColor.forEach((colorElem) => {
    colorElem.addEventListener("click",(e)=>{

let color = colorElem.classList[0];
penColor = color;
tool.strokeStyle = penColor;

    })
});


pencilWidthElem.addEventListener("change",(e)=>{
penWidth = pencilWidthElem.value;
tool.lineWidth = penWidth;
})

eraserWidthElem.addEventListener("change",(e)=>{
eraserWidth = eraserWidthElem.value
tool.lineWidth = eraserWidth
})


eraser.addEventListener("click",(e)=>{
    if(eraserFlag){  //here used flag because if we click on eraser then active eraser color white one and then if we click againg on ereaser button then run normal else statement and again active pencil colors 
tool.strokeStyle = eraserColor
tool.lineWidth = eraserWidth;
    }
else{
    tool.strokeStyle = penColor;
    tool.lineWidth = penWidth;
}
})

download.addEventListener("click",(e)=>{
let url = canvas.toDataURL();

let a = document.createElement("a");
a.href = url;
a.download = "Created_notes.jpg";
a.click();

})






socket.on("beginPath", (data) => {
    // data -> data from server
    beginPath(data);
})
socket.on("drawStroke", (data) => {
    drawStroke(data);
})
socket.on("redoUndo", (data) => {
    undoRedoCanvas(data);
})