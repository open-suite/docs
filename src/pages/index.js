import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const guides = [
  {
    title: 'Users',
    to: '/users',
    text: 'Mail, calendar, contacts, chat, meetings, files, documents, spreadsheets and presentations, step by step.',
    links: ['Mail', 'Calendar', 'Meet', 'Files', 'Documents'],
  },
  {
    title: 'Admins',
    to: '/admins',
    text: 'The Admin screen: add people, reset passwords, connect your own domain, and understand your plan.',
    links: ['People', 'Domains', 'Plan'],
  },
  {
    title: 'IT',
    to: '/it',
    text: 'Install Open Suite on one Ubuntu server, make its mail deliverable, upgrade it and back it up.',
    links: ['Install', 'Mail DNS', 'Upgrades', 'Backups'],
  },
];

const products = [
  'Mail',
  'Calendar',
  'Contacts',
  'Chat',
  'Meet',
  'Files',
  'Documents',
  'Spreadsheets',
  'Presentations',
];

export default function Home() {
  return (
    <Layout description="Documentation for Open Suite">
      <main className={styles.page}>
        <section className={styles.hero}>
          <img className={styles.heroArt} src="/img/opensuite-hero.png" alt="" />
          <div className={styles.heroText}>
            <span className={styles.eyebrow}>Open Suite documentation</span>
            <Heading as="h1">One app for your organisation's office work.</Heading>
            <p>
              Open Suite runs mail, calendar, chat, video meetings, files,
              documents, spreadsheets and presentations behind one sign-in, on
              a single server you control.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/users">
                Browse user guides
              </Link>
              <Link className="button button--secondary button--lg" to="/it/install">
                Install Open Suite
              </Link>
            </div>
            <div className={styles.productStrip}>
              {products.map((product) => (
                <span key={product}>{product}</span>
              ))}
            </div>
          </div>
          <div className={styles.preview} aria-label="Open Suite Home screen">
            <img src="/img/users/home.png" alt="The Open Suite Home screen with today's agenda, recent documents, inbox and chat" />
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
            <span className={styles.eyebrow}>Earlier version</span>
            <Heading as="h2">Running the k3s distribution?</Heading>
          </div>
          <p>
            The earlier Open Suite, assembled from Nextcloud, Keycloak and La
            Suite apps on k3s, has its own documentation at{' '}
            <a href="https://docs.opensuite.online/classic/">docs.opensuite.online/classic</a>.
          </p>
        </section>
      </main>
    </Layout>
  );
}
