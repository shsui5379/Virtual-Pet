const ONE_HOUR_IN_MILLIS = 1000 * 60 * 60;

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
 * @param {Number} wakeTime Unix timestamp of when this Pet started sleeping.  null if not sleeping
 * @param {Number} maxHealth This Pet's maximum possible health
 * @param {Number} lifespan This pet type's average lifespan
 * @param {Number} appetite This pet type's appetite
 * @param {Number} energy This pet types's energy level
 */
function Pet(name, type, health, spirit, hunger, fatigue, age, lastMetabolismTime, lastPlayTime, wakeTime, maxHealth, lifespan, appetite, energy) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.spirit = spirit;
    this.hunger = hunger;
    this.fatigue = fatigue;
    this.age = age;
    this.lastMetabolismTime = lastMetabolismTime;
    this.lastPlayTime = lastPlayTime;
    this.wakeTime = wakeTime;
    this.maxHealth = maxHealth;
    this.lifespan = lifespan;
    this.appetite = appetite;
    this.energy = energy;

    this.createCard();
    this.start();
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
    this.spiritStatBar.low = 50;
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
    this.hungerStatBar.low = 40;
    this.hungerStatBar.high = 50;
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
    this.fatigueStatBar.low = 40;
    this.fatigueStatBar.high = 50;
    this.fatigueStatBar.optimum = 10;
    card.appendChild(this.fatigueStatBar);

    card.appendChild(document.createElement("br"));

    //age
    this.ageStatNumber = document.createElement("span");
    this.ageStatNumber.className = "pet-stat-number";
    card.appendChild(this.ageStatNumber);

    this.ageStatNumberBar = document.createElement("meter");
    this.ageStatNumberBar.className = "pet-stat-bar";
    this.ageStatNumberBar.max = this.lifespan * 24;
    this.ageStatNumberBar.low = 24 * this.lifespan / 3;
    this.ageStatNumberBar.high = 24 * 2 * this.lifespan / 3;
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

/**
 * Sets up timers and intervals for updating this pet's stats
 */
Pet.prototype.start = function () {
    let timeToNextMetabolism = (ONE_HOUR_IN_MILLIS) - ((Date.now() - this.lastMetabolismTime) % (ONE_HOUR_IN_MILLIS));

    this.catchUp();

    if (this.health >= 10) { //if still alive after catchup
        this.metaTimeout = setTimeout(function () { //next metabolism call
            this.metabolism(true);
            this.interval = setInterval(function () { //hourly metabolism call
                this.metabolism(true);
            }.bind(this), ONE_HOUR_IN_MILLIS);
        }.bind(this), timeToNextMetabolism);

        if (this.wakeTime) { //if pet was asleep
            this.sleepTimeout = setTimeout(function () {
                this.wake();
            }.bind(this), this.wakeTime - Date.now());
        }
    }
}

/**
 * Catchup for pet stats for when the user was offline
 */
Pet.prototype.catchUp = function () {
    let iterations = Math.trunc((Date.now() - this.lastMetabolismTime) / (ONE_HOUR_IN_MILLIS));

    if (this.wakeTime && Date.now() >= this.wakeTime) { //past wake time
        let counts = Math.trunc((this.wakeTime - this.lastMetabolismTime) / (ONE_HOUR_IN_MILLIS));

        for (let i = 0; i < counts; i++) {
            this.metabolism(false);

            iterations--;
        }

        this.wake();
    }

    for (let i = 0; i < iterations; i++) {
        if (this.health >= 10) {
            this.metabolism(false);
        }
    }
}

/**
 * Feeding this Pet
 */
Pet.prototype.feed = function () {
    if (!this.wakeTime) {
        if (this.hunger < 20) this.health *= 0.95;
        this.hunger = 10;
        this.health *= 1.05;
        this.applyStatRestrictions();
        this.refreshCard();
        this.sync();
    } else {
        alert(this.name + " is asleep");
    }
}

/**
 * Playing with this Pet
 */
Pet.prototype.play = function () {
    if (!this.wakeTime) {
        if (Date.now() - this.lastPlayTime < this.energy * ONE_HOUR_IN_MILLIS)
            this.fatigue *= 1.2;
        this.applyStatRestrictions()
        this.lastPlayTime = Date.now();
        this.refreshCard();
        this.sync();
    } else {
        alert(this.name + " is asleep");
    }
}

/**
 * Putting this Pet to sleep
 */
Pet.prototype.sleep = function () {
    if (this.fatigue < 40) alert(this.name + " doesn't feel tired right now");
    else if (this.wakeTime) alert(this.name + " is still sleeping")
    else {
        this.wakeTime = Date.now() + 2 * this.energy * ONE_HOUR_IN_MILLIS;
        this.sleepTimeout = setTimeout(function () {
            this.wake();
        }.bind(this), this.wakeTime - Date.now());
        this.refreshCard();
        this.sync();
    };
}

/**
 * Waking up this Pet
 */
