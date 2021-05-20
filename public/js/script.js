if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  location.replace("http://node-env.eba-gnikufyj.ap-southeast-2.elasticbeanstalk.com")
}
function myFunction() {
  var x = document.getElementById("password_id");
  if (x.type === "password") {
    x.type = "text";
    document.getElementById('eye_blind').style.display = 'none';
    document.getElementById('eye_see').style.display = 'inline';
  } else {
    x.type = "password";
    document.getElementById('eye_blind').style.display = 'inline';
    document.getElementById('eye_see').style.display = 'none';
  }
}
