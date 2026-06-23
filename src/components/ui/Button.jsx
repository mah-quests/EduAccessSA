const styles = {
  primary: {
    background: 'var(--green-600)',
    color: '#fff',
    border: 'none',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--green-700)',
    border: '1.5px solid var(--green-600)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--gray-700)',
    border: '1.5px solid var(--gray-300)',
  },
  danger: {
    background: 'var(--red-600)',
    color: '#fff',
    border: 'none',
  },
  gold: {
    background: 'var(--gold-500)',
    color: '#1a1a1a',
    border: 'none',
  },
}

const sizes = {
  sm: { padding: '6px 14px', fontSize: 13 },
  md: { padding: '10px 20px', fontSize: 15 },
  lg: { padding: '14px 28px', fontSize: 16 },
}

export default function Button({ children, variant = 'primary', size = 'md', onClick, style, disabled, type = 'button', fullWidth }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: 'var(--radius-md)',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'opacity .15s, filter .15s',
        width: fullWidth ? '100%' : undefined,
        ...styles[variant],
        ...sizes[size],
        ...style,
      }}
    >
      {children}
    </button>
  )
}
