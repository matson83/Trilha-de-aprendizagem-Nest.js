import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthService } from "./app.service";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, HealthService],
})
export class AppModule {}
