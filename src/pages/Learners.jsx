import { useState } from 'react'
import CounsellorShell from '../components/layout/CounsellorShell'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { managedLearners } from '../data/mockData'

const provinces = ['Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Limpopo','Mpumalanga','North West','Free State','Northern Cape']

const statusVariant = {
  'Successful': 'green',
  'Under Review': 'amber',
  'Applied': 'blue',
  'Saved': 'gray',
  'Not Started': 'red',
}

const ALL_STATUSES = ['All', 'Not Started', 'Saved', 'Applied', 'Under Review', 'Successful']

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function markColor(mark) {
  if (mark >= 75) return 'var(--green-600)'
  if (mark >= 50) return 'var(--amber-600)'
  return 'var(--red-600)'
}

// ── Add Learner modal ────────────────────────────────────────────────────────

function AddLearnerModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: '', email: '', grade: '12',
    province: 'Gauteng', school: '', averageMark: '',
  })
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = () => {
    if (!form.name.trim() || !form.averageMark) return
    onAdd({
      id: `l-${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      grade: form.grade,
      province: form.province,
      averageMark: Number(form.averageMark),
      interests: [],
      applicationsCount: 0,
      matchedCount: 0,
      latestStatus: 'Not Started',
      needsAttention: true,
    })
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <Card style={{ padding: 32, width: '100%', maxWidth: 480 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--gray-900)' }}>Add a Learner</h2>
            <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 4 }}>
              Register a learner so you can guide them through applications.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--gray-400)', lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Full name *" name="name" placeholder="Thabo Mokoena" value={form.name} onChange={handle} />
          <Input label="Email address" type="email" name="email" placeholder="learner@email.com" value={form.email} onChange={handle} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Input label="Grade" name="grade" as="select" value={form.grade} onChange={handle}>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </Input>
            <Input label="Province" name="province" as="select" value={form.province} onChange={handle}>
              {provinces.map(p => <option key={p}>{p}</option>)}
            </Input>
          </div>
          <Input label="School name" name="school" placeholder="e.g. Soweto High School" value={form.school} onChange={handle} />
          <Input
            label="Overall average (%) *"
            type="number" name="averageMark" placeholder="72"
            value={form.averageMark} onChange={handle}
          />

          <div style={{ background: 'var(--green-50)', borderRadius: 'var(--radius-md)', padding: '14px 18px' }}>
            <p style={{ fontSize: 13, color: 'var(--green-800)' }}>
              Once added, EduAccess SA will automatically match this learner to eligible bursaries, universities, and TVET programmes based on their marks.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={submit}>✓ Add Learner</Button>
        </div>
      </Card>
    </div>
  )
}

// ── Learner detail expand panel ──────────────────────────────────────────────

function LearnerDetail({ learner }) {
  return (
    <div style={{
      padding: '16px 24px 20px',
      background: 'var(--gray-50)',
      borderTop: '1px solid var(--gray-200)',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 6 }}>
            Contact
          </p>
          <p style={{ fontSize: 14, color: 'var(--gray-700)' }}>{learner.email || '—'}</p>
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 6 }}>
            Interests
          </p>
          {learner.interests.length > 0
            ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {learner.interests.map(i => (
                  <Badge key={i} variant="green" style={{ fontSize: 12 }}>{i}</Badge>
                ))}
              </div>
            : <p style={{ fontSize: 14, color: 'var(--gray-400)' }}>Not set</p>
          }
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 6 }}>
            Matched Opportunities
          </p>
          <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--green-700)' }}>
            {learner.matchedCount}
          </p>
        </div>
      </div>

      {learner.needsAttention && (
        <div style={{
          marginTop: 14, padding: '10px 16px',
          background: 'var(--amber-100)',
          borderRadius: 'var(--radius-md)',
          borderLeft: '3px solid var(--amber-600)',
        }}>
          <p style={{ fontSize: 13, color: '#92400e', fontWeight: 600 }}>
            ⚠️ This learner hasn't started any applications. Follow up before upcoming deadlines close.
          </p>
        </div>
      )}
    </div>
  )
}

// ── Main Learners page ───────────────────────────────────────────────────────

export default function Learners() {
  const [learners, setLearners] = useState(managedLearners)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [expandedId, setExpandedId] = useState(null)

  const addLearner = newLearner => {
    setLearners(prev => [...prev, newLearner])
  }

  const filtered = learners.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || l.latestStatus === statusFilter
    return matchSearch && matchStatus
  })

  const attentionCount = learners.filter(l => l.needsAttention).length

  return (
    <CounsellorShell>

      {/* Page header */}
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-.02em' }}>
            My Learners
          </h1>
          <p style={{ fontSize: 16, color: 'var(--gray-600)', marginTop: 6 }}>
            {learners.length} learner{learners.length !== 1 ? 's' : ''} registered
            {attentionCount > 0 && (
              <span style={{ marginLeft: 10, fontSize: 14, fontWeight: 700, color: 'var(--amber-600)' }}>
                · {attentionCount} need{attentionCount === 1 ? 's' : ''} attention
              </span>
            )}
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Add Learner
        </Button>
      </div>

      {/* Summary tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Not Started', color: 'var(--red-600)', bg: 'var(--red-100)', count: learners.filter(l => l.latestStatus === 'Not Started').length },
          { label: 'In Progress', color: 'var(--amber-600)', bg: 'var(--amber-100)', count: learners.filter(l => ['Saved','Applied'].includes(l.latestStatus)).length },
          { label: 'Under Review', color: 'var(--blue-600)', bg: 'var(--blue-100)', count: learners.filter(l => l.latestStatus === 'Under Review').length },
          { label: 'Successful', color: 'var(--green-600)', bg: 'var(--green-50)', count: learners.filter(l => l.latestStatus === 'Successful').length },
        ].map(t => (
          <Card key={t.label} style={{ padding: '16px 20px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
              {t.label}
            </p>
            <p style={{ fontSize: 32, fontWeight: 800, color: t.color, marginTop: 6 }}>{t.count}</p>
          </Card>
        ))}
      </div>

      {/* Search + filter */}
      <Card style={{ padding: '18px 24px', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <Input
              placeholder="Search learners by name…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ marginBottom: 0 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {ALL_STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  padding: '6px 14px', borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  border: `1.5px solid ${statusFilter === s ? 'var(--green-600)' : 'var(--gray-300)'}`,
                  background: statusFilter === s ? 'var(--green-50)' : '#fff',
                  color: statusFilter === s ? 'var(--green-800)' : 'var(--gray-600)',
                  transition: 'all .15s',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Learner list */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>

        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 80px 90px 130px 100px 50px',
          gap: 12, padding: '14px 24px',
          background: 'var(--gray-50)',
          borderBottom: '1px solid var(--gray-200)',
        }}>
          {['Learner', 'Grade', 'Average', 'Status', 'Applications', ''].map(h => (
            <span key={h} style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
              {h}
            </span>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>🔍</p>
            <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--gray-700)' }}>No learners found</p>
            <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 4 }}>
              Try adjusting your search or filter, or add a new learner.
            </p>
            <Button variant="primary" style={{ marginTop: 20 }} onClick={() => setShowModal(true)}>
              + Add Learner
            </Button>
          </div>
        ) : (
          filtered.map((learner, idx) => {
            const expanded = expandedId === learner.id
            const isLast = idx === filtered.length - 1
            return (
              <div key={learner.id} style={{ borderBottom: isLast ? 'none' : '1px solid var(--gray-100)' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 80px 90px 130px 100px 50px',
                    gap: 12, padding: '14px 24px',
                    cursor: 'pointer', transition: 'background .15s',
                    alignItems: 'center',
                  }}
                  onMouseEnter={e => { if (!expanded) e.currentTarget.style.background = 'var(--gray-50)' }}
                  onMouseLeave={e => { if (!expanded) e.currentTarget.style.background = 'transparent' }}
                  onClick={() => setExpandedId(expanded ? null : learner.id)}
                >
                  {/* Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: learner.needsAttention
                        ? 'linear-gradient(135deg, #f59e0b, var(--amber-600))'
                        : 'linear-gradient(135deg, var(--green-500), var(--green-700))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: 13,
                    }}>
                      {initials(learner.name)}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 15, color: 'var(--gray-900)' }}>{learner.name}</p>
                      {learner.needsAttention && (
                        <p style={{ fontSize: 11, color: 'var(--amber-600)', fontWeight: 700 }}>Needs attention</p>
                      )}
                    </div>
                  </div>

                  <span style={{ fontSize: 14, color: 'var(--gray-600)' }}>Grade {learner.grade}</span>

                  <span style={{ fontSize: 15, fontWeight: 800, color: markColor(learner.averageMark) }}>
                    {learner.averageMark}%
                  </span>

                  <Badge variant={statusVariant[learner.latestStatus] || 'gray'}>
                    {learner.latestStatus}
                  </Badge>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontSize: 18, fontWeight: 800,
                      color: learner.applicationsCount === 0 ? 'var(--red-600)' : 'var(--gray-800)',
                    }}>
                      {learner.applicationsCount}
                    </span>
                    {learner.applicationsCount > 0 && (
                      <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>apps</span>
                    )}
                  </div>

                  <span style={{ fontSize: 18, color: 'var(--gray-400)', textAlign: 'center', userSelect: 'none' }}>
                    {expanded ? '▲' : '▼'}
                  </span>
                </div>

                {expanded && <LearnerDetail learner={learner} />}
              </div>
            )
          })
        )}
      </Card>

      {learners.length === 0 && (
        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>👥</p>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--gray-800)', marginBottom: 8 }}>
            No learners registered yet
          </h2>
          <p style={{ fontSize: 16, color: 'var(--gray-500)', maxWidth: 440, margin: '0 auto 24px' }}>
            Add your learners so you can track their applications and make sure no one misses a deadline.
          </p>
          <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
            + Add Your First Learner
          </Button>
        </div>
      )}

      {showModal && (
        <AddLearnerModal
          onClose={() => setShowModal(false)}
          onAdd={addLearner}
        />
      )}
    </CounsellorShell>
  )
}
