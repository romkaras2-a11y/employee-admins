//
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Employee } from '../types/employee';

interface DataInterfaceProps {
  employees: Employee[];
  onImportSuccess: (importedEmployees: Employee[]) => void;
}

export default function DataInterface({ employees, onImportSuccess }: DataInterfaceProps) {
  const { t } = useTranslation();
  // Ref wird exakt auf ein HTML-Input-Element typisiert
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(employees, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mitarbeiter_liste_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Typisierung des Change-Events für Datei-Inputs
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target?.result) return;
        const parsedData = JSON.parse(event.target.result as string);
        
        if (!Array.isArray(parsedData)) {
          alert(t('importError') + " (Datei muss eine Liste/ein Array sein)");
          return;
        }
        
        const validatedData: Employee[] = parsedData.map((rawEmp: any, index: number) => {
          const emp = {
            name: rawEmp.name || rawEmp.Name || rawEmp.NAME,
            email: rawEmp.email || rawEmp.Email || rawEmp.EMAIL,
            department: rawEmp.department || rawEmp.Department || rawEmp.DEPARTMENT,
            position: rawEmp.position || rawEmp.Position || rawEmp.POSITION,
            status: rawEmp.status || rawEmp.Status || rawEmp.STATUS
          };

          console.log(` Teste Eintrag #${index + 1}:`, emp);

          if (!emp.name?.trim() || !emp.email?.trim() || !emp.department?.trim() || !emp.position?.trim() || !emp.status?.trim()) {
            console.error(` Fehler in Zeile ${index + 1}. Detektierte Rohdaten:`, rawEmp);
            throw new Error(`Pflichtfelder in Eintrag #${index + 1} fehlen oder sind leer.`);
          }

          const finalStatus: 'Home Office' | 'Aktiv vor Ort' = 
            (emp.status === 'Home Office' || emp.status === 'Aktiv vor Ort') ? emp.status : 'Aktiv vor Ort';

          return {            
            id: rawEmp.id ? Number(rawEmp.id) : Date.now() + Math.random(), 
            name: emp.name.trim(),
            email: emp.email.trim(),
            department: emp.department.trim(),
            position: emp.position.trim(),           
            status: finalStatus
          };
        });

        onImportSuccess(validatedData);
        alert(t('importSuccess'));
      } catch (err: any) {
        console.error(" IMPORT-FEHLER DETEKTIERT:", err.message);
        alert(t('importError') + ` (${err.message})`);
      }
    };

    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-3 items-center justify-between">
      <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">JSON Datentransfer</span>
      <div className="flex gap-2 w-full sm:w-auto">
        <input type="file" id="json-import" ref={fileInputRef} onChange={handleImport} accept=".json" className="hidden" aria-hidden="true" />
        <button type="button" onClick={triggerFileInput} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition focus:outline-2 focus:outline-blue-500 cursor-pointer" aria-label={t('importData')}>
          <ArrowUpTrayIcon className="w-4 h-4 text-slate-500" /> {t('importData')}
        </button>
        <button type="button" onClick={handleExport} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition focus:outline-2 focus:outline-blue-500 cursor-pointer" aria-label={t('exportData')}>
          <ArrowDownTrayIcon className="w-4 h-4 text-slate-500" /> {t('exportData')}
        </button>
      </div>
    </div>
  );
}
