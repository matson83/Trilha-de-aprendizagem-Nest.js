import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    Logger.log("Hello World!");
    return "Hello World!";
  }
}

@Injectable()
export class HealthService {
  getHealth(): string {
    Logger.log("API is running");
    return "API is running";
  }
}
