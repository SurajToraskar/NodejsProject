const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  message.reply({
    content: "Hi From Bot",
  });
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong");
});

client.login(
  "MTMwNjI5NTM4NzA3NzczODYzOA.GkxVFY.zILhxJdbyyUBJIhs1dSitjdlEVWsgLGcmcPguc"
);
