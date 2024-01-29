const postValidator = ({ postData, method }) => {


    const { title, content, author, images, slug, category, tags, status, dates } = postData

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







    function validatePostCreation() {
        validateRequired(title, 'Title');
        validateLength(title, 'Title', 3);
        validateAlphanumeric(title, 'Title');

        validateRequired(content, 'Content');
        validateLength(content, 'Content', 5);

        validateRequired(author, 'Author');

        validateRequired(slug, 'Slug');
        validateLength(slug, 'Slug', 3);


        validateRequired(category, 'Category');

        validateRequired(tags, 'Tags');


        validateRequired(status, 'Status');

    }

    function validatePostUpdate() {

        validateLength(title, 'Title', 3);
        validateAlphanumeric(title, 'Title');


        validateLength(content, 'Content', 5);

        validateLength(slug, 'Slug', 3);
    }



    if (method === 'create') {
        validatePostCreation();
    }

    if (method === 'update') {
        validatePostUpdate();
    }





    return { errors: errors.length > 0 ? errors : null };


}

module.exports = { postValidator };