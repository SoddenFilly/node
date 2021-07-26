//#region Functions

function main() {

    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;

    let pixel_size = 20*pixcanvas_scale

    let root = document.documentElement;
    root.style.setProperty('--pixfromtop_pixcanvas', (height - pixcanvas_size * pixel_size) / 2 + "px");
    root.style.setProperty('--pixfromtop_pallet', (height - pallet_scale) / 2 + "px");
    root.style.setProperty('--pixfromright', width - pallet_scale + "px");
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
    // higher
    colormatrix_temp = colormatrix
    colormatrix_temp.splice(2, 0, undefined)
    // for (let y = 0; y < pixcanvas_size-1; y++){
        
    //     for (let x = 0; x < pixcanvas_size-1; x++){
            
            
    //     }
    // }

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
    console.log(colormatrix)
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

function loadsprite() {
    let prev = document.getElementById("colorinput_prev")
    prev.style.height = prev.style.width
    
    for (let y = 0; y < pixcanvas_size; y++){
            
        for (let x = 0; x < pixcanvas_size; x++){
            ctx.beginPath()
            pix = height/2/pixcanvas_size
            ctx.rect(x*pix*fc + (width - height/2)/2*fc, y*pix*fc + height/4*fc, pix*fc, pix*fc)
            let index = y * pixcanvas_size + x
            let color = colormatrix[index]
            
            if (color == undefined || color == ""){
                ctx.fillStyle = "transparent"
            }
            else {
                // console.log(color)
                ctx.fillStyle = color
            }
            ctx.fill()
        }
    }
    
    let url = ctx.canvas.toDataURL("image/jpeg")
    // prev.style.backgroundColor = "transparent"
    prev.style.backgroundImage = "url("+url+")"
    // console.log(url)
}

function change_pixpallet(element_data) {

    let tile = document.getElementById(element_data.id)
    tile.style.backgroundColor = selected_color
}

function select(element_data) {

    // console.log(element_data.id.split("_")[0])
    pallet_type = element_data.id.split("_")[0]

    let prev = document.getElementById("colorinput_prev")
    let tile = document.getElementById(element_data.id)

    if (pallet_type == "pixpallet") {

        let tile = document.getElementById(element_data.id)
        let inpu = document.getElementById("colorinput")
        prev.style.height = "20px"
        prev.style.backgroundImage = "none"

        dblclicked_id = clicked_id
        clicked_id = element_data.id

        if (doubleclick == false || clicked_id != dblclicked_id) {

            doubleclick = true
            setTimeout(() => { doubleclick = false }, 1000);

            if (element_data.style.backgroundColor == "") {
                element_data.style.backgroundColor = selected_color
            }
            else{
                selected_color = rgb2hex(element_data.style.backgroundColor)
                inpu.value = selected_color
                prev.style.backgroundColor = selected_color
            }   
        }
        else if (clicked_id == dblclicked_id) {

            doubleclick = false

            selected_color = prompt("new color", "#")
            tile.style.backgroundColor = selected_color
            inpu.value = selected_color
            prev.style.backgroundColor = selected_color
        }
    } else if (pallet_type == "spripallet" && prev.style.backgroundImage != "none") {
        // console.log("img")
        tile.style.backgroundImage = prev.style.backgroundImage
    }
}

function savefunc(slot) {

    localStorage.setItem("tilesetmaker_saveslot_" + slot, colormatrix);
}

function loadfunc(slot) {

    colormatrix = localStorage.getItem("tilesetmaker_saveslot_" + slot).split(",")
    ctx.beginPath()
    ctx.rect((width - height/2)/2*fc, height/4*fc, height/2*fc, height/2*fc)
    ctx.fillStyle = "#202020"
    ctx.fill()
}

function change_colorfunc(element_data) {

    tile = document.getElementById(element_data.id)
    tile.style.backgroundColor = "tomato"

    element_index = parseInt(element_data.id.split("_")[1])

    colormatrix[element_index] = selected_color
}

function savedatafunc(slot) {

    save_data.slot_1.pixcanvas = []
    save_data.slot_1.pixcanvas.push(...colormatrix)

    let pal = document.getElementById("pixpallet_id")
    save_data.slot_1.pixpallet = []

    for (let y = 0; y < 12; y++){
            
        for (let x = 0; x < 6; x++){
            
            let index = y * 6 + x
            let id = "pixpallet_tile_" + index

            let color = document.getElementById(id).style.backgroundColor
            if (color != "") {
                color = rgb2hex(color)
            }
            save_data.slot_1.pixpallet.push(color)
            // save_data.slot_1.spripallet.push(color)
        }
    }

    pal = document.getElementById("spripallet_id")
    save_data.slot_1.spripallet.img = []

    for (let y = 0; y < 12; y++){
            
        for (let x = 0; x < 6; x++){
            
            let index = y * 6 + x
            let id = "spripallet_tile_" + index

            let color = document.getElementById(id).style.backgroundImage
            if (color == "") {
                color = ""
            }
            // console.log( save_data.slot_1.spripallet)
            save_data.slot_1.spripallet.img.push(color)
        }
    }

    
    console.log(save_data)
    // slot = 1
    localStorage.setItem("tilesetmaker_saveslot_" + slot, colormatrix);

    // try
    try{
        slots_list = localStorage.getItem("tilesetmaker_saveslot_list").split(",")
        console.log(slots_list)

        if (slots_list == null) {
            slots_list = []
            slots_list.push("tilesetmaker_saveslot_" + slot)
        }
        else{
            slots_list.push("tilesetmaker_saveslot_" + slot)
            let unique = [...new Set(slots_list)]
            slots_list = unique
        }

        localStorage.setItem("tilesetmaker_saveslot_list", slots_list);
    }
    catch{
        slots_list = []
        slots_list.push("tilesetmaker_saveslot_" + slot)

        localStorage.setItem("tilesetmaker_saveslot_list", slots_list);
    }

    // localStorage.removeItem("tilesetmaker_saveslot_list");

    loaddatafunc()
}

function loaddatafunc() {
    console.log(localStorage.getItem("tilesetmaker_saveslot_1"))
}
//#endregion Functions

//#region Set up

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var ctx = document.querySelector("canvas").getContext("2d");

ctx.imageSmoothingEnabled = false;

fc = 2

ctx.canvas.height = height*fc;
ctx.canvas.width = width*fc;
// ctx.drawImage(tile_min, 0, (posz-1)*20, sprite_sizex, sprite_sizey, posx, posy, scaled_sizex, scaled_sizey)
ctx.beginPath()

ctx.rect((width - height/2)/2*fc, height/4*fc, height/2*fc, height/2*fc)
ctx.fillStyle = "#202020"
ctx.fill()

var pointer = { x:0, y:0 }

var tile_min = new Image();
tile_min.src = "../resources/images/min_20.png";

var sprite = new Image();

var colormatrix = []

var pixcanvas_scale = 1.5
var pixcanvas_size = 16
var pallet_scale = 360

var clicked_id = "#"

var doubleclick = false

var selected_color = "#ffffff"

var change_pixcanvas_size = false

const save_data = {
    slot_1:{
        pixpallet:[],
        pixcanvas:[],
        spripallet:{
            img:[],
            // data:[],
        },
    },
    slot_2:{},
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

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

for (let y = 0; y < 12; y++){
        
    for (let x = 0; x < 6; x++){

        var tile = document.createElement('div');
        // tile.setAttribute("ondblclick","change_pixpallet(this)");
        tile.setAttribute("onclick","select(this)");
        
        let index = y * 6 + x
        index = index.toString()
        tile.id = "pixpallet_tile_"+index
        
        // tile.style.backgroundColor = "tomato"
        tile.style.backgroundColor = colormatrix[index]

        document.getElementById("pixpallet_id").appendChild(tile)
    }
}

for (let y = 0; y < 12; y++){
        
    for (let x = 0; x < 6; x++){

        var tile = document.createElement('div');
        tile.setAttribute("onclick","select(this)");
        
        let index = y * 6 + x
        index = index.toString()
        tile.id = "spripallet_tile_"+index
        
        tile.style.backgroundColor = colormatrix[index]

        document.getElementById("spripallet_id").appendChild(tile)
    }
}

//#endregion Set up

//#region Procedural

document.getElementById("colorinput").oninput = function() {

    selected_color = this.value
    prev = document.getElementById("colorinput_prev")
    prev.style.backgroundColor = selected_color
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

tile_min.addEventListener("load", () => { loop(); });

//#endregion Procedural end