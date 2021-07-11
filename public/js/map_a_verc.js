//#region Functions

function draw() {
    // const canvas = document.querySelector('#canvas');

    // if (!canvas.getContext) {
    //     return;
    // }
    // const ctx = canvas.getContext('2d');

    // set line stroke and line width
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.5;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(width/2, height/2);
    ctx.lineTo(mousex, mousey);
    ctx.stroke();

}

function go(RES, volume){
    perlin.seed()

    var arr = []
    // const RES = 15;

    // const SIZE = 300;
    const SIZE = volume;
    var HIG = WID = SIZE;
  
    var count = 0;
    for (let y = 0; y < RES; y += RES / HIG){
        
        for (var x = 0; x < RES; x += RES / WID){
            let color_val = parseInt(perlin.get(x, y) * 250);
            count ++;

            // arr.push(   Math.round( (color_val+250)/25 )   )
            arr.push(   Math.round( (color_val+20*pull)/25 )   )
        }
        // console.log(x)
    }
    // console.log(count)
    // document.getElementById("text_container").innerHTML = arr;

    // for (let i = 0; i < arr.length; i++) {
    //     // console.log(i);
    //     let temp = arr[i];
    //     arr[i] = [[temp, 27]];
    // }
    // console.log("qq")
    // console.log(arr)
    // console.log(arr.length)
    // console.log("fffff")

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
    return [arr, adj]
}

function cell_borders(arr){
    for (let i = 0; i < arr[0].length; i++){
        if (arr[1][i] != 0 || arr[1][i] != 0){
            // console.log(arr[0][i])
            map.height.push(arr[0][i])
        }
        else{
            map.height.push(1)
        }
    }
    return map.height
}

function dissolve_gen(){
    // console.log("proc.js")
    const length = 8
    var proc = []
    var arr = []
    // console.log(typeof arr)
    // console.log(" arr", arr)

    for (let loop = 0; loop < 3; loop++){
        proc = []

        for (let li = 0; li < loop; li++){ proc.push(1) }
        for (let li = 0; li < length - loop; li++){ proc.push(0) }

        for (let i = 0; i < length; i++){

            // console.log("proc", proc)
            // console.log(" arr", arr)
            
            arr.push(proc.join())
            // arr.push([...proc])
            // console.log(" arr", arr)
            // console.log(typeof arr)

            if (proc[i] == 0){
                // arr.push(0)
            }
            else if (proc[i] == 1){
                // arr.push(1)
                if (proc[i+1] == 0){
                    proc[i+1] = 1
                    proc[i] = 0
                }
                else if (proc[i+1] == 1){
                    proc[i+2] = 1
                    proc[i+1] = 0
                    i += 1
                }
                if (i == proc.length-1 && loop > 1){
                    // console.log("---")
                    for (let loo = proc.length-2; loo >= 0; loo--){
                        // console.log(loo)
                        if (proc[loo] == 1){
                            proc[loo+1] = 1
                            proc[loo] = 0

                            proc[loo+2] = 1
                            if (loo == proc.length-3){
                                proc[i] = 1
                            }
                            else{
                                proc[i] = 0
                            }
                            
                            // console.log("   2",proc)

                            i = 0
                            break
                        }
                        // console.log("   2",proc)
                    }
                }
            }
        }
    }
    arr = [...new Set(arr)]
    // console.log(arr)
    return arr
    // return []
}

