const yup = require('yup');


const formInputName = document.querySelector('#name');
const labelName = document.querySelector('#labelName');
const labelEmail = document.querySelector('#labelEmail');
const labelMessage = document.querySelector('#labelMessage');
const formInputEmail = document.querySelector('#email');
const formInputPhone = document.querySelector('#phone');
const formInputMessage = document.querySelector('#message');
const formButton = document.querySelector('#buttonSubmitForm');
const messageForm = document.querySelector('.messageForm');
const messageFormBox = document.querySelector('.messageFormBox');
const formClass = document.querySelector('.formClass');
const p1ResponseForm = document.querySelector('#p1ResponseForm');
const p2ResponseForm = document.querySelector('#p2ResponseForm');

const formSchema = yup.object({
    name: yup.string().required('Su nombre es obligatorio'),
    email: yup.string().email('Tiene que colocar un email válido').required('No puede dejar vacio el email'),
    message: yup.string().required('No puede dejar vacio el mensaje')
});

formButton.addEventListener('click', checkValues);

async function checkValues(event) {
    event.preventDefault();
    const name = formInputName.value;
    const email = formInputEmail.value;
    const message = formInputMessage.value;
    const formInputs = { name: `${name}`, email: `${email}`, message: `${message}` };

    await formSchema.validate(formInputs, { abortEarly: false }).then(sendForm(name, email, message)).catch(async (err) => {
        if (err.errors) {
            console.log("error");
            for (let e of err.errors) {
                if (e.includes('nombre')) {
                    console.log(e);
                    formInputName.style.marginTop = "0";
                    labelName.style.marginTop = "18px";
                    formClass.style.gap = "2px";
                    labelName.innerText = `${e}`;
                    setTimeout(() => {
                        formClass.style.gap = "8px";
                        formInputName.style.marginTop = "24px";
                        labelName.style.marginTop = "0";
                        labelName.innerText = "";
                    }, 2500);

                }
                else if (e.includes('email')) {
                    console.log(e);
                    formClass.style.gap = "2px";
                    labelEmail.innerText = `${e}`;
                    setTimeout(() => {
                        formClass.style.gap = "8px";
                        labelEmail.innerText = "";
                    }, 2500);
                }

                else if (e.includes('mensaje')) {
                    console.log(e);
                    formClass.style.gap = "2px";
                    labelMessage.innerText = `${e}`;
                    setTimeout(() => {
                        formClass.style.gap = "8px";
                        labelMessage.innerText = "";
                    }, 2500);
                }
            }
        }
    })

}


async function sendForm(name, email, message) {
    formButton.innerText = 'Enviando';
    try {
        const name = name;
        const email = email;
        const phone = formInputPhone.value;
        const message = message;
        const dataToSend = { 'name': `${name}`, 'email': `${email}`, 'phone': `${phone}`, 'message': `${message}` };
        const response = await fetch("https://152.67.43.92/sendForm", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend),
        });
        response.json().then(data => {
            console.log(data);
        });

        if (response.status == 201) {
            formButton.innerText = 'Submit';
            constructResponseFormMessage('Su mensaje se ha enviado correctamente', 'Nuestro equipo se contactará a la brevedad', true);
            toggleResponseForm();
            setTimeout(() => {
                toggleResponseForm();
            }, 3500);

        } else {
            formButton.innerText = 'Submit';
            constructResponseFormMessage('Hemos tenido un inconveniente al enviar el formulario', 'Por favor vuelva a intentarlo más tarde', false);
            toggleResponseForm();
            setTimeout(() => {
                toggleResponseForm();
            }, 3500);
        }

    } catch {
        formButton.innerText = 'Submit';
        constructResponseFormMessage('Hemos tenido un inconveniente al enviar el formulario', 'Por favor vuelva a intentarlo más tarde', false);
        toggleResponseForm();
        setTimeout(() => {
            toggleResponseForm();
        }, 3500);
    }


    formInputName.value = "";
    formInputEmail.value = "";
    formInputPhone.value = "";
    formInputMessage.value = "";



}



/* formButton.addEventListener('click', sendForm);

async function sendForm(event) {
    event.preventDefault();
    formButton.innerText = 'Enviando';
    try {
        const name = formInputName.value;
        const email = formInputEmail.value;
        const phone = formInputPhone.value;
        const message = formInputMessage.value;
        const dataToSend = { 'name': `${name}`, 'email': `${email}`, 'phone': `${phone}`, 'message': `${message}` };
        const response = await fetch("https://152.67.43.92/sendForm", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend),
        });
        response.json().then(data => {
            console.log(data);
        });

        if (response.status == 201) {
            formButton.innerText = 'Submit';
            constructResponseFormMessage('Su mensaje se ha enviado correctamente', 'Nuestro equipo se contactará a la brevedad', true);
            toggleResponseForm();
            setTimeout(() => {
                toggleResponseForm();
            }, 3500);

        } else {
            formButton.innerText = 'Submit';
            constructResponseFormMessage('Hemos tenido un inconveniente al enviar el formulario', 'Por favor vuelva a intentarlo más tarde', false);
            toggleResponseForm();
            setTimeout(() => {
                toggleResponseForm();
            }, 3500);
        }

    } catch {
        formButton.innerText = 'Submit';
        constructResponseFormMessage('Hemos tenido un inconveniente al enviar el formulario', 'Por favor vuelva a intentarlo más tarde', false);
        toggleResponseForm();
        setTimeout(() => {
            toggleResponseForm();
        }, 3500);
    }


    formInputName.value = "";
    formInputEmail.value = "";
    formInputPhone.value = "";
    formInputMessage.value = "";



} */

function toggleResponseForm() {
    messageForm.classList.toggle('inactive');
    formClass.classList.toggle('inactive');
}

function constructResponseFormMessage(p1, p2, success) {
    p1ResponseForm.innerText = p1;
    p2ResponseForm.innerText = p2;
    if (!success) {
        messageFormBox.style.border = "5px solid red";
    }
}








