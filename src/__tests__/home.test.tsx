// Home page tests validate the marketing funnel to onboarding via auth.
import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { Home } from '../pages/Home';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../auth/state';

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
}

describe('Home page', () => {
  it('opens auth modal on Get started and allows sign up', async () => {
    render(<Home />, { wrapper: Wrapper as any });
    const btn = screen.getByRole('button', { name: /get started/i });
    fireEvent.click(btn);

    // Modal fields appear
    const email = await screen.findByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'secret12' } });

    const submit = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submit);

    await waitFor(() => {
      // Modal should close; no email field present
      expect(screen.queryByLabelText(/email/i)).toBeNull();
    });
  });
});


