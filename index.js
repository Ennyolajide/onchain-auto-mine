require('dotenv').config();
const axios = require('axios');
const { clicks } = require('./utils.js');
const { urls, setToken, buildAuthQuery, getHeaders } = require('./config');
const { chainRefill, logInfo, logClicked, logInfoError, logError, exitProcess } = require('./requests');


const env = process.env;
const authData = buildAuthQuery();
const clickInterval = parseInt(env.CLICK_INTERVAL) || 10

async function main() {
    axios.post(urls.validate, authData, { headers: getHeaders(authData) })
        .then((res) => {
            const { success, token } = res.data;
            (success && token) ? false : process.exit();
            const auth = token ? setToken(token) : false;

            axios.get(urls.info, { headers: getHeaders({}, auth) }).then((res) => {
                const { success, user } = res.data;
                success ? logInfo(user) : logInfoError();
                let { energy, clickLevel, dailyEnergyRefill } = user;
                (dailyEnergyRefill && energy <= 10) ? chainRefill(auth) : false;

                function handleChainclick() {
                    const clickData = clicks(energy, clickLevel);
                    if (energy > 0) {
                        axios.post(urls.click, clickData, { headers: getHeaders(clickData, auth) }).then((res) => {
                            energy = Math.floor(res.data?.energy);
                            energy ? logClicked(res.data, clickData) : false;
                            energy <= 10 ? exitProcess() : false;
                        }).catch((error) => {
                            logError(error);
                            process.exit();
                        });
                    } else {
                        exitProcess();
                    }
                }

                handleChainclick();

                setInterval(handleChainclick, (clickInterval * 1000));

            }).catch((error) => {
                logError(error);
                process.exit();
            });
        })
        .catch(error => {
            logError(error);
        });
}

main();