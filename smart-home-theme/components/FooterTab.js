import { Platform, StyleSheet } from "react-native";

import variable from "./../variables/platform";

export default (variables = variable) => {
  const platform = variables.platform;

  const footerTabTheme = {
    "NativeBase.Button": {
      ".active": {
        "NativeBase.Text": {
          color: '#8B8B8B',
          fontSize: 8,
          lineHeight: 16
        },
        "NativeBase.Icon": {
          color: "#49A59A"
        },
        "NativeBase.IconNB": {
          color: variables.tabBarActiveTextColor
        },
        backgroundColor: "#fff",
        borderBottomColor: '#49A59A',
        borderBottomWidth: 3.0,
        borderStyle: 'solid',
        borderRadius: 0,
      },
      flexDirection: null,
      backgroundColor: "#E0E1E3",
      borderColor: null,
      elevation: 0,
      shadowColor: null,
      shadowOffset: null,
      shadowRadius: null,
      shadowOpacity: null,
      alignSelf: "center",
      flex: 1,
      height: (variables.footerHeight - (variables.isIphoneX ? 34 : 0)),
      justifyContent: "center",
      ".badge": {
        "NativeBase.Badge": {
          "NativeBase.Text": {
            fontSize: 11,
            fontWeight: platform === "ios" ? "600" : undefined,
            lineHeight: 14
          },
          top: -3,
          alignSelf: "center",
          left: 10,
          zIndex: 99,
          height: 18,
          padding: 1.7,
          paddingHorizontal: 3
        },
        "NativeBase.Icon": {
          marginTop: -18
        }
      },
      "NativeBase.Icon": {
        color: '#D3D3D4'
      },
      "NativeBase.IconNB": {
        color: variables.tabBarTextColor
      },
      "NativeBase.Text": {
        color: "#8B8B8B",
        fontSize: 8,
        lineHeight: 16
      }
    },
    backgroundColor: Platform.OS === "android"
      ? variables.tabActiveBgColor
      : undefined,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignSelf: "stretch"
  };

  return footerTabTheme;
};
