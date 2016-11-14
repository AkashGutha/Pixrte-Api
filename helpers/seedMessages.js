
//======================================================================
// User account related messages
//======================================================================

exports.UserExists = {
    success: false,
    message: 'Sorry! User exists'
};

exports.UserNotFound = {
    success: false,
    message: 'Authentication failed, User not found'
};

exports.UserExists = {
    success: false,
    message: 'Sorry! The username is taken'
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
// PAssword related messages
//======================================================================

exports.PasswordMatchFailure = {
    success: false,
    message: 'Authentication failed. Wrong password'
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





