var playerAttack = 100;
var playerHealth = 1000;
var enemyHealth = 0;
var attackDamage = 0;
var enemyAttack = 0;
var healAmount = 0;
var fleeChance = 0;
var fled = 0;
var sequence = 0;
var gameOver = 0;

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
    await sleep(800);
    fled = 1;
    enemyHealth = 0;
  } else {
    await sleep(800);
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
  playerHealth = 0;
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
  document.write("<br>");
  await sleep(3000);
  enemyHealth = 400;
  enemyAttack = 50;

  //attacking
  while (enemyHealth > 0) {
    properInput = 0;
    await sleep(400);
    if (playerHealth <= 0) {
      await sleep(2000);
      document.write("<br><br><br>");
      document.write("GAME OVER - YOU DIED");
      while (playerHealth <= 0) {
        await sleep(100000000);
      }
    }

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
        await sleep(1000);
        document.write("<br>");
        document.write("You did not enter one of the accepted commands!");
        await sleep(1000);
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
  await sleep(3000);
  document.write("<br><br>");
  document.write("The communication appears to have been severed. I suggest we follow the commander's orders and flee the training facility. The enemies must have set up some kind of jammer stopping me from using my location tracker or map, so we will have to guess our way out.");
  await sleep(4500);
  document.write("<br><br>");
  document.write("|You pilot your mech forwards, and enter a room with two other exits. One leads off to the left, and one to the right. Enter 'left' into the terminal if you would like to head left, or 'right' if you would like to head right.|");
  await sleep(4000);
  
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
      await sleep(1000);
      document.write("<br>");
      document.write("You did not enter one of the accepted commands!");
      await sleep(1000);
      properInput = 0;
    }
  }
}

//left
async function continueLeft() {
  await sleep(3000);
  document.write("<br>");
  document.write("|You pilot your mech through the tunnel leading to the left, and continue down it.|");
  await sleep(3000);
  document.write("<br>");
  document.write(playerName + ", my short-range sectors detect movement up ahead. Stay alert.");
  await sleep(3000);
  document.write("<br>");
  document.write("|As your mech clanks down the tunnel, you spot something lying on the floor to the right of you.|");
  await sleep(3500);
  document.write("<br>");
  document.write("|Looking closer at it, you realize it's the hunched form of a PDF cadet mech similar to yours. The cockpit has been blown open, red slicking the crater in its place.|");
  await sleep(4000);
  document.write("<br>");
  document.write("How terrible. That must have been a cadet trying to escape, like us. Most likely, whatever killed him is up ahead. Proceed with extreme caution.");
  await sleep(3500);
  document.write("<br>");
  document.write("|Your mech continues to lumber forwards, and your weak headlamps catch the glint of metal ahead of you.|");
  await sleep(3000);
  document.write("<br><br>");
  document.write("|A jet black mech similar to the one you fought before slings a cannon over its robotic shoulders and aims it at you.|");
  await sleep(3000);
  document.write("<br>");

  //attacking
  enemyHealth = 500;
  enemyAttack = 70;
  fled = 0;
  while (enemyHealth > 0) {
    properInput = 0;
    await sleep(400);
    if (playerHealth <= 0) {
      await sleep(2000);
      document.write("<br><br><br>");
      document.write("GAME OVER - YOU DIED");
      while (playerHealth <= 0) {
        await sleep(100000000);
      }
    }

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
        await sleep(1000);
        document.write("<br>");
        document.write("You did not enter one of the accepted commands!");
        await sleep(1000);
        properInput = 0;
      }
    }
  }

  //battle end
  sequence = 0;
  while (sequence == 0) {
    if (fled == 1) {
      await sleep(1000);
      document.write("<br><br>");
      document.write("|You fled the situation successfully, slamming the enemy aside and dashing down the corner and around abend. Has this brought you closer to the exit? Who knows? Certainly not you.|");
      sequence = 1;
    } else {
      await sleep(1000);
      document.write("<br><br>");
      document.write("|A well-placed shot from your gun pierces the generator in the middle of the enemy mech, causing it to cough smoke, then collapse.|");
      await sleep(3000);
      document.write("<br>");
      document.write("He deserved it, " + playerName + ".");
      await sleep(2500);
      enemyHealth = 400;
      heal = enemyHealth * (Math.random() * 0.5)
      playerHealth += heal;
      document.write("<br>");
      document.write("From the wreck of your defeated enemy, the autonomous repair drones built into your mech have been able to salvage enough material to repair " + heal + " health.");
      sequence = 1;
    }
  }

  await sleep(3000);
  document.write("<br><br>");
  document.write("We should keep moving.");
  await sleep(2500);
  document.write("<br>");
  document.write("|You continue down the hallway, spotting no further enemies. After a few minutes, the hallway opens up into a deserted training arena. From your previous experiences as a cadet, you remember that there will be two other exits out of this area, one straight ahead, and one to the left. Type 'straight' into the terminal if you wish to take the exit straight ahead, or 'left' if you want to take the exit to the left.|");
  await sleep(4500);
  properInput = 0;
  while (properInput == 0) {
    direction = prompt("Which direction do you choose?");
    if (direction.toLowerCase() == "straight") {
      continueLeftForward();
      properInput += 1;
    } else if (direction.toLowerCase() == "left") {
      continueLeftLeft();
      properInput += 1;
    } else {
      await sleep(1000);
      document.write("<br>");
      document.write("You did not enter one of the accepted commands!");
      await sleep(1000);
      properInput = 0;
    }
  }
}

