//#region Functions

function loop() {

    console.log("LOOP START===============================================================")
    
    // max window width and height
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    ctx.canvas.height = height;
    ctx.canvas.width = width;
    ctx.imageSmoothingEnabled = false;
    
    // loops the func every half second
    let secs = 0.1 //0.1
    setTimeout(() => { window.requestAnimationFrame(loop); }, secs*1000);

    ctx.rect(pointa, pointa, pointb, pointb);
    ctx.fillStyle = "#9d978b";
    ctx.fill();
    
    // ctx.drawImage(tile_min, 0, 0, sprite_sizex, sprite_sizey, 112, 112, scaled_sizex, scaled_sizey)

    player.moveTo(pointer.x, pointer.y)
    ctx.drawImage(tile_min, sprite_size, 0, sprite_sizex, sprite_sizey, player.x, player.y, scaled_sizex/3, scaled_sizey/3)
    if (is_rendering == true){

        // console.log(matrix)
        
        for (let rend = 0; rend < matrix.x.length;rend++){
            posx = matrix.x[rend]
            posy = matrix.y[rend]
            posz = matrix.z[rend]
            if (posz == 1){
                posy -= 8
            }
            if (posz == 2){
                posy -= 16
            }
            ctx.drawImage(tile_min, 0, posz*20, sprite_sizex, sprite_sizey, posx, posy, scaled_sizex, scaled_sizey)
        }
        // setTimeout(() => { is_rendering = false }, 3000);
    }

    ctx.strokeStyle = "#ffffff";
    ctx.rect(pointa, pointa, pointb, pointb);
    ctx.stroke();

}

//#endregion Functions end

//#region Set up

const sprite_size = 16;
const sprite_sizex = 16;
const sprite_sizey = 16;
const scale_factor = 2
const scaled_sizex = scale_factor*sprite_sizex; //2.4
const scaled_sizey = scale_factor*sprite_sizey; //2.4

var pointa = 112
var units_wide = 16
var pointb = 112 + 32 * (units_wide - 3.5)

var is_rendering = false
var keypress = null
var cooldown = 0
// max window width and height
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = height;
ctx.canvas.width = width;

// player class
const Player = function (x,y){
    this.x = x;this.y = y;
};

Player.prototype = {
    moveTo:function(x, y){
        this.x = x - scaled_sizex * 0.17;
        this.y = y - scaled_sizey * 0.17;
    }
}
var player = new Player(100,100);
var pointer = { x:0, y:0 }

const matrix = {
    x:[],
    y:[],
    z:[],
};

// sprite load
var tile_min = new Image();
tile_min.src = "../resources/images/min_blank.png";

for (let y = 112; y < units_wide*32 + 112; y += 32){
    for (let x = 112; x < units_wide*32 + 112; x += 32){
        // console.log(iter)
        // iter += pointb/(units_wide - 3.5)
        console.log(x)
        ctx.drawImage(tile_min, sprite_size, 0, sprite_sizex, sprite_sizey, x, y, scaled_sizex, scaled_sizey)
        matrix.x.push(x)
        matrix.y.push(y)
        matrix.z.push(0)
    }
}

//#endregion Set up end

//#region Procedural
//#endregion Procedural end

tile_min.addEventListener("load", () => { loop(); });
ctx.canvas.addEventListener("click", function posclick() {

    let stepx = 32
    let stepy = 32
    pointer.x = Math.round(event.pageX/stepx)*stepx
    pointer.y = Math.round(event.pageY/stepy)*stepy
    
    // matrix.x.push(pointer.x - scaled_sizex * 0.5)
    // matrix.y.push(pointer.y - scaled_sizex * 0.5)
    for (let i = 0; i < matrix.x.length; i++){
        if (pointer.y - scaled_sizex * 0.5 == matrix.y[i]){
            if (pointer.x - scaled_sizex * 0.5 == matrix.x[i]){
                console.log("MATCH")
                // matrix.x[i] = null
                // matrix.y[i] = null
                if (matrix.z[i] < 2){
                    matrix.z[i] = matrix.z[i] + 1
                }
                else{
                    matrix.z[i] = 0
                }
            }
        }
    }
    // console.log(matrix)
});

let but_rend = document.getElementById("but_rend");
let but_clear = document.getElementById("but_clear");
let but_save = document.getElementById("but_save");
let but_load = document.getElementById("but_load");

but_rend.addEventListener("click", function render(){is_rendering = true});

but_clear.addEventListener("click", function clear(){is_rendering = false});

but_save.addEventListener("click", function save() {
    localStorage.setItem('matrix', JSON.stringify(matrix)); //stringify object and store
    // var pull = JSON.parse(localStorage.getItem('matrix')); //retrieve the object
    // console.log(pull)
});

but_load.addEventListener("click", function load() {
    // localStorage.setItem('matrix', JSON.stringify(matrix)); //stringify object and store
    var pull = JSON.parse(localStorage.getItem('matrix')); //retrieve the object
    console.log(pull)
    matrix.x = pull.x; matrix.y = pull.y; matrix.z = pull.z;
});

document.addEventListener('keydown', function logKey(keydata) {
    // console.log(keydata.code)
    keypress = keydata.code.slice(-1)
    cooldown += 10
    // console.log(keypress)
});