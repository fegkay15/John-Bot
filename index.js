const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token, baseName, userID, serverID } = require('./config.json');
const cron = require('node-cron');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	cron.schedule('*/5 * * * * *', function() {
		const guild = client.guilds.cache.get(serverID);
		var john = guild.members.cache.get(userID);
		var gameName;
		for(i = 0; i < john.presence.activities.length; i++){
			if(john.presence.activities[i].type == 0){
				gameName = john.presence.activities[i].name;
			}
		}
		if(gameName != undefined){
			client.user.setActivity(gameName)
			john.presence.member.setNickname(baseName + " " + gameName.replace(/\s/g, ''));
		}else{
			client.user.setPresence({ activity: null })
			john.presence.member.setNickname(null);
		}
	});
});

client.login(token);