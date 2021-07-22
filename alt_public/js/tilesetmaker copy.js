//#region Functions

function loop() {

    // console.log("LOOP START===============================================================")
    
    // max window width and height
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    // deadzones = {top:(height-(width/3))/2, left:width/3, right:width/3, bottom:width/3}
    canvsize = 32*16
    var deadzones = {top:(height-canvsize)/2, left:(width-canvsize)/2, right:(width-canvsize)/2, bottom:(width-canvsize)/2}
    pix = deadzones.right/16
    ctx.canvas.height = height;
    ctx.canvas.width = width;
    ctx.imageSmoothingEnabled = false;

    console.log(deadzones.left)
    
    // loops the func every half second
    let secs = 0.1 //0.1
    // setTimeout(() => { window.requestAnimationFrame(loop); }, secs*1000);
    
    ctx.beginPath()
    ctx.rect(deadzones.left, deadzones.top, deadzones.right, deadzones.bottom)
    ctx.fillStyle = "#9d978b";
    ctx.fill();

    ctx.beginPath()
    for (let y = 0; y < 16; y++){
        
        for (let x = 0; x < 16; x++){

            // let color = map.height[y * columns + x]

            ctx.rect(x*pix + deadzones.left, y*pix + deadzones.top, 12, 12)
            ctx.fillStyle = "#444444";

            var tile = document.createElement('div');
            tile.setAttribute("onclick","func(this)");
            
            index = y * 16 + x
            index = index.toString()
            tile.id = "tile_"+index

            document.getElementById("pallet_id").appendChild(tile)

        }
    }
    ctx.fill();
    
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

    // for (let y = 0; y < 20; y++){
        
    //     for (let x = 0; x < 5; x++){
    //         var tile = document.createElement('div');
    //         tile.id = "tile"
    //         // tile = document.getElementById("tile")
    //         tile.style.width = "10px"    
    //         tile.style.height = "10px"
    //         tile.style.backgroundColor = "#ffffff"
    //         document.body.appendChild(tile);
    //     }
    // }
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

function func(element_data) {
    console.log("clicked:", element_data.id)
    element = document.getElementById("pallet_id")
    element.sty
}

ctx.canvas.addEventListener("click", function posclick(event) {

    let stepx = 32
    let stepy = 32
    pointer.x = Math.round(event.pageX/stepx)*stepx - 16
    pointer.y = Math.round(event.pageY/stepy)*stepy - 16
    
    ctx.drawImage(tile_min, 0, 0, 16, 16, pointer.x, pointer.y, 32, 32)
    console.log(event)
    
});

ctx.canvas.addEventListener("scroll", function scroll(event) {

    lastKnownScrollPosition = canvas.scrollY;
    console.log(lastKnownScrollPosition)
    
});

window.addEventListener('scroll', function() {
    console.log(window.pageYOffset)
});

tile_min.addEventListener("load", () => { loop(); });



//#endregion Procedural end