import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post, Query,
  UploadedFile, UploadedFiles,
  UseInterceptors,
  Res
} from '@nestjs/common';
import { Services } from 'enums/Services';
import { Superhero } from 'modules/superheroes/superhero.entity';
import { SuperheroService } from 'modules/superheroes/superhero.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CreateSuperheroDto } from 'modules/superheroes/createSuperhero.dto';
import { Response } from 'express';

@Controller()
export class SuperheroController {
  constructor(@Inject(Services.Superhero) private superheroService: SuperheroService) {}

  @Get('superhero')
  async getSuperheroes(@Query('page') page: number, @Res({ passthrough: true }) res: Response) {
    const { total, pages } = await this.superheroService.getCountSuperheroes()

    const superheroes = await this.superheroService.getAllSuperheroes(page);

    return { superheroes, total, pages}
  }

  @Get('superhero/:id')
  async getSuperheroById(@Param('id') id: string): Promise<Superhero> {

    return await this.superheroService.getSuperheroById(id);
  }

  @Post('superhero')
  @UseInterceptors(AnyFilesInterceptor())
  async createSuperhero(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createSuperheroDto: CreateSuperheroDto
  ) {
    await this.superheroService.createSuperhero(files, createSuperheroDto);
  }
}