const constants = require("./constants");
const fs = require("fs");

/**
 * Creates a new pet if a pet of given type doesn't already exist with given name
 * @param {String} name Name of the pet to create
 * @param {String} type Type of the pet to create
 * @returns {String} "false" if pet already exists, stringified JSON with a new pet's data if the pet is new
 */
exports.create = function create(name, type) {
    if (fs.existsSync("pets/" + type + "/" + name + ".json")) {
        return "false";
    } else {
        const initialValues = constants.initialValues;
        const typeCharacteristics = constants.typeCharacteristics[type.toLowerCase()];
        const pet = JSON.stringify({
            name: name,
            type: type,
            health: initialValues.health,
            spirit: initialValues.spirit,
            hunger: initialValues.hunger,
            fatigue: initialValues.fatigue,
            age: initialValues.age,
            lastMetabolismTime: Date.now(),
            lastPlayTime: Date.now(),
            wakeTime: null,
            maxHealth: initialValues.maxHealth,
            lifespan: typeCharacteristics.lifespan,
            appetite: typeCharacteristics.appetite,
            energy: typeCharacteristics.energy
        });
        fs.writeFileSync("./pets/" + type + "/" + name + ".json", pet);
        return pet;
    }
}

/**
 * @returns {String} Stringified JSON Array of all pets' data
 */
exports.getPets = function () {
    let collector = [];
    for (const type in constants.typeCharacteristics) {
        for (const name of fs.readdirSync("./pets/" + type)) {
            collector.push(JSON.parse(fs.readFileSync("./pets/" + type + "/" + name)));
        }
    }
    return JSON.stringify(collector);
}

/**
 * @returns {String} Stringified JSON Array of the types of pets available for adoption
 */
exports.getAvailiableTypes = function () {
    let collector = [];
    for (const type in constants.typeCharacteristics) {
        collector.push(type);
    }
    return JSON.stringify(collector);
}

/**
 * Updates the stored data on this pet
 * @param {String} name Name of the pet
 * @param {String} type Type of the pet
 * @param {Number} health The pet's health
 * @param {Number} spirit The pet's spirit
 * @param {Number} hunger The pet's hunter
 * @param {Number} fatigue The pet's fatigue
 * @param {Number} age The pet's age, in hours
 * @param {Number} lastMetabolismTime Unix timestamp of the last time the metabolism function ran on this pet
 * @param {Number} lastPlayTime Unix timestamp of the last time this pet was played with
 * @param {Number} wakeTime Unix timestamp of when this pet started sleeping.  null if not sleeping
 * @param {Number} maxHealth This pet's maximum health
 * @param {Number} lifespan This pet type's average lifespan
 * @param {Number} appetite This pet type's appetite
 * @param {Number} energy This pet types's energy level
 * @returns {String} a blank response
 */
exports.updatePet = function (name, type, health, spirit, hunger, fatigue, age, lastMetabolismTime, lastPlayTime, wakeTime, maxHealth, lifespan, appetite, energy) {
    fs.writeFileSync("./pets/" + type + "/" + name + ".json", JSON.stringify({
        name: name,
        type: type,
        health: health,
        spirit: spirit,
        hunger: hunger,
        fatigue: fatigue,
        age: age,
        lastMetabolismTime: lastMetabolismTime,
        lastPlayTime: lastPlayTime,
        wakeTime: wakeTime,
        maxHealth: maxHealth,
        lifespan: lifespan,
        appetite: appetite,
        energy: energy
    }));
    return "";
}

/**
 * Deletes a pet
 * @param {String} name Name of the pet to delete
 * @param {String} type Type of the pet to delete
 * @returns Blank response
 */
exports.deletePet = function (name, type) {
    fs.unlinkSync("./pets/" + type + "/" + name + ".json");
    return "";
}