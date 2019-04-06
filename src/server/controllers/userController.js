exports.register = (req, res) => {
    res.json({message: 'Register'});
};

exports.login = (req, res) => {
    res.json({message: 'Login'});
};

exports.getMyInfo = (req, res) => {
    res.json({message: 'My Info'});
};

exports.logout = (req, res) => {
    res.json({message: 'Logout'});
};
