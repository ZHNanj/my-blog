import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '探索',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
          希望是隐藏在群山后的星星，探索是人生道路上执著的旅人。
      </>
    ),
  },
  {
    title: '学习',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
          应当随时学习，学习一切；应该集中全力，以求知道得更多，知道一切。
      </>
    ),
  },
  {
    title: '实践',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
          不要担心犯错误，最大的错误是自己没有实践的经验。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
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
