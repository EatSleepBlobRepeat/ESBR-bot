const Command = require('./base');
const axios = require('axios');
const HTBparser = require('./../utils/hacktheboxParser');
const TEAM_ID = '3263';
const HTB_HEADER = {
	'authority': 'www.hackthebox.eu',
	'pragma': 'no-cache',
	'cache-control': 'no-cache',
	'accept': 'application/json, text/plain, */*',
	'dnt': '1',
	'authorization': process.env.HTB_BEARER,
	'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
	'origin': 'https://app.hackthebox.eu',
	'sec-fetch-site': 'same-site',
	'sec-fetch-mode': 'cors',
	'sec-fetch-dest': 'empty',
	'referer': 'https://app.hackthebox.eu/',
	'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7',
}

const commands = {
	teamrankFunc: async (msg) => {
		try {
			const { data } = await axios.default.get(`https://www.hackthebox.eu/api/v4/team/stats/owns/${TEAM_ID}`, {
				headers: HTB_HEADER
			});
			const title = `Team Rank is: ${data.rank}!\nRespects: ${data['respects']}`
			msg.channel.send({ embed: { title, color: 1371762 } });
		} catch (e) { 
			return await msg.channel.send(`Something wrong with HTB api`);
		}
	},
	/////////////////////////////////////////
	lasthacks: async (msg, args) => {
		try{
			const parsedArgs = HTBparser(args);
			try{
				const { data } = await axios.default.get(`https://www.hackthebox.eu/api/v4/team/activity/${TEAM_ID}`, {
					params: {n_past_days: parsedArgs.day},
					headers: HTB_HEADER
				});
				const embed = {
					"title":`Hacks in Last ${parsedArgs.day} days!`, 
					color:1371762
				};
				let resultSize = 0;
				embed.fields = [];
				for(let i=0;i<data.length;i++){
					const pwns = data[i];
					let embedstr = "";
					if (parsedArgs['by'] !== null && pwns['user']['name'] !== parsedArgs['by']){
						continue;
					}	
					if (parsedArgs['limit'] !== null && parsedArgs['limit'] === resultSize){
							break;
					}
					resultSize += 1
					if( pwns['object_type'] == "challenge"){
							embedstr += `Fucked \`${pwns['name']}\` ${pwns['challenge_category']} ${pwns['object_type']} and got us ${pwns['points']} points`;
					}else{
							embedstr += `Fucked \`${pwns['type']}\` of ${pwns['object_type']} \`${pwns['name']}\` and got us ${pwns['points']} points`;
					}
					embed.fields.push({
						name:pwns['user']['name'], 
						value: embedstr, 
						inline:false
					});
				};
				return await msg.channel.send({embed});
			}catch(e){
				console.log(e);
				return await msg.channel.send(`Something wrong with HTB api`);
			}
		}catch(e){
			return await msg.channel.send(`<@${msg.author.id}>, You dumb fuck!\nBtw, the command is \`-lasthacks <numdays> [by <user>] [limit <number>]\``);
		}
	},
	contributions: async (msg) => {
		try {
			const { data } = await axios.default.get(`https://www.hackthebox.eu/api/v4/team/members/${TEAM_ID}`, {
				headers: HTB_HEADER
			});
			const embed = {
				title: "Team Contribution:",
				color: 1371762,
			}
			embed.fields = data.sort((a,b)=>b.points-a.points).map(user=>{
				return {
					name: `${user.points<150?":red_circle: ":""}${user.name}`,
					value: `with ${user.points} points`
				}
			});
			msg.channel.send({ embed });
		} catch (e) { 
			return await msg.channel.send(`Something wrong with HTB api`);
		}
	}
};

module.exports = [
	new Command("teamrank", "Get htb team rank", commands.teamrankFunc),
	new Command("lasthacks", "Get htb box completion stats", commands.lasthacks),
	new Command('contributions', "Get contributions", commands.contributions)
];