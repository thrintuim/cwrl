# CWRL
An attempt to recreate a certain wargame about right of way and big guns in the online space.
0.1.0 release will be amatuer night!

## Planned releases

Releases are mostly planned out to version 0.1.0.

### 0.0.1 - Initial Backend
* Use NodeJS to create a game board
* Add generic objects to the board
* Move the objects around

### 0.0.2 - Initial front end
* Provide a front end for users to interact with objects
* When a user navigates to the host an object is created for them they can use controls to move the object around
* object location is updated for all players connected to the host
* max 4 players per host

### 0.0.3 - Taking turns
* First player to navigate to the game is the host
* Other players can join by navigating to the game
* Host decides when to start
* Objects now have velocity and the ability to turn
* Each player plots their movement and submits
* once all players have submitted their moves all players are updated
plotting involves
	 * increasing or decreasing velocity
	 * turning the object

### 0.0.4 - Out of control
* Objects are now explicitly cars
* Each manuever a player takes affects their control of the car. possible values are:

  * In control
  * Losing control (possibility of skid, fishtail, or worse)
  * out of control (guarantee of at least a skid, fishtail, or worse)

* Turning a car involves moving along an arc rather than rotating about an axis
* Zoom and pan ability for gameboard?

### 0.0.5 - Race Day
The game board gets some love.
* Game board can now contain static objects
* Cars can collide with static objects and each other - no notion of damage yet
* Bounds for the game board can now be defined
* Should allow for the creation of a "track" that players can race around

### 0.0.6 - Smash it up
* damage from collisions and loss of control
* cars can push each other based on conservation of momentum

### 0.0.7 - Fire in the hole
* direct fire weapons added to cars
* targeting other players

### 0.0.8 - Dropping a duece
* Dropped weapons, smoke, etc.

### 0.0.9 - Eagle eye
* called shots to tires.
* targeting lasers?

### 0.1.0 - Amateur night - Player perspective
* Multiple sessions can be hosted on a single server
* Players can choose to "host" which provides a code they can give to other players to join
* Players will all be given the same car (a murderous mini) and placed in an arena
* Arena layout is dependent on number of players
* Players duke it out until one is left standing

### Beyond 0.1.0
Ideally I would like to allow players to engage with a larger world. Initially this might mean gaining money from amateur night and then entering in divisions. Players should also be able to make custom vehicles given a budget. include at least motorcycles, maybe big rigs. players should be able to communicate with each other through a chat application. more long term divising a way to incorporate travel between cities, things that happen in the cities themselves
perhaps an optional storyline. _Maybe_ provide a mechanism to allow users to search for open games. safely import user created cars into instances. safely import user characters into instances. track what has happened in a given game instance. allow users to enter back into a given game instance with the code.
