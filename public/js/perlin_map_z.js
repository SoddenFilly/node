res = go()

//FUNCTIONS
function go(RES){
    perlin.seed()

    var arr = []

    const SIZE = 300;
    var HIG = WID = SIZE;
 
    var count = 0;
    for (let y = 0; y < RES; y += RES / HIG){
       
        for (var x = 0; x < RES; x += RES / WID){
            let color_val = parseInt(perlin.get(x, y) * 255);
            count ++;

            function testing(num1, num2, length) {
                if (color_val >= num1 && color_val < num2) {
                    arr[arr.length] = length
                }
            }

            //block 4
            testing(144, 300, 20)
            testing(128, 144, 19)
            testing(112, 128, 18)
            testing(96, 112, 17)
            testing(80, 96, 16)

            //block 3
            testing(68, 80, 15)
            testing(56, 68, 14)
            testing(44, 56, 13)
            testing(32, 44, 12)
            testing(20, 32, 11)

            //block 2
            testing(0, 20, 10)
            testing(-20, 0, 9)
            testing(-40, -20, 8)
            testing(-60, -40, 7)
            testing(-80, -60, 6)

            //block 1
            testing(-96, -80, 5)
            testing(-112, -96, 4)
            testing(-128, -112, 3)
            testing(-144, -128, 2)
            testing(-300, -144, 1)
        }    
    }
    return arr
}// func go

//-----

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var scaled_size = 5; //2.4
var sprite_size = 16;
var columns = rows = 300;

var index = 0;
var tile_sheet = new Image();
let valarr = [];

var elevation = go(15);
var temperature = go(5.5)
var rainfall = go(10)

function compare1(elev, rain, temp, el, lis) {
    if (elev == el) {
        if (rain >= 6 && temp <= 10) {
            //snowy mountain
            valarr[valarr.length] = lis
        } else {
            //barren mountain
            valarr[valarr.length] = (lis += 1)
        }
    }
}

function compare2(elev,rain, temp,el, lis) {
    if (elev == el) {
        if (rain >= 6 && temp <= 10) {
            //snowy highlands
            valarr[valarr.length] = lis
        } else if (rain >= 6) {
            //forest highlands
            valarr[valarr.length] = (lis += 1)
        } else {
            //barren highlands
            valarr[valarr.length] = (lis += 2)
        }
    }
}

function compare3(elev,rain, temp,el, lis) {
    if (elev == el) {
        if (rain >= 6 && temp < 11) {
            //forest
            valarr[valarr.length] = lis
        } else if ((rain < 6 && temp > 15) || (rain < 6 && temp >= 6)) {
            //desert
            valarr[valarr.length] = (lis += 1)
        } else {
            //plains
            valarr[valarr.length] = (lis += 2)
        }
    }
}

function compare4(elev, rain, temp,el, lis) {
    if (elev == el) {
        if (rain >= 11) {
            //lakes, should stay at a consistent elevation, that being the lowest elevation of the bordering tiles.  That will be added later
            valarr[valarr.length] = lis
        } else if (rain >= 6 && temp < 11) {
            //LOWland plains
            valarr[valarr.length] = (lis += 1)
        } else {
            //LOWland wastes
            valarr[valarr.length] = (lis += 2)
        }
    }
}

//-----

function compare() {
    for (let y = 0; y < rows; y++) {

        for (let x = 0; x < columns; x++, index++) {

            let temp = temperature[y * columns + x];
            let elev = elevation[y * columns + x];
            let rain = rainfall[y * columns + x];

            //console.log(elev)
            if (elev > 15) {
                ii = 1;
                for (let i = 20; i > 15; i--){
                    compare1(elev, rain, temp, i, ii)
                    ii += 2
                }
            } 
            else if (elev > 10) {
                compare2(elev,rain, temp, 15, 11)
                compare2(elev,rain, temp,14, 14)
                compare2(elev,rain, temp,13, 17)
                compare2(elev,rain, temp,12, 20)
                compare2(elev,rain, temp,11, 23)
            } else if (elev > 5) {
                compare3(elev,rain, temp,10, 26)
                compare3(elev,rain, temp,9, 29)
                compare3(elev,rain, temp,8, 32)
                compare3(elev,rain, temp,7, 35)
                compare3(elev,rain, temp,6, 38)
            } else {
                compare4(elev,rain, temp,5, 41)
                compare4(elev,rain, temp,4, 44)
                compare4(elev,rain, temp,3, 47)
                compare4(elev,rain, temp,2, 50)
                compare4(elev,rain, temp,1, 53)
            }
        }
    }
}

function loop() {
    window.requestAnimationFrame(loop);

    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;

    context.canvas.height = height;
    context.canvas.width = width;

    context.imageSmoothingEnabled = false;
    z = 0;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++, index++) {

            let tile_x = x * scaled_size;
            let tile_y = y * scaled_size;

            index_y = 4
            index_x = 4

            context.drawImage(tile_sheet, valarr[z] * sprite_size, 0, sprite_size, sprite_size, tile_x, tile_y, scaled_size, scaled_size)
            z++
        }
    }
}

localStorage.setItem('height_data', elevation)

console.log(localStorage.getItem('height_data'))

tile_sheet.addEventListener("load", (event) => { loop(); });

tile_sheet.src = "../resources/images/tilesetz.png";