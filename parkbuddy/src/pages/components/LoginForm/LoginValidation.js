function Validation(values) {
    let errors = {};
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.username === "") {
        errors.username = "Username should not be empty";
    }

    if (values.email && !email_pattern.test(values.email)) {
        errors.email = "Email is not valid";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Password must contain at least one number, one lowercase letter, one uppercase letter, and at least 8 characters";
    }

    if (values.confirmPassword !== undefined && values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
}

export default Validation;
