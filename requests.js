const chalk = require('chalk');
const axios = require('axios');
const { urls, getHeaders } = require('./config');

async function chainClick(auth, data) {
    return await axios.post(urls.click, data, { headers: getHeaders(data, auth) }).then((res) => {
        const { energy } = res.data;
        energy ? logClicked(res.data) : false;
        energy <= 100 ? exitProcess() : false;
    }).catch((error) => {
        logError(error);
        process.exit();
    });
}

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
        'User:', chalk.blue(object.username),
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

function logClicked(obj) {
    console.log(
        'Clicks:', chalk.yellow(obj.clicks.toFixed(0)),
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

module.exports = { chainClick, chainRefill, logInfo, logInfoError, logError, exitProcess }
