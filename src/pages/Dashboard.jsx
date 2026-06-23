import { useNavigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { currentUser, opportunities, applications, reminders, stats } from '../data/mockData'
import { matchOpportunities } from '../utils/matching'

const statusColor = {
  'Saved': 'gray',
  'Applied': 'blue',
  'Under Review': 'amber',
  'Successful': 'green',
  'Unsuccessful': 'red',
}

const urgencyColor = deadline => {
  const days = Math.ceil((new Date(deadline) - new Date()) / 86400000)
  if (days <= 14) return { bg: 'var(--red-100)', color: 'var(--red-600)', label: `${days}d left` }
  if (days <= 45) return { bg: 'var(--amber-100)', color: 'var(--amber-600)', label: `${days}d left` }
  return { bg: 'var(--green-100)', color: 'var(--green-800)', label: `${days}d left` }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const matched = matchOpportunities(currentUser, opportunities).filter(o => o.matched).slice(0, 3)
  const recentApps = applications.slice(0, 4)
  const urgentReminders = reminders.filter(r => r.priority === 'Urgent' || r.priority === 'High').slice(0, 3)

  const statCards = [
    { label: 'Matched Opportunities', value: stats.matchedForYou, icon: '🎯', color: 'var(--green-600)', bg: 'var(--green-50)' },
    { label: 'Applications Submitted', value: stats.applicationsSubmitted, icon: '📋', color: 'var(--blue-600)', bg: 'var(--blue-100)' },
    { label: 'Deadlines This Month', value: stats.deadlinesThisMonth, icon: '⏰', color: 'var(--amber-600)', bg: 'var(--amber-100)' },
    { label: 'Total Opportunities', value: stats.totalOpportunities, icon: '🏆', color: 'var(--gray-700)', bg: 'var(--gray-100)' },
  ]

  return (
    <AppShell>
      {/* Greeting */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-.02em' }}>
          Good morning, {currentUser.name.split(' ')[0]} 👋
        </h1>
        <p style={{ fontSize: 16, color: 'var(--gray-600)', marginTop: 6 }}>
          Here's what's happening with your applications and opportunities.
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {statCards.map(s => (
          <Card key={s.label} style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', fontWeight: 500 }}>{s.label}</p>
                <p style={{ fontSize: 36, fontWeight: 800, color: s.color, letterSpacing: '-.03em', lineHeight: 1.1, marginTop: 8 }}>
                  {s.value}
                </p>
              </div>
              <div style={{ fontSize: 28, background: s.bg, width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {s.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Matched for you */}
          <Card style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)' }}>🎯 Matched For You</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/discover')}>View all →</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {matched.map(opp => {
                const u = urgencyColor(opp.deadline)
                return (
                  <div
                    key={opp.id}
                    onClick={() => navigate(`/opportunities/${opp.id}`)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--gray-200)',
                      cursor: 'pointer',
                      transition: 'background .15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                  >
                    <div style={{ fontSize: 28, width: 44, height: 44, background: 'var(--green-50)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {opp.logo}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--gray-900)' }}>{opp.title}</p>
                      <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 2 }}>{opp.provider}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                      <Badge variant={opp.type === 'Bursary' ? 'green' : opp.type === 'University' ? 'blue' : 'amber'}>{opp.type}</Badge>
                      <span style={{ fontSize: 12, fontWeight: 600, color: u.color, background: u.bg, padding: '2px 8px', borderRadius: 99 }}>
                        {u.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Recent applications */}
          <Card style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)' }}>📋 My Applications</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/applications')}>View all →</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentApps.map(app => (
                <div key={app.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
                  <div style={{ fontSize: 22 }}>{app.logo}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--gray-900)' }}>{app.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{app.provider}</p>
                  </div>
                  <Badge variant={statusColor[app.status]}>{app.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Profile snapshot */}
          <Card style={{ padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 16 }}>👤 My Profile</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--green-500), var(--green-700))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 18,
              }}>
                TM
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16 }}>{currentUser.name}</p>
                <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>Grade {currentUser.grade} · {currentUser.province}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>Average mark</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-700)' }}>{currentUser.averageMark}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>School</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{currentUser.school}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--gray-600)', flexShrink: 0 }}>Interests</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'flex-end' }}>
                  {currentUser.interests.map(i => <Badge key={i} variant="green" style={{ fontSize: 11 }}>{i}</Badge>)}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" fullWidth style={{ marginTop: 16 }} onClick={() => navigate('/profile')}>
              Edit Profile
            </Button>
          </Card>

          {/* Upcoming deadlines */}
          <Card style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)' }}>🔔 Upcoming Deadlines</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/reminders')}>All</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {urgentReminders.map(r => {
                const urgent = r.priority === 'Urgent'
                return (
                  <div key={r.id} style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: urgent ? 'var(--red-100)' : 'var(--amber-100)',
                    border: `1px solid ${urgent ? '#fca5a5' : '#fde68a'}`,
                  }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: urgent ? 'var(--red-600)' : '#92400e' }}>{r.title}</p>
                    <p style={{ fontSize: 12, color: urgent ? '#ef4444' : '#b45309', marginTop: 4 }}>
                      {urgent ? '🚨' : '⚠️'} {r.daysLeft} days left
                    </p>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Quick actions */}
          <Card style={{ padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 16 }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Button variant="primary" fullWidth onClick={() => navigate('/discover')}>🔍 Browse Opportunities</Button>
              <Button variant="secondary" fullWidth onClick={() => navigate('/applications')}>📋 Track Applications</Button>
              <Button variant="ghost" fullWidth onClick={() => navigate('/reminders')}>🔔 Manage Reminders</Button>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
