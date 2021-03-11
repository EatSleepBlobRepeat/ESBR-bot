const fs = require('fs');
const path = require('path');
const HTBClient = require('../cogs/hackthebox/wrapper');
const { TEAM_ID } = require('../cogs/hackthebox/constants');

async function generateResource() {
  try {
    // Generate team member info
    const { data } = await HTBClient.getTeamMembers(TEAM_ID);
    fs.writeFileSync(path.join(__dirname, '../../resources/dynamic', 'members.json'), JSON.stringify(data));
  } catch (e) {
    console.log(e.message);
    console.log("Couldn't create resources");
  }
}
async function updateMemberActivity(memberID, data) {
  fs.writeFileSync(path.join(__dirname, '../../resources/dynamic', `${memberID}.json`), JSON.stringify(data));
}

module.exports = { generateResource, updateMemberActivity };
