const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')


//show input
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message
}

// show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//CHECK EMAIL IS VALID
function checkEmail(input) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid')
    }
}

//Check required fields utilizamos un bucle para que recorra los elementos en vez de varios if
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}


//  check input lenght
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less ${max} characters`)
    } else {
        showSuccess(input)
    }
}

// check password match
function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Password do not match')
    }
}



// get fieldname ponemos la primera letra en mayuscula
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event Listener
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2])
    checkLength(username, 3, 15)
    checkLength(password, 6, 13)
    checkEmail(email)
    checkPasswordMatch(password, password2)
})