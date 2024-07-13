import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { ReceiveInteraction } from "./ReplyInteraction.mjs";
dayjs.extend(customParseFormat);

export const ReceiveModal = async (interaction) => {
  if (interaction.isModalSubmit()) {
    console.log("Modal received!");
    const timeFormat = "YYYY/M/D H:m";

    const name = interaction.fields.getTextInputValue("name");
    const start_time =
      interaction.fields.getTextInputValue("start_time") === ""
        ? null
        : dayjs(interaction.fields.getTextInputValue("start_time"), timeFormat);
    const end_time =
      interaction.fields.getTextInputValue("end_time") === ""
        ? null
        : dayjs(interaction.fields.getTextInputValue("end_time"), timeFormat);
    const description =
      interaction.fields.getTextInputValue("description") === ""
        ? null
        : interaction.fields.getTextInputValue("description");
    const location =
      interaction.fields.getTextInputValue("location") === "" ? null : interaction.fields.getTextInputValue("location");
    ReceiveInteraction(interaction, name, start_time, end_time, description, location);
  }
};
