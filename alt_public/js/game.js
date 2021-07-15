// this game is a mining tycoon merge game
// modules are made in the source forge
// modules can only navigate by moving to an adjacent empty space

//#region Functions

function loop() {
    
    console.log("LOOP START===============================================================================================================================================")
    
    // max window width and height
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    ctx.canvas.height = height;
    ctx.canvas.width = width;
    ctx.imageSmoothingEnabled = false;
    
    // loops the func every half second
    setTimeout(() => { window.requestAnimationFrame(loop); }, 10);

    var dia = false
    for (let y = 0; y < rows; y++) {

        if (dia == true){
            dia = false

            for (let x = 0; x < columns-1; x++) {

                // let value = matrix[0][y * columns + x];
                // let height_level = map.height[y * columns + x];
                // // console.log(map)
                let tile_type = map.line1[y * columns + x];

                let tile_x = x * scaled_sizex;
                // let tile_y = y * scaled_sizey/1.35;
                let tile_y = y * scaled_sizey/4;

                // tile_type = 2
                // console.log(tile_type)

                // tile_y -= (tile_type)*(scaled_sizey/4)

                ctx.drawImage(tiles, tile_type  * sprite_sizex, 0, sprite_sizex, sprite_sizey, tile_x + scaled_sizex/2 + 100, tile_y + 100, scaled_sizex, scaled_sizey)
            }
        } else {
            dia = true
        
            for (let x = 0; x < columns; x++) {

                // let value = matrix[0][y * columns + x];
                // let height_level = map.height[y * columns + x];
                // // console.log(map)
                let tile_type = map.line1[y * columns + x];

                let tile_x = x * scaled_sizex;
                // let tile_y = y * scaled_sizey/1.35;
                let tile_y = y * scaled_sizey/4;

                // tile_type = 2
                // console.log(tile_type)

                // tile_y -= (tile_type)*(scaled_sizey/4)

                ctx.drawImage(tiles, tile_type  * sprite_sizex, 0, sprite_sizex, sprite_sizey, tile_x + 100, tile_y + 100, scaled_sizex, scaled_sizey)
            }
        }
    }

    // ctx.drawImage(tiles, 0, 0, sprite_sizex, sprite_sizey, 0, 0, scaled_sizex, scaled_sizey)
            
}

//#endregion Functions end

//#region Set up

// INPUT CHANGE
var scale_factor = 0.1
var columns = 10
var rows = -1 + (Math.round(columns*2.8)%2) + Math.round(columns*2.8)
console.log(rows)
// rows = 9
// NON-INPUT
const sprite_sizex = 554;
const sprite_sizey = 640;
const scaled_sizex = scale_factor*sprite_sizex; //2.4
const scaled_sizey = scale_factor*sprite_sizey; //2.4

// max window width and height
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = height;
ctx.canvas.width = width;

const map = {
    // line1: [
    //     0,0,
    //     1,-1,
    //     0,0,
    //     1,-1,
    //     0,0,
    //     1,-1,
    //     0,0,
    // ],
    // line1: [
    //     0,0,0,
    //     1,1,-1,
    //     0,0,0,
    //     1,1,-1,
    //     0,0,0,
    //     1,1,-1,
    //     0,0,0,
    // ],
    // line1: [
    //     0,0,0,0,
    //     1,1,1,-1,
    //     0,0,0,0,
    //     1,1,1,-1,
    //     0,0,0,0,
    //     1,1,1,-1,
    //     0,0,0,0,
    //     1,1,1,-1,
    //     0,0,0,0,
    // ],
    line10: [
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,-1,
    ],

    line2: [
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,2,1,-1,
        0,0,0,0,0,0,0,2,2,0,
         1,1,1,1,1,1,1,2,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
        0,0,0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1,1,-1,
    ],

    line1: [
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,1,1,0,   -1,
        0,0,0,0,0,0,1,2,1,0,
         0,0,0,0,0,0,1,1,0,   -1,
        0,0,0,0,0,0,1,2,1,0,
         0,0,0,0,0,0,1,1,0,   -1,
        0,0,0,0,0,0,0,1,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,
        0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,   -1,

    ],
    tile_type: [
        0,1,0,1,0,
        1,0,1,0,1,
        0,1,0,1,0,
        1,0,1,0,1,
        0,1,0,1,0,
    ]
}

// sprite load
var tiles = new Image();
tiles.src = "../resources/images/tiles.png";

//#endregion Set up end

//#region Procedural







tiles.addEventListener("load", () => { loop(); });

//#endregion Procedural end