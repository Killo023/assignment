import React from 'react';

const testimonials = [
  { name: 'Sarah M.', role: 'CS Student', content: 'AssignmentAI helped me boost my grades and save time. The feedback is spot on!', avatar: '/avatars/sarah.jpg' },
  { name: 'Michael R.', role: 'Business Major', content: 'Finally, an AI tool that understands academic requirements. The analysis is thorough.', avatar: '/avatars/michael.jpg' },
  { name: 'Emily T.', role: 'Engineering Student', content: 'A game-changer for my studies. Helps me understand complex topics.', avatar: '/avatars/emily.jpg' },
];

const logos = [
  '/logos/nyt.svg', '/logos/forbes.svg', '/logos/techcrunch.svg', '/logos/edtech.svg'
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What Students Say</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-10">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl p-6 shadow-lg max-w-xs text-center flex flex-col items-center">
              <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full mb-3 object-cover" />
              <div className="font-semibold mb-1">{t.name}</div>
              <div className="text-blue-300 text-xs mb-2">{t.role}</div>
              <p className="text-gray-300 text-sm mb-2">“{t.content}”</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          {logos.map((logo, i) => (
            <img key={i} src={logo} alt="Logo" className="h-8" />
          ))}
        </div>
      </div>
    </section>
  );
} 