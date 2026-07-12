// components/EditEmployeeModal.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function EditEmployeeModal({ employee, onClose, onSave }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ ...employee });

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 id="modal-title" className="text-lg font-bold text-slate-800">{t('edit')}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl font-light p-1 focus:outline-none" aria-label="Close dialog">&times;</button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-xs font-bold uppercase text-slate-500 mb-1">{t('name')}</label>
            <input id="edit-name" type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div>
            <label htmlFor="edit-email" className="block text-xs font-bold uppercase text-slate-500 mb-1">{t('email')}</label>
            <input id="edit-email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-dept" className="block text-xs font-bold uppercase text-slate-500 mb-1">{t('department')}</label>
              <select id="edit-dept" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Finanzen">Finanzen</option>
              </select>
            </div>
            <div>
              <label htmlFor="edit-status" className="block text-xs font-bold uppercase text-slate-500 mb-1">{t('status')}</label>
              <select id="edit-status" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="Aktiv vor Ort">{t('activeOnSite')}</option>
                <option value="Home Office">{t('homeOffice')}</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="edit-pos" className="block text-xs font-bold uppercase text-slate-500 mb-1">{t('position')}</label>
            <input id="edit-pos" type="text" required value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition">{t('cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-xs transition">{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
