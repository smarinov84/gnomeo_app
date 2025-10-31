// Summary step provides an explainable, editable review before saving.
// Rationale:
// - Users can correct zone or dimensions prior to generating insights.
import React from 'react';
import { useOnboarding } from '../state';

export function SummaryStep({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useOnboarding();

  function complete() {
    dispatch({ type: 'set_completed', completed: true });
    alert('Onboarding saved! You can now proceed to garden overview.');
  }

  return (
    <section>
      <h2 className="title">Review</h2>
      <p className="subtitle">Here is your setup. You can go back to edit any section.</p>

      <div className="card" style={{ marginBottom: 12 }}>
        <strong>Location</strong>
        <div style={{ color: 'var(--muted)' }}>
          {state.location.city || '—'}, {state.location.region || '—'}, {state.location.country || '—'}
        </div>
        <div>Zone: {state.location.zone || state.location.zoneSuggestion || '—'}</div>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <strong>Beds</strong>
        <ul>
          {state.beds.map((b) => (
            <li key={b.id}>
              {b.name} · {b.type.replace('_', ' ')} · {b.length}×{b.width} {state.units === 'imperial' ? 'ft' : 'm'}
            </li>
          ))}
        </ul>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <strong>Goals</strong>
        <div>Experience: {state.goals.experience}</div>
        <div>Focus: {state.goals.focus}</div>
      </div>

      <div className="controls">
        <button className="ghost" onClick={onBack}>Back</button>
        <button onClick={complete}>Finish setup</button>
      </div>
    </section>
  );
}

