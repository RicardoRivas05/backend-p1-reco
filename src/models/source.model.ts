import {Entity, model, property} from '@loopback/repository';

@model()
export class Source extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
    default: true,
  })
  status?: boolean;


  constructor(data?: Partial<Source>) {
    super(data);
  }
}

export interface SourceRelations {
  // describe navigational properties here
}

export type SourceWithRelations = Source & SourceRelations;
