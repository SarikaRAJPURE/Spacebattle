// SPACE BATTLE GAME
// Generate a random number between min and max, including both min and max
const randIntNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Generate a decimal number between min and max, including both min and max
const randDecimalNum = (min, max) => {
    return +((Math.random() * (max - min)) + min).toFixed(1);
}
let shipNum = 0;
//1. Make the  Ship class
class Ship {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    attack(target) {
        if (Math.random() < this.accuracy) {
            //shipName.hull -= this.firepower;
            console.log(`%c You HIT the ${target.name} !!!`,
                "color: red; border: 1px solid grey; font-size: 18px;");
            return true;
        } else {
            return false;
        }
    }
}
let USSHelloWorld = new Ship("USSHelloWorld", 20, 5, 0.7);
//2. make factory class for alien ships
class AlienShip {
    constructor() {
        this.alienShips = [];
    }
    createalienShips() {
        //To generate alien ships in the range of 1 to 6
        let numOfAlienShips = randIntNum(1, 6);
        console.log(`numOfAlienShips: ${numOfAlienShips}`);
        for (let i = 0; i < numOfAlienShips; i++) {
            let enemyShip = new Ship("Alien Ship " + (i + 1),
                randIntNum(3, 6), //hull between 3 to 6
                randIntNum(2, 4), // firepower between 2 to 4
                randDecimalNum(0.6, 0.8)); //accuracy between 0.6 to 0.9
            this.alienShips.push(enemyShip);
        }
    }
}
//Create instance of alein ship and create random no. of alien ships 
let EnemyFleet = new AlienShip();
EnemyFleet.createalienShips();
//console.log(EnemyFleet.alienShips);
let fleet = EnemyFleet.alienShips;
let loaddata = () => {
    //1. Set message to start game
    document.getElementById('msg').innerText = "To Begin Space Battle press Start Game!";
    //2. set data of my spaceship on web page
    let myshipname = document.getElementById('my-ship-name');
    myshipname.innerText = USSHelloWorld.name;
    let myshiphull = document.getElementById('my-ship-hull');
    myshiphull.innerText = USSHelloWorld.hull;
    let myshipfirepower = document.getElementById('my-ship-firepower');
    myshipfirepower.innerText = USSHelloWorld.firepower;
    let myshipaccuracy = document.getElementById('my-ship-accuracy');
    myshipaccuracy.innerText = USSHelloWorld.accuracy;
    //3. set data of alien spaceships on web page
    for (let shipNum = 0; shipNum < EnemyFleet.alienShips.length; shipNum++) {
        let enemyshipdiv = 'ship' + (shipNum + 1);
        let enemydiv = document.getElementById(enemyshipdiv);
        enemydiv.style.visibility = "visible";
        let namediv = 'enemy' + (shipNum + 1) + '-name';
        let enemyname = document.getElementById(namediv);
        enemyname.textContent = EnemyFleet.alienShips[shipNum].name;
        let hulldiv = 'enemy' + (shipNum + 1) + '-hull';
        let enemyhull = document.getElementById(hulldiv);
        enemyhull.textContent = EnemyFleet.alienShips[shipNum].hull;
        let firepowerdiv = 'enemy' + (shipNum + 1) + '-firepower';
        let enemyfirepower = document.getElementById(firepowerdiv);
        enemyfirepower.textContent = EnemyFleet.alienShips[shipNum].firepower;
        let accuracydiv = 'enemy' + (shipNum + 1) + '-accuracy';
        let enemyaccuracy = document.getElementById(accuracydiv);
        enemyaccuracy.textContent = EnemyFleet.alienShips[shipNum].accuracy;
    }
}

