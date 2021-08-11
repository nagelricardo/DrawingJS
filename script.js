//Initial Data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');
let selectContext = screen.getContext('2d');

//Events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

document.querySelector('.clear').addEventListener('click', clearSquare);

 
//Functions
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    if(canDraw) {
       draw(e.pageX, e.pageY);
    }
 }

function mouseUpEvent() {
    canDraw = false;
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    selectContext.beginPath();
    selectContext.lineWidth = 5;
    selectContext.lineJoin = "round";
    selectContext.moveTo(mouseX, mouseY);
    selectContext.lineTo(pointX, pointY);
    selectContext.closePath();
    selectContext.strokeStyle = currentColor;
    selectContext.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearSquare() {
    selectContext.setTransform(1, 0, 0, 1, 0, 0);
    selectContext.clearRect(0, 0, selectContext.canvas.width, selectContext.canvas.height);
}