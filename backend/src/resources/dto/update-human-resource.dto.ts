import { PartialType } from '@nestjs/mapped-types';
import { CreateHumanResourceDto } from './create-human-resource.dto';

export class UpdateHumanResourceDto extends PartialType(CreateHumanResourceDto) {}
