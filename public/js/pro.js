console.log("proc.js")

var proc = []
var arr = []
console.log(typeof arr)
console.log(" arr", arr)

for (let loop = 0; loop < 3; loop++){
    proc = []

    for (let li = 0; li < loop; li++){ proc.push(1) }
    for (let li = 0; li < 6 - loop; li++){ proc.push(0) }
    arr.push(proc)
    for (let i = 0; i < 6; i++){

        console.log("proc", proc)
        console.log(" arr", arr)
        
        console.log(" arr", arr)
        console.log(typeof arr)

        
        
    }
}