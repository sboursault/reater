import { Error, Status } from "./report";

export interface FlatReport {
  uuid: string;
  name: string;
  path: string;
  testFile: string;
  project: string
  steps?: string[];
  status: Status;
  error?: Error;
}
