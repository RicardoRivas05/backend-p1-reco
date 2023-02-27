import {Entity, model, property, hasMany} from '@loopback/repository';
import {Datos} from './datos.model';

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
    type: 'string',
    required: true,
  })
  unit: string;

  @property({
    type: 'boolean',
    default: true,
  })
  status?: boolean;

  @hasMany(() => Datos)
  quantityDatos: Datos[];

  constructor(data?: Partial<Quantity>) {
    super(data);
  }
}

export interface QuantityRelations {
  // describe navigational properties here
}

export type QuantityWithRelations = Quantity & QuantityRelations;
