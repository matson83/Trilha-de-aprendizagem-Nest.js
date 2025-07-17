import { Controller, Get, Post } from "@nestjs/common";
import { AppService, HealthService } from "./app.service";

@Controller("api")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appHealth: HealthService,
  ) {}

  @Get("/")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("health")
  getHealth(): string {
    return this.appHealth.getHealth();
  }

  @Post("/")
  setHello(): string {
    return "Olá Mundo!";
  }
}
