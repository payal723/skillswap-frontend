
'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from './ui/Modal.jsx';
import { useAppContext } from '../context/AppProvider.js';

export default function CreatePostModal({ isOpen, onClose }) {
  const { addPost } = useAppContext();
  const [desc, setDesc] = useState('');
  const [offering, setOffering] = useState('');
  const [seeking, setSeeking] = useState('');

  const toTags = (str) => str.split(',').map((s) => s.trim()).filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !offering || !seeking) return toast.error('Please fill all fields');

    addPost({
      description: desc,
      offeringSkills: toTags(offering),
      seekingSkills: toTags(seeking),
      authorName: 'John Wick',
      authorDP: 'https://i.pravatar.cc/150?u=john_wick',
      createdAt: new Date().toISOString().split('T')[0],
    });

    toast.success('Your skill swap is live!');
    onClose();
    setDesc(''); setOffering(''); setSeeking('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a New Skill Swap">
      <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Briefly describe your project or what you're looking for."
          />
        </div>

        {/* Offering */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills You're Offering</label>
          <input
            value={offering}
            onChange={(e) => setOffering(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. React, UI Design, SEO"
          />
          <span className="text-xs text-gray-500">Separate skills with commas</span>
        </div>

        {/* Seeking */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills You're Seeking</label>
          <input
            value={seeking}
            onChange={(e) => setSeeking(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Node.js, Marketing, Webflow"
          />
          <span className="text-xs text-gray-500">Separate skills with commas</span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Publish Swap
          </button>
        </div>
      </form>
    </Modal>
  );
}