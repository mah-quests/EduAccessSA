import { useNavigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { applications } from '../data/mockData'

const columns = ['Saved', 'Applied', 'Under Review', 'Successful', 'Unsuccessful']

const colConfig = {
  'Saved':       { color: 'var(--gray-600)',   bg: 'var(--gray-100)',   icon: '🔖' },
  'Applied':     { color: 'var(--blue-600)',    bg: 'var(--blue-100)',   icon: '📤' },
  'Under Review':{ color: 'var(--amber-600)',   bg: 'var(--amber-100)',  icon: '🔍' },
  'Successful':  { color: 'var(--green-700)',   bg: 'var(--green-100)',  icon: '✅' },
  'Unsuccessful':{ color: 'var(--red-600)',     bg: 'var(--red-100)',    icon: '❌' },
}

const badgeVariant = {
  'Saved': 'gray', 'Applied': 'blue', 'Under Review': 'amber', 'Successful': 'green', 'Unsuccessful': 'red',
}

export default function Applications() {
  const navigate = useNavigate()

  return (
    <AppShell>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-.02em' }}>
          Application Tracker
        </h1>
        <p style={{ fontSize: 16, color: 'var(--gray-600)', marginTop: 6 }}>
          Follow each application from saved through to outcome.
        </p>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 28 }}>
        {columns.map(col => {
          const count = applications.filter(a => a.status === col).length
          const c = colConfig[col]
          return (
            <Card key={col} style={{ padding: '16px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: c.color }}>{count}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 500 }}>{col}</div>
            </Card>
          )
        })}
      </div>

      {/* Kanban board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, alignItems: 'flex-start' }}>
        {columns.map(col => {
          const apps = applications.filter(a => a.status === col)
          const c = colConfig[col]
          return (
            <div key={col}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 12px', marginBottom: 12,
                background: c.bg, borderRadius: 'var(--radius-md)',
              }}>
                <span style={{ fontSize: 16 }}>{c.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{col}</span>
                <span style={{
                  marginLeft: 'auto', fontSize: 12, fontWeight: 700,
                  background: '#fff', color: c.color,
                  padding: '2px 8px', borderRadius: 99,
                }}>{apps.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {apps.length === 0 && (
                  <div style={{ padding: '20px 12px', textAlign: 'center', color: 'var(--gray-400)', fontSize: 13, background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--gray-200)' }}>
                    No applications
                  </div>
                )}
                {apps.map(app => (
                  <Card key={app.id} style={{ padding: 16 }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{app.logo}</div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4, lineHeight: 1.3 }}>
                      {app.title}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 10 }}>{app.provider}</p>
                    <Badge variant={badgeVariant[app.status]} style={{ fontSize: 11, marginBottom: 10 }}>{app.type}</Badge>
                    {app.appliedDate && (
                      <p style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 6 }}>
                        Applied: {app.appliedDate}
                      </p>
                    )}
                    <p style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 12 }}>
                      Deadline: {app.deadline}
                    </p>
                    {app.notes && (
                      <p style={{ fontSize: 12, color: 'var(--gray-600)', background: 'var(--gray-50)', padding: '8px 10px', borderRadius: 6, lineHeight: 1.5, marginBottom: 12 }}>
                        {app.notes}
                      </p>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      fullWidth
                      onClick={() => navigate(`/opportunities/${app.opportunityId}`)}
                    >
                      View →
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add button */}
      <div style={{ marginTop: 28, textAlign: 'center' }}>
        <Button variant="primary" onClick={() => navigate('/discover')}>
          + Track a New Application
        </Button>
      </div>
    </AppShell>
  )
}
