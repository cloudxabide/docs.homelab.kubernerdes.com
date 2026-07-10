import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Day 0 - Plan',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    to: '/docs/day-0-plan',
    description: (
      <>
        Planning and architecture — domain/IP scheme, deployment mode
        (community, prime, or enclave), and hardware inventory.
      </>
    ),
  },
  {
    title: 'Day 1 - Build',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    to: '/docs/day-1-build',
    description: (
      <>
        Stand up the admin node, Harvester, Rancher Manager, Observability,
        and the Apps cluster.
      </>
    ),
  },
  {
    title: 'Day 2 - Operate',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    to: '/docs/day-2-operate',
    description: (
      <>
        Ongoing operations — backups, RBAC, and the SUSE Security (NeuVector)
        Monitor → Protect demo walkthrough.
      </>
    ),
  },
];

function Feature({Svg, title, description, to}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Link to={to}>{title}</Link>
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
