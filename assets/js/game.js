let playerName = prompt("What is your robot's name?");
let playerHealth = 100;
let playerAttack = 10;
let playerMoney = 10;

// You can also log multiple values at once like this: console.log(playerName, playerAttack, playerHealth);

const enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
let enemyHealth = 50;
let enemyAttack = 12;


// Game States
// "WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less



const fight = (enemyName) => {

    while(enemyHealth > 0 && playerHealth > 0) {

        // Alert users that they are starting the round
        alert("Welcome to Robot Gladiators");

        let promptFight = prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if (promptFight === 'SKIP' || promptFight === 'skip') {
            //confirm skip
            let confirmSkip = confirm("Are you sure you'd like to quit?");
            // if yes (true), leave fight
            if (confirmSkip) {
                alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract monies
                playerMoney -= 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        if (promptFight === 'FIGHT' || promptFight === 'fight') {

            const checkhealth = (name, health) => {
                if (health <= 0) {
                    return name + " has died!";
                } else {
                    return name + " still has " + health + " health left";
                }
            }

            //Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable.
            enemyHealth -= playerAttack;

            // Log a resulting message to the console so we know that it worked.
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

            // check enemy's health
            alert(checkhealth(enemyName, enemyHealth));
            if (enemyHealth <= 0) {
                break;
             }
        
            // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable.
            playerHealth -= enemyAttack;

            // Log a resulting message to the console so we know that it worked.
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            // check player's health
            alert(checkhealth(playerName, playerHealth));
            // kicks you out of the loop/fight if you are dead
            if (playerHealth <= 0) {
                break;
            }
        }        
            

    }
}

for ( i = 0; i < enemyNames.length; i++) {
    let pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}

