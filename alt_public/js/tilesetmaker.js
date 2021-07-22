//#region Functions

function loop() {

    // console.log("LOOP START===============================================================")
    
    // max window width and height
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    ctx.canvas.height = height;
    ctx.canvas.width = width;
    ctx.imageSmoothingEnabled = false;

    // console.log(deadzones.left)
    

    setTimeout(() => { window.requestAnimationFrame(loop); }, 1000);
    
    pixel_size = 20*pixcanvas_scale
    let root = document.documentElement;
    root.style.setProperty('--pixcanvas_size', pixcanvas_size*pixel_size + "px");
    root.style.setProperty('--pixfromtop', (height-pixcanvas_size*pixel_size)/2 + "px");
    root.style.setProperty('--pixel_size', pixel_size + "px");

    for (let y = 0; y < pixcanvas_size+1; y++){
        
        for (let x = 0; x < pixcanvas_size+1; x++){
            
            index = y * pixcanvas_size + x
            index = index.toString()
            id = "tile_"+index
            
            try {
                del = document.getElementById(id)
                del.remove()
            } catch(err) {}
        }
    }
    for (let y = 0; y < pixcanvas_size; y++){
        
        for (let x = 0; x < pixcanvas_size; x++){

            var tile = document.createElement('div');
            tile.setAttribute("onclick","change_colorfunc(this)");
            
            
            index = y * pixcanvas_size + x
            index = index.toString()
            tile.id = "tile_"+index
            
            // try {
            //     del = document.getElementById(tile.id)
            //     del.remove()
            // } catch(err) {}

            // tile.style.backgroundColor = "tomato"
            tile.style.backgroundColor = colormatrix[index]
            
            

            document.getElementById("pixcanvas_id").appendChild(tile)
        }
    }
    
}


//#endregion Functions end

//#region Set up

colormatrix = []

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

pixcanvas_scale = 2
pixcanvas_size = 8

//#endregion Set up end

//#region Procedural

let slider = document.getElementById("scalerange");
slider.oninput = function() {
    console.log(this.value/100)
    pixcanvas_scale = this.value/100
}
let size = document.getElementById("pixcanvas_size");
size.oninput = function() {
    if (this.value < 2){
        this.value = 8
    }
    pixcanvas_size = this.value
}

function change_colorfunc(element_data) {
    // console.log("clicked:", element_data)
    tile = document.getElementById(element_data.id)
    tile.style.backgroundColor = "tomato"
    element_index = parseInt(element_data.id.split("_")[1])
    // console.log(element_index)
    colormatrix[element_index] = "#333333"
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