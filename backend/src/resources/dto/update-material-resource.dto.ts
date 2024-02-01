import { PartialType } from '@nestjs/mapped-types';
import { MaterialResource } from '../entities/material-resource.entity';

export class UpdateMaterialResourceDto extends PartialType(MaterialResource) {}
