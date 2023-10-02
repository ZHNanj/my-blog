import React, { useState, useEffect } from 'react';
import styles from "@site/src/components/RecentProject/styles.module.css";
import clsx from "clsx";

function useLatestProject(count) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('project.json')
      .then(response => response.json())
      .then(data => {
        setPosts(data.slice(0, count));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [count]);

  return [posts, loading];
}

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4', styles.shadow)}>
      <div className="text--center">
        <img className={styles.featureSvg} role="img" src={Svg}  alt={`cover`}/>
      </div>
      <div className={clsx('text--center padding-horiz--md padding--sm', styles.bg)}>
      <h3>{title}</h3>
      </div>
    </div>
  );
}

function RecentProject({count = 3}) {
  const [latestBlogPosts, isLoading] = useLatestProject(count);

  if (isLoading) {
    return <div>正在加载最新博客文章...</div>;
  }

  return (
    <div className={clsx(`padding--xl`, styles.layout)}>
      <h1>精选项目</h1>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {latestBlogPosts.map((props, idx) => (
              <Feature key={idx} title={props.title} Svg={props.cover} />
            ))}
          </div>
        </div>
      </section>
      <a href={`/project`}>查看更多</a>
    </div>
  );
}


export default RecentProject;
