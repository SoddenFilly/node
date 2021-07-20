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

    // ctx.rect(0, 0, 200, height)
    ctx.fillStyle = "#9d978b";
    ctx.fill();

    for (let y = 0; y < 20; y++){

        for (let x = 0; x < 5; x++){
            ctx.rect(x*22 + 50, y*22 + 50, 20, 20)
            ctx.fillStyle = "#444444";
        }
    }
    ctx.rect(0, 0, 20, 20)
    ctx.fill();
    // var image = ctx.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    var image = ctx.canvas.toDataURL()

    // window.location.href=image; // it will save locally

    var a = document.getElementById("link")

    // var a = document.createElement('a');
    a.download = 'r-₪▮foc-₪931.png.tor';
    // a.download = 'image.png';
    a.href = image;
    a.textContent = "urlwdksjnckskeckjwaiciwjacki";
    // a.id = "link"
    a.style.color = "red";
    a.style.position = "fixed"
    a.style.zIndex = 1
    // document.body.appendChild(a);


    // var myImg = new Image();
    // myImg.src = image;
    // // wait until the data uri has been processed
    // myImg.onload = function() {
    //     // draw the image and scale it to the size of the canvas
    //     ctx.drawImage(this, 0, 0, this.width, this.height, /* source */300, 100, this.width, this.height);    /* destination */
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



tile_min.addEventListener("load", () => { loop(); });

//#endregion Procedural end