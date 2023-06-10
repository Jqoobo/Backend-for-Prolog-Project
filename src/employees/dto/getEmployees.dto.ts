import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetEmployees {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imiePracownika: string | undefined;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nazwiskoPracownika: string | undefined;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  wiekPracownika: number | undefined;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  stanowisko: string | undefined;
}
