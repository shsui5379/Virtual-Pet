/**
 * Initializes a Pet, sets it up and creates its card
 * @param {String} name This Pet's name
 * @param {String} type This Pet's type
 * @param {Number} health This Pet's health, between 0 and maxHealth
 * @param {Number} spirit This Pet's spirit, between 0 and 100
 * @param {Number} hunger This Pet's hunger, between 10 and 100
 * @param {Number} fatigue This Pet's fatigue, between 10 and 100
 * @param {Number} age This Pet's age, in hours
 * @param {Number} lastMetabolismTime Unix timestamp of the last time this Pet called the metabolism method
 * @param {Number} lastPlayTime Unix timestamp of the last time the user played with this Pet
 * @param {Number} startSleepTime Unix timestamp of when this Pet started sleeping.  null if not sleeping
 * @param {Number} maxHealth This Pet's maximum possible health
 */
function Pet(name, type, health, spirit, hunger, fatigue, age, lastMetabolismTime, lastPlayTime, startSleepTime, maxHealth) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.spirit = spirit;
    this.hunger = hunger;
    this.fatigue = fatigue;
    this.age = age;
    this.lastMetabolismTime = lastMetabolismTime;
    this.lastPlayTime = lastPlayTime;
    this.startSleepTime = startSleepTime;
    this.maxHealth = maxHealth;

    this.createCard();
    this.start();
    this.catchUp();
}

Pet.prototype.createCard = function () {

}

Pet.prototype.start = function () {

}

Pet.prototype.catchUp = function () {

}

Pet.prototype.feed = function () {

}

Pet.prototype.play = function () {

}

Pet.prototype.sleep = function () {

}

Pet.prototype.wake = function () {

}

Pet.prototype.metabolism = function () {

}

Pet.prototype.kill = function () {

}

Pet.prototype.refreshCard = function () {

}

Pet.prototype.getOwnerAttention = function () {

}

Pet.prototype.sync = function () {

}

Pet.prototype.getTypeCharacteristics = function () {

}

Pet.prototype.applyStatRestrictions = function () {

}

/**
 * Defines the default values for certain Pet stats
 */
Pet.prototype.initialValues = {
    health: 100,
    spirit: 100,
    hunger: 10,
    fatigue: 10,
    age: 0,
    maxHealth: 100
};

/**
 * Define the characteristics for different Pet types
 */
Pet.prototype.typeCharacteristics = {
    boomer: {
        lifespan: 7,
        appetite: 6,
        energy: 6
    },
    clipper: {
        lifespan: 15,
        appetite: 2,
        energy: 2
    },
    drupper: {
        lifespan: 30,
        appetite: 4,
        energy: 4
    }
}