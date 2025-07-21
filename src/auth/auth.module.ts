import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: "Y?ftspH9Grt9CDTTdFnQFp$LXmEa7#3YB",
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
