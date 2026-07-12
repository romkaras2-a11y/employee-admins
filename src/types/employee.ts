// types/employee.ts

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'Home Office' | 'Aktiv vor Ort';
}
export interface DashboardProps {
  employees: Employee[];
  onSync: (updatedList: Employee[]) => Promise<void>;
}