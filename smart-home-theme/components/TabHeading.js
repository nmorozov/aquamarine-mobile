import variable from "./../variables/platform";

export default (variables = variable) => {
  const platform = variables.platform;

  const tabHeadingTheme = {
    flexDirection: "row",
    backgroundColor: '#fff',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: '#E0E1E3',
    borderBottomWidth: 1.0,
    borderStyle: 'solid',
    borderRadius: 0,
    ".scrollable": {
      paddingHorizontal: 20,
      flex: platform === "android" ? 0 : 1,
      minWidth: platform === "android" ? undefined : 60
    },
    "NativeBase.Text": {
      color: '#8A8A8A',
      marginHorizontal: 7,
      fontSize: 14
    },
    "NativeBase.Icon": {
      color: variables.topTabBarTextColor,
      fontSize: platform === "ios" ? 26 : undefined
    },
    ".active": {
      "NativeBase.Text": {
        color: '#000',
        fontWeight: "bold"
      },
      "NativeBase.Icon": {
        color: variables.topTabBarActiveTextColor
      },
      borderBottomColor: '#49A59A',
    },
  };

  return tabHeadingTheme;
};
