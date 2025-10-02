'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { SkillTags } from './SkillTags';
import { ImageUpload } from '@/components/ui/ImageUpload'; // इसे इम्पोर्ट करें
import { useState } from 'react';
import toast from 'react-hot-toast';

export const EditProfile = ({ userData, onSave, onCancel }) => {
  const [images, setImages] = useState(userData.avatar ? [{ preview: userData.avatar }] : []);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: userData.name || '',
      bio: userData.bio || '',
      location: userData.location?.city || '',
      skillsToTeach: userData.skillsToTeach || [],
      skillsToLearn: userData.skillsToLearn || [],
    },
  });

  const onSubmit = async (data) => {
    try {
      // API कॉल में भेजने के लिए पूरा डेटा ऑब्जेक्ट बनाएं
      const updatedProfileData = {
        ...data,
        avatar: images.length > 0 ? images[0] : null // यहाँ इमेज अपलोड लॉजिक आएगा
      };

      // यहाँ आप API सर्विस को कॉल करेंगे
      // await updateProfile(userData.id, updatedProfileData);
      
      toast.success('Profile updated successfully!');
      onSave(updatedProfileData); // पैरेंट को अपडेटेड डेटा भेजें
    } catch (error) {
      toast.error('Failed to update profile.');
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Your Profile</h2>
      
      {/* Avatar Upload */}
      <div className="flex justify-center mb-6">
          <ImageUpload 
            images={images}
            onImagesChange={setImages}
            maxImages={1} // प्रोफाइल पिक्चर के लिए सिर्फ 1
          />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Info */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            {...register('bio', { maxLength: { value: 200, message: "Bio cannot exceed 200 characters"} })}
            id="bio"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500"
          />
           {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
          <input
            {...register('location')}
            type="text"
            id="location"
            placeholder="e.g., New York, USA"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500"
          />
        </div>

        <hr className="dark:border-gray-700"/>

        {/* Skills Section */}
        <SkillTags
          name="skillsToTeach"
          control={control}
          label="Skills you can teach"
          placeholder="Add a skill you're good at"
        />
        
        <SkillTags
          name="skillsToLearn"
          control={control}
          label="Skills you want to learn"
          placeholder="Add a skill you're interested in"
        />
        
        <hr className="dark:border-gray-700"/>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};