// components/DataInterface.jsx
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function DataInterface({ employees, onImportSuccess }) {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  // 1. Export-Funktion (JSON generieren und herunterladen)
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(employees, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mitarbeiter_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Trigger für den versteckten Datei-Upload (Barrierefreiheit gewährleistet via Label/Ref)
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  //Import-Funktion (Datei einlesen und validieren)
  const handleImport = (e) => {   
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0]; 
    const reader = new FileReader();
    reader.onload = (event) => {     
      try {        
        const parsedData = JSON.parse(event.target.result);
        // Validierung: Prüfen, ob es ein Array ist und Pflichtfelder existieren     
         if (!Array.isArray(parsedData)) {
          alert(t('importError') + " (Datei muss eine Liste/ein Array sein)");
          throw new Error("Datei muss eine Liste/ein Array sein.");
        }     
               
        const validatedData = parsedData.map(emp => {      
          if ( !emp.name?.trim() || !emp.email?.trim() || !emp.department?.trim() || !emp.position?.trim() || !emp.status?.trim() ) {           
            console.error(` Fehler in Zeile ${index + 1}. Detektierte Rohdaten:`,emp);
            throw new Error(`Pflichtfelder in Eintrag #${index + 1} fehlen oder sind leer.`);
          }          
          return {            
            id: emp.id ? Number(emp.id) : Date.now() + Math.random(), 
            name: emp.name || "Unbekannter Mitarbeiter",
            email: emp.email || "keine@e-mail.de",
            department: emp.department || "IT",
            position: emp.position || "Mitarbeiter",           
            status: (emp.status === 'Home Office' || emp.status === 'Aktiv vor Ort') ? emp.status : 'Aktiv vor Ort'
          };
        });

        onImportSuccess(validatedData);
        alert(t('importSuccess'));
      } catch (err) {
          alert(t('importError') + " (Ungültiges JSON-Format)");
      }
    };
    reader.readAsText(file);
    e.target.value = ''; 
  };

  return (
    <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-3 items-center justify-between">
      {/*<span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Datentransfer as Json</span>*/}
      
      <div className="flex gap-2 w-full sm:w-auto">
        {/* Import-Button */}
        <input 
          type="file" 
          id="json-import"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".json"
          className="hidden" 
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={triggerFileInput}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-2 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition focus:outline-2 focus:outline-blue-500"
          aria-label={t('importData')}
        >
          <ArrowUpTrayIcon className="w-4 h-4 text-slate-500" />
          {t('importData')}
        </button>

        {/* Export-Button */}
        <button
          type="button"
          onClick={handleExport}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-2 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition focus:outline-2 focus:outline-blue-500"
          aria-label={t('exportData')}
        >
          <ArrowDownTrayIcon className="w-4 h-4 text-slate-500" />
          {t('exportData')}
        </button>
      </div>
    </div>
  );
}
