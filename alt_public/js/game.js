// this game is a mining tycoon merge game
// modules are made in the source forge
// modules can only navigate by moving to an adjacent empty space

//#region Functions

function loop() {
    
    // console.log("LOOP START===============================================================================================================================================")
    
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

                tile_y -= (tile_type)*(scaled_sizey/4)

                m = .578
                if (y * columns + x == 113){
                    // tile_y = 1000
                    // offset = 32*i +7 - 64
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 0.5
                    m = .578
                    ctx.beginPath();
                    ctx.moveTo(tile_x + scaled_sizex/2 + total_offset, tile_y - scaled_sizey/4 + total_offset);
                    ctx.lineTo(tile_x + scaled_sizex + total_offset, tile_y + total_offset);
                    ctx.stroke();
                }
                yplot = m*mousex + 25 + (y-4)*32
                if (mousey > yplot){
                    // tile_y += 30
                    console.log(tile_y)
                }

                if (mousex > tile_x + scaled_sizex/2 + total_offset && mousex < tile_x + scaled_sizex/2 + total_offset+55
                    && mousey > tile_y + total_offset && mousey < tile_y + total_offset+30){
                    tile_y -= 30
                }

                ctx.drawImage(tiles, tile_type  * sprite_sizex, 0, sprite_sizex, sprite_sizey, tile_x + scaled_sizex/2 + total_offset, tile_y + total_offset, scaled_sizex, scaled_sizey)
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

                tile_y -= (tile_type)*(scaled_sizey/4)

                // if (mousex > tile_x + scaled_sizex/2 + 70 && mousex < tile_x + scaled_sizex/2 + 125
                //     && mousey > tile_y + 100 && mousey < tile_y + 130){
                //     tile_y -= 10
                // }
                

                ctx.drawImage(tiles, tile_type  * sprite_sizex, 0, sprite_sizex, sprite_sizey, tile_x + total_offset, tile_y + total_offset, scaled_sizex, scaled_sizey)
                ctx.drawImage(tiles, tile_type  * sprite_sizex, 0, sprite_sizex, sprite_sizey, tile_x + 599, tile_y + 516, scaled_sizex, scaled_sizey)
            }
        }
    }

    // ctx.drawImage(tiles, 0, 0, sprite_sizex, sprite_sizey, 0, 0, scaled_sizex, scaled_sizey)
    
    for (let i = 0; i < 11; i++){
        offset = 32*i +7 - 64
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 0.5
        m = .578
        ctx.beginPath();
        x = 100
        y = m*x
        ctx.moveTo(0, - offset);
        // console.log("1",x,y)
        x = 1000
        y = m*x
        ctx.lineTo(x, y - offset);
        // console.log("2",x,y)
        ctx.stroke();
    }

    

            
}

//#endregion Functions end

//#region Set up

// INPUT CHANGE
var scale_factor = 0.1
var columns = 10
var rows = -1 + (Math.round(columns*2.8)%2) + Math.round(columns*2.8)
var total_offset = 100
console.log(rows)
// rows = 9
// NON-INPUT
const sprite_sizex = 554;
const sprite_sizey = 640;
const scaled_sizex = scale_factor*sprite_sizex; //2.4
const scaled_sizey = scale_factor*sprite_sizey; //2.4

var mousex = -10
var mousey = -10

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





ctx.canvas.addEventListener("mousemove", (event) => {
    mousex = event.x
    mousey = event.y
    // console.log(mousex, mousey)
});

tiles.addEventListener("load", () => { loop(); });

//#endregion Procedural end