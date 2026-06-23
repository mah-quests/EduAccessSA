import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--green-900), var(--green-700))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'rgba(255,255,255,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, margin: '0 auto 16px',
          }}>🎓</div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 24, letterSpacing: '-.02em' }}>
            Welcome back
          </h1>
          <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, marginTop: 6 }}>
            Sign in to continue your journey
          </p>
        </div>

        <Card style={{ padding: 32 }}>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Input
              label="Email address"
              type="email"
              name="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={handle}
              icon="✉️"
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handle}
              icon="🔒"
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: 13, color: 'var(--green-700)', cursor: 'pointer', fontWeight: 600 }}>
                Forgot password?
              </span>
            </div>
            <Button type="submit" variant="primary" size="lg" fullWidth>
              Sign In
            </Button>
          </form>

          <div style={{
            marginTop: 24, paddingTop: 24,
            borderTop: '1px solid var(--gray-200)',
            textAlign: 'center',
            fontSize: 14, color: 'var(--gray-600)',
          }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--green-700)', fontWeight: 700 }}>
              Create one free
            </Link>
          </div>
        </Card>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'rgba(255,255,255,.6)', fontSize: 13 }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,.8)' }}>← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