//left+forward
async function continueLeftForward() {
  await sleep(1000);
  document.write("<br><br>");
  document.write("|You continue forwards, finding yourself in another hallway.|");
  await sleep(2000);
  document.write("<br>");
  document.write("My sensors are picking up a noise in front of us. Comparing it to the noises we encountered earlier, I can say with 82% certainty that there is an enemy in front of us.");
  await sleep(3000);
  document.write("<br><br>");
  document.write("|A figure looms out of the darkness. It is noticably larger than the enemies you've encountered before, with thick armor plating covering every inch of it. It carries a tower shield, and blocks the entirety of the passage, making escape impossible.|");
  await sleep(3000);
  document.write("<br><br>");

  //attacking
  enemyHealth = 1000;
  enemyAttack = 50;
  while (enemyHealth > 0) {
    properInput = 0;
    await sleep(400);
    if (playerHealth <= 0) {
      await sleep(2000);
      document.write("<br><br><br>");
      document.write("GAME OVER - YOU DIED");
      while (playerHealth <= 0) {
        await sleep(100000000);
      }
    }

    while (properInput == 0) {
      playerInput = prompt("Input your chosen action into the terminal.");
      if (playerInput.toLowerCase() == "attack") {
        attack();
        await sleep(2600);
        properInput += 1;
      } else if (playerInput.toLowerCase() == "flee") {
        await sleep(1000);
        document.write("<br>");
        document.write("You cannot flee in this battle, for the bulk of your enemy blocks the passage in front of you.");
        await sleep(1000);
        properInput = 0;
      } else {
        await sleep(1000);
        document.write("<br>");
        document.write("You did not enter one of the accepted commands!");
        await sleep(1000);
        properInput = 0;
      }
    }
  }
  
  //battle end
  await sleep(1000);
  document.write("<br><br>");
  document.write("|After receiving immense punishment from your mech's gun, something vital must have been damaged in the enemy mech. Sparks fly from its midsection and it collapses.|");
  await sleep(3000);
  document.write("<br>");
  document.write("My analysis determines that our armor is unlikely to hold out long enough to survive another fight. Hopefully we can make it out of this place soon.");
  await sleep(3000);
  enemyHealth = 1000;
  heal = enemyHealth * (Math.random() * 0.4)
  playerHealth += heal;
  document.write("<br>");
  document.write("From the wreck of your defeated enemy, the autonomous repair drones built into your mech have been able to salvage enough material to repair " + heal + " health.");

  //end sequence
  await sleep(3000);
  document.write("<br><br>");
  document.write("|You step over the smoking wreckage of the enemy mech, and continue through the hallway.|");
  await sleep(3000);
  document.write("<br>");
  document.write("|As you march down the passageway, the darkness lightens, then lifts completely. The soft red light of the backup lamps is drowned out by the crisp, white light spilling out of a plexiglass doorway in front of you. Normally intended to slide open when a mech approached them from the inside, the doors are wedged shut due to the training facility being on lockdown.|");
  await sleep(5000);
  document.write("<br>");
  document.write("I suggest you break the glass and get us out of here, " + playerName + ". I'm sure no one will mind us causing a bit of property damage to complete our directive from the commander. If there is anyone left to mind.");
  await sleep(4000);
  document.write("<br>");
  document.write("Enter 'break' into the terminal to smash the glass, and get's get out of this place.");
  await sleep(2500);

  //breaking door
  while (properInput == 0) {
    playerInput = prompt("Input your chosen action into the terminal.");
    if (playerInput.toLowerCase() == "break") {
      win();
      properInput += 1;
    } else {
      await sleep(1000);
      document.write("<br>");
      document.write("You did not enter one of the accepted commands!");
      await sleep(1000);
      properInput = 0;
    }
  }
}

