import React, { useState } from 'react';
import { UserData } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Plus, User, Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EmployerDashboardProps {
  user: UserData;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ user }) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [skills, setSkills] = useState('');
  const navigate = useNavigate();

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        employer_id: user.id,
        title,
        description,
        salary_min: Number(salaryMin),
        salary_max: Number(salaryMax),
        job_type: 'Full-time',
        experience_level: 'Intermediate',
        skills: skills.split(',').map(s => s.trim()).filter(s => s !== '')
      })
    });
    if (res.ok) {
      setShowPostModal(false);
      setTitle('');
      setDescription('');
      setSalaryMin('');
      setSalaryMax('');
      setSkills('');
      alert('Job posted! Awaiting admin approval.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Employer Dashboard</h1>
        <button 
          onClick={() => setShowPostModal(true)}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100"
        >
          <Plus className="w-5 h-5" />
          Post New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Recent Applicants</h2>
            <div className="text-center py-12 text-zinc-500">
              No applicants yet. Post a job to start receiving applications.
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-xl shadow-indigo-100">
            <h3 className="text-lg font-bold mb-2">Current Plan: {user.subscription?.plan || 'Free'}</h3>
            <p className="text-indigo-100 text-sm mb-6">
              {user.subscription?.plan === 'Enterprise' 
                ? 'Unlimited job posts and candidate searches.' 
                : 'Upgrade for more job posts and premium features.'}
            </p>
            <button 
              onClick={() => navigate('/pricing')}
              className="w-full bg-white text-indigo-600 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-all"
            >
              {user.subscription?.plan ? 'Manage Subscription' : 'Upgrade Plan'}
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link to="/dashboard/employer/profile" className="w-full text-left text-sm text-zinc-600 hover:text-indigo-600 flex items-center gap-2">
                <User className="w-4 h-4" /> Company Profile
              </Link>
              <button className="w-full text-left text-sm text-zinc-600 hover:text-indigo-600 flex items-center gap-2">
                <Settings className="w-4 h-4" /> Billing Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      <AnimatePresence>
        {showPostModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPostModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-zinc-900">Post a New Job</h2>
                <button onClick={() => setShowPostModal(false)} className="text-zinc-400 hover:text-zinc-600"><X /></button>
              </div>
              <form onSubmit={handlePostJob} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Job Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Executive Virtual Assistant"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                    placeholder="Describe the role and responsibilities..."
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Min Salary ($/mo)</label>
                    <input 
                      type="number" 
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Max Salary ($/mo)</label>
                    <input 
                      type="number" 
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="1500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Required Skills (comma separated)</label>
                  <input 
                    type="text" 
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. React, Node.js, Design"
                  />
                </div>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  Publish Job Listing
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
