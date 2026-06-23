import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

// Mock analytics data
const analyticsData = {
  overview: {
    totalStudents: 1245,
    totalApplications: 3847,
    totalBursaries: 48,
    successRate: 31,
    studentGrowth: '+18% vs last month',
    applicationGrowth: '+24% vs last month',
  },
  applicationTrends: [
    { month: 'Jan', applications: 320, successful: 95 },
    { month: 'Feb', applications: 385, successful: 118 },
    { month: 'Mar', applications: 456, successful: 142 },
    { month: 'Apr', applications: 512, successful: 168 },
    { month: 'May', applications: 598, successful: 189 },
    { month: 'Jun', applications: 687, successful: 213 },
  ],
  statusBreakdown: [
    { status: 'Saved', count: 842, percentage: 22, color: 'gray' },
    { status: 'Applied', count: 1204, percentage: 31, color: 'blue' },
    { status: 'Under Review', count: 1156, percentage: 30, color: 'amber' },
    { status: 'Successful', count: 475, percentage: 12, color: 'green' },
    { status: 'Unsuccessful', count: 170, percentage: 5, color: 'red' },
  ],
  topBursaries: [
    { title: 'NSFAS Bursary', applications: 456, awarded: 128, org: 'NSFAS' },
    { title: 'Sasol Engineering Bursary', applications: 289, awarded: 45, org: 'Sasol' },
    { title: 'Eskom STEM Bursary', applications: 267, awarded: 38, org: 'Eskom' },
    { title: 'Allan Gray Fellowship', applications: 198, awarded: 32, org: 'Allan Gray' },
    { title: 'Anglo American Bursary', applications: 174, awarded: 28, org: 'Anglo American' },
  ],
  fieldDistribution: [
    { field: 'Engineering', count: 892, percentage: 23 },
    { field: 'Technology/IT', count: 756, percentage: 20 },
    { field: 'Medicine', count: 534, percentage: 14 },
    { field: 'Business', count: 445, percentage: 12 },
    { field: 'Science', count: 389, percentage: 10 },
    { field: 'Law', count: 312, percentage: 8 },
    { field: 'Other', count: 519, percentage: 13 },
  ],
  provincialBreakdown: [
    { province: 'Gauteng', students: 387, applications: 1243 },
    { province: 'Western Cape', students: 256, applications: 789 },
    { province: 'KwaZulu-Natal', students: 198, applications: 612 },
    { province: 'Eastern Cape', students: 167, applications: 489 },
    { province: 'Limpopo', students: 145, applications: 425 },
    { province: 'Other', students: 92, applications: 289 },
  ],
  gradeDistribution: [
    { grade: 'Grade 10', students: 234, percentage: 19 },
    { grade: 'Grade 11', students: 412, percentage: 33 },
    { grade: 'Grade 12', students: 521, percentage: 42 },
    { grade: 'Matric+', students: 78, percentage: 6 },
  ],
  averageMarksDistribution: [
    { range: '60-69%', students: 289, percentage: 23 },
    { range: '70-79%', students: 534, percentage: 43 },
    { range: '80-89%', students: 312, percentage: 25 },
    { range: '90%+', students: 110, percentage: 9 },
  ],
}

const StatCard = ({ label, value, growth, icon, color = 'blue' }) => (
  <Card style={{ padding: 24 }}>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
          {label}
        </p>
        <p style={{ fontSize: 32, fontWeight: 800, marginTop: 8, color: `var(--${color}-600)` }}>
          {value}
        </p>
        {growth && (
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--green-600)', marginTop: 6 }}>
            {growth}
          </p>
        )}
      </div>
      <span style={{ fontSize: 40, opacity: 0.5 }}>{icon}</span>
    </div>
  </Card>
)

