import { Client, GatewayIntentBits, Events } from 'discord.js';
import { CommandDefine, ModalDefine, ReceiveCommand, ReceiveModal } from './command/add.mjs';
import dotenv from 'dotenv';
dotenv.config();
// import { fs } from 'fs';
// const token = JSON.parse(fs.readFileSync('../config.json', 'utf-8')).token;
const { token } = process.env;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, async readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  try {
    await client.application.commands.set(CommandDefine, '956804038836518942');
    await client.application.commands.set(CommandDefine, '1259019648591204465');
    console.log("Slash Commands Registered!");
  } catch (err) {
    console.error(err);
  }
});
client.on(Events.InteractionCreate, async interaction => {
  try {
    if (interaction.commandName === 'add') {
      console.log("add command triggered!");
      if (interaction.options._hoistedOptions.length === 0) {
        console.log("Form option selected!");
        interaction.showModal(ModalDefine);
      }
      ReceiveCommand(interaction);
    }
    ReceiveModal(interaction);
  } catch (err) { console.error(err, interaction); }
});
client.login(token);