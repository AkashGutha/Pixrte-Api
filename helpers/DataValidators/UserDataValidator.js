var username_regex = /^[a-z0-9_]{4,20}$/;
var password_regex = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;
var email_regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

function validateUsername(name) {
	return username_regex.test(name);
}

function validatePassword(password) {
	return password_regex.test(password);
}

function validateEmail(email) {
	return email_regex.test(email);
}

exports.validateUsername = validateUsername;
exports.validatePassword = validatePassword;
exports.validateEmail = validateEmail;