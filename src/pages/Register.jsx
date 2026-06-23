import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

const provinces = ['Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Limpopo','Mpumalanga','North West','Free State','Northern Cape']
const interests = ['Engineering','Technology','Medicine','Law','Business','Education','Science','Arts','Agriculture','Social Work','Architecture','Finance']
const grades = ['Grade 10','Grade 11','Grade 12','Matric pass']

const studentSteps = ['Account', 'Profile', 'Interests']
const counsellorSteps = ['Account', 'School Details']

function RoleCard({ icon, title, desc, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `2px solid ${hovered ? 'var(--gold-400)' : 'transparent'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '24px 28px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'border-color .15s, box-shadow .15s',
        boxShadow: hovered ? '0 0 0 4px rgba(250,204,21,.25)' : 'none',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          fontSize: 34, width: 58, height: 58,
          background: 'var(--green-50)', borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 800, fontSize: 17, color: 'var(--gray-900)' }}>{title}</p>
          <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 4, lineHeight: 1.5 }}>{desc}</p>
        </div>
        <div style={{ fontSize: 22, color: 'var(--gray-300)', flexShrink: 0 }}>›</div>
      </div>
    </button>
  )
}

function StepBar({ steps, step }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: i <= step ? 'var(--gold-400)' : 'rgba(255,255,255,.2)',
            color: i <= step ? '#1a1a1a' : 'rgba(255,255,255,.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 14, transition: 'background .2s',
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
  )
}

export default function Register() {
  const navigate = useNavigate()
  const [role, setRole] = useState(null)
  const [step, setStep] = useState(0)
  const [selectedInterests, setSelectedInterests] = useState([])
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    grade: 'Grade 12', province: 'Gauteng', school: '',
    average: '', mathMark: '', scienceMark: '',
    counsellorSchool: '', counsellorProvince: 'Gauteng',
    gradesManaged: 'Grade 12', phone: '',
  })

  const steps = role === 'counsellor' ? counsellorSteps : studentSteps

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const toggleInterest = i => setSelectedInterests(prev =>
    prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
  )

  const next = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1)
    } else if (role === 'counsellor') {
      navigate('/counsellor-dashboard')
    } else {
      navigate('/matches', {
        state: {
          user: {
            name: form.name || 'Student',
            averageMark: Number(form.average) || 72,
            province: form.province || 'Gauteng',
            interests: selectedInterests.length > 0 ? selectedInterests : ['Engineering'],
          }
        }
      })
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--green-600), var(--green-700))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 540 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🎓</div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 26, letterSpacing: '-.02em' }}>
            EduAccess<span style={{ color: 'var(--gold-400)' }}> SA</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.7)', marginTop: 6, fontSize: 15 }}>
            {role === null
              ? 'One platform to access every opportunity — who are you?'
              : 'Create your free account'}
          </p>
        </div>

        {/* Role selection */}
        {role === null && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <RoleCard
              icon="🎒"
              title="Learner / Student"
              desc="Discover bursaries, universities, and TVET programmes matched to your grades and interests — never miss a deadline again."
              onClick={() => setRole('student')}
            />
            <RoleCard
              icon="🧑‍🏫"
              title="School Counsellor"
              desc="Register your whole class and guide every learner through applications. See who's on track, who needs help, and what's closing soon — all in one place."
              onClick={() => setRole('counsellor')}
            />
            <p style={{ textAlign: 'center', marginTop: 6, color: 'rgba(255,255,255,.6)', fontSize: 13 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'rgba(255,255,255,.9)', fontWeight: 600 }}>Sign in</Link>
            </p>
          </div>
        )}

        {/* Multi-step form */}
        {role !== null && (
          <>
            <StepBar steps={steps} step={step} />

            <Card style={{ padding: 32 }}>

              {/* Student — step 0: Account */}
              {role === 'student' && step === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-900)' }}>Create your account</h2>
                  <Input label="Full name" name="name" placeholder="Thabo Mokoena" value={form.name} onChange={handle} required />
                  <Input label="Email address" type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handle} required />
                  <Input label="Password" type="password" name="password" placeholder="At least 8 characters" value={form.password} onChange={handle} required />
                </div>
              )}

              {/* Student — step 1: Profile */}
              {role === 'student' && step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-900)' }}>Your academic profile</h2>
                  <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: -12 }}>
                    This helps us match you to the right opportunities — no more hunting across dozens of sites.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Input label="Current grade" name="grade" as="select" value={form.grade} onChange={handle}>
                      {grades.map(g => <option key={g}>{g}</option>)}
                    </Input>
                    <Input label="Province" name="province" as="select" value={form.province} onChange={handle}>
                      {provinces.map(p => <option key={p}>{p}</option>)}
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

              {/* Student — step 2: Interests */}
              {role === 'student' && step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-900)' }}>What are you interested in?</h2>
                  <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: -12 }}>
                    Select all that apply. We'll surface opportunities matched to you.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {interests.map(i => {
                      const active = selectedInterests.includes(i)
                      return (
                        <button
                          key={i}
                          onClick={() => toggleInterest(i)}
                          style={{
                            padding: '8px 18px', borderRadius: 99,
                            border: `2px solid ${active ? 'var(--green-600)' : 'var(--gray-300)'}`,
                            background: active ? 'var(--green-50)' : '#fff',
                            color: active ? 'var(--green-800)' : 'var(--gray-700)',
                            fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all .15s',
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

              {/* Counsellor — step 0: Account */}
              {role === 'counsellor' && step === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-900)' }}>Create your counsellor account</h2>
                  <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: -12 }}>
                    You'll use these details to log in and manage your learners.
                  </p>
                  <Input label="Full name" name="name" placeholder="Ms Nomsa Dlamini" value={form.name} onChange={handle} required />
                  <Input label="Email address" type="email" name="email" placeholder="you@school.edu.za" value={form.email} onChange={handle} required />
                  <Input label="Password" type="password" name="password" placeholder="At least 8 characters" value={form.password} onChange={handle} required />
                </div>
              )}

              {/* Counsellor — step 1: School Details */}
              {role === 'counsellor' && step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-900)' }}>Your school details</h2>
                  <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: -12 }}>
                    This links your account to your school so you can register and guide your learners.
                  </p>
                  <Input label="School name" name="counsellorSchool" placeholder="e.g. Soweto High School" value={form.counsellorSchool} onChange={handle} required />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Input label="Province" name="counsellorProvince" as="select" value={form.counsellorProvince} onChange={handle}>
                      {provinces.map(p => <option key={p}>{p}</option>)}
                    </Input>
                    <Input label="Contact number" name="phone" placeholder="071 234 5678" value={form.phone} onChange={handle} />
                  </div>
                  <Input label="Grades you counsel" name="gradesManaged" as="select" value={form.gradesManaged} onChange={handle}>
                    <option>Grade 12</option>
                    <option>Grade 11</option>
                    <option>Grade 10</option>
                    <option>Grades 10–12</option>
                  </Input>
                  <div style={{ background: 'var(--green-50)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
                    <p style={{ fontSize: 14, color: 'var(--green-800)', lineHeight: 1.6 }}>
                      <strong>🧑‍🏫 After registering</strong> you can add your whole class, track each learner's application progress, and see who is at risk of missing a deadline — all from one dashboard.
                    </p>
                  </div>
                </div>
              )}

              {/* Nav buttons */}
              <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <Button variant="ghost" onClick={() => step > 0 ? setStep(s => s - 1) : setRole(null)}>
                  ← Back
                </Button>
                <Button variant="primary" onClick={next}>
                  {step < steps.length - 1
                    ? 'Continue →'
                    : role === 'counsellor'
                      ? '🧑‍🏫 Go to My Dashboard'
                      : '🚀 Find My Opportunities'}
                </Button>
              </div>
            </Card>

            <p style={{ textAlign: 'center', marginTop: 20, color: 'rgba(255,255,255,.6)', fontSize: 13 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'rgba(255,255,255,.9)', fontWeight: 600 }}>Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
