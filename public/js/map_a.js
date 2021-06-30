// FUNCTIONS

// used by the rotate functions
function split_3(arr) {
    var chunks = [], i = 0, len = Math.sqrt(arr.length);

        while (i < arr.length) {
            chunks.push(arr.slice(i, i += len));
        }
    return chunks;
}
function rotate_right (arr) {
    var pairs = split_3(arr);
    len = Math.sqrt(arr.length), arr = [];

    for (let y = 0; y < len; y++) {

        for (let x = len-1; x > -1; x--) {
            arr.push(pairs[x][y])
        }
    }
    return arr
}
function rotate_left (arr) {
    var pairs = split_3(arr);
    len = Math.sqrt(arr.length), arr = [];

    for (let y = len-1; y > -1; y--) {

        for (let x = 0; x < len; x++) {
            arr.push(pairs[x][y])
        }
    }
    return arr
}

function find_adjacent(arr){

    var adj = []
    // console.log(arr)

    for (let i = 0, edge = 0; i < arr.length; i++, edge++){

        let arr_len = Math.sqrt(arr.length)

        // horizontal edges
        if (edge == arr_len - 1){
            // console.log("right",i,arr[i])
            adj.push(0)
        }
        else if (edge == arr_len){
            // console.log("left",i,arr[i])
            adj.push(0)
            edge = 0
        }
        // vertical edges
        else if (i < arr_len){
            // console.log("top")
            adj.push(0)
        }
        else if (i > arr.length - arr_len-1){
            // console.log("bottom")
            adj.push(0)
        }
        // area
        else {
            let top = arr[i - arr_len]
            let left = arr[i - 1]
            let right = arr[i + 1]
            let bottom = arr[i + arr_len]
            let list = [top,left,right,bottom]

            adj.push(list)
        }
    }
    list = [arr, adj]
    return list
}

var ctx = document.querySelector("canvas").getContext("2d");

// max window width and height
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

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

const Viewport = function(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
}

const sprite_size = 16;
const sprite_sizex = 16;
const sprite_sizey = 20;
const scale_factor = 2
const scaled_sizex = scale_factor*sprite_sizex; //2.4
const scaled_sizey = scale_factor*sprite_sizey; //2.4
// const columns = rows = 300;

// TEST MODULE 1
var turn = []
for( var i=0; i < 20**2; i++){
    turn.push(Math.ceil(Math.random() * 9))
}
// var turn = [2,3,4,5,4,7,6,8,5,8,3,2,6,4,9,1]
// var turn = [1,2,3,4,5,6,7,8,9]
// var turn = [1,2,3,4,5,6,7,8,9].reverse()
// var turn = [1,2,3,4,5,6,7,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,2,3,4,5,6,7,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7]

var turn = [1,3,3,4,5,6,7,8,9]

// TEST MODULE 2
var turn = [1,2,3,4,5,5,5,5,5]
var turn = [3,3,3,3,3,5,5,5,5,5,2,2,2,2,2,4,4,4,4,4,1,1,1,1,1]

// TEST MODULE 3
var turn = [1,2,3,4,5,6,7,8,9,10,11,11,11,11,11,11]
var turn = [ // 1 = low, 2-6 = med, 7-11 = high
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 5, 5, 5, 5, 5, 5, 5, 6, 1,
    1, 4, 2, 2, 2, 2, 2, 2, 6, 1,
    1, 4, 2,10,10,10,11, 2, 6, 1,
    1, 4, 2, 9, 7, 7,11, 2, 6, 1,
    1, 4, 2, 9, 7, 7,11, 2, 6, 1,
    1, 4, 2, 9, 8, 8, 8, 2, 6, 1,
    1, 4, 2, 2, 2, 2, 2, 2, 6, 1,
    1, 4, 3, 3, 3, 3, 3, 3, 3, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
]

// TEST MODULE 4
var turn = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,19,19,19,19,19,19]
// var turn = [ // 1 = low, 2-10 = med, 11-19 = high
//     1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     1, 6, 7, 7, 7, 7, 7, 7, 8, 1,
//     1, 5, 2, 2, 2, 2, 2, 2, 9, 1,
//     1, 5, 2,15,16,16,17, 2, 9, 1,
//     1, 5, 2,14,11,11,18, 2, 9, 1,
//     1, 5, 2,14,11,11,18, 2, 9, 1,
//     1, 5, 2,13,12,12,19, 2, 9, 1,
//     1, 5, 2, 2, 2, 2, 2, 2, 9, 1,
//     1, 4, 3, 3, 3, 3, 3, 3,10, 1,
//     1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
// ]
var turn = [ // 1 = low, 2-10 = med, 11-19 = high
    1,1,1,1,1,3,
    3,1,2,2,1,2,
    1,1,2,3,2,1,
    3,2,3,3,2,2,
    1,2,3,3,3,2,
    2,2,2,2,2,2,
]

