import { collection, doc, getDoc, updateDoc } from "@firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { SettingsType } from "../../types";

const settingsResolver = {
  Query: {
    getSettings: async () => {
      try {
        const settingsDocRef = doc(
          collection(firestore, "SETTINGS"),
          "SETTINGS_DOC"
        );
        const settingsDocSnapshot = await getDoc(settingsDocRef);
        const settingsData = settingsDocSnapshot.data();
        const settings: SettingsType = {
          ip: settingsData?.ip,
          port: settingsData?.port,
          apiKey: settingsData?.apiKey,
        };
        return settings;
      } catch (e) {
        console.error("Error getting settings: ", e);
        return null;
      }
    },
  },
  Mutation: {
    updateSettings: async (
      _: any,
      { ip, port, apiKey }: { ip: string; port: string; apiKey: string }
    ) => {
      try {
        const settingsDocRef = doc(firestore, "SETTINGS", "SETTINGS_DOC");
        await updateDoc(settingsDocRef, {
          ip,
          port,
          apiKey,
        });
        return {
          success: true,
          message: "Settings updated successfully",
        };
      } catch (e) {
        console.error("Error updating settings: ", e);
        return {
          success: false,
          message: "Error updating settings",
        };
      }
    },
  },
};

export default settingsResolver;
