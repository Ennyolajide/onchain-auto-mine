require('dotenv').config();
const axios = require('axios');
const { clicks } = require('./utils.js');
const { urls, setToken, buildAuthQuery, getHeaders } = require('./config');
const { chainClick, logInfo, logInfoError, logError, exitProcess } = require('./requests');


const authData = buildAuthQuery();

axios.post(urls.validate, authData, { headers: getHeaders(authData) })
    .then((res) => {
        const { success, token } = res.data;
        (success && token) ? false : process.exit();
        const auth = token ? setToken(token) : false;
        axios.get(urls.info, { headers: getHeaders({}, auth) }).then((res) => {
            const { success, user } = res.data;
            const { energy, clickLevel } = user;
            success ? logInfo(user) : logInfoError();
            (energy > 0) ? chainClick(auth, clicks(energy, clickLevel)) : exitProcess();
        }).catch((error) => {
            logError(error);
            process.exit()
        });

    })
    .catch(error => {
        logError(error);
        process.exit();
    });