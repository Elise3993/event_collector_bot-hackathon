import { EmbedBuilder } from 'discord.js'
export const ReceiveModal = async (interaction) => {
  if (interaction.isModalSubmit()) {
    console.log("Modal received!");
    const name = interaction.fields.getTextInputValue('name');
    const description = interaction.fields.getTextInputValue('description');
    const start_time = interaction.fields.getTextInputValue('start_time');
    const end_time = interaction.fields.getTextInputValue('end_time');
    const location = interaction.fields.getTextInputValue('location');
    let errorStack = []
    try {
      let startTime = new Date(start_time);
    } catch (e) {
      errorStack.push({
        name: '開始日時',
        value: '日時の形式が正しくありません。',
        error: e
      });
    }
    try {
      let endTime = new Date(end_time);
    } catch (e) {
      errorStack.push({
        name: '終了日時',
        value: '日時の形式が正しくありません。',
        error: e
      });
    }
    if (errorStack.length > 0) {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('エラー')
        .setAuthor({
          name: interaction.user.globalName,
          iconURL: interaction.user.avatarURL()
        })
        .addFields(
          ...errorStack
        )
        .setTimestamp();
      interaction.reply({ embeds: [embed] });
      return;
    }

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(name)
      .setAuthor({ name: interaction.user.globalName, iconURL: interaction.user.avatarURL() })
      .setDescription(description || `N/A`)
      .addFields(
        { name: '開始日時', value: `${start_time || `N/A`}`, inline: true },
        { name: '終了日時', value: `${end_time || `N/A`}`, inline: true },
        { name: '場所', value: location || `N/A`, inline: false },
      )
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
};