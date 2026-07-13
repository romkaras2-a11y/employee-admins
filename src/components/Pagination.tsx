//components/Pagination.jsx
import { useTranslation } from 'react-i18next';
import{PaginationProps} from '../types/employee'
export default function Pagination({ currentPage, totalPages, onPageChange }:PaginationProps) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  return (
    <div aria-label="Pagination"
      className="flex flex-col sm:flex-row justify-center items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs gap-4" 
    >
      
      {/* Navigations-Buttons */}
      <div className="flex flex-wrap items-center gap-1.5" role="navigation" aria-label="Pagination Navigation">
        {/* Zurück-Button */}
        <button disabled={currentPage === 1} aria-label={t('prev')}   onClick={() => onPageChange(currentPage - 1)} 
          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-sm font-medium rounded-lg disabled:opacity-40 transition focus:outline-2 focus:outline-blue-500 cursor-pointer"
        >
          {t('prev')}
        </button>

        {/* Dynamische Generierung der Seiten-Links */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isActive = currentPage === pageNumber;
          
          return (
            <button key={pageNumber} aria-label={`Go to page ${pageNumber}`} aria-current={isActive ? 'page' : undefined} 
              onClick={() => onPageChange(pageNumber)}
              className={`min-w-8 h-8 px-2 text-sm font-bold rounded-lg transition focus:outline-2 focus:outline-blue-500 cursor-pointer ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}            
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Weiter-Button */}
        <button disabled={currentPage === totalPages} aria-label={t('next')} onClick={() => onPageChange(currentPage + 1)} 
          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-sm font-medium rounded-lg disabled:opacity-40 transition focus:outline-2 focus:outline-blue-500 cursor-pointer"
        >
         {t('next')}
        </button>
      </div>
    </div>
  );
}
