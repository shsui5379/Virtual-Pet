/**
 * Handles the submission of the form for adopting a pet
 * @param {Event} e The event of clicking the Adopt button
 */
function submitHandler(e) {
    e.preventDefault();
    let form = e.target.form;

    if (form.checkValidity()) { //if the name is filled out
        let type = form.type.value;
        let name = form.name.value;

        ajax("POST", "create", { type: type, name: name }, function (response) {
            if (response != "false") { //if the pet doesn't already exist
                const pet = JSON.parse(response);
                new Pet(pet.name, pet.type, pet.health, pet.spirit, pet.hunger, pet.fatigue, pet.age, pet.lastMetabolismTime, pet.lastPlayTime, pet.startSleeptime, pet.maxHealth);
            } else {
                alert("That pet exists aready");
            }
            form.name.value = "";
        });
    } else {
        alert("You forgot to name the pet");
    }
}

/**
 * Downloads the pets data from the server and initialize them client side
 */
function downloadPets() {
    ajax("GET", "getPets", {}, function (response) {
        for (const pet of JSON.parse(response)) {
            new Pet(pet.name, pet.type, pet.health, pet.spirit, pet.hunger, pet.fatigue, pet.age, pet.lastMetabolismTime, pet.lastPlayTime, pet.startSleeptime, pet.maxHealth);
        }
    });
}

/**
 * Callback for when an ajax request response has returned
 * @callback postResponseCallback
 * @param {String} response The response from the request
 */

/**
 * @param {String} method The HTTP method to use
 * @param {String} path The path of the request
 * @param {JSON} options Object of keys and values to include in query string
 * @param {postResponseCallback} callback The function to call when the server's response is received
 */
function ajax(method, path, options, callback) {
    let dataRequest = new XMLHttpRequest();

    let url = "http://localhost:8081/" + path;

    if (Object.keys(options).length > 0) {
        let properties = Object.keys(options);
        url += "?";
        url += properties[0] + "=" + options[properties[0]];
        for (let i = 1; i < properties.length; i++) {
            url += "&" + properties[i] + "=" + options[properties[i]];
        }
    }

    dataRequest.open(method, url, true);
    dataRequest.onreadystatechange = function () {
        if (dataRequest.readyState == 4) {
            callback(dataRequest.responseText);
        }
    }
    dataRequest.send();
}