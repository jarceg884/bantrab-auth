'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => {
        if (r.status === 401) {
          router.replace('/signin');
          return { user: null };
        }
        return r.json();
      })
      .then((data) => {
        if (!data.user) {
          router.replace('/signin');
        } else {
          setUser(data.user);
          setLoading(false);
        }
      })
      .catch(() => router.replace('/signin'));
  }, [router]);

  async function handleSignOut() {
    await fetch('/api/auth/signout', { method: 'POST' });
    router.replace('/signin');
    router.refresh();
  }

  if (loading) {
    return (
      <div className="dash-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dash">
      <header className="dash-header">
        <span className="dash-brand">BANTRAB</span>
        <button className="signout" onClick={handleSignOut}>
          Sign out
        </button>
      </header>
      <main className="dash-main">
        <h1>Welcome, {user.name} 👋</h1>
        <p className="dash-email">{user.email}</p>
        <div className="dash-card">
          <h2>You&apos;re signed in</h2>
          <p>
            This is a protected area of the Bantrab demo. Your session is stored
            in an HttpOnly cookie signed with JWT.
          </p>
        </div>
      </main>
      <style jsx>{`
        .dash {
          min-height: 100vh;
          background: #ffffff;
        }
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          border-bottom: 1px solid #e5e7eb;
        }
        .dash-brand {
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #3c4043;
        }
        .signout {
          border: 1px solid #d2d7db;
          background: #fff;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #2b3031;
        }
        .signout:hover {
          background: #f6f6f6;
        }
        .dash-main {
          max-width: 640px;
          margin: 0 auto;
          padding: 64px 16px;
        }
        .dash-main h1 {
          font-size: 28px;
          color: #2b3031;
          margin-bottom: 4px;
        }
        .dash-email {
          color: #6b7280;
          margin-bottom: 32px;
        }
        .dash-card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          background: #fafafa;
        }
        .dash-card h2 {
          font-size: 18px;
          margin-bottom: 8px;
          color: #2b3031;
        }
        .dash-card p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
        }
        .dash-loading {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
