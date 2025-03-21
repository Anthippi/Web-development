// Αναμονή για το φορτωμένο του DOM
document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('form');


    // Προσθήκη ακροατή γεγονότων υποβολής στη φόρμα
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        validateForm();
    });

    form.addEventListener('reset', function () {
        resetInputStyles();
    });


    function validateForm() {
        validatePasswords();

        validatePasswordComplexity('password1');
        validatePasswordComplexity('password2');

        validateAge();
    }


    // Συνάρτηση για τον έλεγχο των κωδικών
    function validatePasswords() {
        const password1 = document.getElementById('password1').value;
        const password2 = document.getElementById('password2').value;
        if (password1 !== password2) {
            alert('Οι κωδικοί δεν ταιριάζουν. Παρακαλούμε ελέγξτε ξανά.');
        } else {
            //alert('Οι κωδικοί είναι εντάξει!');

        }
    }

    // Συνάρτηση για τον έλεγχο της ηλικίας
    function validateAge() {
        const birthdayInput = document.getElementById('birthday');
        const birthdayValue = birthdayInput.value;
        const birthDate = new Date(birthdayValue);
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        if (birthDate > eighteenYearsAgo) {
            alert('Πρέπει να είστε 18 ετών ή παραπάνω για να υποβάλετε τη φόρμα.');
        } else {
            //alert('Είστε άνω των 18 ετών. Μπορείτε να υποβάλετε τη φόρμα.');
        }

    }

        // Συνάρτηση για τον έλεγχο της πολυπλοκότητας του κωδικού
        function validatePasswordComplexity(passwordFieldId) {
            // Λήψη της τιμής του πεδίου κωδικού
            const passwordInput = document.getElementById(passwordFieldId);
            const passwordValue = passwordInput.value;
    
            // Ελέγχουμε την πολυπλοκότητα του κωδικού
            const complexity = calculatePasswordComplexity(passwordValue);
    
            // Εφαρμογή του χρώματος στο περίγραμμα ανάλογα με την πολυπλοκότητα
            applyBackgroundColor(passwordInput, complexity);
        }
    
        // Υπολογισμός της πολυπλοκότητας του κωδικού
        function calculatePasswordComplexity(password) {
            // Παραδείγματα απλού, μέτριου και πολύπλοκου κωδικού
            const simpleRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
            const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{10,}$/;
            const strongRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])(?=.*[A-Z])(?=.*[a-z]).{12,}$/;
    
            if (strongRegex.test(password)) {
                return 'strong';
            } else if (mediumRegex.test(password)) {
                return 'medium';
            } else if (simpleRegex.test(password)) {
                return 'simple';
            } else {
                return 'weak';
            }
        }
    
        // Εφαρμογή χρώματος περιγράμματος ανάλογα με την πολυπλοκότητα
        function applyBackgroundColor(element, complexity) {
            switch (complexity) {
                case 'weak':
                    element.style.backgroundColor = 'red';
                    break;
                case 'simple':
                    element.style.backgroundColor = 'orange';
                    break;
                case 'medium':
                    element.style.backgroundColor = 'yellow';
                    break;
                case 'strong':
                    element.style.backgroundColor = 'green';
                    break;
                default:
                    element.style.backgroundColor = '';
                    break;
            }
        }

        function resetInputStyles() {
            const passwordInputs = document.querySelectorAll('input[type="password"]');
            passwordInputs.forEach(function (input) {
                input.style.backgroundColor = '';
            });
        }

});
