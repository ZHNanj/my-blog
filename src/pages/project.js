import React, { useState, useEffect } from 'react';
import styles from "@site/src/components/RecentProject/styles.module.css";
import clsx from "clsx";
import Layout from "@theme/Layout";

function useLatestProject() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('project.json')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

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
                <p>{description}</p>
            </div>
        </div>
    );
}

function RecentProject() {
    const [latestBlogPosts, isLoading] = useLatestProject();

    if (isLoading) {
        return <div>正在加载最新博客文章...</div>;
    }

    return (
        <Layout>
            <div className={clsx(`padding--xl`, styles.layout)}>
                <section className={styles.features}>
                    <div className="container">
                        <div className="row">
                            {latestBlogPosts.map((props, idx) => (
                                <Feature key={idx} title={props.title} Svg={props.cover} description={props.description} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}


export default RecentProject;
