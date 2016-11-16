//======================================================================
// User account related messages
//======================================================================

exports.UserExists = {
	success: false,
	message: 'User exists'
};

exports.UserNotFound = {
	success: false,
	message: 'User not found'
};

exports.UserExists = {
	success: false,
	message: 'Username is taken'
};

exports.UserCreated = {
	success: true,
	message: 'User created sucesfully'
};

exports.MissingCredentials = {
	success: false,
	message: 'Missing credentials'
};

//======================================================================
// Password related messages
//======================================================================

exports.PasswordMatchFailure = {
	success: false,
	message: 'Wrong password'
};


//======================================================================
// Token related messages
//======================================================================

exports.TokenCreated = function (token) {
	return {
		success: true,
		message: 'Token generated sucessfully',
		token: token
	}
};

exports.TokenAuthFailed = {
	success: false,
	message: 'Token authentication failed'
};

exports.TokenNotFound = {
	success: false,
	message: "Token not found"
};


//======================================================================
// Privilegaes related messages
//======================================================================

exports.NotAuthorized = {
	success: false,
	message: 'Not Authorized'
};