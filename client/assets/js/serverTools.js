/**
 * Handles the submission of the form for adopting a pet
 * @param {Event} e The event of clicking the Adopt button
 */
function submitHandler(e) {
    let form = e.target.form;
    if (form.checkValidity()) {
        e.preventDefault();
        new Pet(form.name.value, form.type.value, Pet.prototype.initialValues.health, Pet.prototype.initialValues.spirit, Pet.prototype.initialValues.hunger, Pet.prototype.initialValues.fatigue, Pet.prototype.initialValues.age, 0, 0, null, Pet.prototype.initialValues.maxHealth);
        form.name.value = "";
    }
}