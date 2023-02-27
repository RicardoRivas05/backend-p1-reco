import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Source} from './source.model';
import {Quantity} from './quantity.model';

@model()
export class Datos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'date',
    required: true,
  })
  dateTime: string;

  @property({
    type: 'number',
    default: null,
  })
  value?: number;

  @belongsTo(() => Source)
  sourceId: string;

  @belongsTo(() => Quantity)
  quantityId: string;

  constructor(data?: Partial<Datos>) {
    super(data);
  }
}

export interface DatosRelations {
  // describe navigational properties here
}

export type DatosWithRelations = Datos & DatosRelations;
