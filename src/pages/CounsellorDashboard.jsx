import { useNavigate } from 'react-router-dom'
import CounsellorShell from '../components/layout/CounsellorShell'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { counsellorUser, managedLearners, counsellorStats, reminders } from '../data/mockData'

const statusVariant = {
  'Successful': 'green',
  'Under Review': 'amber',
  'Applied': 'blue',
  'Saved': 'gray',
  'Not Started': 'red',
}

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function markColor(mark) {
  if (mark >= 75) return 'var(--green-600)'
  if (mark >= 50) return 'var(--amber-600)'
  return 'var(--red-600)'
}

export default function CounsellorDashboard() {
  const navigate = useNavigate()

  const attentionLearners = managedLearners.filter(l => l.needsAttention)
  const recentLearners = managedLearners.slice(0, 5)
  const urgentDeadlines = reminders.filter(r => r.priority === 'Urgent' || r.priority === 'High').slice(0, 4)

  const statCards = [
    {
      label: 'Learners Registered',
      value: counsellorStats.totalLearners,
      icon: '👥',
      color: 'var(--green-600)',
      bg: 'var(--green-50)',
      action: () => navigate('/learners'),
    },
    {
      label: 'Applications Submitted',
      value: counsellorStats.applicationsSubmitted,
      icon: '📋',
      color: 'var(--blue-600)',
      bg: 'var(--blue-100)',
      action: null,
    },
    {
      label: 'Learners Need Attention',
      value: counsellorStats.needingAttention,
      icon: '⚠️',
      color: 'var(--amber-600)',
      bg: 'var(--amber-100)',
      action: () => navigate('/learners'),
    },
    {
      label: 'Successful Outcomes',
      value: counsellorStats.successfulOutcomes,
      icon: '🏆',
      color: 'var(--green-700)',
      bg: 'var(--green-100)',
      action: null,
    },
  ]

  return (
    <CounsellorShell>

      {/* Greeting */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-.02em' }}>
          Good morning, {counsellorUser.name.split(' ').pop()} 👋
        </h1>
        <p style={{ fontSize: 16, color: 'var(--gray-600)', marginTop: 6 }}>
          {counsellorUser.school} · {counsellorUser.province} ·{' '}
          <span style={{ color: 'var(--green-700)', fontWeight: 600 }}>{counsellorUser.gradesManaged.join(', ')}</span>
        </p>
      </div>

      {/* Attention banner — shown when learners need intervention */}
      {attentionLearners.length > 0 && (
        <div style={{
          marginBottom: 28,
          padding: '16px 22px',
          background: 'var(--amber-100)',
          borderRadius: 'var(--radius-lg)',
          borderLeft: '4px solid var(--amber-600)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#92400e' }}>
              ⚠️ {attentionLearners.length} learner{attentionLearners.length > 1 ? 's' : ''} haven't started any applications yet
            </p>
            <p style={{ fontSize: 13, color: '#b45309', marginTop: 4 }}>
              {attentionLearners.map(l => l.name.split(' ')[0]).join(', ')} — deadlines are approaching.
            </p>
          </div>
          <Button size="sm" variant="secondary" onClick={() => navigate('/learners')}>
            View Learners →
          </Button>
        </div>
      )}

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {statCards.map(s => (
          <Card
            key={s.label}
            style={{ padding: 24, cursor: s.action ? 'pointer' : 'default', transition: 'box-shadow .15s' }}
            onClick={s.action || undefined}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', fontWeight: 500 }}>{s.label}</p>
                <p style={{ fontSize: 36, fontWeight: 800, color: s.color, letterSpacing: '-.03em', lineHeight: 1.1, marginTop: 8 }}>
                  {s.value}
                </p>
              </div>
              <div style={{
                fontSize: 26, background: s.bg,
                width: 48, height: 48, borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {s.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>

        {/* Left — learner overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Learner list preview */}
          <Card style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)' }}>
                👥 My Learners
              </h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/learners')}>
                Manage all →
              </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Table header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 80px 90px 110px 90px',
                gap: 12, padding: '0 12px 10px',
                borderBottom: '1px solid var(--gray-200)',
              }}>
                {['Learner', 'Grade', 'Average', 'Status', 'Applications'].map(h => (
                  <span key={h} style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
                    {h}
                  </span>
                ))}
              </div>

              {recentLearners.map(learner => (
                <div
                  key={learner.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 80px 90px 110px 90px',
                    gap: 12, padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer', transition: 'background .15s',
                    alignItems: 'center',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  onClick={() => navigate('/learners')}
                >
                  {/* Name + avatar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: learner.needsAttention
                        ? 'linear-gradient(135deg, var(--amber-600), #d97706)'
                        : 'linear-gradient(135deg, var(--green-500), var(--green-700))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: 12, flexShrink: 0,
                    }}>
                      {initials(learner.name)}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--gray-900)' }}>{learner.name}</p>
                      {learner.needsAttention && (
                        <p style={{ fontSize: 11, color: 'var(--amber-600)', fontWeight: 600 }}>Needs attention</p>
                      )}
                    </div>
                  </div>

                  <span style={{ fontSize: 14, color: 'var(--gray-600)' }}>Grade {learner.grade}</span>

                  <span style={{ fontSize: 14, fontWeight: 700, color: markColor(learner.averageMark) }}>
                    {learner.averageMark}%
                  </span>

                  <Badge variant={statusVariant[learner.latestStatus] || 'gray'}>
                    {learner.latestStatus}
                  </Badge>

                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-700)', textAlign: 'center' }}>
                    {learner.applicationsCount}
                  </span>
                </div>
              ))}
            </div>

            {managedLearners.length > 5 && (
              <div style={{ marginTop: 12, textAlign: 'center' }}>
                <Button variant="ghost" size="sm" onClick={() => navigate('/learners')}>
                  See all {managedLearners.length} learners
                </Button>
              </div>
            )}
          </Card>

          {/* Class progress summary */}
          <Card style={{ padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 20 }}>
              📊 Class Application Progress
            </h2>
            {[
              { label: 'Have at least one application', count: managedLearners.filter(l => l.applicationsCount > 0).length, color: 'var(--green-600)' },
              { label: 'Application under review', count: managedLearners.filter(l => l.latestStatus === 'Under Review').length, color: 'var(--amber-600)' },
              { label: 'Successful outcome', count: managedLearners.filter(l => l.latestStatus === 'Successful').length, color: 'var(--blue-600)' },
              { label: "Haven't started yet", count: managedLearners.filter(l => l.latestStatus === 'Not Started').length, color: 'var(--red-600)' },
            ].map(row => (
              <div key={row.label} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, color: 'var(--gray-700)' }}>{row.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: row.color }}>
                    {row.count} / {managedLearners.length}
                  </span>
                </div>
                <div style={{ height: 8, background: 'var(--gray-100)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(row.count / managedLearners.length) * 100}%`,
                    background: row.color, borderRadius: 99,
                    transition: 'width .4s ease',
                  }} />
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Counsellor profile card */}
          <Card style={{ padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 16 }}>
              🧑‍🏫 My Profile
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{
                width: 50, height: 50, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--green-500), var(--green-700))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 16,
              }}>
                {counsellorUser.initials}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15 }}>{counsellorUser.name}</p>
                <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{counsellorUser.school}</p>
              </div>
            </div>
            {[
              { label: 'Province', value: counsellorUser.province },
              { label: 'Grades', value: counsellorUser.gradesManaged.join(', ') },
              { label: 'Email', value: counsellorUser.email },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10 }}>
                <span style={{ color: 'var(--gray-500)' }}>{row.label}</span>
                <span style={{ fontWeight: 600, color: 'var(--gray-800)' }}>{row.value}</span>
              </div>
            ))}
          </Card>

          {/* Upcoming class deadlines */}
          <Card style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)' }}>🔔 Upcoming Deadlines</h2>
            </div>
            <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 14 }}>
              Deadlines your learners should not miss:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {urgentDeadlines.map(r => {
                const urgent = r.priority === 'Urgent'
                return (
                  <div key={r.id} style={{
                    padding: '12px 14px', borderRadius: 'var(--radius-md)',
                    background: urgent ? 'var(--red-100)' : 'var(--amber-100)',
                    border: `1px solid ${urgent ? '#fca5a5' : '#fde68a'}`,
                  }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: urgent ? 'var(--red-600)' : '#92400e' }}>
                      {r.title}
                    </p>
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
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 16 }}>
              Quick Actions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Button variant="primary" fullWidth onClick={() => navigate('/learners')}>
                👥 Manage Learners
              </Button>
              <Button variant="secondary" fullWidth onClick={() => navigate('/discover')}>
                🔍 Browse Opportunities
              </Button>
            </div>
          </Card>

        </div>
      </div>
    </CounsellorShell>
  )
}
