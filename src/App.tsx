
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from './api/employeeApi';
import { Employee } from './types/employee.ts';
import Dashboard from './pages/Dashboard.tsx';
import Analytics from './pages/Analytics.tsx'; 
import NavLinks from './components/NavLinks';
import DataInterface from './components/DataInterface';
import LoadingOverlay from './components/LoadingOverlay';

export default function App() {
  const { t, i18n } = useTranslation();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  // Daten beim Start über Axios-Mock laden
 useEffect(() => {
    api.getEmployees().then(data => setEmployees(data));
  }, []);

  // Zentrale Speicherfunktion für alle Unterkomponenten (mit exakter TypeScript-Typisierung)
  const syncData = async (updatedList: Employee[]): Promise<void> => {
    setIsSaving(true); // Wartemaske einschalten
    try {
      setEmployees(updatedList);
      await api.saveEmployees(updatedList);
      console.table(updatedList);  
    } catch (error) {
      console.error("Fehler beim Speichern der Daten:", error);
    } finally {
      setIsSaving(false); // Wartemaske nach Abschluss (oder Fehler) ausschalten
    }
  };
  const changeLanguage = (lng:string) => {  i18n.changeLanguage(lng);  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
         <LoadingOverlay isVisible={isSaving} />
        {/* Barrierefreie Navigation */}
        <nav className="bg-white border-b border-slate-200 px-6 py-4 shadow-xs" role="navigation" aria-label="Main Navigation">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            
            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
              <span className="text-xl font-black text-slate-800 tracking-tight">
                🏢 {t('title')}    
                  <p className="text-right text-[10px] text-slate-500 font-normal">{t('subtitle')}</p>          
              </span> 
              <NavLinks />              
            </div>
            <DataInterface employees={employees} onImportSuccess={syncData} />
            {/* Sprachwechsler */}
            <div className="flex gap-2" role="group" aria-label="Language Selector">
              <button 
                onClick={() => changeLanguage('de')} 
                className={`px-3 py-1 text-xs font-semibold rounded transition focus:outline-2 focus:outline-blue-500 ${i18n.language.startsWith('de') ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                aria-label="Switch language to German"
              >
                DE
              </button>
              <button 
                onClick={() => changeLanguage('en')} 
                className={`px-3 py-1 text-xs font-semibold rounded transition focus:outline-2 focus:outline-blue-500 ${i18n.language.startsWith('en') ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                aria-label="Switch language to English"
              >
                EN
              </button>
            </div>
          </div>
        </nav>

        {/* Routen-Inhalt */}
        <main className="max-w-[90%] mx-auto p-6 sm:p-12">
          <Routes>
            <Route path="/" element={<Dashboard employees={employees} onSync={syncData}/>} />
            <Route path="/analytics" element={<Analytics />} /> {/* <-- Neue Route registrieren */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
