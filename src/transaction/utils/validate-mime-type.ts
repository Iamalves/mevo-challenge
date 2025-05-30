import { BadRequestException } from '@nestjs/common';
import { ALLOW_FILE_TYPES } from '../constants/allowed-file-types';

export class ValidateMimeType {
  static validate(mimetype: string): void {
    if (!ALLOW_FILE_TYPES.includes(mimetype)) {
      throw new BadRequestException(`Invalid mimetype: ${mimetype}`);
    }
  }
}
