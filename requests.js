const chalk = require('chalk');
const axios = require('axios');
const { urls, getHeaders, getUsernameFromAuthQuery } = require('./config');


async function chainRefill(auth) {
    return await axios.post(urls.energyBoost, {}, { headers: getHeaders({}, auth) }).then((res) => {
        const { status, user } = res.data;
        (status && user) ? logRefill(user) : false;
    }).catch((error) => {
        logError(error);
    });
}

function logInfo(object) {
    console.log(
        'User:', chalk.blue(getUsernameFromAuthQuery()),
        '| Gems:', chalk.green(object.gems),
        '| Coins:', chalk.yellow(object.coins.toFixed(0)),
        '| Energy:', chalk.red(object.energy.toFixed(0)),
        '| Click Level:', chalk.blue(object.clickLevel),
        '| Energy Level:', chalk.green(object.energyLevel),
        '| Daily Energy Refill:', chalk.yellow(object.dailyEnergyRefill),
    );
}

function logInfoError() {
    console.log(chalk.red('Error getting account info'));
    process.exit();
}

function logClicked(obj, clickData) {
    console.log(
        'Clicks:', chalk.yellow(clickData?.clicks),
        'Coins:', chalk.green(obj.coins.toFixed(0)),
        'Energy Level:', chalk.magenta(obj.energy.toFixed(0))
    );
}

function logRefill(user) {
    console.log('Refilled:', chalk.green('\u2714'), '| Energy Level: ', chalk.magenta(user.energy));
}

function logError(error) {
    console.log(error);
}

function exitProcess() {
    console.log(chalk.red('Error || Completed. Exiting...'));
    process.exit(); //end the process
}

module.exports = { chainRefill, logInfo, logClicked, logInfoError, logError, exitProcess }
