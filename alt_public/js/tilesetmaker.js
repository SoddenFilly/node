//#region Functions

function main() {

    // max window width and height
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;

    ctx.canvas.height = height;
    ctx.canvas.width = width;
    ctx.imageSmoothingEnabled = false;

    let pixel_size = 20*pixcanvas_scale

    let root = document.documentElement;
    root.style.setProperty('--pixfromtop', (height - pixcanvas_size * pixel_size) / 2 + "px");
    root.style.setProperty('--pixcanvas_size', pixcanvas_size * pixel_size + "px");
    root.style.setProperty('--pixel_size', pixel_size + "px"); 
}

function update_color() {
    for (let y = 0; y < pixcanvas_size; y++){
        
        for (let x = 0; x < pixcanvas_size; x++){
            
            let index = y * pixcanvas_size + x
            index = index.toString()
            let id = "tile_"+index
            
            try {tile = document.getElementById(id).style.backgroundColor = colormatrix[index]
            } catch(err) {}
        }
    }
}

function resize_pixcanvas() {
    for (let y = 0; y < pixcanvas_size+1; y++){
        
        for (let x = 0; x < pixcanvas_size+1; x++){
            
            let index = y * pixcanvas_size + x
            index = index.toString()
            let id = "tile_"+index
            
            try {document.getElementById(id).remove()
            } catch(err) {}
        }
    }
    for (let y = 0; y < pixcanvas_size; y++){
        
        for (let x = 0; x < pixcanvas_size; x++){

            let tile = document.createElement('div');
            tile.setAttribute("onmouseup","change_colorfunc(this)");
            tile.setAttribute("onmousedown","change_colorfunc(this)");
            
            let index = y * pixcanvas_size + x
            index = index.toString()
            tile.id = "tile_"+index
            
            // tile.style.backgroundColor = "tomato"
            tile.style.backgroundColor = colormatrix[index]

            document.getElementById("pixcanvas_id").appendChild(tile)
        }
    }
}

function loop() {
    
    setTimeout(() => { window.requestAnimationFrame(loop); }, 10);

    main()
    update_color()

    if (change_pixcanvas_size) {
        change_pixcanvas_size = false
        // console.log("change size")
        resize_pixcanvas()
    }
}

//#endregion Functions

//#region Set up

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = height;
ctx.canvas.width = width;

var pointer = { x:0, y:0 }

var tile_min = new Image();
tile_min.src = "../resources/images/min_20.png";

var colormatrix = []

var pixcanvas_scale = 2
var pixcanvas_size = 8

var change_pixcanvas_size = false

for (let y = 0; y < pixcanvas_size; y++){
        
    for (let x = 0; x < pixcanvas_size; x++){

        var tile = document.createElement('div');
        tile.setAttribute("onmouseup","change_colorfunc(this)");
        tile.setAttribute("onmousedown","change_colorfunc(this)");
        
        let index = y * pixcanvas_size + x
        index = index.toString()
        tile.id = "tile_"+index
        
        // tile.style.backgroundColor = "tomato"
        tile.style.backgroundColor = colormatrix[index]

        document.getElementById("pixcanvas_id").appendChild(tile)
    }
}

//#endregion Set up

//#region Procedural

function savefunc(slot) {

    localStorage.setItem("tilesetmaker_saveslot_" + slot, colormatrix);
}
function loadfunc(slot) {

    colormatrix = localStorage.getItem("tilesetmaker_saveslot_" + slot).split(",")
}

document.getElementById("scalerange").oninput = function() {

    console.log(this.value/100)
    pixcanvas_scale = this.value/100
}

document.getElementById("pixcanvas_size").oninput = function() {

    if (this.value < 2){
        this.value = 8
    }
    pixcanvas_size = this.value
    change_pixcanvas_size = true
}

function change_colorfunc(element_data) {

    tile = document.getElementById(element_data.id)
    tile.style.backgroundColor = "tomato"

    element_index = parseInt(element_data.id.split("_")[1])

    colormatrix[element_index] = "#333333"
}

ctx.canvas.addEventListener("mousedown", function posclick(event) {

    let stepx = 32
    let stepy = 32

    pointer.x = Math.round(event.pageX/stepx)*stepx - 16
    pointer.y = Math.round(event.pageY/stepy)*stepy - 16
    
    ctx.drawImage(tile_min, 0, 0, 16, 16, pointer.x, pointer.y, 32, 32)
});

tile_min.addEventListener("load", () => { loop(); });

//#endregion Procedural end