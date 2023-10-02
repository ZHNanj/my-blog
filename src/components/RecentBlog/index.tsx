import React, { useState, useEffect } from 'react';
import clsx from "clsx";
import styles from "@site/src/components/RecentBlog/styles.module.css";

function useLatestBlogPosts(count) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('blogPosts.json')
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



function RecentPost({count = 5}) {
  const [latestBlogPosts, isLoading] = useLatestBlogPosts(count);

  if (isLoading) {
    return <div>正在加载最新博客文章...</div>;
  }

  return (
    <div className={clsx('padding--xl', styles.layout)}>
      <h1>最新博客</h1>
      {latestBlogPosts.map((item) => (
        <div key={item.slug}>
          <h2>
            <a href={`/blog/${item.slug}`}>{item.title}</a>
            <span></span>
          </h2>
        </div>
      ))}
      <a href={`/blog`}>查看更多</a>
    </div>
  );
}


export default RecentPost;
