
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

//======================================================================
// User account related messages
//======================================================================

exports.PasswordMatchFailure = {
    success: false,
    message: 'Authentication failed. Wrong password'
};


//======================================================================
// User account related messages
//======================================================================

exports.TokenCreated = function (token) {
    return {
        success: true,
        message: 'Token generated sucessfully',
        token: token
    }
};




