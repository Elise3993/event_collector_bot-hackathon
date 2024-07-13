import { SlashCommandBuilder } from "discord.js";
export const CommandDefine = [
  new SlashCommandBuilder()
    .setName("add")
    .setDescription("イベントを追加します。")
    .addStringOption((option) =>
      option.setName("name").setDescription("イベント名を入力してください。").setRequired(false),
    )
    .addStringOption((option) =>
      option.setName("start_time").setDescription("開始日時を入力してください。").setRequired(false),
    )
    .addStringOption((option) =>
      option.setName("end_time").setDescription("終了日時を入力してください。").setRequired(false),
    )
    .addStringOption((option) =>
      option.setName("description").setDescription("イベントの説明を入力してください。").setRequired(false),
    )
    .addStringOption((option) =>
      option.setName("location").setDescription("イベントの場所を入力してください。").setRequired(false),
    ),
];
