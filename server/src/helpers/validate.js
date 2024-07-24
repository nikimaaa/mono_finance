const {Validator} = require("node-input-validator");

const validate = async (data, validationRules) => {
    const validator = new Validator(data, validationRules);
    try {
        await validator.check();
        const errors = validator.errors;
        if(Object.keys(errors).length > 0) {
            return errors;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e)
        return validator.errors;
    }
}

module.exports = validate;