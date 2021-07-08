//#region Functions

function loop() {

    // console.log("LOOP START===============================================================")
    
    // max window width and height
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    ctx.canvas.height = height;
    ctx.canvas.width = width;
    ctx.imageSmoothingEnabled = false;
    
    // loops the func every half second
    let secs = 0.1
    setTimeout(() => { window.requestAnimationFrame(loop); }, secs*1000);
    
    // ctx.drawImage(tile_min, 0, 0, sprite_sizex, sprite_sizey, 112, 112, scaled_sizex, scaled_sizey)

    player.moveTo(pointer.x, pointer.y)
    ctx.drawImage(tile_min, sprite_size, 0, sprite_sizex, sprite_sizey, player.x, player.y, scaled_sizex, scaled_sizey)
    if (is_rendering == true){

        // console.log(matrix)
        
        for (let rend = 0; rend < matrix.x.length;rend++){
            posx = matrix.x[rend]
            posy = matrix.y[rend]
            ctx.drawImage(tile_min, sprite_size, 0, sprite_sizex, sprite_sizey, posx, posy, scaled_sizex, scaled_sizey)
        }
        // setTimeout(() => { is_rendering = false }, 3000);
    }

    cooldown -= 1
    if (keypress == "D" && cooldown > 0){
        
    }
    ctx.strokeStyle = "#ffffff";
    ctx.rect(112, 112, 512, 512);
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
        this.x = x - scaled_sizex * 0.5;
        this.y = y - scaled_sizey * 0.5;
    }
}
var player = new Player(100,100);
var pointer = { x:0, y:0 }

const matrix = {
    x:[],
    y:[]
};

// sprite load
var tile_min = new Image();
tile_min.src = "../resources/images/min_blank.png";

//#endregion Set up end

//#region Procedural
//#endregion Procedural end

tile_min.addEventListener("load", () => { loop(); });
ctx.canvas.addEventListener("click", function posclick() {

    let stepx = 32
    let stepy = 32
    pointer.x = Math.round(event.pageX/stepx)*stepx
    pointer.y = Math.round(event.pageY/stepy)*stepy
    
    matrix.x.push(pointer.x - scaled_sizex * 0.5)
    matrix.y.push(pointer.y - scaled_sizex * 0.5)
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
    matrix.x = pull.x; matrix.y = pull.y
});

document.addEventListener('keydown', function logKey(keydata) {
    // console.log(keydata.code)
    keypress = keydata.code.slice(-1)
    cooldown += 10
    // console.log(keypress)
});