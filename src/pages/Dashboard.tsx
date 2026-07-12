// pages/Dashboard.tsx
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable, { SortKey } from '../components/EmployeeTable';
import EmployeeFilters from '../components/EmployeeFilters';
import EditEmployeeModal from '../components/EditEmployeeModal';
import Pagination from '../components/Pagination';
import { Employee, DashboardProps} from '../types/employee'; // <-- Das Interface importieren



export default function Dashboard({ employees, onSync }: DashboardProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('Alle');
  const [selectedStatus, setSelectedStatus] = useState('Alle');
  
  // SortConfig-Typisierung anpassen
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ 
    key: 'id', 
    direction: 'asc' 
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const itemsPerPage = 4;

  const handleAddEmployee = (newEmp: Omit<Employee, 'id'>) => {
    const updated = [...employees, { ...newEmp, id: Date.now() }];
    onSync(updated);
    setCurrentPage(1);
  };

  const handleDeleteEmployee = (id: number) => {
    const updated = employees.filter(emp => emp.id !== id);
    onSync(updated);
  };

  const handleUpdateEmployee = (updatedEmp: Employee) => {
    const updated = employees.map(emp => emp.id === updatedEmp.id ? updatedEmp : emp);
    onSync(updated);
    setEditingEmployee(null);
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...employees];
    if (searchQuery.trim()) {
      result = result.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedDept !== 'Alle') {
      result = result.filter(e => e.department === selectedDept);
    }
    if (selectedStatus !== 'Alle') {
      result = result.filter(e => e.status === selectedStatus);
    }
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [employees, searchQuery, selectedDept, selectedStatus, sortConfig]);

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSorted.slice(start, start + itemsPerPage);
  }, [filteredAndSorted, currentPage]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">{t('title')}</h1>
        <p className="text-sm text-slate-500 mt-1">{t('subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <EmployeeForm onAdd={handleAddEmployee} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          
          <EmployeeFilters 
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            selectedDept={selectedDept} setSelectedDept={setSelectedDept}
            selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}
          />
          
          <EmployeeTable 
            employees={paginated} onDelete={handleDeleteEmployee} 
            onEdit={setEditingEmployee} 
            onSort={(key) => setSortConfig(p => ({ key, direction: p.key === key && p.direction === 'asc' ? 'desc' : 'asc' }))}
            sortConfig={sortConfig}
          />
          
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
          
        </div>
      </div>
      {editingEmployee && <EditEmployeeModal employee={editingEmployee} onClose={() => setEditingEmployee(null)} onSave={handleUpdateEmployee} />}
    </div>
  );
}
