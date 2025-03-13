export type LocationType = {
  name: string;
  description: string;
  pin: string;
};

export type LocationWithIdType = LocationType & {
  id: string;
};

export type AttendanceDeviceType = {
  deviceName: string;
  ipAddress: string;
  port: string;
  serialNumber: string;
  locationRef: string;
};

export type SettingsType = {
  ipOrDomain: string;
  port: string;
  apiKey: string;
};
