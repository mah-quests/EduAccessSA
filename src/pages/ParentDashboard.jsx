import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

// Mock data for parent viewing child's progress
const childProfile = {
  id: 'u1',
  name: 'Thabo Mokoena',
  grade: '12',
  school: 'Soweto High School',
  averageMark: 72,
  province: 'Gauteng',
}

const childApplications = [
  {
    id: 'a1',
    title: 'NSFAS Bursary',
    provider: 'NSFAS',
    status: 'Under Review',
    appliedDate: '2026-04-10',
    deadline: '2026-09-30',
    value: 'Full cost of study',
    progress: 60,
  },
  {
    id: 'a2',
    title: 'Sasol Engineering Bursary',
    provider: 'Sasol Limited',
    status: 'Applied',
    appliedDate: '2026-05-22',
    deadline: '2026-08-31',
    value: 'Up to R120 000/year',
    progress: 40,
  },
  {
    id: 'a3',
    title: 'BE Electrical — Wits',
    provider: 'University of the Witwatersrand',
    status: 'Saved',
    appliedDate: null,
    deadline: '2026-09-30',
    value: '4-year degree',
    progress: 20,
  },
  {
    id: 'a4',
    title: 'Eskom STEM Bursary',
    provider: 'Eskom Holdings',
    status: 'Successful',
    appliedDate: '2026-03-15',
    deadline: '2026-07-31',
    value: 'Up to R100 000/year',
    progress: 100,
  },
]

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

const getStatusIcon = status => {
  switch(status) {
    case 'Successful': return '✅'
    case 'Under Review': return '⏳'
    case 'Applied': return '📋'
    case 'Saved': return '📌'
    case 'Unsuccessful': return '❌'
    default: return '•'
  }
}

