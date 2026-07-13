// pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Employee, DashboardProps} from '../types/employee'; 
import { useEmployeeFilterAndSort } from '../hooks/useEmployeeFilterAndSort';

import EmployeeForm from '../components/EmployeeForm';
import EmployeeFilters from '../components/EmployeeFilters';
import EditEmployeeModal from '../components/EditEmployeeModal';
import Pagination from '../components/Pagination';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeDataTable from '../components/EmployeeDataTable';


export default function Dashboard({ employees, onSync }: DashboardProps) {
  const { t } = useTranslation();
  const { dept } = useParams<{ dept?: string }>();
  const navigate = useNavigate();
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [tableType, setTableType] = useState<'custom' | 'datatables'>('custom');
  // SortConfig-Typisierung anpassen
const {
    searchQuery, setSearchQuery,
    selectedDept, setSelectedDept,
    selectedStatus, setSelectedStatus,
    currentPage, setCurrentPage,
    sortConfig, handleSort,
    totalPages,
    filteredEmployees,
    paginatedEmployees
  } = useEmployeeFilterAndSort({ employees, itemsPerPage: 5 }); 
  
useEffect(() => {
    if (dept) setSelectedDept(dept);
    else setSelectedDept('Alle');
  }, [dept, setSelectedDept]);

  const handleDeptFilterChange = (newDept: string) => {
    if (newDept === 'Alle') navigate('/');
    else navigate(`/department/${newDept}`);
  };

  const handleAddEmployee = (newEmp: Omit<Employee, 'id'>) => {
    onSync([...employees, { ...newEmp, id: Date.now() }]);
  };

  const handleDeleteEmployee = (id: number) => {
    onSync(employees.filter(emp => emp.id !== id));
  };

  const handleUpdateEmployee = (updatedEmp: Employee) => {
    onSync(employees.map(emp => emp.id === updatedEmp.id ? updatedEmp : emp));
    setEditingEmployee(null);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200" role="group" aria-label={t('toggleTableType')}>
          <button
            onClick={() => setTableType('custom')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
              tableType === 'custom' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('tableCustom')}
          </button>
          <button
            onClick={() => setTableType('datatables')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
              tableType === 'datatables' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('tableDataTables')}
          </button>
        </div>  
      </header>  
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-4">
          
          <EmployeeFilters 
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            selectedDept={selectedDept} setSelectedDept={handleDeptFilterChange}
            selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}
          />
          
          {tableType === 'custom' ? (
            <EmployeeTable 
              employees={paginatedEmployees} 
              onDelete={handleDeleteEmployee} 
              onEdit={setEditingEmployee}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          ) : (
            <EmployeeDataTable 
              employees={filteredEmployees}
              onDelete={handleDeleteEmployee} 
              onEdit={setEditingEmployee}
              onSort={() => {}} 
              sortConfig={{}} 
            />
          )}
           {tableType === 'custom' && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
           )}
        </div>
        <div className="lg:col-span-1">
          <EmployeeForm onAdd={handleAddEmployee} />
        </div>
      </div>
      {editingEmployee && <EditEmployeeModal employee={editingEmployee} onClose={() => setEditingEmployee(null)} onSave={handleUpdateEmployee} />}
    </div>
  );
}
