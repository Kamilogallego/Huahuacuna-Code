import { Child } from '@lib/childrenMock';

export interface Apadrinamiento {
  id: number;
  child: Child;
  fechaInicio: string;       // ISO
  mensajesNoLeidos: number;
  estado: 'activo' | 'finalizado';
}

import { childrenMock } from '@lib/childrenMock';

export const apadrinamientosMock: Apadrinamiento[] = [
  {
    id: 101,
    child: { ...childrenMock[0], estado: 'activo', fechaInicio: '2024-01-14' },
    fechaInicio: '2024-01-14',
    mensajesNoLeidos: 5,
    estado: 'activo'
  }
];