//#winning
async function win() {
  await sleep(2000);
  document.write("<br><br><br>");
  document.write("|You smash through the doors, and step out into the sunlight. The charred, broken hulk of the training facility lies behind you, and a single road stretches out in front of you. Will you be able to warn planetary command in time? Have they been attacked as well? You don't know that, but you do know you still have a job to do...|");
  await sleep(5000);
  document.write("<br><br>");
  document.write("<h1>GAME OVER - YOU HAVE WON</h1>")
}


//left+left
async function continueLeftLeft() {
  await sleep(1000);
  document.write("<br><br>")
  document.write("|You turn to the left, and head through the passage.|")
  await sleep(2000);
  document.write("<br>")
  document.write(playerName + ", my scanners pick up a cloud of smoke or dust ahead. It might just be a collapsed section of the roof, or it could be a smokescreen. Proceed with caution.")
  await sleep(3000);
  document.write("<br>")
  document.write("|As you continue forwards into the cloud of smoke or dust, you hear a whistling sound. It sounds almost like the wind...|")
  await sleep(3000);
  document.write("<br><br>")
  document.write("|But it isn't. The whistling rapidly gets closer, and a large shell slams into the bulletproof glass making up your windshield, shattering it and exploding, killing you instantly.|")
  await sleep(2000);
  document.write("<br><br><br>");
  document.write("GAME OVER - YOU DIED");
}

//right
async function continueRight() {
  await sleep(2000);
  document.write("<br>");
  document.write("|You pilot your mech through the tunnel leading to the right, and continue down it.|");
  await sleep(3000);
  document.write("<br>");
  document.write("|As you clank down the hallway, it starts to get tighter and tighter. Soon, it's so tight that you can only just walk forwards without scraping the sides.|");
  await sleep(3500);
  document.write("<br>");
  document.write("This isn't good. If we get stuck in a fight, we won't be able to flee. However, we are left with no choice but to push onwards.");
  await sleep(3000);
  document.write("<br>");
  document.write("Watch out " + playerName + "! My sensors have picked up something moving in front of us.")
  await sleep(3000);
  document.write("<br><br>");
  document.write("|A jet black mech similar to the one you fought before emerges out of the darkness and slings a cannon over its robotic shoulders, aiming it at you.|");
  await sleep(3000);
  document.write("<br>");

  //attacking
  enemyHealth = 500;
  enemyAttack = 70;
  fled = 0;
  while (enemyHealth > 0) {
    properInput = 0;
    await sleep(400);
    if (playerHealth <= 0) {
      await sleep(2000);
      document.write("<br><br><br>");
      document.write("GAME OVER - YOU DIED");
      while (playerHealth <= 0) {
        await sleep(100000000);
      }
    }

    while (properInput == 0) {
      playerInput = prompt("Input your chosen action into the terminal.");
      if (playerInput.toLowerCase() == "attack") {
        attack();
        await sleep(2600);
        properInput += 1;
      } else if (playerInput.toLowerCase() == "flee") {
        await sleep(1000);
        document.write("<br>");
        document.write("Unfortunately, the hallway you are in is too tight for you to flee!");
        await sleep(1000);
        properInput = 0;
      } else {
        await sleep(1000);
        document.write("<br>");
        document.write("You did not enter one of the accepted commands!");
        await sleep(1000);
        properInput = 0;
      }
    }
  }

  //battle finish
  await sleep(2000);
  document.write("<br><br>");
  document.write("|You fire one last shot at the enemy mech, severing its power cable and sending sparks flying out around it. It falls to its knees, then collapses.|");
  await sleep(3000);
  enemyHealth = 400;
  heal = enemyHealth * (Math.random() * 0.5)
  playerHealth += heal;
  document.write("<br>");
  document.write("From the wreck of your defeated enemy, the autonomous repair drones built into your mech have been able to salvage enough material to repair " + heal + " health.");
  await sleep(3000);
  document.write("<br>");
  document.write("Good job " + playerName + ". Hopefully, we are near the end of our journey.");
  await sleep(3000);
  document.write("<br>");
  document.write("|You step over the sparking pile of metal and wire that was the enemy mech, and continue down the hallway. After a few more minutes of walking, the hallway opens up into another chamber. This chamber has one exit to the left and one straight ahead. Enter 'left' in the console if you would like to take the exit to the left, or 'straight' if you would like to take the exit straight ahead.|");
  await sleep(5000);
  properInput = 0;
  while (properInput == 0) {
    direction = prompt("Which direction do you choose?");
    if (direction.toLowerCase() == "left") {
      continueRightLeft();
      properInput += 1;
    } else if (direction.toLowerCase() == "straight") {
      continueRightStraight();
      properInput += 1;
    } else {
      await sleep(1000);
      document.write("<br>");
      document.write("You did not enter one of the accepted commands!");
      await sleep(1000);
      properInput = 0;
    }
  }
}

