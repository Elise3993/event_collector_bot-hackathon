import { EmbedBuilder } from 'discord.js'
export const ReceiveCommand = async (interaction) => {
  if (interaction.options._hoistedOptions.length > 0) {
    console.log("Form option not selected!");
    const name = interaction.options.getString('name');
    const description = interaction.options.getString('description');
    const start_year = interaction.options.getInteger('start_year');
    const start_month = interaction.options.getInteger('start_month');
    const start_day = interaction.options.getInteger('start_day');
    const start_hour = interaction.options.getInteger('start_hour');
    const start_minute = interaction.options.getInteger('start_minute');
    const end_year = interaction.options.getInteger('end_year');
    const end_month = interaction.options.getInteger('end_month');
    const end_day = interaction.options.getInteger('end_day');
    const end_hour = interaction.options.getInteger('end_hour');
    const end_minute = interaction.options.getInteger('end_minute');
    const location = interaction.options.getString('location');
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(name)
      .setAuthor({ name: interaction.user.globalName, iconURL: interaction.user.avatarURL() })
      .setDescription(description)
      .addFields(
        { name: '開始日時', value: `${start_year || `N/A`}/${start_month || `N/A`}/${start_day || `N/A`} ${start_hour || `N/A`}:${start_minute || `N/A`}`, inline: true },
        { name: '終了日時', value: `${end_year || `N/A`}/${end_month || `N/A`}/${end_day || `N/A`} ${end_hour || `N/A`}:${end_minute || `N/A`}`, inline: true },
        { name: '場所', value: location || `N/A`, inline: false },
      )
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
}