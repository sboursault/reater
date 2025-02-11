export interface PlaywrightReport {
  //config: Config
  suites: Suite[]
  //errors: any[]
  //stats: Stats
}

export interface Config {
  configFile: string
  rootDir: string
  forbidOnly: boolean
  fullyParallel: boolean
  globalSetup: any
  globalTeardown: any
  globalTimeout: number
  grep: any
  grepInvert: any
  maxFailures: number
  metadata: Metadata
  preserveOutput: string
  reporter: [string, Reporter | undefined][]
  reportSlowTests: ReportSlowTests
  quiet: boolean
  projects: Project[]
  shard: any
  updateSnapshots: string
  version: string
  workers: number
  webServer: any
}

export interface Metadata {
  actualWorkers: number
}

export interface Reporter {
  outputFile: string
}

export interface ReportSlowTests {
  max: number
  threshold: number
}

export interface Project {
  outputDir: string
  repeatEach: number
  retries: number
  metadata: any
  id: string
  name: string
  testDir: string
  testIgnore: any[]
  testMatch: string[]
  timeout: number
}

export interface Suite {
  title: string
  //file: string
  //column: number
  //line: number
  //specs: Spec[]
  suites?: Suite[]
}

export interface Spec {
  title: string
  ok: boolean
  tags: any[]
  tests: Test[]
  id: string
  file: string
  line: number
  column: number
}

export interface Test {
  timeout: number
  annotations: any[]
  expectedStatus: string
  projectId: string
  projectName: string
  results: Result[]
  status: string
}

export interface Result {
  workerIndex: number
  status: string
  duration: number
  errors: Error[]
  stdout: any[]
  stderr: any[]
  retry: number
  startTime: string
  attachments: Attachment[]
  error?: Error
}

export interface Error {
  message: string
  stack: string
}

export interface Attachment {
  name: string
  contentType: string
  path: string
}

export interface Location {
  file: string
  column: number
  line: number
}

export interface MatcherResult {
  name: string
  expected: any
  message: string
  pass: boolean
  actual: string
  log: string[]
  timeout: number
}

export interface ErrorLocation {
  file: string
  column: number
  line: number
}

export interface Stats {
  startTime: string
  duration: number
  expected: number
  skipped: number
  unexpected: number
  flaky: number
}
