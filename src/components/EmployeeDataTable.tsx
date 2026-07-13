// components/EmployeeTable.tsx
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Employee,EmployeeDataTableProps } from '../types/employee';

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
DataTable.use(DT);

export default function EmployeeDataTable({ employees, onDelete, onEdit }: EmployeeDataTableProps) {
  const { t } = useTranslation();

  // Spalten-Konfiguration für DataTables (Verhindert DOM-Konflikte mit React)
  const columns = useMemo(() => [
    {
      title: t('name'),
      data: 'name',
      width: '30%',
      // Rendert den Namen inklusive deines CSS-Hover-Tooltips
      render: (data: string, _type: any, row: Employee) => `
        <div class="py-1 px-2 font-semibold truncate relative group cursor-help border-b border-dotted border-slate-400">
          ${data}
          <div class="absolute left-4 bottom-full mb-1 hidden group-hover:block bg-slate-900 text-white text-[14px] rounded p-2 shadow-md z-10 pointer-events-none whitespace-normal w-48">
            <p class="font-bold">${row.name}</p>
            <p class="text-slate-300 text-[11px]">${row.email}</p>
          </div>
        </div>
      `
    },
    {
      title: t('department'),
      data: 'department',
      width: '20%',
      render: (data: string) => `
        <span class="px-2.5 py-0.5 bg-slate-100 rounded-full text-[14px] font-medium text-slate-600">
          ${data}
        </span>
      `
    },
    {
      title: t('position'),
      data: 'position',
      width: '25%',
      render: (data: string) => `<span class="text-slate-500 truncate" title="${data}">${data}</span>`
    },
    {
      title: t('status'),
      data: 'status',
      width: '25%',
      render: (data: string) => {
        const isHomeOffice = data === 'Home Office';
        const bg = isHomeOffice ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
        return `<span class="px-2.5 py-0.5 rounded-full text-[14px] font-bold border ${bg}">${data}</span>`;
      }
    },
    {
      title: t('actions'),
      data: null,
      width: '100px',
      orderable: false, // Diese Spalte ist nicht sortierbar
      className: 'text-right whitespace-nowrap',
      //Eindeutige IDs für die Buttons, um die Klicks abzufangen
      render: (_data: any, _type: any, row: Employee) => `
        <div class="space-x-1 inline-flex justify-end w-full">
          <button data-action="edit" data-id="${row.id}" class="inline-flex items-center justify-center p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg border border-amber-200 transition cursor-pointer" aria-label="${t('edit')}">
            ✏️
          </button>
          <button data-action="delete" data-id="${row.id}" class="inline-flex items-center justify-center p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border border-red-200 transition cursor-pointer" aria-label="${t('delete')}">
            🗑️
          </button>
        </div>
      `
    }
  ], [t]);

  // Delegiertes Event-Handling für die dynamisch von DataTables erzeugten Buttons
  const handleTableClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const button = target.closest('button');
    if (!button) return;

    const action = button.getAttribute('data-action');
    const id = Number(button.getAttribute('data-id'));
    const currentEmployee = employees.find(emp => emp.id === id);

    if (action === 'delete') {
      onDelete(id);
    } else if (action === 'edit' && currentEmployee) {
      onEdit(currentEmployee);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden px-4 py-0"
      onClick={handleTableClick} // Klicks abfangen
    >
      <DataTable
        data={employees}
        columns={columns}
        options={{
          paging: true,
          pageLength: 5, 
          searching: false,
          info: false,
          ordering: true,
          responsive: true,
          autoWidth: false,
          lengthChange: false 
        }}
        className="w-full text-left border-collapse table-fixed min-w-[640px]"
      />
    </div>
  );
}
