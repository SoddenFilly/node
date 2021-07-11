console.log("proc.js")

var proc = []
var arr = []
console.log(typeof arr)
console.log(" arr", arr)

for (let loop = 0; loop < 3; loop++){
    proc = []

    for (let li = 0; li < loop; li++){ proc.push(1) }
    for (let li = 0; li < 6 - loop; li++){ proc.push(0) }

    for (let i = 0; i < 6; i++){

        console.log("proc", proc)
        console.log(" arr", arr)
        arr.push(proc)
        console.log(" arr", arr)
        console.log(typeof arr)

        if (proc[i] == 0){
            // arr.push(0)
        }
        else if (proc[i] == 1){
            // arr.push(1)
            if (proc[i+1] == 0){
                proc[i+1] = 1
                proc[i] = 0
            }
            else if (proc[i+1] == 1){
                proc[i+2] = 1
                proc[i+1] = 0
                i += 1
            }
            if (i == proc.length-1 && loop > 1){
                // console.log("---")
                for (let loo = proc.length-2; loo >= 0; loo--){
                    // console.log(loo)
                    if (proc[loo] == 1){
                        proc[loo+1] = 1
                        proc[loo] = 0

                        proc[loo+2] = 1
                        if (loo == proc.length-3){
                            proc[i] = 1
                        }
                        else{
                            proc[i] = 0
                        }
                        
                        // console.log("   2",proc)

                        i = 0
                        break
                    }
                    // console.log("   2",proc)
                }
            }
        }
    }
}