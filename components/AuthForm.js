'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BantrabLogo from '@/components/BantrabLogo';
import AuthIllustration from '@/components/AuthIllustration';
import styles from './AuthForm.module.css';

export default function AuthForm({ mode }) {
  const router = useRouter();
  const isSignUp = mode === 'signup';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${isSignUp ? 'signup' : 'signin'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isSignUp ? { name, email, password } : { email, password }
        ),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }
      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className={styles["auth-page"]}>
      <header className={styles["auth-header"]}>
        <BantrabLogo size={44} withWordmark={false} />
        <span className={styles["brand-name"]}>BANTRAB</span>
      </header>

      <div className={styles["auth-split"]}>
        <main className={styles["auth-card"]}>
          <h1>{isSignUp ? 'Create your account' : 'Sign up or log in'}</h1>

        <button type="button" className={styles["btn-social"]} disabled title="Demo only">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.1 3.7-8.6z" />
            <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.9-5l-3.9 3C3.2 21.3 7.3 24 12 24z" />
            <path fill="#FBBC05" d="M5.1 14.4c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4l-3.9-3C.4 8.2 0 10 0 12s.4 3.8 1.2 5.4l3.9-3z" />
            <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.2 2.7 1.2 6.6l3.9 3c1-2.9 3.7-4.9 6.9-4.9z" />
          </svg>
          Continue with Google
        </button>
        <button type="button" className={styles["btn-social"]} disabled title="Demo only">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#000" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          Continue with Apple
        </button>

        <form onSubmit={handleSubmit} className={styles["auth-form"]} noValidate>
          {isSignUp && (
            <div className={styles["field"]}>
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>
          )}
          <div className={styles["field"]}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              autoComplete="email"
              required
            />
          </div>
          <div className={styles["field"]}>
            <label htmlFor="password">Password</label>
            <div className={styles["password-wrap"]}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? 'At least 8 characters' : 'Enter your password'}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
              />
              <button
                type="button"
                className={styles["toggle"]}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <p className={styles["error"]} role="alert">
              {error}
            </p>
          )}

          <button type="submit" className={styles["btn-primary"]} disabled={loading}>
            {loading
              ? 'Please wait...'
              : isSignUp
                ? 'Create account'
                : 'Continue with email'}
          </button>
        </form>

        <p className={styles["legal"]}>
          By continuing with Google, Apple, or email you agree to Bantrab&apos;s{' '}
          <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a> and{' '}
          <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
        </p>

        <p className={styles["switch"]}>
          {isSignUp ? (
            <>Already have an account? <a href="/signin">Log in</a></>
          ) : (
            <>Don&apos;t have an account? <a href="/signup">Sign up</a></>
          )}
        </p>
        </main>

        <aside className={styles["auth-visual"]} aria-hidden="true">
          <AuthIllustration />
        </aside>
      </div>
    </div>
  );
}
