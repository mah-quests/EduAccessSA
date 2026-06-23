const variants = {
  green:  { background: 'var(--green-100)', color: 'var(--green-800)' },
  gold:   { background: 'var(--gold-100)',  color: '#78350f' },
  red:    { background: 'var(--red-100)',   color: 'var(--red-600)' },
  amber:  { background: 'var(--amber-100)', color: 'var(--amber-600)' },
  blue:   { background: 'var(--blue-100)',  color: 'var(--blue-600)' },
  gray:   { background: 'var(--gray-100)',  color: 'var(--gray-700)' },
}

export default function Badge({ children, variant = 'gray', style }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '2px 10px',
      borderRadius: 99,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '.01em',
      ...variants[variant],
      ...style,
    }}>
      {children}
    </span>
  )
}
