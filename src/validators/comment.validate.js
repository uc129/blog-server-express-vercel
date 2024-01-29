export const commentsValidator = ({ commentData, method }) => {

    const { content, user, post, parent } = commentData

    const errors = [];

    const validateRequired = (field, fieldName) => {
        if (!field) {
            errors.push({ [fieldName]: `${fieldName} is required` });
        }
    };

    const validateLength = (field, fieldName, length) => {
        if (field.length < length) {
            errors.push({ [fieldName]: `${fieldName} must be at least ${length} characters long` });
        }
    };

    const validateAlphanumeric = (field, fieldName) => {
        if (!field.match(/^[a-zA-Z0-9]+$/)) {
            errors.push({ [fieldName]: `${fieldName} must contain only alphanumeric characters` });
        }
    };


    function validateCommentCreation() {
        validateRequired(content, 'Content');
        validateLength(content, 'Content', 3);

        validateRequired(user, 'User');

        validateRequired(post, 'Post');

        validateRequired(parent, 'Parent');

    }

    function validateCommentUpdate() {
        validateLength(content, 'Content', 3);
    }


    if (method === 'create') {
        validateCommentCreation();
    }

    if (method === 'update') {
        validateCommentUpdate();
    }

    return errors;


}