// Auth modal: accessible, minimal sign up/in to enable onboarding persistence.
// Rationale:
// - Labels associated via htmlFor improve a11y and test robustness.
// - onAuthed callback decouples modal from navigation concerns.
import React from 'react';
import { useAuth } from '../auth/state';

export function AuthModal({ open, onClose, onAuthed }: { open: boolean; onClose: () => void; onAuthed?: () => void }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = React.useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.includes('@') || password.length < 6) {
      setError('Enter a valid email and a password of 6+ characters.');
      return;
    }
    if (mode === 'signup') await signUp(email, password);
    else await signIn(email, password);
    onClose();
    onAuthed?.();
  }

  return (
    <div role="dialog" aria-modal="true" style={overlay}>
      <div className="card" style={{ maxWidth: 420, width: '100%' }}>
        <h3 className="title" style={{ fontSize: 22, marginBottom: 4 }}>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h3>
        <p className="subtitle">Save your garden and sync across devices.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="auth-email">Email</label>
            <input id="auth-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="auth-password">Password</label>
            <input id="auth-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <div role="alert" style={{ color: 'var(--danger)', marginBottom: 8 }}>{error}</div>}
          <div className="controls" style={{ justifyContent: 'space-between' }}>
            <button type="button" className="ghost" onClick={onClose}>Cancel</button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="secondary" onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}>
                {mode === 'signup' ? 'Have an account? Sign in' : 'Need an account? Sign up'}
              </button>
              <button type="submit">{mode === 'signup' ? 'Sign up' : 'Sign in'}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  zIndex: 50,
};


