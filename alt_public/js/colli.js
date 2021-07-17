var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = height;
ctx.canvas.width = width;

var cursor_img = new Image();
cursor_img.src = "../resources/images/cursor_icons.png";

mousex = -100
mousey = -100

var top = ""

var tris_data = {

    edge_a: {
        vect1: [],
        vect2: [],
        orientation: null, // top, left, right
        grad: 0,
        len: 0
    },
    edge_b: {
        vect1: [],
        vect2: [],
        orientation: null,
        grad: 0,
        len: 0
    },
    edge_c: {
        vect1: [],
        vect2: [],
        orientation: null,
        grad: 0,
        len: 0
    },

}

tris_data.edge_a.vect1 = [50, 100]
tris_data.edge_b.vect1 = [100, 200]
tris_data.edge_c.vect1 = [300, 200]

tris_data.edge_a.vect2 = tris_data.edge_b.vect1
tris_data.edge_b.vect2 = tris_data.edge_c.vect1
tris_data.edge_c.vect2 = tris_data.edge_a.vect1

console.log(tris_data)

coords = []
coords.push([...tris_data.edge_a.vect1, ...tris_data.edge_a.vect2], [...tris_data.edge_b.vect1, ...tris_data.edge_b.vect2], [...tris_data.edge_c.vect1, ...tris_data.edge_c.vect2])
console.log(coords)



// get gradients
var pairs = []
var gradients = {
    id: [],
    value: [],
}

to = gradients
console.log(to)

var edge_id = ["edge_a", "edge_b", "edge_c"]

for (let set = 0; set < coords.length; set++){

    const origin_point = {
        x: coords[set][0],
        y: coords[set][1]
    }
    // console.log(origin_point)
    // making the plot point relative to the origin point
    const plot_point = {
        x: coords[set][2] - origin_point.x,
        y: coords[set][3] - origin_point.y
    }
    if (plot_point.x == 0){
        plot_point.x = 1
    }
    // console.log(plot_point)
    // find gradient
    m = plot_point.y/plot_point.x
    console.log("gradient:", m)

    if (origin_point.y < coords[set][3]){
        pairs.push([origin_point.y, m])
    } else {
        pairs.push([coords[set][3], m])
    }
    
}
// console.log(pairs)
for (let i = 0; i < pairs.length; i++){
    // console.log(pairs[i][0])
    // console.log("math",Math.min.apply(null, [pairs[0][0],pairs[1][0],pairs[2][0]]))
    if (pairs[i][0] == Math.min.apply(null, [pairs[0][0],pairs[1][0],pairs[2][0]])){
        gradients.value.push(pairs[i][1])
        gradients.id.push(edge_id[i])
    } else {
        third_id = edge_id[i]
        third_value = pairs[i][1]
    }
}
// console.log(gradients)
// pairs.splice(splicepoint, 1)
// console.log(gradients)

for (let set = 0; set < gradients.value.length; set++){
    if (gradients.value[set] < 0){
        gradients.value[set] = gradients.value[set] - gradients.value[set]*2
    }
}
// console.log(gradients)
if (gradients.value[0] < gradients.value[1]){
    tris_data[gradients.id[0]].orientation = "top"
    // top = gradients.id[0]
    tris_data[gradients.id[0]].grad = gradients.value[0]

    tris_data[gradients.id[1]].orientation = "right"
    tris_data[gradients.id[1]].grad = gradients.value[1]

    tris_data[third_id].orientation = "left"
    tris_data[third_id].grad = third_value
    
} else {
    // console.log(tris_data["edge_a"])
    tris_data[gradients.id[1]].orientation = "top";
    to = gradients.id[1]
    console.log(to)
    tris_data[gradients.id[1]].grad = gradients.value[1]

    tris_data[gradients.id[0]].orientation = "left"
    tris_data[gradients.id[0]].grad = gradients.value[0]

    tris_data[third_id].orientation = "right"
    tris_data[third_id].grad = third_value
}
console.log(tris_data)

function loop(){
    ctx.imageSmoothingEnabled = false;
    setTimeout(() => { window.requestAnimationFrame(loop); }, 10);
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(tris_data.edge_a.vect1[0], tris_data.edge_a.vect1[1]);
    ctx.lineTo(tris_data.edge_a.vect2[0], tris_data.edge_a.vect2[1]);
    ctx.stroke();ctx.beginPath();
    ctx.moveTo(tris_data.edge_b.vect1[0], tris_data.edge_b.vect1[1]);
    ctx.lineTo(tris_data.edge_b.vect2[0], tris_data.edge_b.vect2[1]);
    ctx.stroke();ctx.beginPath();
    ctx.moveTo(tris_data.edge_c.vect1[0], tris_data.edge_c.vect1[1]);
    ctx.lineTo(tris_data.edge_c.vect2[0], tris_data.edge_c.vect2[1]);
    ctx.stroke();
    // console.log(top)

    var y_offset = 100

    var barrierx = tris_data[to].vect2[0]
    var xx = tris_data[to].vect1[0]
    var m = tris_data[to].grad
    // console.log(m)
    // y = m*(mousex + y_offset) //+ ((1-m)* 100)
    y = m*(mousex + 200)

    // 100 = 0.4*(50 + ?)
    // 100/0.4 = 50 + ?
    // console.log(100/0.4) 250
    // 250 = 50 + 200
    // y = 100
    // y_offset = y/m - mousex
    // console.log(y_offset)
    
    ctx.beginPath()

    // m = 1
    // x = 300
    // y = m*x
    ctx.moveTo(50, 100)

    // x = 500
    // y = m*x
    ctx.lineTo(400, y)
    // ctx.stroke()


    // if (mousex > barrierx && mousex < xx && mousey > y){
    if (mousey > y){
        console.log("inside x,y:", mousex, mousey, "barr, y:", barrierx, y)
        console.log(y)
    }

    

    
    ctx.drawImage(cursor_img, 1, 1, 9, 9, mousex - 12  + 50, y - 12   + 100, 25, 25)
    // console.log(y)
}

ctx.canvas.addEventListener("mousemove", (event) => {
    mousex = event.x
    mousey = event.y
    // console.log(mousex, mousey)
});

cursor_img.addEventListener("load", () => { loop(); });