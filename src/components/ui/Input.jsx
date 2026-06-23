export default function Input({ label, type = 'text', placeholder, value, onChange, icon, style, required, name, as: Tag = 'input', children, rows }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-700)' }}>
          {label}{required && <span style={{ color: 'var(--red-600)', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--gray-400)', fontSize: 16, pointerEvents: 'none',
          }}>
            {icon}
          </span>
        )}
        {Tag === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            style={{
              width: '100%',
              padding: icon ? '10px 14px 10px 40px' : '10px 14px',
              border: '1.5px solid var(--gray-300)',
              borderRadius: 'var(--radius-md)',
              fontSize: 15,
              color: 'var(--gray-900)',
              background: '#fff',
              outline: 'none',
              appearance: 'none',
            }}
          >
            {children}
          </select>
        ) : Tag === 'textarea' ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows || 3}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1.5px solid var(--gray-300)',
              borderRadius: 'var(--radius-md)',
              fontSize: 15,
              color: 'var(--gray-900)',
              background: '#fff',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            style={{
              width: '100%',
              padding: icon ? '10px 14px 10px 40px' : '10px 14px',
              border: '1.5px solid var(--gray-300)',
              borderRadius: 'var(--radius-md)',
              fontSize: 15,
              color: 'var(--gray-900)',
              background: '#fff',
              outline: 'none',
            }}
          />
        )}
      </div>
    </div>
  )
}
