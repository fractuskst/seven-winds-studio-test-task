export interface Row {
  id: number;
  parentId?: number | null;
  child: Row[];
  total?: number;
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
}

export interface DeleteOrCreateRowResponse {
  changed: Row[];
  current: Row;
}
