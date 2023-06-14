import AsyncStorage from "@react-native-async-storage/async-storage";

export const userFromStorage = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    if (user !== null) {
      return JSON.parse(user);
    } else {
      return null;
    }
  } catch (error) {
    console.log("Erro ao recuperar o usuário da storage:", error);
    return null;
  }
};
