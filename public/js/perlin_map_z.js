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

            let veryHigh = 80;
            let high = 20;
            let medium = -80;
            let low = -80;

            // if (x >= RES*0.99){
            //     arr = arr + [1]
            // }
        
            if (color_val >= veryHigh){
                // arr = arr + [1]
                arr[arr.length] = 5
            }
            else if (color_val >= high && color_val <= veryHigh){
                // arr = arr + [2]
                arr[arr.length] = 4
            }
            else if (color_val >= medium && color_val <= high){
                // arr = arr + [3]
                arr[arr.length] = 3
            }
            else if (color_val >= low && color_val <= medium){
                // arr = arr + [4]
                arr[arr.length] = 2
            }
            else if (color_val <= low){
                // arr = arr + [5]
                arr[arr.length] = 1
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
