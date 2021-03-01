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
 * @param {Number} lifespan This pet type's average lifespan
 * @param {Number} appetite This pet type's appetite
 * @param {Number} energy This pet types's energy level
 */
function Pet(name, type, health, spirit, hunger, fatigue, age, lastMetabolismTime, lastPlayTime, startSleepTime, maxHealth, lifespan, appetite, energy) {
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
    this.lifespan = lifespan,
        this.appetite = appetite,
        this.energy = energy

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
    card.appendChild(this.petImage);

    card.appendChild(document.createElement("br"));
    card.appendChild(document.createElement("br"));

    //health
    this.healthStatNumber = document.createElement("span");
    this.healthStatNumber.className = "pet-stat-number";
    card.appendChild(this.healthStatNumber);

    this.healthStatBar = document.createElement("meter");
    this.healthStatBar.className = "pet-stat-bar";
    this.healthStatBar.max = this.maxHealth;
    this.healthStatBar.low = 33;
    this.healthStatBar.high = 66;
    this.healthStatBar.optimum = this.maxHealth;
    card.appendChild(this.healthStatBar);

    card.appendChild(document.createElement("br"));

    //spirit
    this.spiritStatNumber = document.createElement("span");
    this.spiritStatNumber.className = "pet-stat-number";
    card.appendChild(this.spiritStatNumber);

    this.spiritStatBar = document.createElement("meter");
    this.spiritStatBar.className = "pet-stat-bar";
    this.spiritStatBar.max = 100;
    this.spiritStatBar.low = 33;
    this.spiritStatBar.high = 66;
    this.spiritStatBar.optimum = 100;
    card.appendChild(this.spiritStatBar);

    card.appendChild(document.createElement("br"));

    //hunger
    this.hungerStatNumber = document.createElement("span");
    this.hungerStatNumber.className = "pet-stat-number";
    card.appendChild(this.hungerStatNumber);

    this.hungerStatBar = document.createElement("meter");
    this.hungerStatBar.className = "pet-stat-bar";
    this.hungerStatBar.max = 100;
    this.hungerStatBar.min = 10;
    this.hungerStatBar.low = 33;
    this.hungerStatBar.high = 66;
    this.hungerStatBar.optimum = 10;
    card.appendChild(this.hungerStatBar);

    card.appendChild(document.createElement("br"));

    //fatigue
    this.fatigueStatNumber = document.createElement("span");
    this.fatigueStatNumber.className = "pet-stat-number";
    card.appendChild(this.fatigueStatNumber);

    this.fatigueStatBar = document.createElement("meter");
    this.fatigueStatBar.className = "pet-stat-bar";
    this.fatigueStatBar.max = 100;
    this.fatigueStatBar.min = 10;
    this.fatigueStatBar.low = 33;
    this.fatigueStatBar.high = 66;
    this.fatigueStatBar.optimum = 10;
    card.appendChild(this.fatigueStatBar);

    card.appendChild(document.createElement("br"));

    //age
    this.ageStatNumber = document.createElement("span");
    this.ageStatNumber.className = "pet-stat-number";
    card.appendChild(this.ageStatNumber);

    this.ageStatNumberBar = document.createElement("meter");
    this.ageStatNumberBar.className = "pet-stat-bar";
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

    this.refreshCard();

    this.card = card;
}

Pet.prototype.start = function () {

}

Pet.prototype.catchUp = function () {

}

/**
 * Feeding this Pet
 */
Pet.prototype.feed = function () {
    if (this.hunger < 20) this.health *= 0.95;
    this.hunger = 10;
    this.health *= 1.05;
    this.applyStatRestrictions();
    this.refreshCard();
    this.sync();
}

/**
 * Playing with this Pet
 */
Pet.prototype.play = function () {
    if (this.lastPlayTime < Date.now() - (this.energy * 60 * 60 * 1000))
        this.fatigue *= 1.2;
    this.applyStatRestrictions()
    this.lastPlayTime = Date.now();
    this.refreshCard();
    this.sync();
}

/**
 * Putting this Pet to sleep
 */
Pet.prototype.sleep = function () {
    if (this.fatigue < 40) alert(this.name + " doesn't feel tired right now");
    else if (this.startSleepTime) alert(this.name + " is still sleeping")
    else {
        setTimeout(wake, 2 * this.energy * 60 * 60 * 1000);
        this.startSleepTime = Date.now();
        this.refreshCard();
        this.sync();
    };
}

/**
 * Waking up this Pet
 */
Pet.prototype.wake = function () {
    this.startSleepTime = null;
    this.fatigue = 10;
    this.spirit *= 1.5;
    this.health *= 1.1;
    this.applyStatRestrictions();
    this.refreshCard();
    this.sync();
}

Pet.prototype.metabolism = function () {

}

/**
 * Kills this pet by removing its card, stopping its interval, notifying the owner and deleting it from server
 */
Pet.prototype.kill = function () {
    ajax("DELETE", "deletePet", {
        name: this.name,
        type: this.type
    }, function () { });
    this.card.remove();
    clearInterval(this.interval);
    this.getOwnerAttention();
}

/**
 * Refresh this Pet's card based on its current stats
 */
Pet.prototype.refreshCard = function () {
    //image
    this.petImage.src = "client/assets/images/" + this.type + "/" + (this.startSleepTime ? "asleep.png" : "awake.png");

    //health
    this.healthStatNumber.innerText = "Health: " + this.health + " ";
    this.healthStatBar.value = this.health;
    this.healthStatBar.max = this.maxHealth;
    this.healthStatBar.optimum = this.maxHealth;

    //spirit
    this.spiritStatNumber.innerText = "Spirit: " + this.spirit + " ";
    this.spiritStatBar.value = this.spirit;

    //hunger
    this.hungerStatNumber.innerText = "Hunger: " + this.hunger + " ";
    this.hungerStatBar.value = this.hunger;

    //fatigue
    this.fatigueStatNumber.innerText = "Fatigue: " + this.fatigue + " ";
    this.fatigueStatBar.value = this.fatigue;

    //age
    this.ageStatNumber.innerText = "Age: " + this.age + " ";
    this.ageStatNumberBar.value = this.age;
}

Pet.prototype.getOwnerAttention = function () {

}

/**
 * Sync this Pet's current state to the server
 */
Pet.prototype.sync = function () {
    ajax("PUT", "updatePet", {
        name: this.name,
        type: this.type,
        health: this.health,
        spirit: this.spirit,
        hunger: this.hunger,
        fatigue: this.fatigue,
        age: this.age,
        lastMetabolismTime: this.lastMetabolismTime,
        lastPlayTime: this.lastPlayTime,
        startSleepTime: this.startSleepTime,
        maxHealth: this.maxHealth,
        lifespan: this.lifespan,
        appetite: this.appetite,
        energy: this.energy
    }, function () { })
}

/**
 * If any of this Pet's stats are out beyond maximum or below minimum, readjust the stat's value accordingly
 */
Pet.prototype.applyStatRestrictions = function () {
    if (this.hunger > 100) this.hunger = 100;
    if (this.fatigue > 100) this.fatigue = 100;
    if (this.spirit > 100) this.spirit = 100;
    if (this.health > this.maxHealth) this.health = this.maxHealth;
    if (this.hunger < 10) this.hunger = 10;
    if (this.fatigue < 10) this.fatigue = 10;
}