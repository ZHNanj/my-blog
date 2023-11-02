import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import {animated, useSpring, useTrail} from 'react-spring';

import styles from './index.module.css';
import RecentPost from "@site/src/components/RecentBlog";
import RecentProject from "@site/src/components/RecentProject";

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();

    const textLines = [
        "Hello👋",
        "这里是绕地球一周的银河系漫游指南📚",
        "I Am A Full Stack",
        "<Developer />",
        "An independent developer coding with love.",
    ];

    const trail = useTrail(textLines.length, {
        from: {opacity: 0, transform: "translate3d(0, 40px, 0)"},
        to: {opacity: 1, transform: "translate3d(0, 0px, 0)"},
        config: {tension: 100, friction: 40},
    });

    return (
        <header className={styles.heroBanner}>
            <div className="container">
                <div>
                    {trail.map(({opacity, transform}, index) => (
                        <animated.div
                            key={textLines[index]}
                            style={{
                                opacity,
                                transform,
                            }}
                        >
                            {index === 1 ? (
                                <h2 className="hero__subtitle">{textLines[index]}</h2>
                            ) : (
                                <p>{textLines[index]}</p>
                            )}
                        </animated.div>
                    ))}
                </div>
                <div className={styles.buttons}>
                    <Link className="button button--secondary button--lg" to="/about-me">
                        关于我️
                    </Link>
                </div>
            </div>
        </header>
    );
}

const numStars = 200; // 星星的数量

// 创建随机位置的星星
const createStars = (count) => {
    return Array.from({length: 100}, (_, index) => index + 1);
};


const StarrySky = () => {
    const getRandomDelay = useCallback(() => Math.random() * 500, []); // Random delay between animations

    const stars = useMemo(() => createStars(), []);
    const starPositions = useMemo(() => {
        return stars.map((star) => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
        }));
    }, [stars]);

    return (
        <div className="starry-sky">
            {stars.map((star) => {
                const [starAnimation, api] = useSpring(() => ({
                    from: {opacity: 0, transform: 'translateY(100vh)', scale: 0},
                    to: async (next) => {
                        while (true) {
                            await next({opacity: 1, transform: 'translateY(0)', scale: 1, delay: getRandomDelay()});
                            await next({opacity: 0.3, scale: 0.5, delay: getRandomDelay()});
                        }
                    },
                    config: {duration: 1000},
                    reset: false
                }));

                return (
                    <animated.div
                        key={star}
                        className={styles.star}
                        style={{
                            ...starAnimation,
                            ...starPositions[star],
                            // left: `${Math.random() * 100}%`,
                            // top: `${Math.random() * 100}%`,
                        }}
                    />
                );
            })}
        </div>
    );
};

const ShootingStar = ({mousePosition}) => {
    const shootingStarAnimation = useSpring({
        from: {opacity: 0, transform: 'scale(0)'},
        to: {opacity: 1, transform: 'scale(1)'},
        config: {duration: 0},
        reset: true,
    });

    return (
        <animated.div
            className={styles.shootingStar}
            style={{
                ...shootingStarAnimation,
                position: 'fixed',
                top: `${mousePosition.y}px`,
                left: `${mousePosition.x}px`,
                width: '10px',
                height: '10px',
                backgroundColor: 'white',
            }}
        />
    );
};


export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    const mousePositionRef = useRef({x: 0, y: 0});
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    useEffect(() => {
        const updateMousePosition = (event) => {
            mousePositionRef.current = {x: event.clientX, y: event.clientY};
            setMousePosition({x: event.clientX, y: event.clientY});
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <div className={styles.light}>
                {mousePosition && <ShootingStar mousePosition={mousePosition}/>}
                <HomepageHeader/>
                <main>
                    <StarrySky/>
                    <HomepageFeatures/>
                    <RecentPost/>
                    <RecentProject/>
                </main>
            </div>
        </Layout>
    );
}

