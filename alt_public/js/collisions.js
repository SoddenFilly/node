function animation(){
    if (anim_frame != 2){
        anim_frame++
    }
    else{
        anim_frame = 0
    }
    setTimeout(() => { animation() }, 1000/anim_fps);
}

function draw_curr() {
    // set line stroke and line width
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    if (drawing == false){
        pointa.x = mousex
        pointa.y = mousey
        // ctx.lineWidth = 3;
    }

    ctx.beginPath();
    ctx.moveTo(pointa.x, pointa.y);
    // console.log(pointa.x, pointa.y)
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

function vector_snap() {
    activated = false
    for (let line = 0; line < past_lines.length; line++){
        let range = 12 //8
        if ((mousex - past_lines[line].vect_1x < range && mousey - past_lines[line].vect_1y < range) && (mousex - past_lines[line].vect_1x > -range && mousey - past_lines[line].vect_1y > -range)){
            // console.log("CONNECTa", past_lines[line].vect_1x)
            mousex = past_lines[line].vect_1x
            mousey = past_lines[line].vect_1y
            
            // ctx.lineWidth = 4;
            if (drawing == true && pointa_assigned == false){
                pointa.x = past_lines[line].vect_1x
                pointa.y = past_lines[line].vect_1y
            }
            activated = true
        }
        else if ((mousex - past_lines[line].vect_2x < range && mousey - past_lines[line].vect_2y < range) && (mousex - past_lines[line].vect_2x > -range && mousey - past_lines[line].vect_2y > -range)){
            // console.log("CONNECTb")
            mousex = past_lines[line].vect_2x
            mousey = past_lines[line].vect_2y

            if (drawing == true && pointa_assigned == false){
                pointa.x = past_lines[line].vect_2x
                pointa.y = past_lines[line].vect_2y
            }
            activated = true
        }
    }
    if (activated == true){
        cursor_snap = 1
        anim_fps = 10
    }
    else{
        cursor_snap = 0
        anim_fps = 5
    }
    
    return activated
}

function loop() {
    ctx.imageSmoothingEnabled = false;
    setTimeout(() => { window.requestAnimationFrame(loop); }, 10);
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    vector_snap()
    draw_curr()
    draw_past()
    // console.log(past_lines)

    ctx.drawImage(cursor_img, 9*cursor_snap + 1, 11*anim_frame + 1, 9, 9, mousex - 12, mousey - 12, 25, 25)

    // y = m*x + c
    x = mousey // mousex
    100 < x < 200

    m = 0.5
    c = 100
    y = m*x + c

    a = 0.01
    b = width/4
    c = height/3.5
    y = Math.round(a*(x - b)**2 + c)

    ctx.drawImage(cursor_img, 1, 11*anim_frame + 1, 9, 9, mousex - 12, y - 12, 25, 25)

    // console.log(mousey - 12, y - 12)
    if (mousey - 12 == y - 12){
        console.log("Contact:", mousey - 12)
    }
    

    ctx.beginPath();
    // ctx.moveTo(past_lines[line].vect_1x, past_lines[line].vect_1y);
    // ctx.lineTo(past_lines[line].vect_2x, past_lines[line].vect_2y);
    ctx.stroke();



   
    
}

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = height;
ctx.canvas.width = width;

var mousex = -100
var mousey = -100
const pointa = {
    x:width/2,
    y:height/2
}
past_lines = []
pointa_assigned = false
var activated = false
var drawing = false
var anim_frame = 0
var cursor_snap = 0
var anim_fps = 5

var cursor_img = new Image();
cursor_img.src = "../resources/images/cursor_icons.png";

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
        
        if (vector_snap() == false){
            pointa_assigned = true
            pointa.x = event.x
            pointa.y = event.y
        }
        else{
            

        }
        
    }
    else{
        drawing = false
        // past_lines.push([pointa.x, pointa.y, event.x, event.y])
        vector_snap()
        past_lines.push({vect_1x:pointa.x, vect_1y:pointa.y, vect_2x:mousex, vect_2y:mousey})
        // past_lines.push({vect_1x:pointa.x, vect_1y:pointa.y, vect_2x:mousex, vect_2y:mousey})
    }
    
});

cursor_img.addEventListener("load", () => { loop(); animation(); });