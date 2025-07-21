import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, HealthService],
})
export class AppModule {}
