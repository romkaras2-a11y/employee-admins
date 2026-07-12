// pages/Analytics.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../api/employeeApi';
import { Employee } from '../types/employee';

export default function Analytics() {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    api.getEmployees().then(data => setEmployees(data));
  }, []);

  // Statistiken berechnen
  const totalCount = employees.length;
  const homeOfficeCount = employees.filter(e => e.status === 'Home Office').length;
  const onSiteCount = employees.filter(e => e.status === 'Aktiv vor Ort').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <header>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">{t('statsTitle')}</h1>
        <p className="text-sm text-slate-500 mt-1">{t('subtitle')}</p>
      </header>

      {/* Grid für die Statistik-Karten */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Karte 1: Gesamt */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">{t('statsTotal')}</span>
          <span className="text-4xl font-black text-blue-600 mt-2">{totalCount}</span>
        </div>

        {/* Karte 2: Home Office */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-bold uppercase text-purple-400 tracking-wider">{t('statsHomeOffice')}</span>
          <span className="text-4xl font-black text-purple-600 mt-2">{homeOfficeCount}</span>
        </div>

        {/* Karte 3: Vor Ort */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">{t('statsOnSite')}</span>
          <span className="text-4xl font-black text-emerald-600 mt-2">{onSiteCount}</span>
        </div>

      </div>
    </div>
  );
}
