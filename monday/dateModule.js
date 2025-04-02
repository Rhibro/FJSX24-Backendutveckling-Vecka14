exports.getCurrentDate = function () {
    return new Date().toISOString().split('T')[0]; // retuns date in YYYY-MM-DD
};