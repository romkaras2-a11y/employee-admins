// components/EmployeeFilters.jsx

import { useTranslation } from 'react-i18next';
import {EmployeeFiltersProps} from '../types/employee'

export default function EmployeeFilters({ searchQuery, setSearchQuery, selectedDept, setSelectedDept, selectedStatus, setSelectedStatus }: EmployeeFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center">
      <div className="w-full md:flex-1">
        <label htmlFor="search-input" className="sr-only">{t('searchPlaceholder')}</label>
        <input id="search-input" type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={t('searchPlaceholder')} className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      
      <div className="w-full md:w-44">
        <label htmlFor="filter-dept" className="sr-only">{t('department')}</label>
        <select id="filter-dept" value={selectedDept} onChange={e => setSelectedDept(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-[14px] bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <option value="Alle">{t('allDepartments')}</option>
          <option value="Design">Design</option>
          <option value="Finanzen">Finanzen</option>          
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>          
        </select>
      </div>

      <div className="w-full md:w-44">
        <label htmlFor="filter-status" className="sr-only">{t('status')}</label>
        <select id="filter-status" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-[14px] bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <option value="Alle">{t('allStatuses')}</option>
          <option value="Aktiv vor Ort">{t('activeOnSite')}</option>
          <option value="Home Office">{t('homeOffice')}</option>
        </select>
      </div>
    </div>
  );
}
