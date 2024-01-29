const userValidator = ({ userData, method }) => {



    const { name, email, password, role, status, } = userData;
    const errors = [];

    const validateRequired = (field, fieldName) => {
        if (!field) {
            errors.push({ [fieldName]: `${fieldName} is required` });
        }
    };

    const validateLength = (field, fieldName, minLength) => {
        if (field && field.length < minLength) {
            errors.push({ [fieldName]: `${fieldName} must be at least ${minLength} characters long` });
        }
    };

    const validateAlphanumeric = (field, fieldName) => {
        if (field && !field.match(/^[a-zA-Z0-9]+$/)) {
            errors.push({ [fieldName]: `${fieldName} must contain only alphanumeric characters` });
        }
    };

    const validateEmail = (field, fieldName) => {
        if (field && !field.match(/^\S+@\S+\.\S+$/)) {
            errors.push({ [fieldName]: `${fieldName} is invalid` });
        }
    };

    const validatePassword = (field, fieldName) => {
        if (field && field.length < 5) {
            errors.push({ [fieldName]: `${fieldName} must be at least 5 characters long` });
        } else {
            const hasNumberAndUppercase = /[0-9]/.test(field) && /[A-Z]/.test(field);
            const hasSpecialCharacter = /[@#$%^&+=]/.test(field);

            if (!hasNumberAndUppercase) {
                errors.push({ [fieldName]: `${fieldName} must contain a number and an uppercase letter` });
            }

            if (!hasSpecialCharacter) {
                errors.push({ [fieldName]: `${fieldName} must contain a special character` });
            }
        }
    };


    function validateUserCreation() {
        validateRequired(name, 'Name');
        validateLength(name, 'Name', 3);
        validateAlphanumeric(name, 'Name');

        validateRequired(email, 'Email');
        validateEmail(email, 'Email');

        validateRequired(password, 'Password');
        validateLength(password, 'Password', 5);
        validatePassword(password, 'Password');

        validateRequired(role, 'Role');
        validateRequired(status, 'Status');
    }

    function validateUserUpdate() {
        name && validateLength(name, 'Name', 3);
        name && validateAlphanumeric(name, 'Name');
        email && validateEmail(email, 'Email');
        password && validateLength(password, 'Password', 5);
        password && validatePassword(password, 'Password');
    }


    if (method === 'create') {
        validateUserCreation();
    }

    if (method === 'update') {
        validateUserUpdate();
    }



    return { errors: errors.length > 0 ? errors : null };
};

module.exports = { userValidator };


