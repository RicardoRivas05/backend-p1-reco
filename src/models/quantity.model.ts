import {Entity, model, property} from '@loopback/repository';

@model()
export class Quantity extends Entity {
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


  constructor(data?: Partial<Quantity>) {
    super(data);
  }
}

export interface QuantityRelations {
  // describe navigational properties here
}

export type QuantityWithRelations = Quantity & QuantityRelations;
