// App shell sets up global providers and routes.
// Rationale:
// - BrowserRouter v6 keeps routing simple and enables PWA-friendly URLs.
// - AuthProvider wraps the app to expose a minimal MVP auth state without backend.
// - Onboarding is gated behind auth so user data persists meaningfully across devices later.
import React from 'react';
import { OnboardingWizard } from './onboarding/OnboardingWizard';
import { OnboardingProvider } from './onboarding/state';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/state';
import { Home } from './pages/Home';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-shell">
          <SiteHeader />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/onboarding"
                element={
                  <OnboardingProvider>
                    <div className="card">
                      <OnboardingAuthGate>
                        <OnboardingWizard />
                      </OnboardingAuthGate>
                    </div>
                  </OnboardingProvider>
                }
              />
            </Routes>
          </main>
          <footer className="footer">Made with care for growers · © {new Date().getFullYear()}</footer>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Simple header: brand + CTA + minimal auth controls.
// We keep navigation small to focus users on the onboarding flow.
function SiteHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="header">
      <Link to="/" className="brand" aria-label="Gnomeo" style={{ textDecoration: 'none' }}>
        <span className="brand-mark" />
        Gnomeo
      </Link>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button className="ghost" onClick={() => navigate('/onboarding')}>Get started</button>
        {user ? (
          <>
            <span style={{ color: 'var(--muted)', fontWeight: 600 }}>{user.email}</span>
            <button onClick={signOut}>Sign out</button>
          </>
        ) : null}
      </div>
    </header>
  );
}

// Guard onboarding behind authentication.
// MVP behavior: redirect to home if user is not signed in. Later, we can deep-link
// back to the wizard after sign in.
function OnboardingAuthGate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);
  return <>{children}</>;
}

