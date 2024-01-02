const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token, baseName, userID } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
	if((newPresence.member.id == userID) && (newPresence.activities[0] != undefined) && (newPresence.activities[0].type == 0)){
		newPresence.member.setNickname(baseName + " " + newPresence.activities[0].name.replace(/\s/g, ''));
	}else if((newPresence.member.id == userID) && (newPresence.activities[0] == undefined)){
		newPresence.member.setNickname(null);
	}
});

client.login(token);