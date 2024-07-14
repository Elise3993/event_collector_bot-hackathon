import { SlashCommandBuilder } from "discord.js";
export const CommandDefine = new SlashCommandBuilder()
  .setName("delete")
  .setDescription("イベントを削除します。")
  .addStringOption((option) => option.setName("id").setDescription("イベント名を入力してください。").setRequired(true));
