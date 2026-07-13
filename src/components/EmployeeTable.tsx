//components/EmployeeTable.tsx

import { useTranslation } from 'react-i18next';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { EmployeeTableProps } from '../types/employee';
import { SortKey } from '../hooks/useEmployeeFilterAndSort';

export default function EmployeeTable({ employees, onDelete, onEdit, onSort, sortConfig }: EmployeeTableProps) {
  const { t } = useTranslation();

  // Dynamisches Icon für die Tabellen-Header generieren
 const getIcon = (k: SortKey) => sortConfig.key === k ? (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽') : ' ↕️';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed min-w-[640px]" aria-label="Mitarbeiterliste">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
              {/* Bei Klick wird nun die interne handleSort-Funktion aufgerufen */}
              <th onClick={() => onSort('name')} className="w-[30%] py-3 px-4 cursor-pointer select-none hover:bg-slate-100 focus:bg-slate-100 outline-none" tabIndex={0} role="columnheader">
                {t('name')}{getIcon('name')}
              </th>
              <th onClick={() => onSort('department')} className="w-[20%] py-3 px-4 cursor-pointer select-none hover:bg-slate-100 focus:bg-slate-100 outline-none" tabIndex={0} role="columnheader">
                {t('department')}{getIcon('department')}
              </th>
              <th className="w-[25%] py-3 px-4">{t('position')}</th>
              <th onClick={() => onSort('status')} className="w-[25%] py-3 px-4 cursor-pointer select-none hover:bg-slate-100 focus:bg-slate-100 outline-none" tabIndex={0} role="columnheader">
                {t('status')}{getIcon('status')}
              </th>
              <th className="w-[100px] py-3 px-4 text-right">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
            {employees.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-slate-400">{t('noEmployees')}</td></tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-semibold relative group truncate">
                    <span className="cursor-help border-b border-dotted border-slate-400" aria-haspopup="true">
                      {emp.name}
                    </span>
                    <div className="absolute left-4 bottom-full mb-1 hidden group-hover:block bg-slate-900 text-white text-xs rounded p-2 shadow-md z-10 pointer-events-none whitespace-normal w-48" role="tooltip">
                      <p className="font-bold">{emp.name}</p>
                      <p className="text-slate-300 text-[11px]">{emp.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 truncate">
                    <span className="px-2.5 py-0.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                      {emp.department}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 truncate" title={emp.position}>{emp.position}</td>
                  <td className="py-3 px-4 truncate">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold inline-block truncate max-w-full ${
                      emp.status === 'Home Office' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {emp.status === 'Home Office' ? t('homeOffice') : t('activeOnSite')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                    <button onClick={() => onEdit(emp)} className="inline-flex items-center justify-center p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg border border-amber-200 transition focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer group/btn relative" aria-label={t('edit')}>
                      <PencilSquareIcon className="w-4 h-4" />
                      <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover/btn:block bg-slate-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs z-20 pointer-events-none">{t('edit')}</span>
                    </button>
                    <button onClick={() => onDelete(emp.id)} className="inline-flex items-center justify-center p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border border-red-200 transition focus:ring-2 focus:ring-red-500 focus:outline-none cursor-pointer group/btn relative" aria-label={t('delete')}>
                      <TrashIcon className="w-4 h-4" />
                      <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover/btn:block bg-slate-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs z-20 pointer-events-none">{t('delete')}</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
