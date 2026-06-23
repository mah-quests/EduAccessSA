import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { opportunities } from '../data/mockData'

const typeColors = { Bursary: 'green', University: 'blue', TVET: 'amber' }
const statusColors = { Open: 'green', 'Closing Soon': 'red' }

const daysUntil = deadline => Math.ceil((new Date(deadline) - new Date()) / 86400000)

export default function Discover() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [minMark, setMinMark] = useState('')
  const [matchedOnly, setMatchedOnly] = useState(false)

  const types = ['All', 'Bursary', 'University', 'TVET']

  const filtered = opportunities.filter(o => {
    const q = search.toLowerCase()
    const matchSearch = !q || o.title.toLowerCase().includes(q) || o.provider.toLowerCase().includes(q) || o.fields.some(f => f.toLowerCase().includes(q))
    const matchType = typeFilter === 'All' || o.type === typeFilter
    const matchMark = !minMark || o.minMark <= Number(minMark)
    const matchMatch = !matchedOnly || o.matched
    return matchSearch && matchType && matchMark && matchMatch
  })

  return (
    <AppShell>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-.02em' }}>
          Discover Opportunities
        </h1>
        <p style={{ fontSize: 16, color: 'var(--gray-600)', marginTop: 6 }}>
          Bursaries, universities and TVET colleges — all in one place.
        </p>
      </div>

      {/* Search & Filters */}
      <Card style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, alignItems: 'flex-end' }}>
          <Input
            placeholder="Search by name, provider or field..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            icon="🔍"
          />
          <Input
            placeholder="Your average mark (%)"
            type="number"
            value={minMark}
            onChange={e => setMinMark(e.target.value)}
            icon="📊"
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 42, paddingTop: 2 }}>
            <label style={{
              display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--gray-700)',
            }}>
              <input
                type="checkbox"
                checked={matchedOnly}
                onChange={e => setMatchedOnly(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--green-600)' }}
              />
              Matched for me only
            </label>
          </div>
        </div>

        {/* Type tabs */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              style={{
                padding: '6px 18px',
                borderRadius: 99,
                border: `2px solid ${typeFilter === t ? 'var(--green-600)' : 'var(--gray-300)'}`,
                background: typeFilter === t ? 'var(--green-600)' : '#fff',
                color: typeFilter === t ? '#fff' : 'var(--gray-600)',
                fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all .15s',
              }}
            >
              {t}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 14, color: 'var(--gray-500)', alignSelf: 'center' }}>
            {filtered.length} results
          </span>
        </div>
      </Card>

      {/* Results grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {filtered.map(opp => {
          const days = daysUntil(opp.deadline)
          return (
            <Card
              key={opp.id}
              onClick={() => navigate(`/opportunities/${opp.id}`)}
              style={{ padding: 24 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ fontSize: 32, width: 52, height: 52, background: 'var(--gray-50)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--gray-200)' }}>
                    {opp.logo}
                  </div>
                  <div>
                    <Badge variant={typeColors[opp.type]}>{opp.type}</Badge>
                    {opp.matched && (
                      <Badge variant="green" style={{ marginLeft: 6, fontSize: 11 }}>✓ Matched</Badge>
                    )}
                  </div>
                </div>
                <Badge variant={statusColors[opp.status]}>{opp.status}</Badge>
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>{opp.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 12 }}>{opp.provider}</p>

              <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.5, marginBottom: 16 }}>
                {opp.description.slice(0, 110)}...
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {opp.tags.map(tag => <Badge key={tag} variant="gray">{tag}</Badge>)}
              </div>

              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: 16, borderTop: '1px solid var(--gray-100)',
              }}>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>Value</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-700)' }}>{opp.value}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>Deadline</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: days <= 30 ? 'var(--red-600)' : 'var(--gray-700)' }}>
                    {days <= 30 ? `⚠️ ${days} days` : opp.deadline}
                  </p>
                </div>
                <Button variant="primary" size="sm">View Details →</Button>
              </div>
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--gray-500)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No results found</h3>
          <p style={{ fontSize: 15 }}>Try adjusting your search or filters.</p>
        </div>
      )}
    </AppShell>
  )
}