matrix = find_adjacent(turn)

var columns = rows = len = Math.sqrt(matrix[0].length);

// turn = rotate_left(turn)
// turn = rotate_left(turn)
// turn = rotate_right(turn)
// turn = rotate_right(turn)

var player = new Player(100,100);
var viewport = new Viewport(0, 0, width, height)
var pointer = { x:0, y:0 }

function loop() {

    console.log("LOOP START======================================================================================================")
    // viewport.x ++;
    window.requestAnimationFrame(loop);

    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;

    ctx.canvas.height = height;
    ctx.canvas.width = width;

    ctx.imageSmoothingEnabled = false;

    var x_min = Math.floor(viewport.x / scaled_sizex);
    var y_min = Math.floor(viewport.y / scaled_sizey);
    var x_max = Math.ceil((viewport.x + viewport.w) / scaled_sizex);
    var y_max = Math.ceil((viewport.y + viewport.h) / scaled_sizey);

    // for (let y = 0; y < rows; y++) {

    //     for (let x = 0; x < columns; x++) {

    //         let value = terrain[y * columns + x];
            
    //         let tile_x = x * scaled_size;
    //         let tile_y = y * scaled_size;
            
    //         ctx.drawImage(tile_sheet, value * sprite_size, 0, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size)
    //     }
    // }

    // ctx.drawImage(tile_sheet, 16*4, 16, 1, 1, 0, 0, width, height)
    var root = Math.sqrt(matrix[0].length)
    if (x_max > root){
        x_max = root
    }
    if (y_max > root){
        y_max = root
    }

    for (let y = y_min; y < y_max; y++) {

        for (let x = x_min; x < x_max; x++) {
            // console.log(turn[y * columns + x],turn2[0][y * columns + x])
            let value = matrix[0][y * columns + x];
            // console.log("x,y,value:",x,y,value)
            // console.log("x_min,x_max,y_min,y_max",x_min,x_max,y_min,y_max)
            let tile_x = x * scaled_sizex - viewport.x;
            let tile_y = y * scaled_sizex - viewport.y;
            


            // if (value == 2){
            //     tile_y += 8
            // }
            // else if (value == 4){
            //     tile_y += 8
            // }
            // else if (value == 1){
            //     tile_y += 16
            // }

            // if (value == 1){
            //     tile_y += 16
            // }
            // else if (value <= 6){
            //     tile_y += 8
            // }

            // if (value == 1){
            //     tile_y += 16
            // }
            // else if (value <= 10){
            //     tile_y += 8
            // }



            // ctx.drawImage(tile_sheet,  value * sprite_size, 0, sprite_sizex, sprite_sizey, tile_x, tile_y, scaled_size, scaled_size * 6)
            ctx.drawImage(tile_sheet, value * sprite_size, 0, sprite_sizex, sprite_sizey, tile_x, tile_y, scaled_sizex, scaled_sizey)
            // console.log("x,y:",tile_x, tile_y)
        }
    }

    // ctx.drawImage(tile_sheet, 6*16, 0, 16, 96, 350, -100, 160, 960)
    // ctx.drawImage(tile_sheet, 1*16, 0, 16, 20, 350, 100, 160, 200)
    // ctx.drawImage(tile_sheet, 3*16, 2*20, 16, 20, 350, 230, 160, 200)
    // console.log("f")
    player.moveTo(pointer.x, pointer.y)
    ctx.drawImage(tile_numbers, sprite_size, 0, sprite_sizex, sprite_sizey, player.x, player.y, scaled_sizex, scaled_sizey)
    // ctx.rect(scaled_sizex * 0, scaled_sizey * 0, 16, 20);
    ctx.rect(640, scaled_sizey * 0, 16, 20);
    ctx.fillStyle = "grey";
    ctx.fill();
    // ctx.strokeStyle = "#ffffff";
    // ctx.rect(width * 0.5 - viewport.w * 0.5, height * 0.5 - viewport.h * 0.5, viewport.w, viewport.h);
    // ctx.stroke();
}

var tile_sheet = new Image();
var tile_numbers = new Image();

tile_sheet.addEventListener("load", () => { loop(); });
ctx.canvas.addEventListener("click", (event) => {

    pointer.x = event.pageX
    pointer.y = event.pageY
    // console.log(pointer.x,pointer.y)
});
// ctx.canvas.addEventListener("click", (event) => { loop(); });

// console.log(map)
// console.log(map[5])

// tile_sheet.src = "../resources/images/turn.png";
// tile_sheet.src = "../resources/images/tile-scroll-.png";
tile_sheet.src = "../resources/images/testmodule4.png";
tile_numbers.src = "../resources/images/numtile.png";