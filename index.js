require('dotenv').config();
const axios = require('axios');
const { clicks } = require('./utils.js');
const { urls, setToken, buildAuthQuery, getHeaders } = require('./config');
const { chainClick, chainRefill, logInfo, logInfoError, logError, exitProcess } = require('./requests');


const authData = buildAuthQuery();

axios.post(urls.validate, authData, { headers: getHeaders(authData) })
    .then((res) => {
        const { success, token } = res.data;
        (success && token) ? false : process.exit();
        const auth = token ? setToken(token) : false;
        setTimeout(() => {
            axios.get(urls.info, { headers: getHeaders({}, auth) }).then((res) => {
                const { success, user } = res.data;
                success ? logInfo(user) : logInfoError();
                const { energy, clickLevel, dailyEnergyRefill } = user;
                setTimeout(() => {
                    //(dailyEnergyRefill && energy <= 100) ? chainRefill(auth) : false;
                },3000);

                function handleChainclick() {
                    (energy >= 0) ? chainClick(auth, clicks(energy, clickLevel)) : exitProcess();
                }

                handleChainclick();

                setInterval(handleChainclick, (15 * 1000));
                
            }).catch((error) => {
                logError(error);
                process.exit()
            });
        }, 3000);

    })
    .catch(error => {
        logError(error);
        process.exit();
    });