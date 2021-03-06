const fightOrSkip = () => {
    // ask player if they'd like to fight or skip using fightOrSkip function
    let promptFight = prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // validate input for fightOrSkip
    if (promptFight === "" || promptFight === null) {
        alert("You need to provide a valid answer! Please try again.");
        fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    switch (promptFight) {
        case 'fight':
            return false;
        case 'skip':
            //confirm skip
            let confirmSkip = confirm("Are you sure you'd like to quit?");
            // if yes (true), leave fight
            if (confirmSkip) {
                alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                //subtract monies
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                return true;
            } else {
                return false;
            }
        default:
            alert("You did not pick a valid option. Try again.");
            fightOrSkip();
    }
}
const checkHealth = (name, health) => {
    if (health <= 0) {
        return name + " has died!";
    } else {
        return name + " still has " + health + " health left";
    }
}

const fight = (enemy) => {

    // keep track of who goes first
    let isPlayerTurn = true;
    // randomly change turn order
    if (Math.random() > .5) {
        isPlayerTurn = false;
    }

    while(enemy.health > 0 && playerInfo.health > 0) {
        
        if (isPlayerTurn) {
            // ask player if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }

            //Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and use that result to update the value in the 'enemy.health' variable.
            let damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            // check enemy's health
            alert(checkHealth(enemy.name, enemy.health));
            if (enemy.health <= 0) {
                // award player money for winning
                playerInfo.money = playerInfo.money + 20;
                // leave while() loop since enemy is dead
                break;
            }
        } else {                
            // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health' variable.
            damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            // check player's health
            alert(checkHealth(playerInfo.name, playerInfo.health));
            // kicks you out of the loop/fight if you are dead
            if (playerInfo.health <= 0) {
                break;
            }     
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
        
    }
}

const startGame = () => {
    // reset player stats
    playerInfo.reset();
    for ( i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health >0) {
            alert("Welcome to Robot Gladiators! Round " + (i+1));
            let pickedEnemyObj = enemyInfo[i];
            // min max of 40-60hp for enemy @ random
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);
            // if we're not at the last enemy in the array
            if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
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
    alert("The game has now ended. Let's see how you did!");

    // Check local storage for high score, it it's not there, use 0
    let highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
        // if player has more money than the high score, player has new high score
        if (playerInfo.money > highScore) {

            localStorage.setItem("highscore", playerInfo.money);
            localStorage.setItem("name", playerInfo.name);

            alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
        } else {
            alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
        }
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
    let shopOptionPrompt = prompt("Would you like to 1:REFILL your health, 2:UPGRADE your attack, or 3:LEAVE the store? Please enter one: 1, 2, or 3 to make a choice.");
    // use switch to carry out action
    shopOptionPrompt = parseInt(shopOptionPrompt);
    
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
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

const getPlayerName = () => {
    let name = "";

    while (name === "" || name === null) {
        name = prompt("What's your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

const playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            this.health += 20;
            this.money -=7;
            alert("You just purchased some health! You now have " + playerInfo.health + " HP.")
        } else {
            alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            this.attack += 6;
            this.money -=7;
            alert("You just purchased some attack! You now have " + playerInfo.attack + " ATK.")
        } else {
            alert("You don't have enough money!");
        }
    }
}

// You can also log multiple values at once like this: console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

const enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];



startGame();
