/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
const cron = require('node-cron');
const HTBClient = require('../wrapper');
const MEMBER_JSON = require('../../../../resources/dynamic/members.json');
const ABUSIVE_MSGS = require('../../../../resources/static/abuse_msgs.json');

// const channelId = '736548730416791632';
const channelId = '819810961778671636';

class TriggerShameAlert {
  registerPoll(client, duration = '0 */12 * * *') {
    cron.schedule(duration, async () => {
      console.log('TriggerShameAlert ran at:', new Date());
      this.pollWork(client);
    });
  }

  async pollWork(client) {
    try {
      /** @type {[]} */
      const activities = await this.getActivity();
      for (const activityObj of activities) {
        const memberID = Object.keys(activityObj)[0];
        const lastActivity = activityObj[memberID].data.profile.activity.find((a) => a.points > 0) || {};
        const level = this.getLevel(lastActivity);
        if (level.id) {
          this.sendMessage(client, this.getAbusiveMsg(client, memberID, level));
        }
      }
    } catch (e) {
      console.dir(e);
      console.log('HTB api gave up!');
    }
  }

  sendMessage(client, msg) {
    client.channels.cache.get(channelId).send(...msg);
  }

  getAbusiveMsg(client, memberID, level) {
    const member = MEMBER_JSON.find((m) => `${m.id}` === memberID);
    let embedstr = ABUSIVE_MSGS[level.id];
    embedstr = embedstr[Math.floor(Math.random() * embedstr.length)].msg.replace('$__$', level.msg);
    const embed = {
      title: 'Shame Alert! :thumbsdown:',
      color: 0xff0000,
      fields: [{
        name: member.name,
        value: embedstr,
        inline: false,
      }],
    };
    console.log([client.DiscordHTBUsermap[member.name], { embed }]);
    return [client.DiscordHTBUsermap[member.name], { embed }];
  }

  getLevel(lastActivity) {
    const lastSolveDate = new Date(lastActivity.date);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - lastSolveDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 8) {
      return {};
    }
    const msg = `it has been ${diffDays} days`;
    const returnObj = { id: 'level2', msg };

    if (diffDays > 8 && diffDays <= 14) {
      returnObj.id = 'level0';
    } if (diffDays > 14 && diffDays <= 21) {
      returnObj.id = 'level1';
    }
    return returnObj;
  }

  getActivity() {
    const promises = MEMBER_JSON.map(({ id: memberID }) => HTBClient.getMemberActivity(memberID)
      .then((d) => ({ [memberID]: d })));
    return Promise.all(promises);
  }
}

module.exports = TriggerShameAlert;