//heading right+left
async function continueRightLeft() {
  await sleep(2000);
  document.write("<br><br>");
  document.write("|You head through the tunnel to the left and guess what...? End up in another hallway.|");
  await sleep(3000);
  document.write("<br>");
  document.write("|After thirty seconds or so of walking, you come upon a storage chamber. Crates of parts, ammunition, and uniforms pile up on the walls. Several are scattered over the floor, spilling their contents out onto the burnished metal plates.|");
  await sleep(4000);
  document.write("<br>");
  document.write(playerName + ", there are two exits to this room as well. One is through a hatch in the ceiling in front of us, and the other is to our right. Type 'straight' if you would like to take the exit ahead of us, or 'right' if you would like to take the one to the right.");
  await sleep(4000);
  properInput = 0;
  while (properInput == 0) {
    direction = prompt("Which direction do you choose?");
    if (direction.toLowerCase() == "straight") {
      await sleep(1000);
      document.write("<br>");
      document.write("You climb up the hatch in the ceiling and into the floor above.")
      continueLeftLeft();
      properInput += 1;
    } else if (direction.toLowerCase() == "right") {
      continueRightLeftRight();
      properInput += 1;
    } else {
      await sleep(1000);
      document.write("<br>");
      document.write("You did not enter one of the accepted commands!");
      await sleep(1000);
      properInput = 0;
    }
  }
}

//heading right+left+right
async function continueRightLeftRight() {
  await sleep(2000);
  document.write("<br><br>");
  document.write("|You head through the exit to the right, and into an extension of the storage room. The ceiling has collapsed into the room, crushing several crates beneath it. Also, there's a giant enemy mech with a massive cannon on it, aiming straight at you.|");
  await sleep(4000);
  document.write("<br><br>");
  document.write("|The enemy mech primes it's cannon and aims towards you, electricity dancing over the coils of its gun.|");
  await sleep(3000);
  document.write("<br>");

  //battle start
  enemyHealth = 800;
  enemyAttack = 200;
  fled = 0;
  while (enemyHealth > 0) {
    properInput = 0;
    await sleep(400);
    if (playerHealth <= 0) {
      await sleep(2000);
      document.write("<br><br><br>");
      document.write("GAME OVER - YOU DIED");
      while (playerHealth <= 0) {
        await sleep(100000000);
      }
    }

    while (properInput == 0) {
      playerInput = prompt("Input your chosen action into the terminal.");
      if (playerInput.toLowerCase() == "attack") {
        attack();
        await sleep(2600);
        properInput += 1;
      } else if (playerInput.toLowerCase() == "flee") {
        await sleep(1000);
        document.write("<br>");
        document.write("|You turn around, and run back the way you came from. You soon realize this was a terrible idea, as a laser blast from the enemy mech slams into your back, obliterating your reactor and killing you instantly|")
        await sleep(2000);
        document.write("<br><br><br>");
        document.write("GAME OVER - YOU DIED");
        playerHealth = 0;
        while (playerHealth <= 0) {
          sleep(1000);
        }
      } else {
        await sleep(1000);
        document.write("<br>");
        document.write("You did not enter one of the accepted commands!");
        await sleep(1000);
        properInput = 0;
      }
    }
  }

  //battle end
  await sleep(2000);
  document.write("<br>");
  document.write("|A final blast from your cannon blows the enemy to pieces, and you realize there is no exit to this room. Your only option is to head back to the first storeroom and take the other exit.|");
  await sleep(4000);
  document.write("|You clank back to the first room, and climb up the hatch in the ceiling.|")
  continueLeftLeft();
}

//heading right+straight
async function continueRightStraight() {
  await sleep(2000);
  document.write("<br><br>");
  document.write("|You head through the tunnel straight ahead and end up in... another hallway. The people that designed this building really must have liked hallways.|");
  await sleep(3000);
  document.write("<br>");
  document.write("My sensors are not picking up any movement ahead. That hopefully means there are no enemies. As always, proceed with caution.");
  await sleep(3000);
  document.write("<br>");
  document.write("|You continue forward, and hear a crackling sound.|");
  await sleep(3000);
  document.write("<br>");
  document.write("My sensors cannot pick up the source of this sound. Be very careful.");
  await sleep(3000);
  document.write("<br>");
  document.write("|You creep forwards cautiously, and the cracking becomes louder. Too late, you look above you, and spiderweb cracks snaking through the roof. You hold up your robotic arm, but that is not enough to stop the torrent of concrete and steel that falls upon you. You are crushed.|");
  await sleep(2000);
  document.write("<br><br><br>");
  document.write("GAME OVER - YOU DIED");
}

game();