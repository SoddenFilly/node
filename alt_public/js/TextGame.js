var playerAttack = 100;
var enemyHealth = 500;
var attackDamage = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dotdotdot() {
  await sleep(800);
  document.write(".");
  await sleep(800);
  document.write(".");
  await sleep(800);
  document.write(".");
}

async function attack() {
  await sleep(800);
  attackDamage = (playerAttack * (Math.random() * 2.2));
  enemyHealth -= attackDamage;
  document.write("<br>");
  document.write("You attacked the enemy for " + attackDamage + " damage!");
}

async function flee() {
  console.log("bepsi");
}
  
async function game() {
  
  //initialization
  document.write("Initializing");
  await sleep(1);
  document.write("Initializing");
  dotdotdot();
  await sleep(3400);
  document.write("<br>");
  document.write("Starting booting sequence");
  dotdotdot();
  await sleep(3400);
  document.write("<br>")
  document.write("Running system check");
  dotdotdot();
  await sleep(3400);
  document.write("System Check Failed");
  await sleep(500);
  document.write("<br>");
  document.write("Running system check two");
  dotdotdot();
  await sleep(3400);
  document.write("<br>");
  document.write("System check succeeded. Booting up AI");

  //start game
  await sleep(2000);
  document.write("<br><br>");
  document.write("Hello pilot.");
  await sleep(2000);
  document.write("<br>");
  document.write("I am BZ180-62D, your combat AI.");
  await sleep(2000);
  document.write("<br>");
  document.write("Please input your pilot callsign so we can continue.");
  await sleep(2000);
  playerName = prompt("Input your callsign here.");
  document.write("<br>");
  document.write("Searching database for pilot callsign");
  dotdotdot();
  await sleep(2600);
  document.write("<br>");
  document.write("Pilot callsign found.")
  await sleep(1000);
  document.write("<br><br>");
  document.write(playerName + ", congradulations for passing your piloting exam! Unfortunately, we do not have much time to celebrate. An unknown assailant is approaching us at high speeds. Quickly, ready your weapons!");
  await sleep(4000);
  document.write("<br><br><br>");

  //starting battle
  document.write("|An unknown mech charges at you, a massive sword in its robotic hands.|");
  await sleep(2000);
  document.write("<br>");
  document.write("In case you've forgotten, you can input 'Attack' into your terminal to attack your enemy, or 'Flee' to attempt to flee the battle. Try to attack the enemy mech now.");
  await sleep(3000);
  enemyHealth = 400;
  //attacking
  while (enemyHealth > 0) {
    properInput = 0;
    sleep(400);

    while (properInput == 0) {
      playerInput = prompt("Input your chosen action into the terminal.");
      if (playerInput.toLowerCase() == "attack") {
        attack();
        await sleep(1800);
        properInput += 1;
      } else if (playerInput.toLowerCase() == "flee") {
        flee();
        await sleep(1800);
        properInput += 1;
      } else {
        sleep(1000);
        document.write("<br>")
        document.write("You did not put in one of the accepted commands!")
        properInput = 0;
      }
    }
  }
  //battle end
  sleep(1000);
  document.write("<br><br>");
  document.write("|The enemy mech crumbled to pieces as the last of your shots punches through its cockpit, ending the life of its pilot.|")
  sleep(2000);
  document.write("<br>");
  document.write("Congradulations on your first kill, " + playerName + "!");
}

game();