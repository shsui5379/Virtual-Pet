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

        let dataRequest = new XMLHttpRequest();

        let url = "http://localhost:8081/create?type=" + type + "&name=" + name;

        dataRequest.open("POST", url, true);
        dataRequest.onreadystatechange = function () {
            if (dataRequest.readyState == 4) {
                if (dataRequest.responseText != "false") { //if the pet doesn't already exist
                    const pet = JSON.parse(dataRequest.responseText);
                    new Pet(pet.name, pet.type, pet.health, pet.spirit, pet.hunger, pet.fatigue, pet.age, pet.lastMetabolismTime, pet.lastPlayTime, pet.startSleeptime, pet.maxHealth);
                } else {
                    alert("That pet exists aready");
                }
                form.name.value = "";
            }
        }
        dataRequest.send();
    } else {
        alert("You forgot to name the pet");
    }
}

/**
 * Downloads the pets data from the server and initialize them client side
 */
function downloadPets() {
    let dataRequest = new XMLHttpRequest();

    let url = "http://localhost:8081/getPets";

    dataRequest.open("GET", url, true);
    dataRequest.onreadystatechange = function () {
        if (dataRequest.readyState == 4) {
            for (const pet of JSON.parse(dataRequest.responseText)) {
                new Pet(pet.name, pet.type, pet.health, pet.spirit, pet.hunger, pet.fatigue, pet.age, pet.lastMetabolismTime, pet.lastPlayTime, pet.startSleeptime, pet.maxHealth);
            }
        }
    }
    dataRequest.send();
}