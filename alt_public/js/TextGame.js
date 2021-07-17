var playerAttack = 100;
var playerHealth = 1000;
var enemyHealth = 0;
var attackDamage = 0;
var enemyAttack = 0;
var healAmount = 0;
var fleeChance = 0;
var fled = 0;
var sequence = 0;

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
  document.write("You attacked the enemy for " + attackDamage + " damage! You estimate the enemy has " + enemyHealth + " health left.");
  await sleep(800);
  attackDamage = (enemyAttack * (Math.random() * 2.2));
  playerHealth -= attackDamage;
  document.write("<br>");
  document.write("The enemy attacked you back for " + attackDamage + " damage, leaving you with " + playerHealth + " health left!");
}

async function flee() {
  fleeChance = (Math.random() * 11);
  if (fleeChance > 5) {
    sleep(800);
    fled = 1;
    enemyHealth = 0;
  } else {
    sleep(800);
    attackDamage = (enemyAttack * (Math.random() * 2.2));
    playerHealth -= attackDamage;
    document.write("<br>");
    document.write("You attempt to flee, but the enemy moves to block you, attacking your exposed flank.  You take " + attackDamage + " damage, leaving you with " + playerHealth + " health left.")
  }
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
  document.write(playerName + ", congratulations for passing your piloting exam! Unfortunately, we do not have much time to celebrate. An unknown assailant is approaching us at high speeds. Quickly, ready your weapons!");
  await sleep(4000);
  document.write("<br><br><br>");

  //starting battle
  document.write("|An unknown mech charges at you, a massive sword held in its robotic hands.|");
  await sleep(2500);
  document.write("<br>");
  document.write("In case you've forgotten, you can input 'Attack' into your terminal to attack your enemy, or 'Flee' to attempt to flee the battle. Try to attack the enemy mech now.");
  await sleep(3000);
  enemyHealth = 400;
  enemyAttack = 50;

  //attacking
  while (enemyHealth > 0) {
    properInput = 0;
    sleep(400);

    while (properInput == 0) {
      playerInput = prompt("Input your chosen action into the terminal.");
      if (playerInput.toLowerCase() == "attack") {
        attack();
        await sleep(2600);
        properInput += 1;
      } else if (playerInput.toLowerCase() == "flee") {
        flee();
        await sleep(1800);
        properInput += 1;
      } else {
        sleep(1000);
        document.write("<br>")
        document.write("You did not put in one of the accepted commands!")
        await sleep(1000)
        properInput = 0;
      }
    }
  }
  //battle end

  while (sequence == 0) {
    if (fled == 1) {
      await sleep(1000);
      document.write("<br><br>");
      document.write("|You fled the situation successfully, running down the maze of corridors in front of you until the footsteps of your enemy faded away. What now?|")
      await sleep(3000);
      document.write("<br>");
      document.write("While your chances of winning that fight were high, conserving your strength for later down the line may have been a wise choice. It is unknown to me how many more of these enemies may be out there.");
      sequence = 1;
    } else {
      await sleep(1000);
      document.write("<br><br>");
      document.write("|The enemy mech crumbles to pieces as the last of your shots punches through its cockpit, ending the life of its pilot.|");
      await sleep(2000);
      document.write("<br>");
      document.write("Congratulations on your first kill, " + playerName + "!");
      await sleep(2000);
      enemyHealth = 400;
      heal = enemyHealth * (Math.random() * 0.5)
      playerHealth += heal;
      document.write("<br>");
      document.write("From the wreck of your defeated enemy, the autonomous repair drones built into your mech have been able to salvage enough material to repair " + heal + " health.");
      sequence = 1;
    }
  }
  
  await sleep(3500);
  document.write("<br><br>");
  document.write("It looks like we are receiving a public broadcast from... the commander.  Patching through now.");
  await sleep(3000);
  document.write("<br><br>");
  document.write("|A grizzled, bearded face appears on the screen in front of you. You recognize him as the commander of the Planetary Defense Force Cadet Training Facility (PDFCT), where you just graduated from, and where you assume you are now. The commander clears his throat nervously, before speaking.|");
  await sleep(4500);
  document.write("<br>");
  document.write("'Greetings, my fellow pilots. I regret to deliver to you this dark news in a time where we should be celebrating the graduation of our senior cadets.'");
  await sleep(3500);
  document.write("<br>");
  document.write("'As you have undoubtably noticed, the training facility is under attack from an enemy we've never encountered before. In fact, I can hear their clanking outside my door right now, so I don't have much time. We have no idea where they came from, or what their motive is, but my spotters reported their numbers in the thousands before I lost contact with them.'");
  await sleep(4500);
  document.write("<br>");
  document.write("'We have no hope of stopping these unknown assailents, whoever they are. We have little hope of surviving the next few hours. That is why I call on you all; my teachers, my cadets, my graduates, to waste no time or effort in getting out of this place as fast as possible. Our only hope is to contact planetary command and warn them of this threat before it reaches them.'");
  await sleep(5000);
  document.write("<br>");
  document.write("'Now go! Time is of th-'");
  await sleep(2000);
  document.write("<br><br>");
  document.write("The communication appears to have been severed. I suggest we follow the commander's orders and flee the training facility. The enemies must have set up some kind of jammer stopping me from using my location tracker or map, so we will have to guess our way out.");
  await sleep(3500);
  document.write("<br><br>");
  document.write("|You pilot your mech forwards, and enter a room with two other exits. One leads off to the left, and one to the right. Enter 'left' into the terminal if you would like to head left, or 'right' if you would like to head right.|");
  await sleep(3000);
  
  //choosing directions
  properInput = 0;
  while (properInput == 0) {
    direction = prompt("Which direction do you choose?");
    if (direction.toLowerCase() == "left") {
      continueLeft();
      properInput += 1;
    } else if (direction.toLowerCase() == "right") {
      continueRight();
      properInput += 1;
    } else {
      sleep(1000);
      document.write("<br>")
      document.write("You did not put in one of the accepted commands!")
      await sleep(1000)
      properInput = 0;
    }
  }
}

async function continueLeft() {
  await sleep(2000);
  document.write("<br>");
  document.write("|You pilot your mech through the tunnel leading to the left, and continue down it.|");
}

async function continueRight() {
  await sleep(2000);
  document.write("<br>");
  document.write("|You pilot your mech through the tunnel leading to the right, and continue down it.|");
}


game();