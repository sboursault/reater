import { Error, Status, Step } from "./report";

export interface FlatReport {
  uuid: string;
  name: string;
  path: string;
  testFile: string;
  project: string
  steps?: Step[];
  status: Status;
  error?: Error;
}
