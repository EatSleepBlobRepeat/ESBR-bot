const config = require('../../config');

const constants = {};
constants.TEAM_ID = config.hackthebox.team_id;
constants.HTB_HEADER = {
  authority: 'www.hackthebox.eu',
  pragma: 'no-cache',
  'cache-control': 'no-cache',
  accept: 'application/json, text/plain, */*',
  dnt: '1',
  authorization: process.env.HTB_BEARER,
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
  origin: 'https://app.hackthebox.eu',
  'sec-fetch-site': 'same-site',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  referer: 'https://app.hackthebox.eu/',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7',
};

module.exports = constants;
