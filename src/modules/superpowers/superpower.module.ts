import { TypeOrmModule } from '@nestjs/typeorm';
import { Superpower } from 'modules/superpowers/superpower.entity';
import { Services } from 'enums/Services';
import { SuperpowerService } from 'modules/superpowers/superpower.service';
import { Module } from '@nestjs/common';
import { SuperpowerController } from 'modules/superpowers/superpower.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Superpower])],
  exports: [{ provide: Services.Superpower, useClass: SuperpowerService }],
  providers: [{ provide: Services.Superpower, useClass: SuperpowerService }],
  controllers: [SuperpowerController]
})
export class SuperpowerModule {}