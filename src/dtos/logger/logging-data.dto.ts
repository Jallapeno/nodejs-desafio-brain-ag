export class LoggingDataDto {
  severity: string;
  status: number;
  timeStamp: string;
  endpoint: string;
  method: string;
  traceId: string;
  apiMessage: string;
  stack: string;

  constructor(
    severity: string,
    status: number,
    timeStamp: string,
    endpoint: string,
    method: string,
    traceId: string,
    apiMessage: string,
    stack: string,
  ) {
    this.severity = severity;
    this.status = status;
    this.timeStamp = timeStamp;
    this.endpoint = endpoint;
    this.method = method;
    this.traceId = traceId;
    this.apiMessage = apiMessage;
    this.stack = stack;
  }
}
