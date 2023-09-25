import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseConfig from 'config/database.config';
import AppConfig from 'config/app.config';
import { SuperpowerModule } from 'modules/superpowers/superpower.module';
import { SuperheroModule } from 'modules/superheroes/superhero.module';
import { AwsS3Module } from 'modules/AWS_S3/aws-s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    SuperpowerModule,
    SuperheroModule,
    AwsS3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}