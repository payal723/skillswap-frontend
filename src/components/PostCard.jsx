
import React from 'react';
import Image from 'next/image';
import { FaArrowRight, FaGift, FaBullseye } from 'react-icons/fa';

const SkillTag = ({ skill, type }) => {
  const base = 'text-xs font-medium px-3 py-1 rounded-full border';
  const colors = {
    offering: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    seeking: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return <span className={`${base} ${colors[type]}`}>{skill}</span>;
};

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 transition hover:shadow-md hover:-translate-y-0.5">

      {/* Author */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={post.authorDP}
          alt={post.authorName}
          width={44}
          height={44}
          className="rounded-full border border-gray-200"
        />
        <div>
          <p className="font-semibold text-gray-900">{post.authorName}</p>
          <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-5 leading-relaxed">{post.description}</p>

      {/* Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
            <FaGift className="text-emerald-500" /> Offering
          </h4>
          <div className="flex flex-wrap gap-2">
            {post.offeringSkills.map((s) => <SkillTag key={s} skill={s} type="offering" />)}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
            <FaBullseye className="text-purple-500" /> Seeking
          </h4>
          <div className="flex flex-wrap gap-2">
            {post.seekingSkills.map((s) => <SkillTag key={s} skill={s} type="seeking" />)}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 text-right">
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition">
          Propose Swap
          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </div>
  );
}