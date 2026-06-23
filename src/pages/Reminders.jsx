import { useNavigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { reminders } from '../data/mockData'

const priorityConfig = {
  Urgent: { color: 'var(--red-600)',   bg: 'var(--red-100)',   icon: '🚨', variant: 'red' },
  High:   { color: 'var(--amber-600)', bg: 'var(--amber-100)', icon: '⚠️', variant: 'amber' },
  Medium: { color: 'var(--blue-600)',  bg: 'var(--blue-100)',  icon: '📅', variant: 'blue' },
  Low:    { color: 'var(--gray-600)',  bg: 'var(--gray-100)',  icon: '📌', variant: 'gray' },
}

export default function Reminders() {
  const navigate = useNavigate()
  const sorted = [...reminders].sort((a, b) => a.daysLeft - b.daysLeft)

  return (
    <AppShell>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-.02em' }}>
          Deadline Reminders
        </h1>
        <p style={{ fontSize: 16, color: 'var(--gray-600)', marginTop: 6 }}>
          Stay ahead of every closing date — never miss an opportunity.
        </p>
      </div>

      {/* Urgent banner */}
      {sorted.filter(r => r.priority === 'Urgent').length > 0 && (
        <div style={{
          background: 'var(--red-100)',
          border: '1px solid #fca5a5',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          marginBottom: 24,
          display: 'flex',
          gap: 16,
          alignItems: 'center',
        }}>
          <span style={{ fontSize: 32 }}>🚨</span>
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--red-600)' }}>
              You have {sorted.filter(r => r.priority === 'Urgent').length} urgent deadline{sorted.filter(r => r.priority === 'Urgent').length > 1 ? 's' : ''} coming up!
            </p>
            <p style={{ fontSize: 14, color: '#ef4444', marginTop: 4 }}>
              Act now — these opportunities close within 7 days.
            </p>
          </div>
        </div>
      )}

      {/* Notification preference */}
      <Card style={{ padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 14 }}>
          🔔 Notification Preferences
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: '📱 SMS Alerts', active: true },
            { label: '✉️ Email Alerts', active: true },
            { label: '🔔 In-app only', active: false },
          ].map(p => (
            <button
              key={p.label}
              style={{
                padding: '8px 18px',
                borderRadius: 99,
                border: `2px solid ${p.active ? 'var(--green-600)' : 'var(--gray-300)'}`,
                background: p.active ? 'var(--green-50)' : '#fff',
                color: p.active ? 'var(--green-800)' : 'var(--gray-600)',
                fontWeight: 600, fontSize: 14, cursor: 'pointer',
              }}
            >
              {p.active && '✓ '}{p.label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 12 }}>
          Reminders are sent 30, 14, 7 and 1 day before each deadline.
        </p>
      </Card>

      {/* Reminder list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {sorted.map(r => {
          const c = priorityConfig[r.priority]
          const pct = Math.max(0, Math.min(100, 100 - (r.daysLeft / 120) * 100))
          return (
            <Card key={r.id} style={{ padding: 24 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: c.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>{r.title}</h3>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <Badge variant={r.type === 'Bursary' ? 'green' : 'blue'}>{r.type}</Badge>
                        <Badge variant={c.variant}>{r.priority}</Badge>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontSize: 28, fontWeight: 800, color: c.color, lineHeight: 1 }}>{r.daysLeft}</p>
                      <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 2 }}>days left</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ marginTop: 16, marginBottom: 16 }}>
                    <div style={{ height: 6, background: 'var(--gray-200)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${pct}%`,
                        background: r.priority === 'Urgent' ? 'var(--red-600)' : r.priority === 'High' ? 'var(--amber-600)' : 'var(--green-600)',
                        borderRadius: 99, transition: 'width .3s',
                      }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                      <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>Today</span>
                      <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>Deadline: {r.deadline}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <Button variant="primary" size="sm" onClick={() => navigate(`/opportunities/${r.opportunityId}`)}>
                      View Opportunity →
                    </Button>
                    <Button variant="ghost" size="sm">Remove Reminder</Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Button variant="secondary" onClick={() => navigate('/discover')}>
          + Add More Reminders
        </Button>
      </div>
    </AppShell>
  )
}
