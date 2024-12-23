import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import { EventCategory } from 'src/typeorm/entities/EventEntity';

export class FilterEventsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  date?: Date;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(EventCategory)
  category?: EventCategory;
}