let shipsBattle = (ship1, ship2) => {
    // At a time USS ship will attack only one alien ship.
    let ships = [ship1, ship2];
    let attack = false;
    let attacking = 0;
    let beingAttacked = 1;
    let temp;
    //shootSound.play();
    while (ships[beingAttacked].hull > 0) {
        //While the hull is greater than 0...Keep attacking
        if (ships[beingAttacked].hull > 0) {
            console.log("\n");
            console.log(
                `%c ${ships[attacking].name} is attacking ${ships[beingAttacked].name}`,
                "color: green; border: 1px solid grey; font-size: 18px;"
            );
            // Generate the attack on the enemy ship
            attack = ships[attacking].attack(ships[beingAttacked]);
            if (attack === true) {
                //shootSound.play();
                enemydeathSound.play();
                //update hull on web page                
                let hulldiv = 'enemy' + (shipNum + 1) + '-hull';
                let enemyhullElement = document.getElementById(hulldiv);
                enemyhullElement.textContent = ship2.hull;
                let currentHull = +enemyhullElement.innerText;
                ships[beingAttacked].hull -= ships[attacking].firepower;
                let finalHull = ships[beingAttacked].hull;
                enemyhullElement.style.color = "red";
                enemyhullElement.innerText = finalHull;
                console.log(`${ships[beingAttacked].name}'s finalHull: ${finalHull}`);
                if (finalHull > 0) {
                    console.log(
                        `%c Attack Successful! ${ships[beingAttacked].name} has ${ships[beingAttacked].hull} hull remaining`,
                        "color: green; font-weight: bold; font-size: 16px;"
                    );
                }
            } else {
                console.log(
                    `%c Attack Unsuccessful! ${ships[beingAttacked].name} Hull: ${ships[beingAttacked].hull}`,
                    "color: red; font-size: 16px;"
                );
            }
            // Check if the ship being attacked is still alive
            if (ships[beingAttacked].hull <= 0) {
                enemydeathSound.play();
                //replace image with dead ship image
                let imagediv = 'Enemy' + (shipNum + 1);
                let imagesrc = document.getElementById(imagediv).setAttribute('src', './images/enemy_ship_dead.png');
                enemydeathSound.play();
                document.getElementById('msg-div').innerText = `${ships[beingAttacked].name} has been destroyed`;
                document.getElementById('msg-div').setAttribute("class", "div-border-red");
                if (ships[beingAttacked] === USSHelloWorld) {
                    ///If the USS SHip is being attacked and is destroyed THEN alert player Game is Over
                    alert("Game Over!!!");
                } else if (ships[beingAttacked].name === fleet[fleet.length - 1].name) {
                    document.getElementById('msg-div').innerText = `${ships[beingAttacked].name} destroyed!\nAlien fleet has been destroyed!\nYou have been victorious!`;
                    document.getElementById('msg-div').setAttribute("class", "div-white");
                    const hiddenItems = document.querySelectorAll(".hiderow");
                    for (let i = 0; i < hiddenItems.length; i++) {
                        hiddenItems[i].style.display = "none";
                    }
                    document.getElementById('msg-div').innerText =
                        "Game Over\nWould you like to play again?";
                    document.querySelector('.yesno').style.visibility = "visible";

                    /* --------------
                    alert(
                        `%c ${ships[beingAttacked].name} destroyed!\nAlien fleet has been destroyed!\nYou have been victorious!`,
                        "color: green;"
                    ); */
                } //If USS destroys alien fleet, then alert player of victory
                else {
                    // upadate USS hull
                    let myshiphull = document.getElementById('my-ship-hull');
                    myshiphull.innerText = USSHelloWorld.hull;
                    myshiphull.style.color = "red";
                    //replace image with dead ship image
                    let imagediv = 'Enemy' + (shipNum + 1);
                    let imagesrc = document.getElementById(imagediv).setAttribute('src', './images/enemy_ship_dead.png');
                    document.getElementById('msg-div').innerText = `${ships[beingAttacked].name} destroyed!!\n${USSHelloWorld.name
                        } Hull: ${USSHelloWorld.hull}\n${ships[beingAttacked].name
                        } Hull: ${ships[beingAttacked].hull}`
                    //\nWould you like to ATTACK the next ship or RETREAT from battle?
                    document.getElementById('msg-div').setAttribute("class", "div-border-red");
                    document.getElementById('btn-group').style.visibility = "visible";
                    /* playerResponse = prompt(
                        `${ship2.name} destroyed!!\n${USSHelloWorld.name
                        } Hull: ${USSHelloWorld.hull
                        }\nWould you like to ATTACK the next ship or RETREAT from battle?`,
                        ""
                    ); */
                    shipNum += 1; //PROMPT PLAYER IF THEY WNAT TO CONTINUE OR RETREAT
                    //--checkPlayerPrompt();
                    return;
                }
            } else {
                // Switch the attacking/attacked ships
                temp = attacking;
                attacking = beingAttacked;
                beingAttacked = temp;
            }
        }
    }
};

// Function to check player prompts
/* let checkPlayerPrompt = () => {
    let responseUpperCase = playerResponse.toUpperCase();
    if (responseUpperCase === "ATTACK") {
        shipsBattle(USSHelloWorld, fleet[shipNum]);
    } else if (responseUpperCase === "RETREAT") {
        alert("Game Over! You Live to Fight Again Another Day.");
    }
};
 */

//4.set sound 
const shootSound = new Audio("https://sarikarajpure.github.io/spacebattle/sounds/shoot.wav");
const enemydeathSound = new Audio("https://sarikarajpure.github.io/spacebattle/sounds/enemy-death.wav");
const backgroundsound= new Audio("https://sarikarajpure.github.io/spacebattle/sounds/backgroundmusic.mp3");

document.getElementById('yesbtn').addEventListener('click', () => {
    console.log("%c Spacebattle", "font-size: 40px");
    document.getElementById('msg-div').innerText = `Would you like to play again`;
    location.reload();
});

document.getElementById('nobtn').addEventListener('click', () => {
    backgroundsound.pause();
    location.reload();
    alert("I really hope you enjoyed my game, thank you so much for playing!");
    });

document.getElementById('attack').addEventListener('click', () => {
    shipsBattle(USSHelloWorld, fleet[shipNum]);
    shootSound.play();
});

document.getElementById('retreat').addEventListener('click', () => {
    alert("Game Over! You Live to Fight Again Another Day.");
    location.reload();
});
let startGame = () => {
    backgroundsound.play();
    document.getElementById('msg').style.display = "none";
    console.log("%c Spacebattle", "font-size: 40px");
    document.getElementById('msg-div').innerText = `Alien fleet approaching!`;
    document.getElementById('btn-group').style.visibility = "visible";
    /* playerResponse = window.prompt(
        "Alien fleet approaching\nWould you like to ATTACK the first ship or RETREAT?",
        ""
    ); 
    checkPlayerPrompt();*/
};

let button = document.getElementById("btn");
button.addEventListener('click', startGame);



