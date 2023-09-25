import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { SuperpowerService } from 'modules/superpowers/superpower.service';
import { Superpower } from 'modules/superpowers/superpower.entity';
import { CreateSuperpowerDto } from 'modules/superpowers/createSuperpower.dto';
import { Services } from 'enums/Services';

@Controller()
export class SuperpowerController {
  constructor(@Inject(Services.Superpower) private superpowerService: SuperpowerService) {}

  @Get('superpower')
  getSuperpowers(): Promise<Superpower[]> {
    return this.superpowerService.getAllSuperpowers();
  }

  @Post('superpower')
  createSuperpower(@Body() createSuperpowerDto: CreateSuperpowerDto): Promise<Superpower> {
    return this.superpowerService.createSuperpower(createSuperpowerDto);
  }
}