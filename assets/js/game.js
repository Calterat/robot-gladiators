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

        let promptFight = prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if (promptFight === 'SKIP' || promptFight === 'skip') {
            //confirm skip
            let confirmSkip = confirm("Are you sure you'd like to quit?");
            // if yes (true), leave fight
            if (confirmSkip) {
                alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract monies
                playerMoney = Math.max(0, playerMoney - 10);
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
            let damage = randomNumber(playerAttack - 3, playerAttack);
            enemyHealth = Math.max(0, enemyHealth - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

            // check enemy's health
            alert(checkhealth(enemyName, enemyHealth));
            if (enemyHealth <= 0) {
                break;
             }
        
            // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable.
            damage = randomNumber(enemyAttack - 3, enemyAttack);
            playerHealth = Math.max(0, playerHealth - damage);

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

const startGame = () => {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for ( i = 0; i < enemyNames.length; i++) {
        if (playerHealth >0) {
            alert("Welcome to Robot Gladiators! Round " + (i+1));
            let pickedEnemyName = enemyNames[i];
            // min max of 40-60hp for enemy @ random
            enemyHealth = randomNumber(40, 60);
            fight(pickedEnemyName);
            // if we're not at the last enemy in the array
            if (i < enemyNames.length - 1 && playerHealth > 0) {
                // ask if player want to use the sore before next round
                let storeConfirm = confirm("The fight is over, visit the store before the next round?");
                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            alert("You have lost your robot in battle! Game Over!");
            break;
        }
        
    }
    // after the loop ends, player is either out of heatlh or enemies to fight, so run the endGame function
    endGame();
}

const endGame = () => {
    // if player is still alive, player wins!
    if (playerHealth > 0) {
        alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        alert("You've lost your robot in battle.");
    }

    let playAgainConfirm = confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    } else {
        alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
    
}

const shop = () => {
    // ask player what they'd like to do
    let shopOptionPrompt = prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                alert("Refilling player's health by 20 for 7 dollars.");

                // increase health and decrease money
                playerHealth += 20;
                playerMoney -= 7;
            } else {
                alert("You don't have enough money!");
            }
            break;
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase health and decrease money
                playerAttack += 6;
                playerMoney -= 7;
            } else {
                alert("You don't have enough money!");
            }
            break;
        case "LEAVE":
        case "leave":
            alert("Leaving the store.");

            // do nothing, so function will end
            break;
        default:
            alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
}

const randomNumber = (min, max) => {
    let value = Math.floor((Math.random() * (max - min + 1)) + min);
    return value; 
}





startGame();
