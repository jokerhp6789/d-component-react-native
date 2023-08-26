import { StyleSheet, Platform } from "react-native";

const shadowStyle = StyleSheet.create({
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: Platform.OS === "android" ? 3 : 0,
  },
});

export default shadowStyle;
