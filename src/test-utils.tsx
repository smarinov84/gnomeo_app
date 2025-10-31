// Helper to render components with common providers for tests.
// Rationale: reduces boilerplate and keeps tests focused on behavior.
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/state';
import { OnboardingProvider } from './onboarding/state';

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <OnboardingProvider>{ui}</OnboardingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

