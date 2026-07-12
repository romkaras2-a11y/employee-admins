// pages/Dashboard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../api/employeeApi';

import Pagination from '../components/Pagination';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeFilters from '../components/EmployeeFilters';
import EditEmployeeModal from '../components/EditEmployeeModal';

export default function Dashboard() {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('Alle');
  const [selectedStatus, setSelectedStatus] = useState('Alle');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    api.getEmployees().then(data => setEmployees(data));
  }, []);

  const syncData = async (updatedList) => {
    setEmployees(updatedList);
    await api.saveEmployees(updatedList);
  };

  const handleAddEmployee = (newEmp) => {
    const updated = [...employees, { ...newEmp, id: Date.now() }];
    syncData(updated);
    setCurrentPage(1);
  };

  const handleDeleteEmployee = (id) => {
    const updated = employees.filter(emp => emp.id !== id);
    syncData(updated);
  };

  const handleUpdateEmployee = (updatedEmp) => {
    const updated = employees.map(emp => emp.id === updatedEmp.id ? updatedEmp : emp);
    syncData(updated);
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9 space-y-4">                   
          <EmployeeFilters 
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            selectedDept={selectedDept} setSelectedDept={setSelectedDept}
            selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}
          />
          <EmployeeTable 
            employees={paginated} onDelete={handleDeleteEmployee} 
            onEdit={setEditingEmployee} onSort={(key) => setSortConfig(p => ({ key, direction: p.key === key && p.direction === 'asc' ? 'desc' : 'asc' }))}
            sortConfig={sortConfig}
          />
          {/* als  Komponente aufgerufen */}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
        <div className="lg:col-span-3">
          <EmployeeForm onAdd={handleAddEmployee} />
        </div>        
      </div>
      {editingEmployee && <EditEmployeeModal employee={editingEmployee} onClose={() => setEditingEmployee(null)} onSave={handleUpdateEmployee} />}
    </div>
  );
}
