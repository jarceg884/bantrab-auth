import styles from './AuthFooter.module.css';

// Footer with the legal links, rendered on both auth screens (FR-007).
export default function AuthFooter() {
  return (
    <footer className={styles.footer}>
      <a href="/terms">Terms of Service</a>
      <span aria-hidden="true">·</span>
      <a href="/privacy">Privacy Policy</a>
    </footer>
  );
}
