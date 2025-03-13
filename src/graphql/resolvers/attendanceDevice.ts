import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { AttendanceDeviceWithLocationType } from "../../types";

const attendanceDeviceResolver = {
  Query: {
    getAttendanceDevices: async () => {
      try {
        const attendanceDevicesCollectionRef = collection(
          firestore,
          "ATTENDANCE_DEVICES"
        );
        const attendanceDevicesSnapshot = await getDocs(
          attendanceDevicesCollectionRef
        );
        const attendanceDevices: AttendanceDeviceWithLocationType[] = [];
        const promises = attendanceDevicesSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const locationData = await getLocationData(data.locationRef.id);
          if (!locationData) return;
          const attendanceDevice: AttendanceDeviceWithLocationType = {
            id: doc.id,
            name: data.name,
            ip: data.ip,
            port: data.port,
            serialNumber: data.serialNumber,
            locationRef: {
              id: data.locationRef.id,
              name: locationData.name,
              description: locationData.description,
              pin: locationData.pin,
            },
          };
          attendanceDevices.push(attendanceDevice);
        });

        await Promise.all(promises);

        return attendanceDevices;
      } catch (e) {
        console.error("Error getting attendance devices: ", e);
        return null;
      }
    },
  },
  Mutation: {
    addAttendanceDevice: async (
      _: any,
      {
        name,
        ip,
        port,
        serialNumber,
        locationId,
      }: {
        name: string;
        ip: string;
        port: string;
        serialNumber: string;
        locationId: string;
      }
    ) => {
      try {
        const attendanceDevicesCollectionRef = collection(
          firestore,
          "ATTENDANCE_DEVICES"
        );
        const locationRef = doc(firestore, "LOCATIONS", locationId);
        await addDoc(attendanceDevicesCollectionRef, {
          name,
          ip,
          port,
          serialNumber,
          locationRef,
        });
        return true;
      } catch (e) {
        console.error("Error creating a new attendance device: ", e);
        return false;
      }
    },
    editAttendanceDevice: async (
      _: any,
      {
        id,
        name,
        ip,
        port,
        serialNumber,
        locationId,
      }: {
        id: string;
        name: string;
        ip: string;
        port: string;
        serialNumber: string;
        locationId: string;
      }
    ) => {
      try {
        const attendanceDeviceDocRef = doc(firestore, "ATTENDANCE_DEVICES", id);
        await updateDoc(attendanceDeviceDocRef, {
          name,
          ip,
          port,
          serialNumber,
          locationRef: locationId,
        });
        return true;
      } catch (e) {
        console.error("Error editing an attendance device: ", e);
        return false;
      }
    },
    deleteAttendanceDevice: async (_: any, { id }: { id: string }) => {
      try {
        const attendanceDeviceDocRef = doc(firestore, "ATTENDANCE_DEVICES", id);
        await deleteDoc(attendanceDeviceDocRef);
        return true;
      } catch (e) {
        console.error("Error deleting an attendance device: ", e);
        return false;
      }
    },
  },
};

export default attendanceDeviceResolver;

const getLocationData = async (locationId: string) => {
  try {
    const locationDocRef = doc(firestore, "LOCATIONS", locationId);
    const locationDoc = await getDoc(locationDocRef);
    return locationDoc.data();
  } catch (e) {
    console.error("Error getting location data: ", e);
    return null;
  }
};
