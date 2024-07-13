import dayjs from "dayjs";
import { ReceiveInteraction } from "./ReplyInteraction.mjs";
export const ReceiveCommand = async (interaction) => {
  if (interaction.options._hoistedOptions.length > 0) {
    console.log("Command received!");
    const name = interaction.options.getString("name");
    const start_time =
      interaction.options.getString("start_time") === null ? null : dayjs(interaction.options.getString("start_time"));
    const end_time =
      interaction.options.getString("end_time") === null ? null : dayjs(interaction.options.getString("end_time"));
    const description =
      interaction.options.getString("description") === "" ? null : interaction.options.getString("description");
    const location =
      interaction.options.getString("location") === "" ? null : interaction.options.getString("location");
    ReceiveInteraction(interaction, name, start_time, end_time, description, location);
  }
};
