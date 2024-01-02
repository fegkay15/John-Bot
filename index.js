const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token, baseName, userID } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
	if((newPresence.member.id == userID) && (newPresence.activities[0] != undefined) && (newPresence.activities[0].type == 0)){
		client.user.setActivity(newPresence.activities[0].name)
		newPresence.member.setNickname(baseName + " " + newPresence.activities[0].name.replace(/\s/g, ''));
	}else if((newPresence.member.id == userID) && (newPresence.activities[0] == undefined)){
		client.user.setPresence({ activity: null })
		newPresence.member.setNickname(null);
	}
});

client.login(token);