import { EmbedBuilder } from "discord.js";
import { fetchAllEventData } from "../../db/events.mjs";
export const ReceiveCommand = async (interaction) => {
  console.log("list command received!");
  const events = await fetchAllEventData();
  const events_string = events.map((event) => {
    return `タイトル: ${event.title}\n開始日時: ${event.start_date}\n終了日時: ${event.end_date}\n場所: ${event.place}\n説明: ${event.description}\n作成者: ${event.author}\nサーバー名: ${event.server_name}\n\n`;
  }).join(" ");

  const embed = new EmbedBuilder()
    .setColor("#0099ff")
    .setTitle("イベントの一覧")
    .setAuthor({ name: interaction.user.globalName, iconURL: interaction.user.avatarURL() })
    .setDescription(events_string)
    .setTimestamp();
  interaction.reply({ embeds: [embed], ephemeral: true });
};
