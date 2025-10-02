import { PostDetails } from '@/components/posts/PostDetails';
import { getPostById } from '@/services/postService';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  try {
    const { id } = params;
    const { data: post } = await getPostById(id);
    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }
    return {
      title: `${post.title} | SkillSwap`,
      description: post.description.substring(0, 150), 
    };
  } catch (error) {
    return {
      title: 'Error',
      description: 'Could not load post details.'
    }
  }
}


async function SinglePostPage({ params }) {
  const { id } = params;
  let post = null;
  let error = null;

  try {
    const response = await getPostById(id);
    post = response.data;
  } catch (err) {
    console.error(`Failed to fetch post with id ${id}:`, err);
    error = "Could not load the post. It might have been removed or the server is unavailable.";
  }

  if (!post) {
    notFound();
  }

  if (error) {
    return (
      <div className="container mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">An Error Occurred</h2>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <PostDetails post={post} />
    </div>
  );
}

export default SinglePostPage;