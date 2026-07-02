'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/subjects', label: 'Asignaturas', icon: '📚' },
    { href: '/exams', label: 'Exámenes', icon: '📅' },
    { href: '/analytics', label: 'Estadísticas', icon: '📈' },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <h2>UPM Tracker</h2>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {links.map(link => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`nav-link ${pathname === link.href ? 'active' : ''}`}
          >
            <span className="nav-icon">{link.icon}</span>
            <span className="nav-label">{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">N</div>
          <div className="user-info">
            <span className="user-name">Naranjo</span>
            <span className="user-role">Estudiante</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
