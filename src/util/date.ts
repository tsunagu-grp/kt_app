import dayjs from "dayjs";

export const getYear = (date: Date) => {
  return date.getFullYear();
};

export const getMonth = (date: Date) => {
  return ("0" + (date.getMonth() + 1)).slice(-2);
};

export const getDay = (date: Date) => {
  return ("0" + date.getDate()).slice(-2);
};

export const getHour = (date: Date) => {
  return ("0" + date.getHours()).slice(-2);
};

export const getMinutes = (date: Date) => {
  return ("0" + date.getMinutes()).slice(-2);
};

export const getSeconds = (date: Date) => {
  return ("0" + date.getSeconds()).slice(-2);
};

export const getDateFrom = (date: string) => {
  return dayjs(date + "T00:00:00.000Z").toISOString();
};

export const getDateTo = (date: string) => {
  return dayjs(date + "T23:59:59.999Z").toISOString();
};
