import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: '⊞' },
    { to: '/discover', label: 'Discover', icon: '🔍' },
    { to: '/applications', label: 'Applications', icon: '📋' },
    { to: '/reminders', label: 'Reminders', icon: '🔔' },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ]

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#fff',
      borderBottom: '1px solid var(--gray-200)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}>
        {/* Logo */}
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, var(--green-600), var(--green-800))',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>
            🎓
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: 17, color: 'var(--green-800)', letterSpacing: '-.02em' }}>
              EduAccess
            </span>
            <span style={{ fontWeight: 800, fontSize: 17, color: 'var(--gold-500)', letterSpacing: '-.02em' }}>
              {' '}SA
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map(link => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 14, fontWeight: 600,
                  color: active ? 'var(--green-700)' : 'var(--gray-600)',
                  background: active ? 'var(--green-50)' : 'transparent',
                  transition: 'background .15s, color .15s',
                }}
              >
                <span style={{ fontSize: 15 }}>{link.icon}</span>
                <span className="nav-label">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 36, height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--green-500), var(--green-700))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 14,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/profile')}
            title="My Profile"
          >
            TM
          </div>
        </div>
      </div>
    </header>
  )
}
