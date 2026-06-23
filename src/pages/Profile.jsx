import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { currentUser } from '../data/mockData'

const tabs = ['Overview', 'Academic', 'Goals & Interests']

export default function Profile() {
  const [tab, setTab] = useState('Overview')
  const [editing, setEditing] = useState(false)

  return (
    <AppShell>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-.02em' }}>
          My Profile
        </h1>
        <p style={{ fontSize: 16, color: 'var(--gray-600)', marginTop: 6 }}>
          Your profile powers your matches — keep it up to date.
        </p>
      </div>

      {/* Profile header */}
      <Card style={{ padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--green-500), var(--green-700))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 28, flexShrink: 0,
          }}>
            TM
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--gray-900)' }}>{currentUser.name}</h2>
            <p style={{ fontSize: 15, color: 'var(--gray-500)', marginTop: 4 }}>
              Grade {currentUser.grade} · {currentUser.school} · {currentUser.province}
            </p>
            <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 2 }}>{currentUser.email}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--green-600)', letterSpacing: '-.03em' }}>
              {currentUser.averageMark}%
            </div>
            <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>Overall average</p>
          </div>
          <Button variant={editing ? 'primary' : 'secondary'} onClick={() => setEditing(e => !e)}>
            {editing ? '💾 Save Changes' : '✏️ Edit Profile'}
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid var(--gray-200)', paddingBottom: 0 }}>
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '10px 20px',
              border: 'none', background: 'none',
              fontWeight: 600, fontSize: 15,
              color: tab === t ? 'var(--green-700)' : 'var(--gray-500)',
              borderBottom: `2px solid ${tab === t ? 'var(--green-600)' : 'transparent'}`,
              cursor: 'pointer', transition: 'all .15s',
              marginBottom: -1,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Card style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Personal Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Full Name', value: currentUser.name },
                { label: 'Email', value: currentUser.email },
                { label: 'Province', value: currentUser.province },
                { label: 'School', value: currentUser.school },
                { label: 'Grade', value: `Grade ${currentUser.grade}` },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid var(--gray-100)' }}>
                  <span style={{ fontSize: 14, color: 'var(--gray-500)' }}>{row.label}</span>
                  {editing
                    ? <input defaultValue={row.value} style={{ fontSize: 14, fontWeight: 600, border: '1px solid var(--gray-300)', borderRadius: 6, padding: '2px 8px' }} />
                    : <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-900)' }}>{row.value}</span>
                  }
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Match Score</h3>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', padding: '20px 0', gap: 12,
            }}>
              <div style={{
                width: 100, height: 100,
                borderRadius: '50%',
                background: `conic-gradient(var(--green-500) ${currentUser.averageMark * 3.6}deg, var(--gray-200) 0)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 76, height: 76, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--green-600)' }}>{currentUser.averageMark}%</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--gray-600)', textAlign: 'center' }}>
                Your average qualifies you for <strong style={{ color: 'var(--green-700)' }}>12 opportunities</strong>
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Bursaries eligible', value: 8, color: 'var(--green-600)' },
                { label: 'Universities eligible', value: 6, color: 'var(--blue-600)' },
                { label: 'TVET programmes', value: 12, color: 'var(--amber-600)' },
              ].map(m => (
                <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--gray-600)' }}>{m.label}</span>
                  <span style={{ fontWeight: 700, color: m.color }}>{m.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'Academic' && (
        <Card style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Subject Marks</h3>
            <Badge variant="green">Grade 12</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {currentUser.subjects.map(s => {
              const pct = s.mark
              const color = pct >= 75 ? 'var(--green-600)' : pct >= 50 ? 'var(--amber-600)' : 'var(--red-600)'
              return (
                <div key={s.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>{s.name}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color }}>{s.mark}%</span>
                  </div>
                  <div style={{ height: 8, background: 'var(--gray-200)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99 }} />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {tab === 'Goals & Interests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card style={{ padding: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Fields of Interest</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {currentUser.interests.map(i => (
                <Badge key={i} variant="green" style={{ fontSize: 14, padding: '6px 16px' }}>{i}</Badge>
              ))}
              {editing && (
                <button style={{ padding: '6px 16px', borderRadius: 99, border: '2px dashed var(--gray-300)', background: '#fff', color: 'var(--gray-500)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                  + Add Interest
                </button>
              )}
            </div>
          </Card>

          <Card style={{ padding: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Career Goals</h3>
            {editing
              ? <Input as="textarea" value={currentUser.goals} rows={4} />
              : <p style={{ fontSize: 15, color: 'var(--gray-700)', lineHeight: 1.7 }}>{currentUser.goals}</p>
            }
          </Card>
        </div>
      )}
    </AppShell>
  )
}
