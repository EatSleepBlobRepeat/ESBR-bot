const fs = require('fs');
const path = require('path');
const HTBClient = require('../wrapper');
const { TEAM_ID } = require('../constants');

async function generateResource() {
  try {
    // Generate team member info
    const { data } = await HTBClient.getTeamMembers(TEAM_ID);
    fs.writeFileSync(path.join(__dirname, '../../../../resources/dynamic', 'members.json'), JSON.stringify(data, null, 4));
  } catch (e) {
    console.log(e.message);
    console.log("Couldn't create resources");
    throw Error("Couldn't create resources");
  }
}
function getResource(type, name) {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, `../../../../resources/${type}`, `${name}.json`)).toString());
  } catch (e) {
    return {};
  }
}
async function loadResource() {
  // load usermap
  return {
    DiscordHTBUsermap: getResource('dynamic', 'username_map'),
  };
}
function saveResource(type, name, data) {
  try {
    fs.writeFileSync(path.join(__dirname, `../../../../resources/${type}`, `${name}.json`), JSON.stringify(data, null, 4));
  } catch (e) {
    throw Error(`Couldn't save resource: ${name}`);
  }
}
async function updateMemberActivity(memberID, data) {
  fs.writeFileSync(path.join(__dirname, '../../../../resources/dynamic', `${memberID}.json`), JSON.stringify(data, null, 4));
}

module.exports = {
  generateResource, updateMemberActivity, getResource, saveResource, loadResource,
};