export default function ParentDashboard() {
  const [selectedApp, setSelectedApp] = useState(null)
  const urgentDeadlines = childApplications.filter(app => {
    const days = Math.ceil((new Date(app.deadline) - new Date()) / 86400000)
    return days <= 30 && app.status !== 'Successful'
  })

  return (
    <AppShell>
      {/* Greeting */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-.02em' }}>
          Track {childProfile.name}'s Progress 👨‍👧
        </h1>
        <p style={{ fontSize: 16, color: 'var(--gray-600)', marginTop: 6 }}>
          Stay informed about your child's applications, deadlines, and opportunities.
        </p>
      </div>

      {/* Child Profile Card */}
      <Card style={{ padding: 24, marginBottom: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Child
            </p>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)', marginTop: 4 }}>
              {childProfile.name}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Grade & School
            </p>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)', marginTop: 4 }}>
              Grade {childProfile.grade} • {childProfile.school}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Average Mark
            </p>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--green-600)', marginTop: 4 }}>
              {childProfile.averageMark}%
            </p>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Applications
            </p>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--blue-600)', marginTop: 4 }}>
              {childApplications.filter(a => a.status === 'Applied' || a.status === 'Under Review').length} Active
            </p>
          </div>
        </div>
      </Card>

      {/* Urgent Deadlines Alert */}
      {urgentDeadlines.length > 0 && (
        <Card style={{ 
          padding: 20, 
          marginBottom: 24, 
          background: 'var(--red-50)',
          borderLeft: '4px solid var(--red-600)',
        }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 24 }}>⚠️</span>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--red-900)', marginBottom: 8 }}>
                {urgentDeadlines.length} Upcoming Deadline{urgentDeadlines.length !== 1 ? 's' : ''}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--red-800)', marginBottom: 12 }}>
                Your child has applications with deadlines coming up soon. Make sure to support them in completing and submitting on time.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {urgentDeadlines.map(app => (
                  <Badge key={app.id} variant="red" size="sm">
                    {app.title} - {new Date(app.deadline).toLocaleDateString()}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Applications Overview */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 16 }}>
          Application Progress
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {childApplications.map(app => {
            const urgency = urgencyColor(app.deadline)
            const statusCol = statusColor[app.status] || 'gray'
            return (
              <Card 
                key={app.id}
                onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}
                style={{
                  padding: 20,
                  cursor: 'pointer',
                  background: selectedApp?.id === app.id ? 'var(--green-50)' : '#fff',
                  borderLeft: selectedApp?.id === app.id ? '4px solid var(--green-600)' : '4px solid transparent',
                  transition: 'all .2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 20 }}>{getStatusIcon(app.status)}</span>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-900)' }}>
                        {app.title}
                      </h3>
                      <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 2 }}>
                        {app.provider}
                      </p>
                    </div>
                  </div>
                </div>

                <Badge variant={statusCol} size="sm" style={{ marginBottom: 12 }}>
                  {app.status}
                </Badge>

                <div style={{ background: 'var(--gray-100)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-700)' }}>Progress</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-600)' }}>{app.progress}%</span>
                  </div>
                  <div style={{ 
                    background: 'var(--gray-300)', 
                    height: 4, 
                    borderRadius: 99,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      background: 'var(--green-600)',
                      height: '100%',
                      width: `${app.progress}%`,
                      transition: 'width .3s',
                    }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <p style={{ fontSize: 11, color: 'var(--gray-600)', fontWeight: 600 }}>VALUE</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)', marginTop: 2 }}>
                      {app.value}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: 'var(--gray-600)', fontWeight: 600 }}>DEADLINE</p>
                    <p style={{ 
                      fontSize: 13, 
                      fontWeight: 700, 
                      color: 'var(--gray-900)',
                      marginTop: 2,
                      padding: '4px 8px',
                      background: urgency.bg,
                      color: urgency.color,
                      borderRadius: 'var(--radius-sm)',
                      textAlign: 'center',
                    }}>
                      {urgency.label}
                    </p>
                  </div>
                </div>

                {selectedApp?.id === app.id && (
                  <div style={{ 
                    marginTop: 12, 
                    paddingTop: 12, 
                    borderTop: '1px solid var(--gray-200)',
                    fontSize: 13,
                    color: 'var(--gray-700)',
                  }}>
                    <p><strong>Applied:</strong> {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'Not yet applied'}</p>
                    <p style={{ marginTop: 6 }}><strong>Deadline:</strong> {new Date(app.deadline).toLocaleDateString()}</p>
                    <p style={{ marginTop: 8, color: 'var(--gray-600)', fontSize: 12 }}>
                      💡 Check in with {childProfile.name.split(' ')[0]} about next steps for this application.
                    </p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>

      {/* Statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { 
            label: 'Successful Applications', 
            value: childApplications.filter(a => a.status === 'Successful').length,
            icon: '✅',
            color: 'green',
          },
          { 
            label: 'Under Review', 
            value: childApplications.filter(a => a.status === 'Under Review').length,
            icon: '⏳',
            color: 'amber',
          },
          { 
            label: 'Ready to Apply', 
            value: childApplications.filter(a => a.status === 'Saved').length,
            icon: '📌',
            color: 'blue',
          },
          { 
            label: 'Total Applications', 
            value: childApplications.length,
            icon: '📊',
            color: 'gray',
          },
        ].map((stat, i) => (
          <Card key={i} style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                  {stat.label}
                </p>
                <p style={{ 
                  fontSize: 28, 
                  fontWeight: 800, 
                  marginTop: 6,
                  color: `var(--${stat.color}-600)`,
                }}>
                  {stat.value}
                </p>
              </div>
              <span style={{ fontSize: 36, opacity: 0.6 }}>{stat.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Support Section */}
      <Card style={{ padding: 32, background: 'linear-gradient(135deg, var(--blue-50), var(--indigo-50))' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 12 }}>
              How You Can Support
            </h3>
            <ul style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.8 }}>
              <li>✓ Review deadlines and help prioritize applications</li>
              <li>✓ Proofread application essays and documents</li>
              <li>✓ Help gather required documentation</li>
              <li>✓ Encourage consistent academic performance</li>
              <li>✓ Discuss career goals and aspirations</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 12 }}>
              Key Upcoming Dates
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {childApplications
                .filter(a => a.status !== 'Successful' && a.status !== 'Unsuccessful')
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .slice(0, 3)
                .map(app => (
                  <div key={app.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#fff',
                    borderRadius: 'var(--radius-sm)',
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-900)' }}>
                      {app.title}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue-600)' }}>
                      {new Date(app.deadline).toLocaleDateString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Notification Subscription Section */}
      <Card style={{ 
        padding: 32, 
        marginTop: 24,
        background: 'linear-gradient(135deg, var(--green-50), var(--emerald-50))',
        borderLeft: '4px solid var(--green-600)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--green-900)', marginBottom: 12 }}>
              🔔 Stay Updated - Subscribe to Notifications
            </h3>
            <p style={{ fontSize: 14, color: 'var(--green-800)', lineHeight: 1.8, marginBottom: 16 }}>
              Never miss an important deadline again! Subscribe to receive:
            </p>
            <ul style={{ fontSize: 13, color: 'var(--green-800)', lineHeight: 2, marginBottom: 16 }}>
              <li>📧 Email reminders when deadlines are approaching (2 weeks, 1 week, 3 days)</li>
              <li>🎉 Notifications when your child receives an award or successful offer</li>
              <li>📊 Weekly summary of application status and progress</li>
              <li>💬 Milestone alerts (first application, first award, etc.)</li>
              <li>⚡ Urgent alerts for critical deadline extensions or changes</li>
            </ul>
            <p style={{ fontSize: 12, color: 'var(--green-700)', fontStyle: 'italic' }}>
              Customize your notification preferences anytime. We'll never spam you - only important updates about your child's opportunities!
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button style={{
              padding: '16px 24px',
              background: 'var(--green-600)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'all .2s',
            }}
            onMouseOver={(e) => e.target.style.background = 'var(--green-700)'}
            onMouseOut={(e) => e.target.style.background = 'var(--green-600)'}
            >
              🔔 Subscribe Now
            </button>
            <p style={{ fontSize: 12, color: 'var(--green-700)', textAlign: 'center' }}>
              ✓ Already subscribed
            </p>
          </div>
        </div>
      </Card>
    </AppShell>
  )
}