function cell_dissolve(arr){
    // flatten border
    
    // arr[0] = map.height
    map.height = []

    // dissolve
    for (let i = 0; i < arr[0].length; i++){
        if ((arr[1][i] != 0 || arr[1][i] != 0) && arr[0][i] != 1){ // if the parent tile is not of lowest level(1) or a border tile then change
            // console.log(arr[0][i])
            // map.height.push(arr[0][i])
            
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

            cell_list_dissolve = dissolve_gen()
            other = [
                // 3
                "1,1,1,0,0,0,0,0",
                "0,0,1,0,1,0,0,1",
                "0,0,0,0,0,1,1,1",
                "1,0,0,1,0,1,0,0",
                "0,0,0,1,1,1,0,0",
                "0,0,1,1,1,0,0,0",
                "1,0,0,1,1,0,0,0",
                "0,1,0,0,0,1,1,0",
                "1,1,0,0,0,0,1,0",
                "0,1,1,0,0,0,1,0",
                "0,0,1,0,0,1,1,0",
                "1,1,0,0,0,0,0,1",

                // 4
                "0,1,1,1,0,1,0,0",
                "1,0,1,1,1,0,0,0",
                "0,1,1,0,0,0,1,1",
                "1,1,0,0,0,1,1,0",
                "0,0,0,1,1,1,0,1",
                "1,0,0,0,1,0,1,1",
                "1,0,0,1,0,1,0,1",
                "1,0,1,1,0,1,0,0",
                "1,1,0,0,1,0,0,1",

                // 5
                "1,0,1,1,1,1,0,0",
                "1,1,0,1,1,0,0,1",
                "1,1,0,0,0,1,1,1",
                "1,0,0,1,1,1,0,1",
                "0,0,1,1,1,1,1,0",
                "0,1,1,1,0,1,1,0",
                "0,1,1,0,0,1,1,1",
                "1,1,0,0,1,0,1,1",
                "1,1,1,0,0,0,1,1",

                // 6
                "1,1,1,1,0,0,1,1",
                
                
            ]
            cell_list_dissolve.push(...other)


            var active = false
            for (let m = 0; m < cell_list_dissolve.length; m++){
                // console.log(arr[1][i])
                // console.log(adj.join())
                // console.log(cell_list_dissolve[m])
                if (adj == cell_list_dissolve[m]){

                    map.height.push(level-1)
                    active = true
                    // console.log("dissolved one tile")
                    // console.log(adj.join())
                }
            }
            if (active == false){
                map.height.push(arr[0][i])
                // console.log("no diss")
            }
        }
        else{
            map.height.push(1)
        }
    }
    return arr

}

function cell_find_tiletype(arr){
    map.tile_type = []
    for (let i = 0; i < arr[0].length; i++){
        if (arr[0][i] != 1){ // if the parent tile is not of lowest level(1) then change

            // var adj = arr[1][i].join()
            var adj = []

            var level = arr[0][i]
            // console.log("level:",level)
            // console.log("arr",arr)

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

                ["0,1,1,0,1,1,0,0", 7],
                ["0,1,1,0,1,1,0,1", 7],
                // [",,,,,,,"],

                // 5
                ["0,0,0,0,0,1,1,1", 6],//err
                ["1,1,1,0,1,0,0,1", 7],
                ["0,1,1,0,1,0,1,1", 8],
                ["0,0,1,0,1,1,1,1", 1],
                ["0,0,0,1,1,1,1,1", 2],
                ["1,0,0,1,0,1,1,1", 3],
                ["1,1,0,1,0,1,1,0", 4],
                ["1,1,1,1,0,1,0,0", 5],
                
                ["1,1,1,1,1,0,0,0", 6],
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
                ["1,1,1,1,1,0,1,1",10],
                ["1,1,1,0,1,1,1,1", 8],
                ["0,1,1,1,1,1,1,1",11],
                ["1,0,1,1,1,1,1,1", 2],
                ["1,1,0,1,1,1,1,1",12],
                ["1,1,1,1,0,1,1,1", 4],

                // 8
                ["1,1,1,1,1,1,1,1", 0],
            ]
            var active = false
            for (let m = 0; m < cell_list.length; m++){
            
                if (adj == cell_list[m][0]){
                    map.tile_type.push(cell_list[m][1])
                    active = true
                }
            }
            if (active == false){
                map.tile_type.push(0)
            }

            // matrix.push(arr[0][i])
        }
        else{
            map.tile_type.push(1)
        }
    }
    return arr
}

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

    ctx.rect(0, 151, 576, 700);
    ctx.fillStyle = "#9d978b";
    // ctx.fill();

    var root = Math.sqrt(matrix[0].length)
    if (x_max > root){
        x_max = root
    }
    if (y_max > root){
        y_max = root
    }

    if (add_offset == true){
        add_offset = false
        posx_offset -= posx_offset_temp
        posy_offset -= posy_offset_temp
    }

    for (let y = y_min; y < y_max; y++) {

        for (let x = x_min; x < x_max; x++) {

            // let value = matrix[0][y * columns + x];
            let height_level = map.height[y * columns + x];
            // console.log(map)
            let tile_type = map.tile_type[y * columns + x];

            // console.log(map)
            // if (height_level == 2 && tile_type == 6){
            //     console.log("fffffffffffffffffff")
            // }

            let tile_x = x * scaled_sizex - viewport.x;
            let tile_y = y * scaled_sizex - viewport.y;

            // if (height_level == 1){
            //     tile_y += 16
            // }
            // else if (height_level == 2){
            //     tile_y += 8
            // }
            tile_y -= (height_level-1)*(4*scale_factor)

            ctx.drawImage(tile_min, tile_type * sprite_size, (height_level - 1) * 20, sprite_sizex, sprite_sizey, (tile_x)+posx_offset, (tile_y+( 20 -1)*8)+posy_offset, scaled_sizex, scaled_sizey)
            // ctx.drawImage(tile_min_green, tile_type * sprite_size, (height_level - 1) * 20, sprite_sizex, sprite_sizey, tile_x + 550, tile_y, scaled_sizex, scaled_sizey)
        }
    }
    draw()
}

