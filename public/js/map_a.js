// FUNCTIONS

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

var context = document.querySelector("canvas").getContext("2d");

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

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



var terrain = go(15); 
var temperature = go(5.5)
var rainfall = go(11)
var sprite_size = 16;
var sprite_sizex = 16;
var sprite_sizey = 20;
var scaled_sizex = 5*sprite_sizex; //2.4
var scaled_sizey = 5*sprite_sizey; //2.4
// var columns = rows = 300;
// var turn = [2,3,4,5,4,7,6,8,5,8,3,2,6,4,9,1]
var turn = [1,2,3,4,5,6,7,8,9]
// var turn = [1,2,3,4,5,6,7,8,9].reverse()
// var turn = [1,2,3,4,5,6,7,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,2,3,4,5,6,7,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7]
var columns = rows = len = Math.sqrt(turn.length);

// turn = rotate_left(turn)
// turn = rotate_left(turn)
// turn = rotate_right(turn)
// turn = rotate_right(turn)

var player = new Player(100,100);
var viewport = new Viewport(0, 0, width, height)
var pointer = { x:0, y:0 }

function loop() {

    console.log("LOOP START")
    // viewport.x ++;
    window.requestAnimationFrame(loop);

    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;

    context.canvas.height = height;
    context.canvas.width = width;

    context.imageSmoothingEnabled = false;

    var x_min = Math.floor(viewport.x / scaled_sizex);
    var y_min = Math.floor(viewport.y / scaled_sizey);
    var x_max = Math.ceil((viewport.x + viewport.w) / scaled_sizex);
    var y_max = Math.ceil((viewport.y + viewport.h) / scaled_sizey);

    // for (let y = 0; y < rows; y++) {

    //     for (let x = 0; x < columns; x++) {

    //         let value = terrain[y * columns + x];
            
    //         let tile_x = x * scaled_size;
    //         let tile_y = y * scaled_size;
            
    //         context.drawImage(tile_sheet, value * sprite_size, 0, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size)
    //     }
    // }

    // context.drawImage(tile_sheet, 16*4, 16, 1, 1, 0, 0, width, height)

    for (let y = y_min; y < y_max; y++) {

        for (let x = x_min; x < x_max; x++) {

            let value = turn[y * columns + x];
            
            let tile_x = x * scaled_sizex - viewport.x + width * 0.5 - viewport.w * 0.5;
            let tile_y = y * scaled_sizey - viewport.y + height * 0.5 - viewport.h * 0.5;
            
            // context.drawImage(tile_sheet,  value * sprite_size, 0, sprite_sizex, sprite_sizey, tile_x, tile_y, scaled_size, scaled_size * 6)
            context.drawImage(tile_sheet,  value * sprite_size, 0, sprite_sizex, sprite_sizey, tile_x, tile_y, scaled_sizex, scaled_sizey)
            console.log(tile_x, tile_y)
        }
    }

    // context.drawImage(tile_sheet, 6*16, 0, 16, 96, 350, -100, 160, 960)
    // context.drawImage(tile_sheet, 1*16, 0, 16, 20, 350, 100, 160, 200)
    // context.drawImage(tile_sheet, 3*16, 2*20, 16, 20, 350, 230, 160, 200)
    // console.log("f")
    player.moveTo(pointer.x, pointer.y)
    context.drawImage(tile_numbers, sprite_size, 0, sprite_sizex, sprite_sizey, player.x, player.y, scaled_sizex, scaled_sizey)
    context.strokeStyle = "#ffffff";
    context.rect(width * 0.5 - viewport.w * 0.5, height * 0.5 - viewport.h * 0.5, viewport.w, viewport.h);
    context.stroke();
}

var tile_sheet = new Image();
var tile_numbers = new Image();

tile_sheet.addEventListener("load", (event) => { loop(); });
context.canvas.addEventListener("click", (event) => {

    pointer.x = event.pageX
    pointer.y = event.pageY
    // console.log(pointer.x,pointer.y)
});
// context.canvas.addEventListener("click", (event) => { loop(); });

// console.log(map)
// console.log(map[5])

// tile_sheet.src = "../resources/images/turn.png";
// tile_sheet.src = "../resources/images/tile-scroll-.png";
tile_sheet.src = "../resources/images/testmodule1.png";
tile_numbers.src = "../resources/images/numtile.png";