import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
import RecentPost from "@site/src/components/RecentBlog";
import RecentProject from "@site/src/components/RecentProject";

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={styles.heroBanner}>
            <div className="container">
                {/*<h1 className="hero__title">{siteConfig.title}</h1>*/}
                {/*<p className="hero__subtitle">{siteConfig.tagline}</p>*/}
                <div>
                    <h1>Hello👋</h1>
                    <h2 className="hero__subtitle">这里是<span>绕地球一周</span>的银河系漫游指南📚</h2>
                    <p>I Am A Full Stack</p>
                    <p>{`<Developer />`}</p>
                    <p>An independent developer coding with love.</p>
                </div>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/about-me">
                        关于我️
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader/>
            <main>
                <HomepageFeatures/>
                <RecentPost/>
                <RecentProject />
            </main>
        </Layout>
    );
}
