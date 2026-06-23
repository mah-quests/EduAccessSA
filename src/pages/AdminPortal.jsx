import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

// Mock data for admin bursaries
const initialBursaries = [
  {
    id: 'b1',
    title: 'Sasol Engineering Bursary',
    organization: 'Sasol Limited',
    fields: ['Engineering', 'Chemical Engineering', 'Mechanical Engineering', 'Electrical Engineering'],
    value: 'Up to R120 000/year',
    deadline: '2026-08-31',
    minMark: 70,
    applicants: 245,
    awarded: 15,
    status: 'Active',
    createdDate: '2026-01-15',
  },
  {
    id: 'b2',
    title: 'Eskom STEM Bursary',
    organization: 'Eskom Holdings',
    fields: ['Electrical Engineering', 'Mechanical Engineering', 'Information Technology'],
    value: 'Up to R100 000/year',
    deadline: '2026-07-31',
    minMark: 65,
    applicants: 189,
    awarded: 12,
    status: 'Active',
    createdDate: '2026-02-01',
  },
  {
    id: 'b3',
    title: 'Anglo American Bursary',
    organization: 'Anglo American plc',
    fields: ['Mining Engineering', 'Geology', 'Mechanical Engineering'],
    value: 'Up to R110 000/year',
    deadline: '2026-10-31',
    minMark: 65,
    applicants: 156,
    awarded: 10,
    status: 'Active',
    createdDate: '2026-01-20',
  },
]