//#endregion Functions end

//#region Set up

// localStorage.setItem('matrix', JSON.stringify(matrix)); //stringify object and store
var pull = JSON.parse(localStorage.getItem('perlin_level')); //retrieve the object

// INPUT CHANGE
var scale_factor = 2
var volume = 60
var resolution = 8

// NON-INPUT
const sprite_size = 16;
const sprite_sizex = 16;
const sprite_sizey = 20;
const scaled_sizex = scale_factor*sprite_sizex; //2.4
const scaled_sizey = scale_factor*sprite_sizey; //2.4
var add_offset = false
var posx_offset_temp = 0
var posy_offset_temp = 0
var posx_offset = 0
var posy_offset = 0

// max window width and height
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = height;
ctx.canvas.width = width;

const map = {
    height: [],
    tile_type: []
}

const Viewport = function(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
}
var viewport = new Viewport(0, 0, width, height)

var x_min = Math.floor(viewport.x / scaled_sizex);
var y_min = Math.floor(viewport.y / scaled_sizey);
var x_max = Math.ceil((viewport.x + viewport.w) / scaled_sizex);
var y_max = Math.ceil((viewport.y + viewport.h) / scaled_sizey);

// sprite load
var tile_min = new Image();
var tile_min_green = new Image();
tile_min.src = "../resources/images/min_20.png";
tile_min_green.src = "../resources/images/min_green.png";

//#endregion Set up end

//#region Procedural

// console.log("go", go(15, 10))

var pull = parseInt(JSON.parse(localStorage.getItem('perlin_level'))); //retrieve the object
document.getElementById("perlin_lev").value = pull
// console.log(pull)
turn = pull.z

turn = go(resolution,volume)

// console.log("d", map.height)

var matrix = find_adjacent(turn)
// console.log("m",matrix)
// console.log(map)

matrix = cell_borders(matrix)
// console.log("1matrix", matrix)

matrix = find_adjacent(matrix)
// console.log("2matrix", matrix)

let i = 0
while (i < 6){
    matrix = cell_dissolve(matrix)
    // console.log("3matrix", matrix)
    // console.log(map)
    matrix = find_adjacent(map.height)
    // console.log("4matrix", matrix)
    i++
}

matrix = cell_find_tiletype(matrix)
// console.log("5matrix", matrix)
console.log("Raw map data", map)

// matrix = cell_automata(matrix, true)
// matrix = find_adjacent(matrix)
// console.log("m",matrix)
// matrix = cell_automata(matrix, false)
// matrix = matrix[0]

var columns = rows = len = Math.sqrt(matrix[0].length);

tile_min.addEventListener("load", () => { loop(); });

let level_change = document.getElementById("perlin_lev");

level_change.addEventListener("click", () => {
    localStorage.setItem('perlin_level', JSON.stringify(document.getElementById("perlin_lev").value))
    // console.log("cl")
});

ctx.canvas.addEventListener("click", (event) => {
    posx_offset_temp = event.x - width/2
    posy_offset_temp = event.y - height/2
    console.log(width/2, event.x, posx_offset_temp)
    console.log(height/2, event.y, posy_offset_temp)
    add_offset = true
});

ctx.canvas.addEventListener("mousemove", (event) => {
    mousex = event.x
    mousey = event.y
    // console.log(mousex, mousey)
});


//#endregion Procedural end