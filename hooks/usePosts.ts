
import React from 'react';
import { Post } from '../types';

let cachedPosts: Post[] | null = null;

const parseCSV = (text: string): Post[] => {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];

  const header = lines[0].split(',');
  const posts: Post[] = [];

  for (let i = 1; i < lines.length; i++) {
    const data = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    if (data.length !== header.length) continue;

    const post: any = {};
    for (let j = 0; j < header.length; j++) {
      let value = data[j];
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      post[header[j].trim()] = value;
    }
    posts.push(post as Post);
  }
  return posts;
};

export const usePosts = () => {
  const [posts, setPosts] = React.useState<Post[]>(cachedPosts || []);
  const [loading, setLoading] = React.useState<boolean>(!cachedPosts);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (cachedPosts) {
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch('./data/posts.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch posts data');
        }
        const text = await response.text();
        const parsedPosts = parseCSV(text);
        cachedPosts = parsedPosts;
        setPosts(parsedPosts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};
