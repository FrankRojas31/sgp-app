import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateHumanResourceDto } from './dto/create-human-resource.dto';
import { UpdateHumanResourceDto } from './dto/update-human-resource.dto';
import { CreateMaterialResourceDto } from './dto/create-material-resource.dto';
import { UpdateMaterialResourceDto } from './dto/update-material-resource.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recursos')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post('create-human-resource')
  createHumanResource(@Body() createHumanResourceDto: CreateHumanResourceDto) {
    return this.resourcesService.createHumanResource(createHumanResourceDto);
  }

  @Get('get-all-human-resources')
  findAllHumanResources() {
    return this.resourcesService.findAllHumanResources();
  }

  @Get('human-resource/:id')
  findOneHumanResource(@Param('id') id: string) {
    return this.resourcesService.findOneHumanResource(id);
  }

  @Patch('human-resource/:id')
  updateHumanResource(
    @Param('id') id: string,
    @Body() updateHumanResourceDto: UpdateHumanResourceDto,
  ) {
    return this.resourcesService.updateHumanResource(
      id,
      updateHumanResourceDto,
    );
  }

  @Delete('human-resource/:id')
  removeHumanResource(@Param('id') id: string) {
    return this.resourcesService.setFalseHumanResource(id);
  }

  // Material Resource

  @Post('create-material-resource')
  createMaterialResource(
    @Body() createMaterialResourceDto: CreateMaterialResourceDto,
  ) {
    return this.resourcesService.createMaterialResource(
      createMaterialResourceDto,
    );
  }

  @Get('get-all-material-resources')
  findAllMaterialResoruces() {
    return this.resourcesService.findAllMaterialResources();
  }

  @Get('material-resource/:id')
  findOneMaterialResource(@Param('id') id: string) {
    return this.resourcesService.findOneMaterialResource(id);
  }

  @Patch('material-resource/:id')
  updateMaterialResource(
    @Param('id') id: string,
    @Body() updateMaterialResourceDto: UpdateMaterialResourceDto,
  ) {
    return this.resourcesService.updateMaterialResource(
      id,
      updateMaterialResourceDto,
    );
  }
}
