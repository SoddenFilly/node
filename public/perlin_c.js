res = go()
// console.log(res)
//FUNCTIONS
function go(){
    perlin.seed()

    var arr = []
    const RES = 5;
    const HIG = WID = 41;
  
    var count = 0;
    for (let y = 0; y < RES; y += RES / HIG){
        
        for (var x = 0; x < RES; x += RES / WID){
            let color_val = parseInt(perlin.get(x, y) * 255);
            count ++;

            let stone = 110;
            let grass = -20;
            let grass_deep = -100
            let sand = -115;

            if (x >= RES*0.9){
                arr = arr + [1]
            }
        
            else if (color_val >= stone){
                arr = arr + [2]
            }
            else if (color_val >= grass && color_val <= stone){
                arr = arr + [2]
            }
            else if (color_val >= grass_deep && color_val <= grass){
                arr = arr + [3]
            }
            else if (color_val >= sand && color_val <= grass_deep){
                arr = arr + [4]
            }
            else if (color_val <= sand){
                arr = arr + [5]
            }
        }
        console.log(x)
    }
    console.log(count)
    // document.getElementById("text_container").innerHTML = arr;
    return arr
}// func go
