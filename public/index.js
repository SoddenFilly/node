const root_url = "http://node-env.eba-gnikufyj.ap-southeast-2.elasticbeanstalk.com/"
function buttons(spes) {
    window.location.href = root_url + spes
}
function fade() {
    var x = document.querySelectorAll('.fade,.fade-out');
    for (let i = 0; i < x.length; i++) { 
        x[i].className += '-out';
    }
}