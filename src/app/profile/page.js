'use client';

import { useAuth } from '@/context/AuthContext';
import { UserProfile } from '@/components/profile/UserProfile';
import { EditProfile } from '@/components/profile/EditProfile';
import { useState, useEffect } from 'react';


const MyProfilePage = () => {
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    if (user) {
      setUserData(user);
     
    }
  }, [user]);

  const handleSave = (updatedData) => {
    setUserData(prev => ({ ...prev, ...updatedData }));
    setIsEditing(false);
  };
  
  if (loading) {
    return <div>Loading profile...</div>;
  }
  
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      {isEditing ? (
        <EditProfile 
          userData={userData}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <UserProfile
          userId={user.id}
          userData={userData}
          posts={posts}
          reviews={reviews} 
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};

export default MyProfilePage;