import BantrabLogo from '@/components/BantrabLogo';
import { LEGAL_DOCUMENTS } from '@/lib/legalContent';
import styles from './LegalPage.module.css';

// Shared legal-page shell (FR-004, FR-005, FR-010, FR-011, FR-015, FR-016).
// English chrome (header, back link, demo notice label), Spanish legal body.
export default function LegalPage({ document: docId }) {
  const doc = LEGAL_DOCUMENTS[docId];

  if (!doc) return null;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.brand} aria-label="Bantrab home">
          <BantrabLogo size={44} withWordmark={false} />
          <span className={styles['brand-name']}>BANTRAB</span>
        </a>
        <a href="/signin" className={styles.back}>
          ← Back to sign in
        </a>
      </header>

      <main className={styles.main}>
        <h1>{doc.title}</h1>
        <p className={styles.updated}>
          Última actualización: <time dateTime={doc.lastUpdated}>{doc.lastUpdated}</time>
        </p>
        <p className={styles.notice} role="note">
          Demo content — this document is illustrative and not legally binding.
        </p>

        {doc.sections.map((section, i) => (
          <section key={section.heading} aria-labelledby={`section-${i}`} className={styles.section}>
            <h2 id={`section-${i}`}>{section.heading}</h2>
            {section.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </section>
        ))}

        <footer className={styles.footer}>
          <a href="/terms">Terms of Service</a>
          <span aria-hidden="true">·</span>
          <a href="/privacy">Privacy Policy</a>
        </footer>
      </main>
    </div>
  );
}
