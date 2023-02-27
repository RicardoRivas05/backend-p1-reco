import {Entity, model, property} from '@loopback/repository';

@model()
export class Datos extends Entity {
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
  sourceId: string;

  @property({
    type: 'string',
    required: true,
  })
  quantityId: string;

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


  constructor(data?: Partial<Datos>) {
    super(data);
  }
}

export interface DatosRelations {
  // describe navigational properties here
}

export type DatosWithRelations = Datos & DatosRelations;
