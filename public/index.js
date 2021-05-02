const root_url = "http://node-env.eba-gnikufyj.ap-southeast-2.elasticbeanstalk.com/"
function buttons(spes) {
    window.location.href = root_url + spes
}
 
// document.getElementById("audio").src = "resources/Just_A_Ride.mp3";

// var audio = document.getElementById("audio");
// audio.play() 


var fade_active = "True"
function fade() {
    if (fade_active === "True"){
        document.querySelectorAll('.veil')[0].className += "-in"
        var x = document.querySelectorAll('.fade,.fade-out');
        for (let i = 0; i < x.length; i++) { 
            x[i].className += '-out';
        }
        setTimeout(function(){
            for (let i = 0; i < document.querySelectorAll('.fade-out').length; i++) { 
                document.querySelectorAll('.fade-out')[i].style.display = 'none';
            }
            document.querySelectorAll('.veil-in')[0].className = "veil"
            var x = document.querySelectorAll('.fade,.fade-out');
            for (let i = 0; i < x.length; i++) { 
                x[i].style.display = 'block';
                x[i].className = 'fade-in';
            }
            reloadCss()
        }, 2000)
    // fade_active = "False"
    } else {
        document.querySelectorAll('.veil-in')[0].className = "veil"
    }
}
function reloadCss(){
    var links = document.getElementsByTagName("link");
    for (var cl in links)
    {
        var link = links[cl];
        if (link.rel === "stylesheet")
            link.href += "";
    }
}