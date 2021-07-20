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
    let secs = 0.1 //0.1
    // setTimeout(() => { window.requestAnimationFrame(loop); }, secs*1000);
    // ctx.beginPath()
    // ctx.rect(0, 0, 160, height)
    // ctx.fillStyle = "#9d978b";
    // ctx.fill();
    // ctx.beginPath()
    // ctx.rect(23, 48, 112, height)
    // ctx.fillStyle = "#8c877c";
    // ctx.fill();

    // ctx.beginPath()
    // for (let y = 0; y < 20; y++){
        
    //     for (let x = 0; x < 5; x++){
    //         ctx.rect(x*22 + 25, y*22 + 50, 20, 20)
    //         ctx.fillStyle = "#444444";
    //     }
    // }
    // ctx.fill();

    for (let y = 0; y < 20; y++){
        
        for (let x = 0; x < 5; x++){
            var tile = document.createElement('div');
            tile.id = "tile"
            // tile = document.getElementById("tile")
            tile.style.width = "10px"
            tile.style.height = "10px"
            tile.style.backgroundColor = "#ffffff"
            document.body.appendChild(tile);
        }
    }
}


//#endregion Functions end

//#region Set up

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = height;
ctx.canvas.width = width;

var pointer = { x:0, y:0 }

const matrix = {
    x:[],
    y:[],
    z:[],
};

// sprite load
var tile_min = new Image();
tile_min.src = "../resources/images/min_20.png";

//#endregion Set up end

//#region Procedural



tile_min.addEventListener("load", () => { loop(); });

//#endregion Procedural end