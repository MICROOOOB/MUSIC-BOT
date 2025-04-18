const express = require('express')
const app = express()
app.get('/', function (req, res) {
  res.send(`<center><p class="name">music bot 🟢online</p><br><img src="https://cdn.discordapp.com/icons/816316117701885962/278233ccafd8b231de4c221783c27c6a.png?size=2048"style="border-radius: 50%;max-height: 100px;border-width: medium;
border-style: solid;
border-color: #F00;border-top-color: #54ff00;border-right-color: #54ff00;
}"></center>
  <style>
  .online {
    color: #54ff00;
    max-height: 50px;
  }
.name {
    color: #fff;
    max-height: 50px;
  }
body {
    background: url(https://cdn.discordapp.com/attachments/810690445641383936/836942493756817408/background.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
  </style>`)
})
app.listen(3000)

const Aoijs = require('aoi.js');
const config = require('./config.json');
const bot = new Aoijs.Bot({
	sharding: false,
	shardAmount: 2,
	token: config.token,
	prefix: ['$getServerVar[prefix]', 'b1']
});

// Warning channel

bot.onMessage({
	guildOnly: true
});


const fs = require('fs');

const folders = fs.readdirSync('./commands/');

for (const files of folders) {
	const folder = fs
		.readdirSync(`./commands/${files}/`)
		.filter(file => file.endsWith('.js'));

	for (const commands of folder) {
		const command = require(`./commands/${files}/${commands}`);
		bot.command({
			name: command.name,
			aliases: command.aliases,
			code: command.code
		});
  }
}





// Variables
bot.variables({
			prefix: '!!',
      id: ''
})

    bot.command({
	name: '<@!1362611907349184572>', // Your bot's ID!!!
	code: `$title[My name is $username[$clientID]]
$description[My prefix is \`$getServerVar[prefix]\`
My creator is <@!$botOwnerID>]
$footer[$getServerVar[prefix]help to see my list of commands]
$color[RANDOM]
	`,
	nonPrefixed: true
});

bot.readyCommand({
  channel: "824266947054927924",
    code: `
$log[]
$log[Created by appmakerparana]
    `
})

bot.status({
  text: "use $getvar[prefix]help",
  type: "PLAYING",
  time: 5
})
// Events
bot.musicStartCommand({
	channel: '$channelID',
	code: `
 $author[Playing now;https://cdn.discordapp.com/attachments/812081910532538419/812082048432341052/cd.gif]
$color[RANDOM]
$thumbnail[$songInfo[thumbnail]]
$addField[Duration;\`$songInfo[duration]\`;yes]
$addField[Info;[Music link]($songInfo[url])
**Artist**
[$songInfo[publisher]]($songInfo[publisher_url]);yes]
$addField[Title;\`$songInfo[title]\`;yes]
`
});

bot.musicEndCommand({
	channel: '$channelID',
	code: `
  $description[Music has ended]
  $footer[Leaving the call;https://cdn.discordapp.com/attachments/812081910532538419/812082048432341052/cd.gif]
  $color[RANDOM]
  `
})

bot.command({
	name: 'setprefix',
	code: `$setServerVar[prefix;$message] $description[The new server prefix is \`$message\`]
  $onlyPerms[admin; <@$authorID> \`You do not have admin permissions\`]
  $argsCheck[1;Please provide a valid argument]
  `
});
