import { Error, Status } from "./report";

export interface FlatReportItem {
  uuid: string;
  name: string;
  path: string;
  project: string
  steps?: string[];
  status: Status;
  error?: Error;
}
