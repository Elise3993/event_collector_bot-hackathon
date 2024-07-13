import { SlashCommandBuilder } from "discord.js";
export const CommandDefine = new SlashCommandBuilder()
  .setName("list")
  .setDescription("イベント一覧を表示します。")
  .addStringOption((option) =>
    option.setName("name").setDescription("イベント名を入力してください。").setRequired(false),
  );
