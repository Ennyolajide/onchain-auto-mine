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
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Referer': 'https://db4.onchaincoin.io/',
        // 'Content-Length': ContentLength || JSON.stringify(data).length,
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        // 'Cookie': '_ga_Z6Z992LEQC=GS1.1.1716015722.5.0.1716015786.0.0.0; _ga=GA1.1.1703520348.1715495765; cf_clearance=FO3AU3QWUR0C6.9FT7AbdXI47ZyP0Wa.nfA19fOx9nQ-1716004916-1.0.1.1-busnplBtig.U4cXubqjNBmHWFfNVSpNkLUGo7oB1_YbKfrEED6qFM6viHxDKnDEE8lOmSCZZKGIAMDM1fSEz6Q'
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
