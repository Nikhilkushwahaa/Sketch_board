let optionsCont = document.querySelector(".options-cont");

let toolCont = document.querySelector(".tools-cont");
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");


let optionFlag = true //here true means options icons are visible means open to use later below we are aplying code on taht in which false will be for cross button 
//true -> show tools
//flase -> hide tools



let pencilFlag = false;
let eraserFlag = false;

let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");

// let stickyCont = document.querySelector(".sticky-cont")




optionsCont.addEventListener("click",(e)=>{
optionFlag = !optionFlag; // toggle


if(optionFlag){
//if true 
openTools()  //functions are defined below
}

else{
//if false
closeTools()  //functions are defined below
}
})

function openTools(){
    let icomElement = optionsCont.children[0]
icomElement.classList.remove("fa-times")
icomElement.classList.add("fa-bars")
toolCont.style.display = "flex"
}

function closeTools(){
    let icomElement = optionsCont.children[0]
    icomElement.classList.remove("fa-bars")
    icomElement.classList.add("fa-times")
    toolCont.style.display = "none"
    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}


pencil.addEventListener("click",(e)=>{
// true -> show pencil tool, false -> hide pencil tool
pencilFlag = !pencilFlag;

if(pencilFlag){
    pencilToolCont.style.display = "block"
}
else{
    pencilToolCont.style.display = "none"
}

})

eraser.addEventListener("click",(e)=>{
// true -> show eraser tool, false -> hide eraser tool
eraserFlag = !eraserFlag;
if(eraserFlag){
    eraserToolCont.style.display = "flex"
}
else{
    eraserToolCont.style.display = "none"
}
})

//creating upload button function here
//so first we had to make a function in which after clicking on upload button our files will get open 
//then after files get open we had to select a single file using files[0] index
//after selecting file we had to convert that selected file to url 

upload.addEventListener("click",(e)=>{
//opening files
let input = document.createElement("input")
input.setAttribute("type", "file")
input.click();

input.addEventListener("change",(e)=>{
let file = input.files[0]
let url = URL.createObjectURL(file)
let stickyCont = document.createElement("div")
stickyCont.setAttribute("class" , "sticky-cont")
stickyCont.innerHTML =`
<div class="header-cont">
<div class="minimize"></div>
<div class="remove"></div>
</div>
<div class="note-cont">
   <img src="${url}"/>
</div>
` ;
document.body.appendChild(stickyCont)


//drag and drop code repeated here more explained below 
stickyCont.onmousedown = function (event) {
    dragAndDrop(stickyCont, event);
};
stickyCont.ondragstart = function () {
    return false;
};
//code for remove and minimize button for notes more explained below just repeted same here
let minimize = stickyCont.querySelector(".minimize");
let remove = stickyCont.querySelector(".remove");
noteActions(minimize,remove,stickyCont);

});
})




sticky.addEventListener("click" ,(e)=>{
let stickyCont = document.createElement("div")
stickyCont.setAttribute("class" , "sticky-cont")
stickyCont.innerHTML =`
<div class="header-cont">
<div class="minimize"></div>
<div class="remove"></div>
</div>
<div class="note-cont">
    <textarea spellcheck="false"></textarea>
</div>
` ;
document.body.appendChild(stickyCont)



//drag and drop algorithm called here and some decleration here so that we can access stickyCont outside of this scope
stickyCont.onmousedown = function (event) {
    dragAndDrop(stickyCont, event);
};
stickyCont.ondragstart = function () {
    return false;
};



//now adding functionality to remove and minimize buttons
//first we are selecting both buttons classes
//then after selecting classes we will call a noteActions fuunction below and outside we will create this noteAction function and there we will define functionallity
let minimize = stickyCont.querySelector(".minimize");
let remove = stickyCont.querySelector(".remove");
noteActions(minimize,remove,stickyCont);

});



function noteActions(minimize,remove,stickyCont){
remove.addEventListener("click",(e)=>{
stickyCont.remove();
})
minimize.addEventListener("click", (e) => {
    let noteCont = stickyCont.querySelector(".note-cont");
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display === "none") noteCont.style.display = "block";
    else noteCont.style.display = "none";
})
}






// //drag and drop algorithm 
//here element insde function is stickyCont that is declared above inside sticky function above here we are using element insted of stickyCont because that stickyCont is inside of another scope so we can't access it here so we are using element as stickyCont and we delcared element as stickyCont above 
function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}
