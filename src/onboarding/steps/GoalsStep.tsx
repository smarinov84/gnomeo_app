// Goals step: establish intent (yield/variety/learning) and experience.
// Rationale:
// - Guides defaults and content tone without asking detailed preferences too early.
import React from 'react';
import { useOnboarding } from '../state';

export function GoalsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { state, dispatch } = useOnboarding();

  return (
    <section>
      <h2 className="title">Your goals</h2>
      <p className="subtitle">Tell us what matters most so we can personalize recommendations.</p>

      <div className="field">
        <label>Experience level</label>
        <div className="controls">
          <button
            className={state.goals.experience === 'new' ? '' : 'ghost'}
            onClick={() => dispatch({ type: 'set_goals', goals: { experience: 'new' } })}
          >New to gardening</button>
          <button
            className={state.goals.experience === 'intermediate' ? '' : 'ghost'}
            onClick={() => dispatch({ type: 'set_goals', goals: { experience: 'intermediate' } })}
          >Some experience</button>
        </div>
      </div>

      <div className="field">
        <label>Primary focus</label>
        <div className="controls">
          <button
            className={state.goals.focus === 'yield' ? '' : 'ghost'}
            onClick={() => dispatch({ type: 'set_goals', goals: { focus: 'yield' } })}
          >Maximize harvest</button>
          <button
            className={state.goals.focus === 'variety' ? '' : 'ghost'}
            onClick={() => dispatch({ type: 'set_goals', goals: { focus: 'variety' } })}
          >Grow a variety</button>
          <button
            className={state.goals.focus === 'learning' ? '' : 'ghost'}
            onClick={() => dispatch({ type: 'set_goals', goals: { focus: 'learning' } })}
          >Learn the basics</button>
        </div>
      </div>

      <div className="controls">
        <button className="ghost" onClick={onBack}>Back</button>
        <button onClick={onNext}>Continue</button>
      </div>
    </section>
  );
}

