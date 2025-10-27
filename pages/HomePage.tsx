
import React from 'react';
import { usePosts } from '../hooks/usePosts';
import { Post } from '../types';

// Fix: Import Link from 'react-router-dom' to resolve 'Cannot find name ReactRouterDOM' error.
import { Link } from 'react-router-dom';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const excerpt = post.content.split('\n')[0].substring(0, 150) + '...';

  return (
    <Link to={`/posts/${post.slug}`} className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
      <img className="w-full h-56 object-cover" src={post.image_url} alt={post.title} />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{post.title}</h2>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>{post.author}</span>
          <span className="mx-2">&bull;</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

const HomePage: React.FC = () => {
  const { posts, loading, error } = usePosts();

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">From Our Blog</h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Latest articles and tutorials on web development and design.
            </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
            <PostCard key={post.id} post={post} />
        ))}
        </div>
    </div>
  );
};

export default HomePage;
