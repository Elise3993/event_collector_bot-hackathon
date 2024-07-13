import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';
export const ModalDefine = new ModalBuilder()
  .setCustomId('addEventForm')
  .setTitle('以下のフォームに入力してください。')
  .addComponents(
    new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('name')
          .setLabel('イベント名')
          .setPlaceholder('イベント名を入力してください。')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)),
    new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('start_time')
          .setLabel('開始日時')
          .setPlaceholder('YYYY/MM/DD HH:MM')
          .setStyle(TextInputStyle.Short)
          .setRequired(false)
      ),
    new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('end_time')
          .setLabel('終了日時')
          .setPlaceholder('YYYY/MM/DD HH:MM')
          .setStyle(TextInputStyle.Short)
          .setRequired(false)),
    new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('description')
          .setLabel('イベントの説明')
          .setPlaceholder('イベントの説明を入力してください。')
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(false)),
    new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('location')
          .setLabel('場所')
          .setPlaceholder('イベントの場所を入力してください。')
          .setStyle(TextInputStyle.Short)
          .setRequired(false)));