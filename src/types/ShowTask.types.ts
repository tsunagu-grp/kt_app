export type calendarEvents = Array<{
  summary: string;
  start: {
    dateTime: string;
    date: string;
  };
}>;

export type Events = Array<{
  summary: string;
  startDate: string;
  startTime: string;
}>;

export type Props = {
  today: string;
};
