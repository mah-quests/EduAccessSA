import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

const provinces = ['Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Limpopo','Mpumalanga','North West','Free State','Northern Cape']
const interests = ['Engineering','Technology','Medicine','Law','Business','Education','Science','Arts','Agriculture','Social Work','Architecture','Finance']

const steps = ['Account', 'Profile', 'Interests']

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState([])
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    grade: '12', province: 'Gauteng', school: '',
    average: '', mathMark: '', scienceMark: '',
  })

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const toggleInterest = i => {
    setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  const next = () => {
    if (step < steps.length - 1) setStep(s => s + 1)
    else navigate('/matches', {
      state: {
        user: {
          name: form.name || 'Student',
          averageMark: Number(form.average) || 72,
          province: form.province || 'Gauteng',
          interests: selected.length > 0 ? selected : ['Engineering'],
        }
      }
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--green-900), var(--green-700))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 520 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🎓</div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 26, letterSpacing: '-.02em' }}>
            EduAccess<span style={{ color: 'var(--gold-400)' }}> SA</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.7)', marginTop: 6, fontSize: 15 }}>
            Create your free profile — find the opportunities you deserve
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: i <= step ? 'var(--gold-400)' : 'rgba(255,255,255,.2)',
                color: i <= step ? '#1a1a1a' : 'rgba(255,255,255,.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 14,
                transition: 'background .2s',
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: i === step ? '#fff' : 'rgba(255,255,255,.5)' }}>
                {s}
              </span>
              {i < steps.length - 1 && (
                <div style={{ width: 32, height: 2, background: i < step ? 'var(--gold-400)' : 'rgba(255,255,255,.2)', borderRadius: 99 }} />
              )}
            </div>
          ))}
        </div>

        <Card style={{ padding: 32 }}>
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-900)' }}>Create your account</h2>
              <Input label="Full name" name="name" placeholder="Thabo Mokoena" value={form.name} onChange={handle} required />
              <Input label="Email address" type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handle} required />
              <Input label="Password" type="password" name="password" placeholder="At least 8 characters" value={form.password} onChange={handle} required />
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-900)' }}>Your academic profile</h2>
              <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: -12 }}>
                This helps us match you to the right opportunities.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Input label="Current grade" name="grade" as="select" value={form.grade} onChange={handle}>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                  <option value="matric">Matric pass</option>
                </Input>
                <Input label="Province" name="province" as="select" value={form.province} onChange={handle}>
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </Input>
              </div>
              <Input label="School name" name="school" placeholder="e.g. Soweto High School" value={form.school} onChange={handle} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <Input label="Overall average (%)" type="number" name="average" placeholder="72" value={form.average} onChange={handle} />
                <Input label="Maths mark (%)" type="number" name="mathMark" placeholder="78" value={form.mathMark} onChange={handle} />
                <Input label="Science mark (%)" type="number" name="scienceMark" placeholder="71" value={form.scienceMark} onChange={handle} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-900)' }}>What are you interested in?</h2>
              <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: -12 }}>
                Select all that apply. We'll use this to surface relevant opportunities.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {interests.map(i => {
                  const active = selected.includes(i)
                  return (
                    <button
                      key={i}
                      onClick={() => toggleInterest(i)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: 99,
                        border: `2px solid ${active ? 'var(--green-600)' : 'var(--gray-300)'}`,
                        background: active ? 'var(--green-50)' : '#fff',
                        color: active ? 'var(--green-800)' : 'var(--gray-700)',
                        fontWeight: 600, fontSize: 14,
                        cursor: 'pointer', transition: 'all .15s',
                      }}
                    >
                      {active && '✓ '}{i}
                    </button>
                  )
                })}
              </div>
              <div style={{ background: 'var(--green-50)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
                <p style={{ fontSize: 14, color: 'var(--green-800)' }}>
                  <strong>🎯 Based on your profile,</strong> we've found opportunities that match your grades and interests. Complete registration to see them.
                </p>
              </div>
            </div>
          )}

          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            {step > 0
              ? <Button variant="ghost" onClick={() => setStep(s => s - 1)}>← Back</Button>
              : <div />
            }
            <Button variant="primary" onClick={next}>
              {step < steps.length - 1 ? 'Continue →' : '🚀 Find My Opportunities'}
            </Button>
          </div>
        </Card>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'rgba(255,255,255,.6)', fontSize: 13 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'rgba(255,255,255,.9)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
