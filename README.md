# Spacebattle

Build a game of battling alien spaceships using Javascript, HTML, and CSS.
 

Earth has been attacked by a horde of aliens! You are the captain of the USS HelloWorld, on a mission to destroy every last alien ship.

Battle the aliens as you try to destroy them with your lasers.

There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. 

 

The HTML should show the starting and final hull of the ships. 


AFTER the game, prompt the user letting them know if they won or lost, and asking if they would like to play again. 

A game round would look like this:
You attack the first alien ship (update alien ship in html)

If the ship survives, it attacks you (update your ship in html)

If you survive, you attack the ship again

If it survives, it attacks you again … etc

If you retreat, the game is over, perhaps leaving the game open for further developments or options

You win the game if you destroy all of the aliens

You lose the game if you are destroyed

User is prompted to play again
 

Ship Properties
hull is the same as hitpoints. If hull reaches 0 or less, the ship is destroyed

firepower is the amount of damage done to the hull of the target with a successful hit

accuracy is the chance between 0 and 1 that the ship will hit its target

Your spaceship, the USS HelloWorld should have the following properties:

hull - 20
firepower - 5
accuracy - .7
The alien ships should each have the following ranged properties determined randomly:

hull - between 3 and 6
firepower - between 2 and 4
accuracy - between .6 and .8
You could be battling six alien ships each with unique values.

Example use of accuracy to determine a hit:

if (Math.random() < alien[0].accuracy) {
    console.log('You have been hit!');
}
