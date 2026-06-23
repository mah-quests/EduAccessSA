import { useParams, useNavigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { opportunities } from '../data/mockData'

const typeColors = { Bursary: 'green', University: 'blue', TVET: 'amber' }
const daysUntil = deadline => Math.ceil((new Date(deadline) - new Date()) / 86400000)

export default function OpportunityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const opp = opportunities.find(o => o.id === id)

  if (!opp) {
    return (
      <AppShell>
        <div style={{ textAlign: 'center', padding: 80 }}>
          <p style={{ fontSize: 18, color: 'var(--gray-500)' }}>Opportunity not found.</p>
          <Button variant="primary" onClick={() => navigate('/discover')} style={{ marginTop: 20 }}>← Back to Discover</Button>
        </div>
      </AppShell>
    )
  }

  const days = daysUntil(opp.deadline)
  const urgent = days <= 30

  return (
    <AppShell>
      {/* Back */}
      <button
        onClick={() => navigate('/discover')}
        style={{ background: 'none', border: 'none', color: 'var(--gray-500)', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}
      >
        ← Back to Discover
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'flex-start' }}>
        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Card style={{ padding: 32 }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 48, width: 72, height: 72, background: 'var(--green-50)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--green-100)', flexShrink: 0 }}>
                {opp.logo}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                  <Badge variant={typeColors[opp.type]}>{opp.type}</Badge>
                  {opp.matched && <Badge variant="green">✓ Matched to your profile</Badge>}
                  <Badge variant={opp.status === 'Open' ? 'green' : 'red'}>{opp.status}</Badge>
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-.02em', marginBottom: 6 }}>
                  {opp.title}
                </h1>
                <p style={{ fontSize: 16, color: 'var(--gray-600)', fontWeight: 500 }}>{opp.provider}</p>
              </div>
            </div>
          </Card>

          <Card style={{ padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 14 }}>About this opportunity</h2>
            <p style={{ fontSize: 15, color: 'var(--gray-700)', lineHeight: 1.7 }}>{opp.description}</p>
          </Card>

          <Card style={{ padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 14 }}>Requirements</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {opp.requirements.map((req, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15, color: 'var(--gray-700)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--green-600)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </Card>

          <Card style={{ padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 14 }}>Fields of Study</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {opp.fields.map(f => <Badge key={f} variant="blue">{f}</Badge>)}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 80 }}>
          <Card style={{ padding: 24 }}>
            {/* Deadline warning */}
            {urgent && (
              <div style={{ background: 'var(--red-100)', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: 20, border: '1px solid #fca5a5' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--red-600)' }}>
                  🚨 Closing in {days} days
                </p>
                <p style={{ fontSize: 13, color: '#ef4444', marginTop: 4 }}>Apply soon — don't miss this one.</p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid var(--gray-100)' }}>
                <span style={{ fontSize: 14, color: 'var(--gray-500)' }}>Value</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-700)' }}>{opp.value}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid var(--gray-100)' }}>
                <span style={{ fontSize: 14, color: 'var(--gray-500)' }}>Deadline</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: urgent ? 'var(--red-600)' : 'var(--gray-900)' }}>{opp.deadline}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid var(--gray-100)' }}>
                <span style={{ fontSize: 14, color: 'var(--gray-500)' }}>Min. Average</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{opp.minMark}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, color: 'var(--gray-500)' }}>Provinces</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{opp.provinces[0]}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Button variant="primary" size="lg" fullWidth>
                🚀 Apply Now
              </Button>
              <Button variant="secondary" fullWidth>
                🔔 Save & Set Reminder
              </Button>
            </div>
          </Card>

          <Card style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Tags</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {opp.tags.map(t => <Badge key={t} variant="gray">{t}</Badge>)}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
