import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { LocationWithIdType } from "../../types";

const locationResolver = {
  Query: {
    getAllLocations: async () => {
      try {
        const locationsCollectionRef = collection(firestore, "LOCATIONS");
        const locationsSnapshot = await getDocs(locationsCollectionRef);
        const locations: LocationWithIdType[] = [];
        locationsSnapshot.forEach((doc) => {
          const data = doc.data();
          const location: LocationWithIdType = {
            id: doc.id,
            name: data.name,
            description: data.description,
            pin: data.pin,
          };
          locations.push(location);
        });
        return locations;
      } catch (e) {
        console.error("Error getting locations: ", e);
        return null;
      }
    },
  },
  Mutation: {
    addNewLocation: async (
      _: any,
      {
        name,
        description,
        pin,
      }: { name: string; description: string; pin: string }
    ) => {
      try {
        const locationsCollectionRef = collection(firestore, "LOCATIONS");
        await addDoc(locationsCollectionRef, {
          name,
          description,
          pin,
        });
        return true;
      } catch (e) {
        console.error("Error creating a new location: ", e);
        return false;
      }
    },
    editLocation: async (
      _: any,
      {
        id,
        name,
        description,
        pin,
      }: { id: string; name: string; description: string; pin: string }
    ) => {
      try {
        const locationDocRef = doc(firestore, "LOCATIONS", id);
        await updateDoc(locationDocRef, { name, description, pin });
        return true;
      } catch (e) {
        console.error("Error updating document: ", e);
        return false;
      }
    },
    deleteLocation: async (_: any, { id }: { id: string }) => {
      try {
        const locationDocRef = doc(firestore, "LOCATIONS", id);
        await deleteDoc(locationDocRef);
        return true;
      } catch (e) {
        console.error("Error deleting document: ", e);
        return false;
      }
    },
  },
};

export default locationResolver;
