import { EmbedBuilder } from "discord.js";
export const ReceiveInteraction = async (interaction, name, start_time, end_time, description, location) => {
  let errorStack = [];
  if (start_time !== null && start_time.format() === "Invalid Date") {
    errorStack.push({ name: "開始日時", value: "無効な日時です", inline: false });
  }
  if (end_time !== null && end_time.format() === "Invalid Date") {
    errorStack.push({ name: "終了日時", value: "無効な日時です", inline: false });
  }
  if (name === null) {
    errorStack.push({ name: "イベント名", value: "未入力です", inline: false });
  }

  if (errorStack.length > 0) {
    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("エラー")
      .setAuthor({
        name: interaction.user.globalName,
        iconURL: interaction.user.avatarURL(),
      })
      .addFields(...errorStack)
      .setDescription("入力内容に誤りがあります。入力し直してください。")
      .setTimestamp();
    interaction.reply({ embeds: [embed], ephemeral: true });
    return;
  }

  let fields = [];
  if (location !== null) {
    fields.push({ name: "場所", value: location, inline: false });
  }
  if (start_time !== null) {
    fields.push({ name: "開始日時", value: `${start_time.format()}`, inline: true });
  }
  if (end_time !== null) {
    fields.push({ name: "終了日時", value: `${end_time.format()}`, inline: true });
  }
  const embed = new EmbedBuilder()
    .setColor("#0099ff")
    .setTitle(name)
    .setAuthor({ name: interaction.user.globalName, iconURL: interaction.user.avatarURL() })
    .setDescription(description || null)
    .addFields(...fields)
    .setTimestamp();
  interaction.reply({ embeds: [embed], ephemeral: true });
};
