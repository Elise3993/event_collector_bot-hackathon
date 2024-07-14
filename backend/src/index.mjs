import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import app from "./api/events.mjs";
import { addCommand } from "./command/add.mjs";
import { deleteCommand } from "./command/delete.mjs";
import { listCommand } from "./command/list.mjs";
import { createEventDataTable } from "./db/events.mjs";
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
    await client.application.commands.set(
      [
        addCommand.CommandDefine,
        listCommand.CommandDefine,
        deleteCommand.CommandDefine,
      ],
      "1259019648591204465"
    );
    console.log("Slash Commands Registered!");
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
        interaction.showModal(addCommand.ModalDefine);
      }
      addCommand.ReceiveCommand(interaction);
    }
    addCommand.ReceiveModal(interaction);
    if (interaction.commandName === "list") {
      console.log("list command triggered!");
      listCommand.ReceiveCommand(interaction);
    }
    if (interaction.commandName === "delete") {
      deleteCommand.ReceiveCommand(interaction);
    }
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
createEventDataTable();