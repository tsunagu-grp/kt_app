export type Events = Array<{
  summary: string;
  start: {dateTime: string};
}>;

export type Props = {
  dateFrom: string;
  dateTo: string;
};
