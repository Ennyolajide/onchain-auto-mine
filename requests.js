const chalk = require('chalk');
const axios = require('axios');
const { urls, getHeaders } = require('./config');

async function chainClick(auth, user, data) {
    return await axios.post(urls.click, data, { headers: getHeaders(data, auth) }).then((res) => {  
        const { energy } = res.data;
        //const { dailyEnergyRefill } = user;
        (energy > 0) ? logClicked(res.data) : exitProcess();
        //(dailyEnergyRefill && energy <= 50) ? chainRefill(auth) : exitProcess();
    }).catch((error) => {
        logError(error);
    });
}

async function chainRefill(auth) {
    return await axios.post(urls.energyBoost, {}, { headers: getHeaders({}, auth) }).then((res) => {
        const { status, user } = res.data;
        (status && user) ? logRefill(user) : exitProcess();
    }).catch((error) => {
        logError(error);
    });
}

function logInfo(object) {
    console.log(
        'Coins:', chalk.yellow(object.coins.toFixed(0)),
        '| Clicks:', chalk.green(object.clicks.toFixed(0)),
        '| Energy:', chalk.red(object.energy.toFixed(0)),
        '| Referral:', chalk.cyan(object.referals),
        // '| Ban Status:', chalk.red(object.isBanned),
        '| Energy Level:', chalk.blue(object.energy.toFixed(0)),
        // '| Click Level:', chalk.magenta(object.clickLevel),
        '| Max Click Boost:', chalk.blue(object.maxClickBoost),
        '| Daily Click Boosts:', chalk.green(object.dailyClickBoosts),
        '| Daily Energy Refill:', chalk.yellow(object.dailyEnergyRefill),
    );
}

function logInfoError(){
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

module.exports = { chainClick, logInfo, logInfoError, logError, exitProcess }
