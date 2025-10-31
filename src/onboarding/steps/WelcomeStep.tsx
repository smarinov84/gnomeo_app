import React from 'react';

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <h1 className="title">Welcome to Gnomeo</h1>
      <p className="subtitle">Let's set up your garden with a few quick steps. We'll use your location to suggest timing, help define your beds, and tailor recommendations.</p>

      <div className="controls">
        <button onClick={onNext} aria-label="Start onboarding">Get started</button>
      </div>
    </section>
  );
}

