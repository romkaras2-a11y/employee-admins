// components/NavLinks.jsx
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NavLinks() {

  const { t } = useTranslation();
  const location = useLocation();
  
  const baseStyle = "px-3 py-2 text-sm font-medium rounded-lg transition focus:outline-2 focus:outline-blue-500";
  const activeStyle = "bg-blue-50 text-blue-600";
  const inactiveStyle = "text-slate-600 hover:bg-slate-50 hover:text-slate-900";

    return (
      <div className="flex gap-2" role="tablist" aria-label="Navigation Links">
        <Link 
          to="/" 
          className={`${baseStyle} ${location.pathname === '/' ? activeStyle : inactiveStyle}`}
          role="tab"
          aria-selected={location.pathname === '/'}
        >
          {t('navDashboard')}
        </Link>
        <Link 
          to="/analytics" 
          className={`${baseStyle} ${location.pathname === '/analytics' ? activeStyle : inactiveStyle}`}
          role="tab"
          aria-selected={location.pathname === '/analytics'}
        >
          {t('navAnalytics')}
        </Link>
      </div>
    );
}