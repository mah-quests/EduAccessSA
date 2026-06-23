import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const features = [
  {
    icon: '🔍',
    title: 'Aggregate',
    desc: 'All bursaries, universities & TVET opportunities in one searchable hub — no more hunting across dozens of sites.',
  },
  {
    icon: '🎯',
    title: 'Smart Matching',
    desc: 'We surface only the opportunities you actually qualify for, based on your grades, interests and goals.',
  },
  {
    icon: '🔔',
    title: 'Deadline Reminders',
    desc: 'SMS & email alerts before every closing date so you never lose out because you heard about it too late.',
  },
  {
    icon: '📋',
    title: 'Application Tracking',
    desc: 'Follow each application from saved through to outcome — all in one place.',
  },
]

const problems = [
  { icon: '📄', title: 'Scattered & Hidden', desc: 'Bursaries and study options spread across dozens of unconnected websites and PDFs.' },
  { icon: '⏰', title: 'Missed Deadlines', desc: 'Learners lose out every year simply because they never heard about a closing date in time.' },
  { icon: '🌍', title: 'Unequal Awareness', desc: 'Rural and under-resourced learners have the least access to reliable, up-to-date information.' },
]

const stats = [
  { value: '100%', label: 'Opportunities in one place' },
  { value: '48+', label: 'Active bursaries & programmes' },
  { value: '6', label: 'Stakeholder groups served' },
  { value: '0', label: 'Missed deadlines — the goal' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Top nav */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--gray-200)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, var(--green-600), var(--green-800))',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>🎓</div>
            <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--green-800)', letterSpacing: '-.02em' }}>
              EduAccess<span style={{ color: 'var(--gold-500)' }}> SA</span>
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Sign In</Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/register')}>Get Started Free</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, var(--green-900) 0%, var(--green-700) 60%, var(--green-600) 100%)',
        color: '#fff',
        padding: '100px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,.15)',
            border: '1px solid rgba(255,255,255,.3)',
            borderRadius: 99, padding: '6px 16px',
            fontSize: 13, fontWeight: 600, marginBottom: 28,
            backdropFilter: 'blur(4px)',
          }}>
            🇿🇦 Built for South African learners
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 60px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-.03em',
          }}>
            Never miss the opportunity<br />
            <span style={{ color: 'var(--gold-400)' }}>that changes your future.</span>
          </h1>
          <p style={{ fontSize: 18, opacity: .85, lineHeight: 1.7, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            One platform to discover bursaries, universities and TVET colleges — matched to you, with deadline reminders and application tracking.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="gold" size="lg" onClick={() => navigate('/register')}>
              🚀 Find My Opportunities
            </Button>
            <Button
              size="lg"
              style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.4)' }}
              onClick={() => navigate('/discover')}
            >
              Browse All Opportunities
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--green-800)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', color: '#fff' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--gold-400)', letterSpacing: '-.03em' }}>{s.value}</div>
              <div style={{ fontSize: 13, opacity: .8, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section style={{ padding: '80px 24px', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 16, letterSpacing: '-.02em' }}>
              The Problem
            </h2>
            <p style={{ fontSize: 17, color: 'var(--gray-600)', maxWidth: 560, margin: '0 auto' }}>
              Opportunities exist — but learners can't find them in time.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {problems.map(p => (
              <Card key={p.title} style={{ padding: 28 }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: 'var(--gray-900)' }}>{p.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.6 }}>{p.desc}</p>
              </Card>
            ))}
          </div>
          <div style={{
            marginTop: 32,
            padding: '20px 28px',
            background: 'var(--red-100)',
            borderRadius: 'var(--radius-lg)',
            borderLeft: '4px solid var(--red-600)',
          }}>
            <p style={{ fontSize: 16, color: '#991b1b', fontWeight: 500 }}>
              <strong>The cost:</strong> qualified students stay unfunded and out of study — a loss to them and to South Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 16, letterSpacing: '-.02em' }}>
              Our Solution
            </h2>
            <p style={{ fontSize: 17, color: 'var(--gray-600)', maxWidth: 560, margin: '0 auto' }}>
              EduAccess SA brings every opportunity into one place — and gets it to the right learner, on time.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {features.map(f => (
              <Card key={f.title} style={{ padding: 28, display: 'flex', gap: 20 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'var(--green-50)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: 'var(--gray-900)' }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, var(--green-900), var(--green-700))',
        color: '#fff',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, letterSpacing: '-.02em' }}>
          Every learner deserves to know<br />
          <span style={{ color: 'var(--gold-400)' }}>the opportunity is there.</span>
        </h2>
        <p style={{ fontSize: 17, opacity: .8, marginBottom: 36 }}>
          EduAccess SA — aggregate, match, remind, track.
        </p>
        <Button variant="gold" size="lg" onClick={() => navigate('/register')}>
          Create Your Free Profile
        </Button>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--gray-900)', color: 'var(--gray-400)', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 14 }}>© 2026 EduAccess SA. Built to widen access to education in South Africa.</p>
      </footer>
    </div>
  )
}
