import { EmbedBuilder } from "discord.js";
import { fetchAllEventData } from "../../db/events.mjs";
export const ReceiveCommand = async (interaction) => {
  console.log("list command received!");
  const events = fetchAllEventData();
  const embed = new EmbedBuilder()
    .setColor("#0099ff")
    .setTitle("イベントの一覧")
    .setAuthor({ name: interaction.user.globalName, iconURL: interaction.user.avatarURL() })
    .setDescription(events)
    .setTimestamp();
  interaction.reply({ embeds: [embed], ephemeral: true });
};
