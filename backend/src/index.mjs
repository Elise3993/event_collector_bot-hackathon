import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import app from "./api/events.mjs";

import {
  CommandDefine,
  ModalDefine,
  ReceiveCommand,
  ReceiveModal,
} from "./command/add.mjs";
dotenv.config();
const { token } = process.env;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  try {
    client.application.commands
      .set([addCommand.CommandDefine], "1259019648591204465")
      .then(console.log("Slash Commands Registered!"));
  } catch (err) {
    console.error(err);
  }
});
client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.commandName === "add") {
      console.log("add command triggered!");
      if (interaction.options._hoistedOptions.length === 0) {
        console.log("Form option selected!");
        interaction.showModal(ModalDefine);
      }
      ReceiveCommand(interaction);
    }
    ReceiveModal(interaction);
  } catch (err) {
    console.error(err, interaction);
  }
});
client.login(token);

// APIサーバーを起動
const PORT = 4000;
app.listen(4000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
