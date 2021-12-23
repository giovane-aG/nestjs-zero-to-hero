import { NotFoundException } from '@nestjs/common';

export class IdNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`No task with id ${id} was found`);
    this.name = 'IdNotFoundException';
  }
}
