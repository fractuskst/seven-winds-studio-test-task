import { Row } from './types';

export const eID = 148685;

export const PROJECT_NAMES = [
  { id: 1, name: 'По проекту' },
  { id: 2, name: 'Объекты' },
  { id: 3, name: 'РД' },
  { id: 4, name: 'МТО' },
  { id: 5, name: 'СМР' },
  { id: 6, name: 'График' },
  { id: 7, name: 'МиМ' },
  { id: 8, name: 'Рабочие' },
  { id: 9, name: 'Капвложения' },
  { id: 10, name: 'Бюджет' },
  { id: 11, name: 'Финансирование' },
  { id: 12, name: 'Панорамы' },
  { id: 13, name: 'Камеры' },
  { id: 14, name: 'Поручения' },
  { id: 15, name: 'Контрагенты' },
];

export const TABLE_HEADERS = [
  { id: 1, name: 'Уровень' },
  { id: 2, name: 'Наименование работ' },
  { id: 3, name: 'Основная з/п' },
  { id: 4, name: 'Оборудование' },
  { id: 5, name: 'Накладные расходы' },
  { id: 6, name: 'Сметная прибыль' },
];

export const INITIAL_ROW: Row = {
  id: 0,
  rowName: '',
  salary: 0,
  materials: 0,
  overheads: 0,
  estimatedProfit: 0,
  parentId: null,
  child: [],
  equipmentCosts: 0,
  machineOperatorSalary: 0,
  mainCosts: 0,
  mimExploitation: 0,
  supportCosts: 0,
};
