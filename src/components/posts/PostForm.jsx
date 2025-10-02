'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createPost } from '@/services/postService'; // API सर्विस
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Button } from '@/components/ui/Button';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { showToast } from '@/components/ui/Toast';
import { CATEGORIES, SKILL_LEVELS, POST_TYPES, LOCATIONS } from '@/utils/constants';
import { postValidation } from '@/utils/validation';

// रियूजेबल स्किल इनपुट कंपोनेंट
const SkillTagInput = ({ field, placeholder, error, className }) => {
  const [inputValue, setInputValue] = useState('');

  const addSkill = () => {
    const value = inputValue.trim();
    if (value && !(field.value || []).includes(value)) {
      field.onChange([...(field.value || []), value]);
      setInputValue('');
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="input-style flex-1"
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
        />
        <Button type="button" variant="outline" size="sm" onClick={addSkill}>
          <FaPlus /> Add
        </Button>
      </div>
      <div className={`flex flex-wrap gap-2 min-h-[40px] p-2 rounded-md border dark:border-gray-700 ${className}`}>
        {(field.value || []).map((skill, index) => (
          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-200">
            {skill}
            <button
              type="button"
              onClick={() => field.onChange(field.value.filter((_, i) => i !== index))}
              className="ml-2 text-primary-600 hover:text-primary-800 dark:text-primary-300"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};


export const PostForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      title: '', description: '', category: '',
      skillsOffered: [], skillsNeeded: [],
      skillLevel: 'Intermediate', postType: 'exchange', location: 'Remote',
      availability: '', duration: '',
    }
  });

  const watchedValues = watch();

  const handleNext = async () => {
    const fieldsToValidate = [
      [], // Step 0 (not used)
      ['title', 'description', 'category', 'postType'], // Step 1
      [], // Step 2 (handled separately)
      ['location', 'availability', 'duration'], // Step 3
    ][currentStep];

    if (currentStep === 2) {
      if (['offering', 'exchange'].includes(watchedValues.postType)) fieldsToValidate.push('skillsOffered');
      if (['seeking', 'exchange'].includes(watchedValues.postType)) fieldsToValidate.push('skillsNeeded');
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

 const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
    
      formData.append('authorId', user.id); 
      formData.append('authorName', user.name);
      formData.append('authorDP', user.avatar);
      
      // ...
      
      const response = await createPost(formData); 
      showToast.success('Post created successfully!');
      router.push(`/post/${response.data.postId}`);

    } catch (error) {
      showToast.error(error.response?.data?.error || 'Failed to create post.');
      console.error("Post creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
};

  const steps = [
    { title: 'Basic Info', desc: 'Tell us about your skill exchange' },
    { title: 'Skills', desc: 'What skills are involved?' },
    { title: 'Details', desc: 'Set the logistics' },
    { title: 'Images', desc: 'Add visuals to your post' }
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700">
      {/* Progress Indicator */}
      {/* ... Progress indicator JSX ... */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div key="step1" /* ... animation props ... */ className="space-y-6">
              {/* Post Type, Title, Description, Category fields ... */}
            </motion.div>
          )}

          {/* Step 2: Skills */}
          {currentStep === 2 && (
            <motion.div key="step2" /* ... animation props ... */ className="space-y-6">
              {['offering', 'exchange'].includes(watchedValues.postType) && (
                <Controller
                  name="skillsOffered"
                  control={control}
                  rules={postValidation.skills}
                  render={({ field, fieldState }) => <SkillTagInput field={field} error={fieldState.error} placeholder="e.g., React, Node.js" className="bg-green-50 dark:bg-green-900/20" />}
                />
              )}
              {['seeking', 'exchange'].includes(watchedValues.postType) && (
                <Controller
                  name="skillsNeeded"
                  control={control}
                  rules={postValidation.skills}
                  render={({ field, fieldState }) => <SkillTagInput field={field} error={fieldState.error} placeholder="e.g., Python, Figma" className="bg-blue-50 dark:bg-blue-900/20" />}
                />
              )}
              <div>
                <label htmlFor="skillLevel" className="block text-sm font-medium mb-1">Skill Level</label>
                <select {...register('skillLevel')} id="skillLevel" className="input-style w-full">
                  {SKILL_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                </select>
              </div>
            </motion.div>
          )}
          
          {/* Step 3: Details */}
          {currentStep === 3 && (
            <motion.div key="step3" /* ... animation props ... */ className="space-y-6">
              {/* Location, Availability, Duration fields ... */}
            </motion.div>
          )}

          {/* Step 4: Images */}
          {currentStep === 4 && (
            <motion.div key="step4" /* ... animation props ... */ >
              <ImageUpload images={images} onImagesChange={setImages} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t mt-6 dark:border-gray-700">
          <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            Previous
          </Button>
          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
              Publish Post
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};