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
            startSleepTime: null,
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