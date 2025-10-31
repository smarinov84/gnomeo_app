// Beds step tests cover add/remove actions and list behavior.
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { BedsStep } from '../onboarding/steps/BedsStep';
import { OnboardingProvider } from '../onboarding/state';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}

describe('BedsStep', () => {
  it('adds and removes beds', () => {
    const onNext = vi.fn();
    const onBack = vi.fn();
    render(<BedsStep onNext={onNext} onBack={onBack} />, { wrapper: Wrapper as any });

    const add = screen.getByRole('button', { name: /add a bed/i });
    fireEvent.click(add);
    fireEvent.click(add);

    // Two bed cards (Remove buttons)
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    expect(removeButtons.length).toBeGreaterThanOrEqual(2);

    fireEvent.click(removeButtons[0]);
    // After removal, at least one remains
    expect(screen.getAllByRole('button', { name: /remove/i }).length).toBe(1);
  });
});


