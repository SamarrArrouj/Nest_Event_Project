import { IsEnum, IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';
import { EventCategory } from 'src/typeorm/entities/EventEntity';


export class UpdateEventDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  location?: string;

  @IsEnum(EventCategory)
  @IsOptional()
  category?: EventCategory;
}
