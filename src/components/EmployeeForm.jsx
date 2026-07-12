//
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function EmployeeForm({ onAdd }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', department: 'IT', position: '', status: 'Aktiv vor Ort' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    onAdd(formData);
    setFormData({ name: '', email: '', department: 'IT', position: '', status: 'Aktiv vor Ort' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4" aria-labelledby="form-title">
      <h3 id="form-title" className="text-sm font-bold text-slate-800">{t('addEmployee')}</h3>
      
      <div>
        <label htmlFor="form-name" className="block text-xs font-bold uppercase text-slate-500 mb-1">{t('name')}</label>
        <input id="form-name" type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>

      <div>
        <label htmlFor="form-email" className="block text-xs font-bold uppercase text-slate-500 mb-1">{t('email')}</label>
        <input id="form-email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>

      
        <div>
          <label htmlFor="form-dept" className="block text-xs font-bold uppercase text-slate-500 mb-1">{t('department')}</label>
          <select id="form-dept" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Finanzen">Finanzen</option>
          </select>
        </div>
        <div>
          <label htmlFor="form-status" className="block text-xs font-bold uppercase text-slate-500 mb-1">{t('status')}</label>
          <select id="form-status" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="Aktiv vor Ort">{t('activeOnSite')}</option>
            <option value="Home Office">{t('homeOffice')}</option>
          </select>
        </div>
     

      <div>
        <label htmlFor="form-pos" className="block text-xs font-bold uppercase text-slate-500 mb-1">{t('position')}</label>
        <input id="form-pos" type="text" required value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>

      <button type="submit" className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs shadow-xs transition focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none">
        {t('addBtn')}
      </button>
    </form>
  );
}
