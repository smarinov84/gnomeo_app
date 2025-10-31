// Marketing home page: communicates value and funnels to onboarding.
// Rationale:
// - Keeps content focused: hero, features, segments, CTA.
// - Avoids heavy assets for fast first load; design warmth comes from color and layout.
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/state';
import { AuthModal } from '../components/AuthModal';

export function Home() {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = React.useState(false);
  const navigate = useNavigate();

  function handleGetStarted() {
    if (user) navigate('/onboarding');
    else setAuthOpen(true);
  }

  return (
    <div>
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <Segments />
      <CTA onGetStarted={handleGetStarted} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthed={() => navigate('/onboarding')} />
    </div>
  );
}

function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="card" style={{ padding: 28, marginBottom: 16, background: 'linear-gradient(135deg, #fff, #f4efe9)' }}>
      <h1 className="title" style={{ fontSize: 36 }}>Grow with confidence</h1>
      <p className="subtitle" style={{ maxWidth: 640 }}>
        Gnomeo is your AI garden co‑pilot. Get a personalized plan, real‑time weather insights, and instant photo diagnostics to keep your garden thriving.
      </p>
      <div className="controls">
        <button onClick={onGetStarted}>Get started free</button>
        <a className="ghost" href="#features" style={{ textDecoration: 'none', padding: '10px 14px', borderRadius: 12, border: '1px solid var(--border)' }}>Explore features</a>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { title: 'Smart onboarding', desc: 'Location + bed setup in minutes with helpful defaults.' },
    { title: 'Real‑time insights', desc: 'Frost and heat alerts, watering windows, weekly tasks.' },
    { title: 'Photo diagnostics', desc: 'Identify issues from images and get actionable steps.' },
    { title: 'Bed planning', desc: 'Simple successions, spacing, and companion checks.' },
  ];
  return (
    <section id="features" className="card" style={{ marginBottom: 16 }}>
      <h2 className="title" style={{ fontSize: 24 }}>Features</h2>
      <div className="row" style={{ flexWrap: 'wrap' }}>
        {items.map((it) => (
          <div key={it.title} className="card" style={{ flex: '1 1 280px', margin: 8 }}>
            <strong style={{ color: 'var(--brand)' }}>{it.title}</strong>
            <div className="spacer" />
            <div style={{ color: 'var(--muted)' }}>{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Segments() {
  const items = [
    { title: 'New gardeners', desc: 'Avoid common pitfalls with a clear weekly plan.' },
    { title: 'Busy growers', desc: 'Know what to do next—quick reminders that matter.' },
    { title: 'Urban gardeners', desc: 'Containers to raised beds—right sizing recommendations.' },
  ];
  return (
    <section className="card" style={{ marginBottom: 16 }}>
      <h2 className="title" style={{ fontSize: 24 }}>Made for you</h2>
      <div className="row" style={{ flexWrap: 'wrap' }}>
        {items.map((it) => (
          <div key={it.title} className="card" style={{ flex: '1 1 280px', margin: 8, background: '#fcfbfa' }}>
            <strong>{it.title}</strong>
            <div className="spacer" />
            <div style={{ color: 'var(--muted)' }}>{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #eaf0e6, #fff)' }}>
      <h3 className="title" style={{ fontSize: 22 }}>Ready to grow more, with less guesswork?</h3>
      <div className="spacer" />
      <button onClick={onGetStarted}>Create your free account</button>
    </section>
  );
}


