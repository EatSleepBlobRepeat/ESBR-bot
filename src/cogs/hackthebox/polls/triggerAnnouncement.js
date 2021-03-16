/* eslint-disable no-empty */
/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */

const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const MEMBER_JSON = require('../../../../resources/dynamic/members.json');

// const channelId = '736548730416791632';
const channelId = '819624091317174273';
const HTBClient = require('../wrapper');
const { updateMemberActivity } = require('../utils/resourceManager');

class TriggerAnnouncement {
  registerPoll(client, duration = '*/10 * * * *') {
    cron.schedule(duration, () => {
      console.log('I ran at:', new Date());
      this.pollWork(client);
    });
  }

  async pollWork(client) {
    // check activity
    // client.channels.cache.get(channelId).send('hello from cron');
    try {
      /** @type {[]} */
      const activities = await this.getActivity();
      for (const activityObj of activities) {
        const memberID = Object.keys(activityObj)[0];
        const { activity } = activityObj[memberID].data.profile;
        const newActivity = this.checkActivityWithExisting(memberID, activity);
        this.sendMessage(client, memberID, newActivity);
        updateMemberActivity(memberID, activity);
      }
    } catch (e) {
      console.dir(e);
      console.log('HTB api gave up!');
    }
  }

  checkActivityWithExisting(memberID, /** @type {[]} */activity) {
    let pastActivity = '';
    try {
      pastActivity = fs.readFileSync(path.join(__dirname, '../../../../resources/dynamic', `${memberID}.json`));
    } catch (e) {}
    const pastActivityJSON = JSON.parse(pastActivity.toString() || '[]');
    if (pastActivityJSON.length) {
      const activityIndex = activity.findIndex((a) => (pastActivityJSON[0].date === a.date));
      return activity.slice(0, activityIndex);
    }
    return [];
  }

  async sendMessage(client, memberID, newActivity) {
    const member = MEMBER_JSON.find((m) => `${m.id}` === memberID);
    for (const pwns of newActivity) {
      console.log(memberID, newActivity);
      let embedstr = '';
      if (pwns.object_type === 'challenge') {
        embedstr += `Fucked \`${pwns.name}\` ${pwns.challenge_category} ${pwns.object_type} on \`${new Date(pwns.date).toUTCString()}\` and got us ${pwns.points} points`;
      } else {
        embedstr += `Fucked \`${pwns.type}\` of ${pwns.object_type} \`${pwns.name}\` on \`${new Date(pwns.date).toUTCString()}\` and got us ${pwns.points} points`;
      }
      const embed = {
        title: 'Hack Alert!',
        color: 1371762,
        fields: [{
          name: member.name,
          value: embedstr,
          inline: false,
        }],
      };
      client.channels.cache.get(channelId).send({ embed });
    }
  }

  getActivity() {
    const promises = MEMBER_JSON.map(({ id: memberID }) => HTBClient.getMemberActivity(memberID)
      .then((d) => ({ [memberID]: d })));
    return Promise.all(promises);
  }
}

module.exports = TriggerAnnouncement;
