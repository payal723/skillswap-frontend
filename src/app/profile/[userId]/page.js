import { UserProfile } from '@/components/profile/UserProfile';

async function UserProfilePage({ params }) {
  const { userId } = params;


  const dummyUserData = {
    id: userId,
    name: 'Another User',
    bio: 'Designer and Developer',
    rating: 4.8,
  };

  return (
    <UserProfile
      userId={userId}
      userData={dummyUserData}
      posts={[]}
      reviews={[]}
    />
  );
}

export default UserProfilePage;