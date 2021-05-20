'use strict';
let perlin = {
    rand_vect: function(){
        //theta = a random number from 0 to 1, times 2, times the value of pi
        let theta = Math.random() * 2 * Math.PI;
        //sets x to the cosine of theta, and y to the sine of theta
        return {x: Math.cos(theta), y: Math.sin(theta)};
    },
    //runs a function taking x, y, and two inputted numbers called vx and vy
    dot_prod_grid: function(x, y, vx, vy){
        let g_vect;
        //lets d_vect equal an array containing x and y, which are each now equal to (math.cos(theta) - vx) and (math.sin(theta) - vy)
        let d_vect = {x: x - vx, y: y - vy};
        //if the gradients of the global object are vx and vy...
        if (this.gradients[[vx,vy]]){
            //set g_vect to said gradients
            g_vect = this.gradients[[vx,vy]];
        } else { //else...
            //set g_vect to a random vector of the global object
            g_vect = this.rand_vect();
            //sets the gradients of the global object to g_vect
            this.gradients[[vx, vy]] = g_vect;
        }
        //returns the x value in the d_vect array and multiplies it by the x value in the g_vect array, and adds it to the y value of the d_vect array multiplied by the y value of the g_vect array
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    },
    //calls a function accepting x as a parameter when smootherstep is called
    smootherstep: function(x){
        //returns 6 * x ^ 5 - 15 * x ^ 4 + 10 * x ^ 3
        return 6*x**5 - 15*x**4 + 10*x**3;
    },
    //calls a function acceptiung x, a, and b as parameters, when 'interp' is called
    interp: function(x, a, b){
        //returns a + the smootherstep function of the global variable * (b-a)
        return a + this.smootherstep(x) * (b-a);
    },
    //calls a function accepting no parameters when seed is called.
    seed: function(){
        //makes two empty lists in the global variable called gradients and memory
        this.gradients = {};
        this.memory = {};
    },
    //calls a function accepting x and y as parameters when get is called
    get: function(x, y) {
        //senses whether this.memory has the property [x,y]
        if (this.memory.hasOwnProperty([x,y]))
        //if so, returns this.memory[[x,y]]
            return this.memory[[x,y]];
        //declares xf and lets it equal the floor of x
        let xf = Math.floor(x);
        //declares xf and lets it equal the floor of y
        let yf = Math.floor(y);
        //interpolate
        let tl = this.dot_prod_grid(x, y, xf,   yf);
        let tr = this.dot_prod_grid(x, y, xf+1, yf);
        let bl = this.dot_prod_grid(x, y, xf,   yf+1);
        let br = this.dot_prod_grid(x, y, xf+1, yf+1);
        let xt = this.interp(x-xf, tl, tr);
        let xb = this.interp(x-xf, bl, br);
        let v = this.interp(y-yf, xt, xb);
        this.memory[[x,y]] = v;
        return v;
    }
}
perlin.seed();


