import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { dhetRegionalData, dhetNationalGoals } from '../data/mockData'

const metricOptions = [
  { key: 'uptakeRate',             label: 'Uptake Rate',        format: v => `${v.toFixed(1)}%` },
  { key: 'applicationsSubmitted',  label: 'Applications',       format: v => v.toLocaleString() },
  { key: 'bursariesAccessed',      label: 'Bursaries Accessed', format: v => v.toLocaleString() },
  { key: 'tvetEnrolments',         label: 'TVET Enrolments',    format: v => v.toLocaleString() },
  { key: 'universityApplications', label: 'University Apps',    format: v => v.toLocaleString() },
]

function getMetricValue(region, key) {
  if (key === 'uptakeRate') return (region.applicationsSubmitted / region.learnersRegistered) * 100
  return region[key]
}

function UptakePill({ rate }) {
  const color = rate >= 30 ? 'var(--green-700)' : rate >= 20 ? 'var(--amber-600)' : 'var(--red-600)'
  const bg    = rate >= 30 ? 'var(--green-50)'  : rate >= 20 ? 'var(--amber-100)' : 'var(--red-100)'
  return (
    <span style={{ fontSize: 12, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99 }}>
      {rate.toFixed(1)}%
    </span>
  )
}

export default function DHETAnalytics() {
  const [activeMetric, setActiveMetric] = useState('uptakeRate')
  const [sortDir, setSortDir] = useState('desc')

  const metric = metricOptions.find(m => m.key === activeMetric)

  const enriched = dhetRegionalData.map(r => ({
    ...r,
    uptakeRate: (r.applicationsSubmitted / r.learnersRegistered) * 100,
    metricValue: getMetricValue(r, activeMetric),
  }))

  const sorted = [...enriched].sort((a, b) =>
    sortDir === 'desc' ? b.metricValue - a.metricValue : a.metricValue - b.metricValue
  )

  const maxMetricValue = Math.max(...sorted.map(r => r.metricValue))

  const totalRegistered    = dhetRegionalData.reduce((s, r) => s + r.learnersRegistered,     0)
  const totalApplications  = dhetRegionalData.reduce((s, r) => s + r.applicationsSubmitted,  0)
  const totalBursaries     = dhetRegionalData.reduce((s, r) => s + r.bursariesAccessed,      0)
  const totalTvet          = dhetRegionalData.reduce((s, r) => s + r.tvetEnrolments,         0)
  const totalUniversity    = dhetRegionalData.reduce((s, r) => s + r.universityApplications, 0)
  const nationalUptake     = (totalApplications / totalRegistered) * 100

  const breakdownTypes = [
    { label: 'Bursaries Accessed',       icon: '🎓', total: totalBursaries,  color: 'var(--green-600)', bg: 'var(--green-50)',  metric: 'bursariesAccessed',      badgeVariant: 'green' },
    { label: 'TVET Enrolments',          icon: '🔧', total: totalTvet,       color: 'var(--amber-600)', bg: 'var(--amber-100)', metric: 'tvetEnrolments',         badgeVariant: 'amber' },
    { label: 'University Applications',  icon: '🏛️', total: totalUniversity, color: 'var(--blue-600)',  bg: 'var(--blue-100)',  metric: 'universityApplications', badgeVariant: 'blue'  },
  ]

  return (
    <AppShell>
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Badge variant="green">DHET</Badge>
            <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>Department of Higher Education and Training</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-.02em' }}>
            National Analytics Dashboard
          </h1>
          <p style={{ fontSize: 15, color: 'var(--gray-600)', marginTop: 6 }}>
            Uptake and access analytics across all nine provinces — 2026 academic year
          </p>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--gray-400)', flexShrink: 0 }}>
          <div>Last updated</div>
          <div style={{ fontWeight: 600, color: 'var(--gray-600)' }}>23 June 2026</div>
        </div>
      </div>

      {/* National goal KPI cards */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-800)', marginBottom: 14 }}>
          Progress Toward National Goals
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
          {dhetNationalGoals.map(goal => {
            const pct = Math.round((goal.current / goal.target) * 100)
            const pillColor = pct >= 90 ? 'var(--green-600)' : pct >= 70 ? 'var(--amber-600)' : 'var(--red-600)'
            const pillBg    = pct >= 90 ? 'var(--green-50)'  : pct >= 70 ? 'var(--amber-100)' : 'var(--red-100)'
            return (
              <Card key={goal.id} style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ fontSize: 20, background: goal.bg, width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {goal.icon}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: pillColor, background: pillBg, padding: '2px 8px', borderRadius: 99 }}>
                    {pct}%
                  </span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 4 }}>{goal.label}</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: goal.color, letterSpacing: '-.02em', lineHeight: 1.1 }}>
                  {goal.current.toLocaleString()}
                </p>
                <p style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3 }}>
                  Target: {goal.target.toLocaleString()}
                </p>
                <div style={{ marginTop: 10, height: 5, background: 'var(--gray-100)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: goal.color, borderRadius: 99 }} />
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Regional breakdown table */}
      <Card style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--gray-900)' }}>Regional Uptake & Access</h2>
            <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 3 }}>
              Select a metric below to rerank provinces
            </p>
          </div>
          <button
            onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
            style={{
              fontSize: 12, padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--gray-200)',
              background: '#fff', cursor: 'pointer',
              fontWeight: 600, color: 'var(--gray-600)',
            }}
          >
            {sortDir === 'desc' ? '↓ Highest first' : '↑ Lowest first'}
          </button>
        </div>

        {/* Metric selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
          {metricOptions.map(m => {
            const active = activeMetric === m.key
            return (
              <button
                key={m.key}
                onClick={() => setActiveMetric(m.key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 13, fontWeight: 600,
                  border: '1px solid',
                  borderColor: active ? 'var(--green-600)' : 'var(--gray-200)',
                  background:  active ? 'var(--green-50)'  : '#fff',
                  color:       active ? 'var(--green-700)' : 'var(--gray-600)',
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}
              >
                {m.label}
              </button>
            )
          })}
        </div>

        {/* Column headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '190px 1fr 100px 100px 110px',
          gap: 16, alignItems: 'center',
          padding: '0 0 10px',
          borderBottom: '1px solid var(--gray-200)',
          fontSize: 11, fontWeight: 700,
          color: 'var(--gray-500)',
          textTransform: 'uppercase', letterSpacing: '.05em',
        }}>
          <span>Province</span>
          <span>{metric.label}</span>
          <span style={{ textAlign: 'right' }}>Registered</span>
          <span style={{ textAlign: 'right' }}>Bursaries</span>
          <span style={{ textAlign: 'right' }}>Uptake Rate</span>
        </div>

        {/* Province rows */}
        {sorted.map((r, idx) => {
          const barPct = (r.metricValue / maxMetricValue) * 100
          return (
            <div
              key={r.province}
              style={{
                display: 'grid',
                gridTemplateColumns: '190px 1fr 100px 100px 110px',
                gap: 16, alignItems: 'center',
                padding: '11px 0',
                borderBottom: '1px solid var(--gray-100)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: '#fff',
                  background: 'var(--green-700)',
                  width: 20, height: 20, borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {idx + 1}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>{r.province}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: 8, background: 'var(--gray-100)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${barPct}%`, background: 'var(--green-600)', borderRadius: 99 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-700)', minWidth: 64, textAlign: 'right' }}>
                  {metric.format(r.metricValue)}
                </span>
              </div>

              <span style={{ fontSize: 13, color: 'var(--gray-600)', textAlign: 'right' }}>
                {r.learnersRegistered.toLocaleString()}
              </span>
              <span style={{ fontSize: 13, color: 'var(--gray-600)', textAlign: 'right' }}>
                {r.bursariesAccessed.toLocaleString()}
              </span>
              <div style={{ textAlign: 'right' }}>
                <UptakePill rate={r.uptakeRate} />
              </div>
            </div>
          )
        })}

        {/* National total row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '190px 1fr 100px 100px 110px',
          gap: 16, alignItems: 'center',
          padding: '14px 0 0',
          borderTop: '2px solid var(--gray-200)',
          marginTop: 4,
        }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--gray-900)' }}>National Total</span>
          <div />
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)', textAlign: 'right' }}>
            {totalRegistered.toLocaleString()}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)', textAlign: 'right' }}>
            {totalBursaries.toLocaleString()}
          </span>
          <div style={{ textAlign: 'right' }}>
            <UptakePill rate={nationalUptake} />
          </div>
        </div>
      </Card>

      {/* Opportunity type breakdown */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-800)', marginBottom: 14 }}>
          Opportunity Type Breakdown — Top Provinces
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {breakdownTypes.map(type => {
            const typeMax = Math.max(...enriched.map(r => r[type.metric]))
            const topFive = [...enriched].sort((a, b) => b[type.metric] - a[type.metric]).slice(0, 5)
            return (
              <Card key={type.label} style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{
                    fontSize: 20, background: type.bg,
                    width: 44, height: 44, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {type.icon}
                  </div>
                  <Badge variant={type.badgeVariant}>{type.total.toLocaleString()}</Badge>
                </div>
                <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--gray-900)', marginBottom: 2 }}>
                  {type.label}
                </p>
                <p style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 16 }}>Top 5 provinces by volume</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {topFive.map(r => (
                    <div key={r.province}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-700)' }}>{r.province}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: type.color }}>
                          {r[type.metric].toLocaleString()}
                        </span>
                      </div>
                      <div style={{ height: 6, background: 'var(--gray-100)', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${(r[type.metric] / typeMax) * 100}%`,
                          background: type.color,
                          borderRadius: 99,
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
