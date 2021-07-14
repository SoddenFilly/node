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

            // if (x >= RES*0.99){
            //     arr = arr + [1]
            // }

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


            // console.log(x)
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
        }    
    }
    return arr
}// func go
