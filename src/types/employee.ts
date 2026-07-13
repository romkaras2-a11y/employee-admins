// types/employee.ts
import { SortKey } from '../hooks/useEmployeeFilterAndSort';

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'Home Office' | 'Aktiv vor Ort';
}
// Interface für DashboardProps der DashboardPage definieren
export interface DashboardProps {
  employees: Employee[];
  onSync: (updatedList: Employee[]) => Promise<void>;
}
// Interface für alle Eingangs-Props der Filterleiste definieren
export interface EmployeeFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDept: string;
  setSelectedDept: (dept: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}
// Interface für die Props der Komponente festlegen
export interface EmployeeFormProps {
  onAdd: (newEmployee: Omit<Employee, 'id'>) => void;
}
// Interface für die Modal-Props definieren
export interface EditEmployeeModalProps {
  employee: Employee;
  onClose: () => void;
  onSave: (updatedEmployee: Employee) => void;
}
// Interface für die Paginierungs-Props definieren
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
// Interface für die DataTable-Props definieren
export interface EmployeeDataTableProps {
  employees: Employee[];
  onDelete: (id: number) => void;
  onEdit: (employee: Employee) => void;
  onSort: () => void;
  sortConfig: any;
}
// Interface für eigene die Table-Props definieren
export interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (id: number) => void;
  onEdit: (employee: Employee) => void;
  onSort: (key: SortKey) => void;
  sortConfig: { key: SortKey; direction: 'asc' | 'desc' };
}
// Interface für Filterung und Sortierung in Tables und Dashboard
export interface UseEmployeeFilterAndSortProps {
  employees: Employee[];
  itemsPerPage?: number;
}