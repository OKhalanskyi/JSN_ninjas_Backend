import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'enums/Services';
import { Superhero } from 'modules/superheroes/superhero.entity';
import { SuperheroController } from 'modules/superheroes/superhero.controller';
import { SuperheroService } from 'modules/superheroes/superhero.service';
import { AwsS3Module } from 'modules/AWS_S3/aws-s3.module';
import { SuperpowerModule } from 'modules/superpowers/superpower.module';
import { Picture } from 'modules/Picture/Picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Superhero, Picture]), AwsS3Module, SuperpowerModule],
  exports: [{ provide: Services.Superhero, useClass: SuperheroService }],
  providers: [{ provide: Services.Superhero, useClass: SuperheroService }],
  controllers: [SuperheroController]
})
export class SuperheroModule {}