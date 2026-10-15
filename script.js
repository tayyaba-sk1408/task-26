```javascript
const form = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const termsInput = document.getElementById('terms');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const successMessage = document.getElementById('successMessage');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setError(input, message, id) {
    document.getElementById(id).textContent = message;
    input.classList.toggle('invalid', Boolean(message));
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateName() {
    const message = nameInput.value.trim().length < 2
        ? 'Please enter your full name.'
        : '';

    setError(nameInput, message, 'nameError');
    return !message;
}

function validateEmail() {
    const message = !emailPattern.test(emailInput.value.trim())
        ? 'Enter a valid email address.'
        : '';

    setError(emailInput, message, 'emailError');
    return !message;
}

function passwordScore(value) {
    let score = 0;

    if (value.length >= 8) score++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    return score;
}

function updateStrength() {
    const score = passwordScore(passwordInput.value);
    const labels = [
        'Password strength',
        'Weak password',
        'Fair password',
        'Good password',
        'Strong password'
    ];
    const widths = ['0%', '25%', '50%', '75%', '100%'];
    const colors = [
        '#26314a',
        '#ff7188',
        '#ffb86b',
        '#8b7cff',
        '#46dfb5'
    ];

    strengthBar.style.width = widths[score];
    strengthBar.style.background = colors[score];
    strengthText.textContent = labels[score];
}

function validatePassword() {
    const value = passwordInput.value;
    let message = '';

    if (value.length < 8) {
        message = 'Password must contain at least 8 characters.';
    } else if (
        !/[A-Z]/.test(value) ||
        !/[a-z]/.test(value) ||
        !/\d/.test(value)
    ) {
        message = 'Include uppercase, lowercase, and a number.';
    }

    setError(passwordInput, message, 'passwordError');
    return !message;
}

function validateTerms() {
    const message = termsInput.checked
        ? ''
        : 'Please accept the terms to continue.';

    document.getElementById('termsError').textContent = message;
    return !message;
}

nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) validateName();
    successMessage.textContent = '';
});

emailInput.addEventListener('input', () => {
    if (emailInput.value.trim()) validateEmail();
    successMessage.textContent = '';
});

passwordInput.addEventListener('input', () => {
    updateStrength();
    if (passwordInput.value) validatePassword();
    successMessage.textContent = '';
});

termsInput.addEventListener('change', validateTerms);

document.getElementById('togglePassword').addEventListener('click', event => {
    const showing = passwordInput.type === 'text';

    passwordInput.type = showing ? 'password' : 'text';
    event.currentTarget.textContent = showing ? 'Show' : 'Hide';
    event.currentTarget.setAttribute(
        'aria-label',
        showing ? 'Show password' : 'Hide password'
    );
});

form.addEventListener('submit', event => {
    event.preventDefault();

    const valid = [
        validateName(),
        validateEmail(),
        validatePassword(),
        validateTerms()
    ].every(Boolean);

    if (!valid) {
        successMessage.textContent = '';
        form.querySelector('.invalid')?.focus();
        return;
    }

    successMessage.textContent = 'Account details validated successfully!';
    form.reset();

    [nameInput, emailInput, passwordInput].forEach(input => {
        input.classList.remove('invalid');
        input.setAttribute('aria-invalid', 'false');
    });

    ['nameError', 'emailError', 'passwordError', 'termsError'].forEach(id => {
        document.getElementById(id).textContent = '';
    });

    updateStrength();
});

document.getElementById('termsLink').addEventListener('click', event => {
    event.preventDefault();
});

updateStrength();
```