export default function AdminPortal() {
  const [showForm, setShowForm] = useState(false)
  const [bursaries, setBursaries] = useState(initialBursaries)
  const [selectedBursary, setSelectedBursary] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    title: '',
    organization: '',
    fields: [],
    value: '',
    deadline: '',
    minMark: '',
    description: '',
  })

  const fields = ['Engineering', 'Technology', 'Medicine', 'Law', 'Business', 'Education', 'Science', 'Arts', 'Agriculture', 'Social Work', 'Architecture', 'Finance', 'Mining', 'Geology', 'IT', 'Computer Science']

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const toggleField = field => {
    setForm(f => ({
      ...f,
      fields: f.fields.includes(field) 
        ? f.fields.filter(f => f !== field)
        : [...f.fields, field]
    }))
  }

  const handleSubmit = () => {
    if (editingId) {
      setBursaries(bursaries.map(b => b.id === editingId ? { ...form, id: editingId } : b))
      setEditingId(null)
    } else {
      const newBursary = {
        ...form,
        id: 'b' + (bursaries.length + 1),
        applicants: 0,
        awarded: 0,
        status: 'Active',
        createdDate: new Date().toISOString().split('T')[0],
      }
      setBursaries([...bursaries, newBursary])
    }
    resetForm()
  }

  const resetForm = () => {
    setForm({
      title: '',
      organization: '',
      fields: [],
      value: '',
      deadline: '',
      minMark: '',
      description: '',
    })
    setShowForm(false)
    setEditingId(null)
  }

  const handleEdit = bursary => {
    setForm(bursary)
    setEditingId(bursary.id)
    setShowForm(true)
  }

  const handleDelete = id => {
    setBursaries(bursaries.filter(b => b.id !== id))
    setSelectedBursary(null)
  }

  const totalApplications = bursaries.reduce((sum, b) => sum + b.applicants, 0)
  const totalAwarded = bursaries.reduce((sum, b) => sum + b.awarded, 0)
  const successRate = totalApplications > 0 ? Math.round((totalAwarded / totalApplications) * 100) : 0

  return (
    <AppShell>
      {/* Greeting */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-.02em' }}>
          Manage Your Bursaries 📋
        </h1>
        <p style={{ fontSize: 16, color: 'var(--gray-600)', marginTop: 6 }}>
          Create and manage bursary opportunities for deserving students
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Active Bursaries', value: bursaries.length, icon: '📋', color: 'blue' },
          { label: 'Total Applications', value: totalApplications, icon: '📥', color: 'green' },
          { label: 'Awarded', value: totalAwarded, icon: '🏆', color: 'amber' },
          { label: 'Success Rate', value: `${successRate}%`, icon: '📊', color: 'indigo' },
        ].map((stat, i) => (
          <Card key={i} style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                  {stat.label}
                </p>
                <p style={{ 
                  fontSize: 28, 
                  fontWeight: 800, 
                  marginTop: 6,
                  color: `var(--${stat.color}-600)`,
                }}>
                  {stat.value}
                </p>
              </div>
              <span style={{ fontSize: 36, opacity: 0.6 }}>{stat.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Add New Bursary Button */}
      <div style={{ marginBottom: 24 }}>
        <Button 
          variant="primary"
          onClick={() => {
            setShowForm(!showForm)
            if (!showForm) resetForm()
          }}
          style={{ width: '100%' }}
        >
          {showForm ? '✕ Cancel' : '+ Add New Bursary'}
        </Button>
      </div>

      {/* Add/Edit Bursary Form */}
      {showForm && (
        <Card style={{ padding: 32, marginBottom: 32, background: 'var(--gray-50)' }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 24 }}>
            {editingId ? 'Edit Bursary' : 'Create New Bursary'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <Input
              label="Bursary Title"
              name="title"
              placeholder="e.g. Engineering Excellence Bursary"
              value={form.title}
              onChange={handleChange}
            />
            <Input
              label="Organization Name"
              name="organization"
              placeholder="e.g. Sasol Limited"
              value={form.organization}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <Input
              label="Award Value"
              name="value"
              placeholder="e.g. Up to R120 000/year"
              value={form.value}
              onChange={handleChange}
            />
            <Input
              label="Application Deadline"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <Input
              label="Minimum Mark Required (%)"
              name="minMark"
              type="number"
              placeholder="e.g. 70"
              value={form.minMark}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--gray-900)', marginBottom: 12 }}>
              Fields of Study
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {fields.map(field => (
                <button
                  key={field}
                  onClick={() => toggleField(field)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 99,
                    border: `2px solid ${form.fields.includes(field) ? 'var(--blue-600)' : 'var(--gray-300)'}`,
                    background: form.fields.includes(field) ? 'var(--blue-50)' : '#fff',
                    color: form.fields.includes(field) ? 'var(--blue-800)' : 'var(--gray-700)',
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  {form.fields.includes(field) && '✓ '}{field}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--gray-900)', marginBottom: 6 }}>
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe the bursary, requirements, and benefits..."
              value={form.description}
              onChange={handleChange}
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '10px 14px',
                border: '1.5px solid var(--gray-300)',
                borderRadius: 'var(--radius-md)',
                fontSize: 15,
                color: 'var(--gray-900)',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="primary" onClick={handleSubmit} style={{ flex: 1 }}>
              {editingId ? '💾 Update Bursary' : '✨ Create Bursary'}
            </Button>
            <Button variant="ghost" onClick={resetForm} style={{ flex: 1 }}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Bursaries List */}
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 16 }}>
          Your Bursaries ({bursaries.length})
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {bursaries.map(bursary => (
            <Card
              key={bursary.id}
              onClick={() => setSelectedBursary(selectedBursary?.id === bursary.id ? null : bursary)}
              style={{
                padding: 20,
                cursor: 'pointer',
                background: selectedBursary?.id === bursary.id ? 'var(--blue-50)' : '#fff',
                borderLeft: selectedBursary?.id === bursary.id ? '4px solid var(--blue-600)' : '4px solid transparent',
                transition: 'all .2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-900)' }}>
                    {bursary.title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 2 }}>
                    {bursary.organization}
                  </p>
                </div>
                <Badge variant="green" size="sm">{bursary.status}</Badge>
              </div>

              <div style={{ 
                background: 'var(--gray-100)', 
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                marginBottom: 12,
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 2 }}>
                  {bursary.value}
                </div>
                <p style={{ fontSize: 12, color: 'var(--gray-600)' }}>
                  Deadline: {new Date(bursary.deadline).toLocaleDateString()}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div style={{ background: 'var(--blue-50)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--blue-600)' }}>APPLICANTS</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--blue-900)', marginTop: 4 }}>
                    {bursary.applicants}
                  </p>
                </div>
                <div style={{ background: 'var(--green-50)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--green-600)' }}>AWARDED</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--green-900)', marginTop: 4 }}>
                    {bursary.awarded}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                {bursary.fields.slice(0, 2).map(field => (
                  <Badge key={field} variant="gray" size="xs">{field}</Badge>
                ))}
                {bursary.fields.length > 2 && (
                  <Badge variant="gray" size="xs">+{bursary.fields.length - 2} more</Badge>
                )}
              </div>

              {selectedBursary?.id === bursary.id && (
                <div style={{ 
                  marginTop: 16, 
                  paddingTop: 16, 
                  borderTop: '1px solid var(--gray-200)',
                  display: 'flex',
                  gap: 10,
                }}>
                  <Button 
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(bursary)}
                    style={{ flex: 1 }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(bursary.id)}
                    style={{ flex: 1, color: 'var(--red-600)' }}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <Card style={{ 
        padding: 32, 
        marginTop: 32,
        background: 'linear-gradient(135deg, var(--green-50), var(--emerald-50))',
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 16 }}>
          📝 Tips for Creating Effective Bursaries
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 8 }}>
              ✓ Be Clear About Requirements
            </h4>
            <p style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>
              Clearly specify minimum marks, field of study, and any other prerequisites. This helps attract the right candidates.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 8 }}>
              ✓ Set Reasonable Deadlines
            </h4>
            <p style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>
              Give students enough time to prepare their applications. Consider school holiday periods.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 8 }}>
              ✓ Highlight Benefits
            </h4>
            <p style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>
              Describe what makes your bursary special - mentorship, internships, employment opportunities, etc.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 8 }}>
              ✓ Update Regularly
            </h4>
            <p style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>
              Keep your bursary information current. Update deadlines and application status as needed.
            </p>
          </div>
        </div>
      </Card>
    </AppShell>
  )
}
