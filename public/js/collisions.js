function draw_curr() {
    // set line stroke and line width
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(pointa.x, pointa.y);
    ctx.lineTo(mousex, mousey);
    ctx.stroke();
}

function draw_past() {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    for (let line = 0; line < past_lines.length; line++){
        ctx.beginPath();
        // ctx.moveTo(past_lines[line][0], past_lines[line][1]);
        // ctx.lineTo(past_lines[line][2], past_lines[line][3]);
        ctx.moveTo(past_lines[line].vect_1x, past_lines[line].vect_1y);
        ctx.lineTo(past_lines[line].vect_2x, past_lines[line].vect_2y);
        ctx.stroke();
    }
    
}

function loop() {
    setTimeout(() => { window.requestAnimationFrame(loop); }, 10);
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    if (drawing == true){
        draw_curr()
    }
    draw_past()
    console.log(past_lines)
    
}

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = height;
ctx.canvas.width = width;

var mousex = 0
var mousey = 0
const pointa = {
    x:width/2,
    y:height/2
}
past_lines = []

var drawing = false

ctx.canvas.addEventListener("mousemove", (event) => {
    mousex = event.x
    mousey = event.y
    // console.log(mousex, mousey)
});
ctx.canvas.addEventListener("click", (event) => {
    // mousex = event.x
    // mousey = event.y
    // console.log(mousex, mousey)
    if (drawing == false){
        drawing = true
        pointa.x = event.x
        pointa.y = event.y
    }
    else{
        drawing = false
        // past_lines.push([pointa.x, pointa.y, event.x, event.y])
        past_lines.push({vect_1x:pointa.x, vect_1y:pointa.y, vect_2x:event.x, vect_2y:event.y})
    }
    
});

loop()