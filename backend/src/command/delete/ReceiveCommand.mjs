import { EmbedBuilder } from "discord.js";
import { deleteEventDataById } from "../../db/events.mjs";
export const ReceiveCommand = async (interaction) => {
  console.log("delete Command received!");
  const id = interaction.options.getString("id");
  deleteEventDataById(id);
  const embed = new EmbedBuilder()
    .setColor("#ff0000")
    .setTitle("削除")
    .setAuthor({
      name: interaction.user.globalName,
      iconURL: interaction.user.avatarURL(),
    })
    .setDescription(`イベント「${id}」を削除しました。`)
    .setTimestamp();
  interaction.reply({ embeds: [embed], ephemeral: true });
};
