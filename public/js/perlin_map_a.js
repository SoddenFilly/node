res = go()
// console.log(res)
//FUNCTIONS
function go(RES){
    perlin.seed()

    var arr = []
    // const RES = 15;

    // const SIZE = 300;
    const SIZE = 300;
    var HIG = WID = SIZE;
  
    var count = 0;
    for (let y = 0; y < RES; y += RES / HIG){
        
        for (var x = 0; x < RES; x += RES / WID){
            let color_val = parseInt(perlin.get(x, y) * 255);
            count ++;

            let stone = 110;
            let grass = -20;
            let grass_deep = -100
            let sand = -115;

            // if (x >= RES*0.99){
            //     arr = arr + [1]
            // }
        
            if (color_val >= stone){
                // arr = arr + [1]
                arr[arr.length] = 1
            }
            else if (color_val >= grass && color_val <= stone){
                // arr = arr + [2]
                arr[arr.length] = 2
            }
            else if (color_val >= grass_deep && color_val <= grass){
                // arr = arr + [3]
                arr[arr.length] = 3
            }
            else if (color_val >= sand && color_val <= grass_deep){
                // arr = arr + [4]
                arr[arr.length] = 4
            }
            else if (color_val <= sand){
                // arr = arr + [5]
                arr[arr.length] = 5
            }
        }
        // console.log(x)
    }
    // console.log(count)
    // document.getElementById("text_container").innerHTML = arr;

    // for (let i = 0; i < arr.length; i++) {
    //     // console.log(i);
    //     let temp = arr[i];
    //     arr[i] = [[temp, 27]];
    // }
    // console.log("qq")
    // console.log(arr)
    // console.log(arr.length)
    // console.log("fffff")

    return arr
}// func go
