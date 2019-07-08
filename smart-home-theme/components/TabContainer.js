import variable from "./../variables/platform";
import { Platform } from "react-native";

export default (variables = variable) => {
  const platformStyle = variables.platformStyle;
  const platform = variables.platform;

  const tabContainerTheme = {
    elevation: 3,
    height: 50,
    flexDirection: "row",
  };

  return tabContainerTheme;
};
