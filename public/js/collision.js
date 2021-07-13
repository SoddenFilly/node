var pull = parseInt(JSON.parse(localStorage.getItem('height_data'))); //retrieve the object
console.log(pull)

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = height;
ctx.canvas.width = width;

var cursor_img = new Image();
cursor_img.src = "../resources/images/cursor_icons.png";

mousex = -100
mousey = -100

const tris_data = {

    edge_a: {
        vect: [50, 150],
        grad: 0,
        len: 0
    },
    edge_b: {
        vect: [100, 200],
        grad: 0,
        len: 0
    },
    edge_c: {
        vect: [200, 190],
        grad: 0,
        len: 0
    },

}

const points = {
    a: [50, 150],
    b: [100, 200],
    c: [200, 190]
}

coords = [[], [], []]
coords[0].push(...points.a, ...points.b)
coords[1].push(...points.b, ...points.c)
coords[2].push(...points.c, ...points.a)
console.log(coords)

// coords = [[100, 100, 100, 200], [100, 200, 200, 200], [200, 200, 100, 100]]

// using the first set of relative we create the origin point (or graph center) and use the second set's offset from the origin point as the true x y values

// highest_vector = 0
// highest_vector_value = coords[0][1]
// lowest_grad = 1000

vector_heights = []
gradients = []

for (let set = 0; set < coords.length; set++){

    const origin_point = {
        x: coords[set][0],
        y: coords[set][1]
    }
    console.log(origin_point)
    // making the plot point relative to the origin point
    const plot_point = {
        x: coords[set][2] - origin_point.x,
        y: coords[set][3] - origin_point.y
    }
    if (plot_point.x == 0){
        plot_point.x = 1
    }
    console.log(plot_point)
    // find gradient
    m = plot_point.y/plot_point.x
    console.log("gradient:", m)

    // if (coords[set][1] < highest_vector_value){
    //     highest_vector = set
    //     highest_vector_value = coords[set][1]
    // }

    // if (m < lowest_grad && ){
    //     lowest_grad = m
    // }
    if (origin_point.y < coords[set][3]){
        vector_heights.push(origin_point.y)
    }
    else{
        vector_heights.push(coords[set][3])
    }
    
    gradients.push(m)

    tris_data.edge_a.grad = m
}
console.log(vector_heights, gradients)
console.log("tris_data", tris_data)

lowest_vector = vector_heights[0]
for (let p = 0; p < vector_heights.length; p++){
    if (vector_heights[p] < lowest_vector){
        lowest_vector = vector_heights[p]
    }
}
lowest_vectors = []
for (let p = 0; p < vector_heights.length; p++){
    if (vector_heights[p] == lowest_vector){
        lowest_vectors.push(p)
    }
}
// has to be the one closest to zero
lowest_gradient = gradients[0]
for (let p = 0; p < lowest_vectors.length; p++){
    if (gradients[lowest_vectors[p]] > 0){
        if (gradients[lowest_vectors[p]] < lowest_gradient){
            lowest_gradient = gradients[lowest_vectors[p]]
        }
        console.log("+0")
    }
    else{
        if (gradients[lowest_vectors[p]] > lowest_gradient){
            lowest_gradient = gradients[lowest_vectors[p]]
        }
        console.log("-0")
    }
}

console.log(lowest_vectors)
console.log("grad, vect", lowest_gradient, lowest_vector)



ctx.canvas.addEventListener("mousemove", (event) => {
    mousex = event.x
    mousey = event.y
    // console.log(mousex, mousey)
});

function loop(){
    ctx.imageSmoothingEnabled = false;
    setTimeout(() => { window.requestAnimationFrame(loop); }, 10);
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    ctx.beginPath();
    // ctx.moveTo(100, 100);
    // ctx.lineTo(100, 200);
    // ctx.lineTo(200, 200);
    // ctx.lineTo(100, 100);
    ctx.moveTo(coords[0][0], coords[0][1]);
    ctx.lineTo(coords[0][2], coords[0][3]);
    ctx.lineTo(coords[1][2], coords[1][3]);
    ctx.lineTo(coords[2][2], coords[2][3]);
    ctx.stroke();

    x = 1
    y = 100
    m = y/x
    console.log(m)

    // y = m*x + c
    // x = mousex // mousex
    
    // 100 < x < 200

    // m = 1
    // c = 200
    // // y = m*x + c

    // ctx.beginPath();
    // x = 100
    // y = 2*x + c+100
    // m = (y-c)/x
    // console.log("1m",m)
    // ctx.moveTo(x, y);
    // // console.log("1",x,y)
    // x = 200
    // y = 2*x + c+100
    // m = (y-c)/x
    // console.log("2m",m)
    // ctx.lineTo(x, y);
    // // console.log("2",x,y)
    // ctx.stroke();

    // m = 1
    // c = 200
    // x = 100
    // y = 300
    // y = m*x + c
    // console.log("m", m, "x", x, "y", y)

    // m = (y-c)/x
    // console.log(m)

    // m = x * y + 200
    // console.log(m)

    // a = 0.01
    // b = width/4
    // c = height/3.5
    // y = Math.round(a*(x - b)**2 + c)

    ctx.drawImage(cursor_img, 1, 1, 9, 9, mousex - 12, mousey - 12, 25, 25)
}

cursor_img.addEventListener("load", () => { loop(); });
