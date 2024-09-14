export function validateForm(form) {

    const name = form.name;
    const jobtitle = form.jobtitle;
    const email = form.email;
    const phone = form.phone;

    name.onkeyup = function () {
        checkTextInput(this);
    }

    jobtitle.onkeyup = function () {
        checkTextInput(this);
    }

    email.onkeyup = function () {
        checkEmailInput(this);
    }

    phone.onkeyup = function () {
        checkPhoneInput(this);
    }


    function checkTextInput(textInput) {
        const value = textInput.value;
        const validityCondition = value.trim() !== '' && !/^[^\wа-яё]+$/i.test(value); // textinput must contain letters or/and digits - belong to \w and Russian letters а-яё

        return applyValidityCheck(textInput, validityCondition);
    }

    function checkEmailInput(emailInput) {
        const regExpEmail = /^[-.\w]+@([\w-]+\.)+[\w]+$/;
        const validityCondition = regExpEmail.test(emailInput.value);

        return applyValidityCheck(emailInput, validityCondition);
    }

    function checkPhoneInput(phoneInput) {
        // 8(800)708-89-00 8800708-89-00 88007088900 +78007088900 88007088900 +7-800-708-89-00 +35 095 3432121  +35 095 343 21 21etc.
        const regExpPhone = /^(\+\d\d?|\d)[- ]?\(?([0-9]{3})\)?([ .-]?)([0-9]{3})([ .-]?)([0-9]{2})([ .-]?)([0-9]{2})$/;
        const validityCondition = regExpPhone.test(phoneInput.value);

        return applyValidityCheck(phoneInput, validityCondition);
    }

    function applyValidityCheck(elem, validityCondition) {
        if (!validityCondition) {
            // elem.style.color = 'red'; // OK
            // elem.style.background = 'pink'; // OK

            elem.classList.remove('greenchecked');
            elem.classList.add('redcross');

            return false;
        }

        // elem.style.color = ''; // OK
        // elem.style.background = ''; // OK

        // // doesn't work (url) in inline style
        // elem.style.background = "no-repeat 140%/50% 80% url(../images/svg/greenchecked.svg)";

        elem.classList.remove('redcross');
        elem.classList.add('greenchecked');

        return true;
    }



    form.onsubmit = (event) => {
        event.preventDefault();

        // проверяем все поля перед отправкой  чтобы отобразить ВСЕ неверные - т.к. && (которрый внутри if) вычисляет выражения только до первого ложного 
        const nameChecked = checkTextInput(name);
        const jobtitleChecked = checkTextInput(jobtitle);
        const emailChecked = checkEmailInput(email);
        const phoneChecked = checkPhoneInput(phone);

        // don't check CV-file presense due testing purpose
        if (nameChecked && jobtitleChecked && emailChecked && phoneChecked) {
            alert('Форма отправлена!');
            form.submit(); // submit form if al OK 
            return;
        }

        alert('Не отправлено!\n\nЗаполните корректно поля формы!');
    }

}




// function checkEmailInput(emailInput) {

//     const regExpEmail = /^[-.\w]+@([\w-]+\.)+[\w]+$/;

//     if (!regExpEmail.test(emailInput.value)) {

//         emailInput.style.color = 'red';
//         emailInput.style.background = 'pink';
//         return false;
//     }

//     emailInput.style.color = '';
//     emailInput.style.background = '';

//     return true;
// }