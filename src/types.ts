export type LocationType = {
  name: string;
  description: string;
  pin: string;
};

export type LocationWithIdType = LocationType & {
  id: string;
};

export type AttendanceDeviceType = {
  name: string;
  ip: string;
  port: string;
  serialNumber: string;
  locationRef: string;
};

export type AttendanceDeviceWithIdType = AttendanceDeviceType & {
  id: string;
};

export type AttendanceDeviceWithLocationType = {
  id: string;
  name: string;
  ip: string;
  port: string;
  serialNumber: string;
  locationRef: LocationWithIdType;
};

export type SettingsType = {
  ipOrDomain: string;
  port: string;
  apiKey: string;
};
