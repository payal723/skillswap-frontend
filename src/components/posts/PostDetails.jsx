import { PostDetails } from '@/components/posts/PostDetails';
import { getPostById } from '@/services/postService'; // आपको यह सर्विस फंक्शन बनाना होगा

// This is a Server Component to fetch data
async function PostPage({ params }) {
  const { id } = params;
  let post = null;
  let error = null;

  try {
    // Fetch data on the server
    const response = await getPostById(id);
    post = response.data;
  } catch (err) {
    console.error("Failed to fetch post:", err);
    error = "Could not load the post. Please try again later.";
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }
  
  if (!post) {
    return <div className="text-center py-20">Post not found.</div>;
  }

  return <PostDetails post={post} />;
}

export default PostPage;