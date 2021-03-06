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
            let top_left = arr[i - arr_len - 1]
            let top = arr[i - arr_len]
            let top_right = arr[i - arr_len + 1]
            let left = arr[i - 1]
            let right = arr[i + 1]
            let bottom_left = arr[i + arr_len - 1]
            let bottom = arr[i + arr_len]
            let bottom_right = arr[i + arr_len + 1]

            let list = [top_left, top, top_right, left, right, bottom_left, bottom, bottom_right]

            adj.push(list)
        }
    }
    list = [arr, adj]
    return list
}

function cell_automata(arr, dissolve){

    matrix = []

    for (let i = 0; i < arr[0].length; i++){

        if (arr[1][i] != 0 || arr[1][i] != 0){

            var a = arr[1][i].join()
            console.log(arr[1][i])

            if (dissolve == true){

                if (arr[0][i] != 1){ // if the parent tile is not of lowest level(1) then change

                    var adj = []

                    var level = arr[0][i]
                    // console.log("level:",level)

                    for (let n = 0; n < 8; n++){
                        if (arr[1][i][n] < level){
                            adj.push(0)
                        }
                        else {
                            adj.push(1)
                        }
                    }
                    adj.join()

                    cell_list_dissolve = [
                        ["0,0,0,0,0,0,0,0", ],
                        ["0,0,0,0,0,1,1,1", ],
                        ["1,0,0,1,0,0,0,0", ],
                        ["0,0,0,0,0,1,1,0", ],
                        [",,,,,,,", ],
                        [",,,,,,,", ],
                        [",,,,,,,", ],
                        [",,,,,,,", ],
                        [",,,,,,,", ],
                    ]
                    var active = false
                    for (let m = 0; m < cell_list_dissolve.length; m++){
                    
                        if (adj == cell_list_dissolve[m][0]){
                            matrix.push(0)
                            console.log(arr)
                            active = true
                            height_matrix.push(turn[i]-1)
                        }
                    }
                    if (active == false){
                        matrix.push(0)
                        height_matrix.push(turn[i])
                    }
                }
                else{
                    matrix.push(1)
                    height_matrix.push(turn[i])
                }
            }
            else if (dissolve == false){
                // console.log("s")
                console.log(arr[0][i])
                if (arr[0][i] != 1){ // if the parent tile is not of lowest level(1) then change

                    // var adj = arr[1][i].join()
                    var adj = []

                    var level = arr[0][i]
                    // console.log("level:",level)

                    for (let n = 0; n < 8; n++){
                        if (arr[1][i][n] < level){
                            adj.push(0)
                        }
                        else {
                            adj.push(1)
                        }
                    }
                    adj.join()

                    var cell_list = [
                        // 3
                        ["1,1,0,1,0,0,0,0", 5],
                        ["0,1,1,0,1,0,0,0", 7],
                        ["0,0,0,0,1,0,1,1", 1],
                        ["0,0,0,1,0,1,1,0", 3],

                        // 4
                        ["1,1,1,1,0,0,0,0", 5],
                        ["1,1,1,0,1,0,0,0", 7],
                        ["0,1,1,0,1,0,0,1", 7],
                        ["0,0,1,0,1,0,1,1", 1],
                        ["0,0,0,0,1,1,1,1", 1],
                        ["0,0,0,1,0,1,1,1", 3],
                        ["1,0,0,1,0,1,1,0", 3],
                        ["1,1,0,1,0,1,0,0", 5],

                        // 5
                        ["0,0,0,0,0,1,1,1", 6],
                        ["1,1,1,0,1,0,0,1", 7],
                        ["0,1,1,0,1,0,1,1", 8],
                        ["0,0,1,0,1,1,1,1", 1],
                        ["0,0,0,1,1,1,1,1", 2],
                        ["1,0,0,1,0,1,1,1", 3],
                        ["1,1,0,1,0,1,1,0", 4],
                        ["1,1,1,1,0,1,0,0", 5],

                        ["1,1,1,0,1,1,0,1", ],
                        ["1,0,1,0,1,1,1,1", ],
                        ["1,0,1,1,0,1,1,1", ],
                        ["1,1,1,1,0,1,0,1", ],

                        // 6
                        ["1,1,1,1,1,1,0,0", 6],
                        ["1,1,1,1,1,0,0,1", 6],
                        ["1,1,1,0,1,0,1,1", 8],
                        ["0,1,1,0,1,1,1,1", 8],
                        ["0,0,1,1,1,1,1,1", 2],
                        ["1,0,0,1,1,1,1,1", 2],
                        ["1,1,0,1,0,1,1,1", 4],
                        ["1,1,1,1,0,1,1,0", 4],

                        // 7
                        ["1,1,1,1,1,1,1,0", 9],
                        ["1,1,1,1,1,1,0,1", 6],
                        ["1,1,1,1,1,0,1,1", 10],
                        ["1,1,1,0,1,1,1,1", 8],
                        ["0,1,1,1,1,1,1,1", 11],
                        ["1,0,1,1,1,1,1,1", 2],
                        ["1,1,0,1,1,1,1,1", 12],
                        ["1,1,1,1,0,1,1,1", 4],

                        // 8
                        ["1,1,1,1,1,1,1,1", 0],

                        [",,,,,,,", ],
                    ]
                    var active = false
                    for (let m = 0; m < cell_list.length; m++){
                    
                        if (adj == cell_list[m][0]){
                            matrix.push(cell_list[m][1])
                            active = true
                        }
                    }
                    if (active == false){
                        matrix.push(arr[0][i])
                    }

                    // matrix.push(arr[0][i])
                }
                else{
                    matrix.push(1)
                }
            }
        }
        else{
            matrix.push(arr[0][i])
            height_matrix.push(turn[i])
        }
    }
    return matrix
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

var turn = [ // 1 = low, 2-10 = med, 11-19 = high
    1,1,1,1,1,3,
    3,1,1,2,1,2,
    1,1,2,3,2,1,
    3,2,3,3,2,2,
    1,2,3,3,3,2,
    2,2,2,2,2,2,
]
var height_matrix = []
var matrix = find_adjacent(turn)
console.log("m",matrix)
matrix = cell_automata(matrix, true)
matrix = find_adjacent(matrix)
console.log("mm",matrix)
matrix = cell_automata(matrix, false)
// console.log("mm",matrix)
// matrix = matrix[0]

var columns = rows = len = Math.sqrt(matrix.length);

// turn = rotate_left(turn)
// turn = rotate_left(turn)
// turn = rotate_right(turn)
// turn = rotate_right(turn)

var player = new Player(100,100);
var viewport = new Viewport(0, 0, width, height)
var pointer = { x:-50, y:-50 }

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
    var root = Math.sqrt(matrix.length)
    if (x_max > root){
        x_max = root
    }
    if (y_max > root){
        y_max = root
    }

    for (let y = y_min; y < y_max; y++) {

        for (let x = x_min; x < x_max; x++) {
            // console.log(turn[y * columns + x],turn2[0][y * columns + x])
            let value = matrix[y * columns + x];
            let height_level = height_matrix[y * columns + x]
            // console.log(turn, height_matrix)
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

            if (height_level == 1){
                tile_y += 16
            }
            else if (height_level == 2){
                tile_y += 8
            }


            // ctx.drawImage(tile_sheet,  value * sprite_size, 0, sprite_sizex, sprite_sizey, tile_x, tile_y, scaled_size, scaled_size * 6)
            ctx.drawImage(tile_sheet, value * sprite_size, (height_level - 1) * 20, sprite_sizex, sprite_sizey, tile_x, tile_y, scaled_sizex, scaled_sizey)
            // console.log("x,y:",tile_x, tile_y)
        }
    }
    // console.log(matrix)

    // ctx.drawImage(tile_sheet, 6*16, 0, 16, 96, 350, -100, 160, 960)
    // ctx.drawImage(tile_sheet, 1*16, 0, 16, 20, 350, 100, 160, 200)
    // ctx.drawImage(tile_sheet, 3*16, 2*20, 16, 20, 350, 230, 160, 200)
    // console.log("f")
    player.moveTo(pointer.x, pointer.y)
    ctx.drawImage(tile_player, 0, 0, 23, 21, player.x, player.y, 23*1.5, 21*1.5)
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
var tile_player = new Image();

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
// tile_sheet.src = "../resources/images/testmodule_min.png";
tile_sheet.src = "../resources/images/testm3_min.png";
tile_numbers.src = "../resources/images/numtile.png";
tile_player.src = "../resources/images/player.png";