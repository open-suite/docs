import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const guides = [
  {
    title: 'Users',
    to: '/users',
    text: 'Daily workflows for email, documents, files, calendars, meetings, chat, contacts, projects, and tables.',
    links: ['Navigate', 'Mail', 'Files', 'Calendar'],
  },
  {
    title: 'Admins',
    to: '/admins',
    text: 'Operational guides for inviting people, resetting access, and managing storage limits.',
    links: ['Users', 'Passwords', 'Quotas'],
  },
  {
    title: 'IT',
    to: '/it',
    text: 'Deployment and maintenance notes for the single-VPS Open Suite stack.',
    links: ['Install', 'Backups', 'Operations'],
  },
];

const products = [
  'Portal',
  'Mail',
  'Files',
  'Documents',
  'Calendar',
  'Meet',
  'Chat',
  'Projects',
  'Tables',
];

export default function Home() {
  return (
    <Layout title="Open Suite Docs" description="Practical Open Suite documentation">
      <main className={styles.page}>
        <section className={styles.hero}>
          <img className={styles.heroArt} src="/img/opensuite-hero.png" alt="" />
          <div className={styles.heroText}>
            <span className={styles.eyebrow}>Open Suite documentation</span>
            <Heading as="h1">The operating manual for an open workplace.</Heading>
            <p>
              Foolproof user guides, admin runbooks, and IT procedures for the
              self-hosted office suite: email, files, documents, meetings,
              calendars, chat, projects, and tables.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/users">
                Browse user guides
              </Link>
              <Link className="button button--secondary button--lg" to="/users/navigate-open-suite">
                Learn the workspace
              </Link>
            </div>
            <div className={styles.productStrip}>
              {products.map((product) => (
                <span key={product}>{product}</span>
              ))}
            </div>
          </div>
          <div className={styles.preview} aria-label="Open Suite dashboard preview">
            <img src="/img/opensuite-apps.png" alt="Open Suite workspace illustration" />
          </div>
        </section>

        <section className={styles.guides} aria-label="Documentation sections">
          {guides.map((guide) => (
            <Link className={styles.guide} to={guide.to} key={guide.title}>
              <span>{guide.title}</span>
              <p>{guide.text}</p>
              <div>
                {guide.links.map((link) => (
                  <small key={link}>{link}</small>
                ))}
              </div>
            </Link>
          ))}
        </section>

        <section className={styles.workflow}>
          <div>
            <span className={styles.eyebrow}>End-user focus</span>
            <Heading as="h2">Every guide starts from the screen people see.</Heading>
          </div>
          <p>
            The user docs use current demo screenshots, accessible HTML
            callouts, direct wording, and short recovery paths for common
            mistakes.
          </p>
        </section>
      </main>
    </Layout>
  );
}
