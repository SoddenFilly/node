res = go('cnvs1',1,1,255)
console.log(res)
//FUNCTIONS
function go(canvas_id,GRID_SIZE,RESOLUTION,COLOR_SCALE){
    perlin.seed()

    // function fill(color_val, x, y, color){
    //     ctx.fillStyle = color;
    //     ctx.fillRect(
    //         x / GRID_SIZE * cnvs.width,
    //         y / GRID_SIZE * cnvs.width,
    //         pixel_size, pixel_size
    //     );
    // }

    // 'use strict';
    // let cnvs = document.getElementById('cnvs1');
    // cnvs.height = cnvs.width = window.innerWidth/2.1;
    // let ctx = cnvs.getContext('2d');

    // let pixel_size = cnvs.width / RESOLUTION;
    // let num_pixels = GRID_SIZE / RESOLUTION;
    // console.log(GRID_SIZE, num_pixels)

    var arr = []


    for (let y = 0; y < 10; y += 1 / 10){
        
        for (let x = 0; x < 10; x += 1 / 10){
            let color_val = parseInt(perlin.get(x, y) * 255);
            

            let stone = 110;
            let grass = -20;
            let grass_deep = -100
            let sand = -115;
        
            if (color_val >= stone){
                // var color = '#888c8d'
                // fill(color_val, x, y, color)
                var arr = arr + [1]
            }
            if (color_val >= grass && color_val <= stone){
                // var color = '#21b81c'
                // fill(color_val, x, y, color)
                var arr = arr + [2]
            }
            if (color_val >= grass_deep && color_val <= grass){
                // var color = '#1eaa1a'
                // fill(color_val, x, y, color)
                var arr = arr + [3]
            }
            if (color_val >= sand && color_val <= grass_deep){
                // var color = '#c2b280'
                // fill(color_val, x, y, color)
                var arr = arr + [4]
            }
            if (color_val <= sand){
                // var color = '#3056bf'
                // fill(color_val, x, y, color)
                var arr = arr + [5]
            }
        }
    }
    console.log(arr.length)
    console.log(Math.sqrt(arr.length))
    document.getElementById("text_container").innerHTML = arr;
    return arr
}// func go
