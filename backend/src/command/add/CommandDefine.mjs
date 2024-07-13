import { SlashCommandBuilder } from "discord.js";
export const CommandDefine = new SlashCommandBuilder()
  .setName("add")
  .setDescription("イベントを追加します。")
  .addStringOption((option) =>
    option.setName("name").setDescription("イベント名を入力してください。").setRequired(false),
  )
  .addStringOption((option) =>
    option.setName("description").setDescription("イベントの説明を入力してください。").setRequired(false),
  )
  .addIntegerOption((option) =>
    option.setName("start_year").setDescription("イベントの年を入力してください。").setRequired(false),
  )
  .addIntegerOption((option) =>
    option
      .setName("start_month")
      .setDescription("イベントの月を入力してください。")
      .setMaxValue(12)
      .setMinValue(1)
      .setRequired(false),
  )
  .addIntegerOption((option) =>
    option
      .setName("start_day")
      .setDescription("イベントの日を入力してください。")
      .setMaxValue(31)
      .setMinValue(1)
      .setRequired(false),
  )
  .addIntegerOption((option) =>
    option
      .setName("start_hour")
      .setDescription("イベントの時間を入力してください。")
      .setMaxValue(23)
      .setMinValue(0)
      .setRequired(false),
  )
  .addIntegerOption((option) =>
    option
      .setName("start_minute")
      .setDescription("イベントの分を入力してください。")
      .setMaxValue(59)
      .setMinValue(0)
      .setRequired(false),
  )
  .addIntegerOption((option) =>
    option.setName("end_year").setDescription("イベントの年を入力してください。").setRequired(false),
  )
  .addIntegerOption((option) =>
    option
      .setName("end_month")
      .setDescription("イベントの月を入力してください。")
      .setMaxValue(12)
      .setMinValue(1)
      .setRequired(false),
  )
  .addIntegerOption((option) =>
    option
      .setName("end_day")
      .setDescription("イベントの日を入力してください。")
      .setMaxValue(31)
      .setMinValue(1)
      .setRequired(false),
  )
  .addIntegerOption((option) =>
    option
      .setName("end_hour")
      .setDescription("イベントの時間を入力してください。")
      .setMaxValue(23)
      .setMinValue(0)
      .setRequired(false),
  )
  .addIntegerOption((option) =>
    option
      .setName("end_minute")
      .setDescription("イベントの分を入力してください。")
      .setMaxValue(59)
      .setMinValue(0)
      .setRequired(false),
  )
  .addStringOption((option) =>
    option.setName("location").setDescription("イベントの場所を入力してください。").setRequired(false),
  );
