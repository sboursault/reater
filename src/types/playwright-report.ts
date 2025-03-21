export interface PwReport {
  //config: Config
  suites: PwSuite[]
  //errors: any[]
  //stats: Stats
}

export interface PwConfig {
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
  metadata: PwMetadata
  preserveOutput: string
  reporter: [string, PwReporter | undefined][]
  reportSlowTests: ReportSlowTests
  quiet: boolean
  projects: Project[]
  shard: any
  updateSnapshots: string
  version: string
  workers: number
  webServer: any
}

export interface PwMetadata {
  actualWorkers: number
}

export interface PwReporter {
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

export interface PwSuite {
  title: string
  file: string
  column: number
  line: number
  specs: PwSpec[]
  suites?: PwSuite[]
}

export interface PwSpec {
  title: string
  ok: boolean
  tags: any[]
  tests: PwTest[]
  id: string
  file: string
  line: number
  column: number
}

export interface PwTest {
  //timeout: number
  //annotations: any[]
  //expectedStatus: string
  //projectId: string
  projectName: string
  results: Result[]
  //status: string
}

export interface Result {
  //workerIndex: number
  status: string
  duration: number
  //errors: Error[]
  //stdout: any[]
  //stderr: any[]
  //retry: number
  //startTime: string
  //attachments: Attachment[]
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
