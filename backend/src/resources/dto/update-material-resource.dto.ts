import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialResourceDto } from './create-material-resource.dto';

export class UpdateMaterialResourceDto extends PartialType(CreateMaterialResourceDto) {}
