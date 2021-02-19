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

/**
 * Creates the elements for this Pet's card
 */
Pet.prototype.createCard = function () {
    let card = document.createElement("span");

    card.className = "card";

    //name
    let petName = document.createElement("span");
    petName.className = "pet-name";
    petName.innerText = this.name;
    card.appendChild(petName);

    card.appendChild(document.createElement("br"));

    //type
    let petType = document.createElement("span");
    petType.className = "pet-type";
    petType.innerText = this.type;
    card.appendChild(petType);

    card.appendChild(document.createElement("br"));
    card.appendChild(document.createElement("br"));

    //image
    this.petImage = document.createElement("img");
    this.petImage.className = "pet-image";
    this.petImage.src = "client/assets/images/" + this.type + "-" + (this.startSleepTime ? "asleep.png" : "awake.png");
    card.appendChild(this.petImage);

    card.appendChild(document.createElement("br"));
    card.appendChild(document.createElement("br"));

    //health
    this.healthStatNumber = document.createElement("span");
    this.healthStatNumber.className = "pet-stat-number";
    this.healthStatNumber.innerText = "Health: " + this.health + " ";
    card.appendChild(this.healthStatNumber);

    this.healthStatBar = document.createElement("meter");
    this.healthStatBar.className = "pet-stat-bar";
    this.healthStatBar.value = this.health;
    this.healthStatBar.max = 100;
    this.healthStatBar.low = 33;
    this.healthStatBar.high = 66;
    this.healthStatBar.optimum = 100;
    card.appendChild(this.healthStatBar);

    card.appendChild(document.createElement("br"));

    //spirit
    this.spiritStatNumber = document.createElement("span");
    this.spiritStatNumber.className = "pet-stat-number";
    this.spiritStatNumber.innerText = "Spirit: " + this.spirit + " ";
    card.appendChild(this.spiritStatNumber);

    this.spiritStatBar = document.createElement("meter");
    this.spiritStatBar.className = "pet-stat-bar";
    this.spiritStatBar.value = this.spirit;
    this.spiritStatBar.max = 100;
    this.spiritStatBar.low = 33;
    this.spiritStatBar.high = 66;
    this.spiritStatBar.optimum = 100;
    card.appendChild(this.spiritStatBar);

    card.appendChild(document.createElement("br"));

    //hunger
    this.hungerStatNumber = document.createElement("span");
    this.hungerStatNumber.className = "pet-stat-number";
    this.hungerStatNumber.innerText = "Hunger: " + this.hunger + " ";
    card.appendChild(this.hungerStatNumber);

    this.hungerStatBar = document.createElement("meter");
    this.hungerStatBar.className = "pet-stat-bar";
    this.hungerStatBar.value = this.hunger;
    this.hungerStatBar.max = 100;
    this.hungerStatBar.low = 33;
    this.hungerStatBar.high = 66;
    this.hungerStatBar.optimum = 0;
    card.appendChild(this.hungerStatBar);

    card.appendChild(document.createElement("br"));

    //fatigue
    this.fatigueStatNumber = document.createElement("span");
    this.fatigueStatNumber.className = "pet-stat-number";
    this.fatigueStatNumber.innerText = "Fatigue: " + this.fatigue + " ";
    card.appendChild(this.fatigueStatNumber);

    this.fatigueStatBar = document.createElement("meter");
    this.fatigueStatBar.className = "pet-stat-bar";
    this.fatigueStatBar.value = this.fatigue;
    this.fatigueStatBar.max = 100;
    this.fatigueStatBar.low = 33;
    this.fatigueStatBar.high = 66;
    this.fatigueStatBar.optimum = 0;
    card.appendChild(this.fatigueStatBar);

    card.appendChild(document.createElement("br"));

    //age
    this.ageStatNumber = document.createElement("span");
    this.ageStatNumber.className = "pet-stat-number";
    this.ageStatNumber.innerText = "Age: " + this.age + " ";
    card.appendChild(this.ageStatNumber);

    this.ageStatNumberBar = document.createElement("meter");
    this.ageStatNumberBar.className = "pet-stat-bar";
    this.ageStatNumberBar.value = this.age;
    this.ageStatNumberBar.max = 100;
    this.ageStatNumberBar.low = 33;
    this.ageStatNumberBar.high = 66;
    this.ageStatNumberBar.optimum = 0;
    card.appendChild(this.ageStatNumberBar);

    card.appendChild(document.createElement("br"));
    card.appendChild(document.createElement("br"));

    //feed button
    let feedButton = document.createElement("button");
    feedButton.className = "pet-action-button";
    feedButton.innerText = "Feed";
    feedButton.pet = this;
    feedButton.addEventListener("click", function (event) {
        event.target.pet.feed();
    });
    card.appendChild(feedButton);

    //play button
    let playButton = document.createElement("button");
    playButton.className = "pet-action-button";
    playButton.innerText = "Play";
    playButton.pet = this;
    playButton.addEventListener("click", function (event) {
        event.target.pet.play();
    });
    card.appendChild(playButton);

    //sleep button
    let sleepButton = document.createElement("button");
    sleepButton.className = "pet-action-button";
    sleepButton.innerText = "Sleep";
    sleepButton.pet = this;
    sleepButton.addEventListener("click", function (event) {
        event.target.pet.sleep();
    });
    card.appendChild(sleepButton);

    document.body.appendChild(card);
}

Pet.prototype.start = function () {

}

Pet.prototype.catchUp = function () {

}

Pet.prototype.feed = function (e) {
    alert("Feed " + this.name);
}

Pet.prototype.play = function () {
    alert("Play " + this.name)
}

Pet.prototype.sleep = function () {
    alert("Sleep " + this.name);
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