Pet.prototype.wake = function () {
    this.wakeTime = null;
    this.fatigue = 10;
    this.spirit *= 1.5;
    this.health *= 1.1;
    this.applyStatRestrictions();
    this.refreshCard();
    this.sync();
    this.getOwnerAttention("I'm awake again");
}

/**
 * The task this Pet regularly calls to keep its stats current
 * 
 * @param {Boolean} shouldPushNotif Whether or not notifications should be pushed about this pet's wants
 */
Pet.prototype.metabolism = function (shouldPushNotif) {
    this.age++;

    if (!this.wakeTime) {
        this.hunger *= 1 + 0.1 * this.appetite;
        this.fatigue *= 1 + 0.05 * this.energy;

        if (Date.now() - this.lastPlayTime > this.energy * ONE_HOUR_IN_MILLIS) {
            this.spirit *= 0.9;
        }
        if (this.hunger > 50) {
            this.health *= 0.9;
            this.fatigue *= 1.1;
        }
        if (this.health < 50) {
            this.health *= 0.9;
            this.fatigue *= 1.1;
        }
        if (this.fatigue > 50) {
            this.health *= 0.9;
        }
        if (this.spirit < 50) {
            this.fatigue *= 1.1;
            this.health *= 0.9;
        }
        if (this.age > this.lifespan * 24 && (this.age - this.lifespan * 24) % 24 == 0) {
            this.maxHealth -= 10;
        }

        if (shouldPushNotif) {
            let petWants = [];

            if (this.hunger > 50) petWants.push("eat");
            if (this.fatigue > 50) petWants.push("sleep");
            if (Date.now() - this.lastPlayTime > this.energy * ONE_HOUR_IN_MILLIS) petWants.push("play");

            if (petWants.length > 0) {
                let string = "I wanna " + petWants[0];

                for (let i = 1; i < petWants.length; i++) {
                    string += ", " + petWants[i];
                }

                this.getOwnerAttention(string);
            }
        }
    }

    this.applyStatRestrictions();
    this.lastMetabolismTime = Date.now();
    this.refreshCard();
    this.sync();
}

/**
 * Kills this pet by removing its card, stopping its interval, notifying the owner and deleting it from server
 * @param reason {String} Reason to kill this Pet
 */
Pet.prototype.kill = function (reason) {
    ajax("POST", "deletePet", {
        name: this.name,
        type: this.type
    }, function () { });
    this.getOwnerAttention("I died from " + reason);
    this.card.remove();
    clearInterval(this.interval);
    clearTimeout(this.metaTimeout);
    clearTimeout(this.sleepTimeout);
}

/**
 * Refresh this Pet's card based on its current stats
 */
Pet.prototype.refreshCard = function () {
    //image
    this.petImage.src = "client/assets/images/" + this.type + "/" + (this.wakeTime ? "asleep.png" : "awake.png");

    //health
    this.healthStatNumber.innerText = "Health: " + parseFloat(this.health).toFixed(2) + " ";
    this.healthStatBar.value = this.health;
    this.healthStatBar.max = this.maxHealth;
    this.healthStatBar.optimum = this.maxHealth;
    this.healthStatBar.low = this.maxHealth / 3;
    this.healthStatBar.high = 2 * this.maxHealth / 3;

    //spirit
    this.spiritStatNumber.innerText = "Spirit: " + parseFloat(this.spirit).toFixed(2) + " ";
    this.spiritStatBar.value = this.spirit;

    //hunger
    this.hungerStatNumber.innerText = "Hunger: " + parseFloat(this.hunger).toFixed(2) + " ";
    this.hungerStatBar.value = this.hunger;

    //fatigue
    this.fatigueStatNumber.innerText = "Fatigue: " + parseFloat(this.fatigue).toFixed(2) + " ";
    this.fatigueStatBar.value = this.fatigue;

    //age
    this.ageStatNumber.innerText = "Age: " + parseFloat(this.age / 24).toFixed(2) + " ";
    this.ageStatNumberBar.value = this.age;
}

/**
 * Sends a Notifcation on behalf of this Pet
 * @param {String} message Body of the Notification
 */
Pet.prototype.getOwnerAttention = function (message) {
    if ("Notification" in window && Notification.permission == "granted") {
        new Notification(this.name + " says", {
            body: message,
            icon: this.petImage.src
        });
    }
}

/**
 * Sync this Pet's current state to the server
 */
Pet.prototype.sync = function () {
    if (this.health < 10) {
        this.kill("running out of health");
    } else {
        ajax("POST", "updatePet", {
            name: this.name,
            type: this.type,
            health: this.health,
            spirit: this.spirit,
            hunger: this.hunger,
            fatigue: this.fatigue,
            age: this.age,
            lastMetabolismTime: this.lastMetabolismTime,
            lastPlayTime: this.lastPlayTime,
            wakeTime: this.wakeTime,
            maxHealth: this.maxHealth,
            lifespan: this.lifespan,
            appetite: this.appetite,
            energy: this.energy
        }, function () { });
    }
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