const ChartBar = ({ label, value, maxValue, color = 'blue' }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-900)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: `var(--${color}-600)` }}>{value}</span>
    </div>
    <div style={{ background: 'var(--gray-200)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
      <div style={{
        background: `var(--${color}-500)`,
        height: '100%',
        width: `${(value / maxValue) * 100}%`,
        transition: 'width .3s',
      }} />
    </div>
  </div>
)

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('6m')
  const [view, setView] = useState('overview')

  const maxApplications = Math.max(...analyticsData.applicationTrends.map(t => t.applications))
  const maxBursaryApps = Math.max(...analyticsData.topBursaries.map(b => b.applications))

  return (
    <AppShell>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-.02em' }}>
          Platform Analytics 📊
        </h1>
        <p style={{ fontSize: 16, color: 'var(--gray-600)', marginTop: 6 }}>
          Insights into student opportunities, applications, and bursary distribution
        </p>
      </div>

      {/* Timeframe Selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {['1m', '3m', '6m', '1y', 'all'].map(tf => (
          <Button
            key={tf}
            variant={timeframe === tf ? 'primary' : 'ghost'}
            onClick={() => setTimeframe(tf)}
            size="sm"
          >
            {tf === '1m' ? '1 Month' : tf === '3m' ? '3 Months' : tf === '6m' ? '6 Months' : tf === '1y' ? '1 Year' : 'All Time'}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard
          label="Total Students"
          value={analyticsData.overview.totalStudents.toLocaleString()}
          growth={analyticsData.overview.studentGrowth}
          icon="👥"
          color="blue"
        />
        <StatCard
          label="Applications Submitted"
          value={analyticsData.overview.totalApplications.toLocaleString()}
          growth={analyticsData.overview.applicationGrowth}
          icon="📋"
          color="green"
        />
        <StatCard
          label="Active Bursaries"
          value={analyticsData.overview.totalBursaries}
          icon="🏆"
          color="amber"
        />
        <StatCard
          label="Success Rate"
          value={`${analyticsData.overview.successRate}%`}
          icon="✅"
          color="green"
        />
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 24 }}>
        {/* Application Trends */}
        <Card style={{ padding: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 20 }}>
            📈 Application Trends
          </h3>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'space-between' }}>
            {analyticsData.applicationTrends.map((trend, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  height: 120,
                  background: 'var(--gray-100)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 8,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'var(--blue-500)',
                    height: `${(trend.applications / maxApplications) * 100}%`,
                    transition: 'height .3s',
                  }} />
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-900)' }}>
                  {trend.month}
                </p>
                <p style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 2 }}>
                  {trend.applications} apps
                </p>
                <p style={{ fontSize: 11, color: 'var(--green-600)', fontWeight: 600, marginTop: 2 }}>
                  {trend.successful} ✓
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Application Status Breakdown */}
        <Card style={{ padding: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 20 }}>
            🎯 Application Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {analyticsData.statusBreakdown.map((status, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Badge variant={status.color} size="sm">{status.status}</Badge>
                    <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>{status.count.toLocaleString()}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: `var(--${status.color}-600)` }}>
                    {status.percentage}%
                  </span>
                </div>
                <div style={{ background: 'var(--gray-200)', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                  <div style={{
                    background: `var(--${status.color}-500)`,
                    height: '100%',
                    width: `${status.percentage}%`,
                    transition: 'width .3s',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Bursaries */}
      <Card style={{ padding: 28, marginBottom: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 20 }}>
          🏆 Top Bursaries
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {analyticsData.topBursaries.map((bursary, i) => (
            <div key={i} style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 1fr 1fr', 
              gap: 16,
              alignItems: 'center',
              paddingBottom: 16,
              borderBottom: i < analyticsData.topBursaries.length - 1 ? '1px solid var(--gray-200)' : 'none',
            }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{bursary.title}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 2 }}>{bursary.org}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--gray-600)', fontWeight: 600 }}>APPLICATIONS</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--blue-600)', marginTop: 2 }}>
                  {bursary.applications}
                </p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--gray-600)', fontWeight: 600 }}>AWARDED</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--green-600)', marginTop: 2 }}>
                  {bursary.awarded}
                </p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--gray-600)', fontWeight: 600 }}>SUCCESS RATE</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--amber-600)', marginTop: 2 }}>
                  {Math.round((bursary.awarded / bursary.applications) * 100)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Two Column Layout for Demographics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {/* Field Distribution */}
        <Card style={{ padding: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 20 }}>
            🎓 Applications by Field
          </h3>
          <div>
            {analyticsData.fieldDistribution.map((field, i) => (
              <ChartBar
                key={i}
                label={field.field}
                value={field.count}
                maxValue={Math.max(...analyticsData.fieldDistribution.map(f => f.count))}
                color={['blue', 'green', 'amber', 'red', 'indigo', 'pink', 'gray'][i % 7]}
              />
            ))}
          </div>
        </Card>

        {/* Provincial Distribution */}
        <Card style={{ padding: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 20 }}>
            📍 Applications by Province
          </h3>
          <div>
            {analyticsData.provincialBreakdown.map((prov, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{prov.province}</p>
                    <p style={{ fontSize: 12, color: 'var(--gray-600)' }}>{prov.students} students</p>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue-600)' }}>
                    {prov.applications} apps
                  </span>
                </div>
                <div style={{ background: 'var(--gray-200)', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                  <div style={{
                    background: 'var(--blue-500)',
                    height: '100%',
                    width: `${(prov.applications / Math.max(...analyticsData.provincialBreakdown.map(p => p.applications))) * 100}%`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Grade Distribution */}
        <Card style={{ padding: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 20 }}>
            👨‍🎓 Student Grade Levels
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {analyticsData.gradeDistribution.map((grade, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-900)' }}>{grade.grade}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue-600)' }}>
                    {grade.students} ({grade.percentage}%)
                  </span>
                </div>
                <div style={{ background: 'var(--gray-200)', borderRadius: 99, height: 8 }}>
                  <div style={{
                    background: 'var(--blue-500)',
                    height: '100%',
                    width: `${grade.percentage}%`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Average Marks Distribution */}
        <Card style={{ padding: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 20 }}>
            📊 Average Mark Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {analyticsData.averageMarksDistribution.map((marks, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-900)' }}>{marks.range}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-600)' }}>
                    {marks.students} ({marks.percentage}%)
                  </span>
                </div>
                <div style={{ background: 'var(--gray-200)', borderRadius: 99, height: 8 }}>
                  <div style={{
                    background: 'var(--green-500)',
                    height: '100%',
                    width: `${marks.percentage}%`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Insights Section */}
      <Card style={{ 
        padding: 32, 
        marginTop: 24,
        background: 'linear-gradient(135deg, var(--indigo-50), var(--purple-50))',
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 16 }}>
          💡 Key Insights
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--indigo-900)', marginBottom: 8 }}>
              ✨ Highest Demand
            </p>
            <p style={{ fontSize: 13, color: 'var(--indigo-800)', lineHeight: 1.6 }}>
              Engineering and Technology fields are attracting the most applications (43% combined), indicating strong student interest in STEM careers.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--indigo-900)', marginBottom: 8 }}>
              📈 Growth Trend
            </p>
            <p style={{ fontSize: 13, color: 'var(--indigo-800)', lineHeight: 1.6 }}>
              Monthly applications have grown 24% compared to last month, with June showing 687 new submissions - the highest month on record.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--indigo-900)', marginBottom: 8 }}>
              🎯 Regional Focus
            </p>
            <p style={{ fontSize: 13, color: 'var(--indigo-800)', lineHeight: 1.6 }}>
              Gauteng leads with 32% of total applications (1,243), followed by Western Cape with 21%. Urban centers show higher application rates.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--indigo-900)', marginBottom: 8 }}>
              ✅ Success Insights
            </p>
            <p style={{ fontSize: 13, color: 'var(--indigo-800)', lineHeight: 1.6 }}>
              Overall success rate is 31%, with top students (80%+ marks) showing 45% success rate. Early applications correlate with higher success.
            </p>
          </div>
        </div>
      </Card>
    </AppShell>
  )
}
