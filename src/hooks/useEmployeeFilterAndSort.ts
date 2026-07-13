// hooks/useEmployeeFilterAndSort.ts
import { useState, useMemo, useEffect } from 'react';
import { Employee, SortKey } from '../types/employee';


interface UseEmployeeFilterAndSortProps {
  employees: Employee[];
  itemsPerPage?: number;
}

export function useEmployeeFilterAndSort({ employees, itemsPerPage = 4 }: UseEmployeeFilterAndSortProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('Alle');
  const [selectedStatus, setSelectedStatus] = useState('Alle');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({
    key: 'id',
    direction: 'asc',
  });

  // Bei Filter- oder Sortierwechsel zurück auf Seite 1 springen
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDept, selectedStatus, sortConfig]);

  // Schritt 1: Filtern der Daten
  const filteredEmployees = useMemo(() => {
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
    return result;
  }, [employees, searchQuery, selectedDept, selectedStatus]);

  // Schritt 2: Sortieren ALLER gefilterten Einträge
  const filteredAndSortedEmployees = useMemo(() => {
    const result = [...filteredEmployees];
    if (sortConfig.key) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key]?.toString().toLowerCase() || '';
        const valB = b[sortConfig.key]?.toString().toLowerCase() || '';
        
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [filteredEmployees, sortConfig]);

  // Schritt 3: Paginieren der fertig sortierten Gesamtliste
  const totalPages = Math.ceil(filteredAndSortedEmployees.length / itemsPerPage);
  
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedEmployees.slice(start, start + itemsPerPage);
  }, [filteredAndSortedEmployees, currentPage, itemsPerPage]);

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedDept,
    setSelectedDept,
    selectedStatus,
    setSelectedStatus,
    currentPage,
    setCurrentPage,
    sortConfig,
    handleSort,
    totalPages,
    filteredEmployees,          // Für DataTables (da DataTables intern paginiert/sortiert)
    paginatedEmployees,         // Für deine Eigenbau-Tabelle
  };
}
