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
                if (dataRequest.responseText == "true") { //if the pet doesn't already exist
                    new Pet(name, type, Pet.prototype.initialValues.health, Pet.prototype.initialValues.spirit, Pet.prototype.initialValues.hunger, Pet.prototype.initialValues.fatigue, Pet.prototype.initialValues.age, 0, 0, null, Pet.prototype.initialValues.maxHealth);
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