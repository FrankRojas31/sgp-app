import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HumanResource } from './entities/human-resource.entity';
import { Repository } from 'typeorm';
import { MaterialResource } from './entities/material-resource.entity';
import { CreateHumanResourceDto } from './dto/create-human-resource.dto';
import { UpdateHumanResourceDto } from './dto/update-human-resource.dto';
import { CreateMaterialResourceDto } from './dto/create-material-resource.dto';
import { UpdateMaterialResourceDto } from './dto/update-material-resource.dto';

@Injectable()
export class ResourcesService {
  private readonly logger: any;
  constructor(
    @InjectRepository(HumanResource)
    private readonly humanRepository: Repository<HumanResource>,
    @InjectRepository(MaterialResource)
    private readonly materialRepository: Repository<MaterialResource>,
  ) {}

  async createHumanResource(createHumanResourceDto: CreateHumanResourceDto) {
    // const userId: any = createHumanResourceDto.user.id;
    // const findHuman = await this.humanRepository.find({
    //   where: { user: userId },
    // });
    // if (findHuman) {
    //   throw new BadRequestException(
    //     'El usuario ya está asociado a otro recurso humano',
    //     );
    //   }
    try {
      const resource = this.humanRepository.create(createHumanResourceDto);
      return await this.humanRepository.save(resource);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async updateHumanResource(
    id: string,
    updateHumanResourceDto: UpdateHumanResourceDto,
  ) {
    const loadHumanResource = await this.humanRepository.preload({
      id,
      ...updateHumanResourceDto,
    });

    if (!loadHumanResource)
      throw new NotFoundException('Human resource not found');

    const saveHumanResource =
      await this.humanRepository.save(loadHumanResource);
    return saveHumanResource;
  }

  findAllHumanResources() {
    return this.humanRepository.find({
      where: {
        is_available: true,
      },
    });
  }

  findOneHumanResource(id: string) {
    const findHuman = this.humanRepository.findOneBy({ id });
    if (!findHuman) throw new NotFoundException('Human resource not found');
    return findHuman;
  }

  async setFalseHumanResource(id: string) {
    const findHumanResource = await this.humanRepository.preload({
      id,
      is_available: false,
    });
    if (!findHumanResource)
      throw new NotFoundException('Human resource not found');
    return await this.humanRepository.save(findHumanResource);
  }

  // Recursos materiales

  async createMaterialResource(
    createMaterialResourceDto: CreateMaterialResourceDto,
  ) {
    const resource = this.materialRepository.create(createMaterialResourceDto);
    return await this.materialRepository.save(resource);
  }

  findOneMaterialResource(id: string) {
    const findMaterialResource = this.materialRepository.findOneBy({ id });
    if (!findMaterialResource)
      throw new NotFoundException('Material resource not found');
    return findMaterialResource;
  }

  async updateMaterialResource(
    id: string,
    updateMaterialResourceDto: UpdateMaterialResourceDto,
  ) {
    const loadMaterialResource = await this.materialRepository.preload({
      id,
      ...updateMaterialResourceDto,
    });

    if (!loadMaterialResource)
      throw new NotFoundException('Material resource not found');

    const saveMaterialResource =
      await this.materialRepository.save(loadMaterialResource);
    return saveMaterialResource;
  }

  findAllMaterialResources() {
    return this.materialRepository.find({
      where: { is_available: true },
    });
  }

  async setFalseMaterialResource(id: string) {
    const findMaterialResource = await this.materialRepository.preload({
      id,
      is_available: false,
    });
    if (!findMaterialResource)
      throw new NotFoundException('Human resource not found');
    return await this.materialRepository.save(findMaterialResource);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(error.detail);
  }
}
