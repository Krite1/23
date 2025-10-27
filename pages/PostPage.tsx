
import React from 'react';
import { usePosts } from '../hooks/usePosts';

// Fix: Import useParams and Link from 'react-router-dom' to resolve 'Cannot find name ReactRouterDOM' error.
import { useParams, Link } from 'react-router-dom';

const PostPage: React.FC = () => {
  const { slug } = useParams();
  const { posts, loading, error } = usePosts();

  const post = React.useMemo(() => posts.find((p) => p.slug === slug), [posts, slug]);

  if (loading) {
    return <div className="text-center py-10"><p className="text-lg text-gray-500">Loading post...</p></div>;
  }
  
  if (error) {
    return <div className="text-center py-10"><p className="text-lg text-red-500">Error: {error}</p></div>;
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800">Post not found</h2>
        <p className="text-gray-600 mt-4">Sorry, we couldn't find the post you're looking for.</p>
        <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-10">
      <header className="border-b pb-6 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center text-gray-500">
          <span>By {post.author}</span>
          <span className="mx-2">&bull;</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </header>
      
      <img className="w-full rounded-lg mb-8" src={post.image_url} alt={post.title} />

      <div className="prose lg:prose-xl max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
};

export default PostPage;
