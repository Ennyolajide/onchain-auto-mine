require('dotenv').config();

const env = process.env;

const baseUrl = 'https://db4.onchaincoin.io/api';

function setToken(token) {
    return { 'Authorization': `Bearer ${token}` };
}

function buildAuthQuery() {
   return { 'hash': env.AUTH_QUERY };
  }

function getHeaders(data = {}, headers = {}, ContentLength = null) {

    return {
        'Accept': 'application/json, text/plain, */*',
        'Sec-Fetch-Site': 'same-origin',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Mode': 'cors',
        'Content-Type': 'application/json',
        'Origin': 'https://db4.onchaincoin.io',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-N960F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://db4.onchaincoin.io/',
        // 'Content-Length': ContentLength || JSON.stringify(data).length,
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        ...headers
      };
}

const urls = {
    info: `${baseUrl}/info`,
    validate: `${baseUrl}/validate`,
    click: `${baseUrl}/klick/myself/click`,
    clickBoost: `${baseUrl}/boosts/click`,
    energyBoost: `${baseUrl}/boosts/energy`,
}


module.exports = { urls, setToken, buildAuthQuery, getHeaders }
