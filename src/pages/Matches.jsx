import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { matchOpportunities } from '../utils/matching'
import { opportunities } from '../data/mockData'

const typeColors = { Bursary: 'green', University: 'blue', TVET: 'amber' }

export default function Matches() {
  const navigate = useNavigate()
  const location = useLocation()

  const user = location.state?.user || {
    name: 'Thabo Mokoena',
    averageMark: 72,
    province: 'Gauteng',
    interests: ['Engineering', 'Technology', 'Mathematics'],
  }

  const matched = matchOpportunities(user, opportunities).filter(o => o.matched)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray-50)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--green-900), var(--green-700))',
        padding: '48px 24px 80px',
        textAlign: 'center',
        color: '#fff',
      }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🎯</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', marginBottom: 12 }}>
          We found <span style={{ color: 'var(--gold-400)' }}>{matched.length} opportunities</span> for you
        </h1>
        <p style={{ fontSize: 17, opacity: .85, maxWidth: 480, margin: '0 auto' }}>
          Based on your {user.averageMark}% average and interests in {user.interests.slice(0, 2).join(' & ')} — here's what you qualify for right now.
        </p>
      </div>

      {/* Cards pulled up over the header */}
      <div style={{ maxWidth: 800, margin: '-40px auto 0', padding: '0 24px 48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {matched.map((opp, i) => (
            <Card key={opp.id} style={{ padding: 24, border: i === 0 ? '2px solid var(--green-500)' : undefined }}>
              {i === 0 && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'var(--green-600)', color: '#fff',
                  fontSize: 12, fontWeight: 700, padding: '4px 12px',
                  borderRadius: 99, marginBottom: 12,
                }}>
                  ⭐ Best Match
                </div>
              )}
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 32, width: 52, height: 52, background: 'var(--green-50)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {opp.logo}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                    <Badge variant={typeColors[opp.type]}>{opp.type}</Badge>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-600)' }}>
                      {opp.matchScore}% match
                    </span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 2 }}>{opp.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 12 }}>{opp.provider}</p>

                  {/* Why you match */}
                  <div style={{ background: 'var(--green-50)', borderRadius: 8, padding: '10px 14px', marginBottom: 12 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-800)', marginBottom: 6 }}>Why you match:</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {opp.matchReasons.map((r, ri) => (
                        <li key={ri} style={{ fontSize: 13, color: 'var(--green-700)', display: 'flex', gap: 8 }}>
                          <span>✓</span><span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div>
                        <p style={{ fontSize: 11, color: 'var(--gray-400)' }}>Value</p>
                        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-700)' }}>{opp.value}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: 11, color: 'var(--gray-400)' }}>Deadline</p>
                        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-700)' }}>{opp.deadline}</p>
                      </div>
                    </div>
                    <Button variant="primary" size="sm" onClick={() => navigate(`/opportunities/${opp.id}`)}>
                      View & Apply →
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button variant="primary" size="lg" onClick={() => navigate('/dashboard')}>
            Go to My Dashboard →
          </Button>
          <Button variant="ghost" size="lg" onClick={() => navigate('/discover')}>
            Browse All Opportunities
          </Button>
        </div>
      </div>
    </div>
  )
}
