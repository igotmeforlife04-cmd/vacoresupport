import React, { useState, useEffect } from 'react';
import { UserData } from '../../types';
import { Link } from 'react-router-dom';
import { User, DollarSign, Clock } from 'lucide-react';

interface WorkerDashboardProps {
  user: UserData;
}

export const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ user }) => {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/jobs').then(res => res.json()).then(setJobs);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-zinc-900 mb-8">Welcome, {user.first_name || user.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900">Recommended Jobs</h2>
            <Link to="/jobs" className="text-sm font-bold text-indigo-600 hover:underline">View all</Link>
          </div>
          
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-zinc-200 text-zinc-500">
                No jobs available right now. Check back later!
              </div>
            ) : (
              jobs.slice(0, 5).map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                      <p className="text-sm text-zinc-500 font-medium">{job.company_name}</p>
                    </div>
                    {job.is_featured ? (
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">Featured</span>
                    ) : null}
                  </div>
                  <p className="text-zinc-600 text-sm line-clamp-2 mb-4">{job.description}</p>
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <div className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> ${job.salary_min} - ${job.salary_max}/mo</div>
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.job_type}</div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all">Apply Now</button>
                    <button className="px-3 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-all"><Clock className="w-5 h-5 text-zinc-400" /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-zinc-400" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">{user.first_name || user.name}</h3>
                <p className="text-xs text-zinc-500">Profile Strength: 45%</p>
              </div>
            </div>
            <div className="w-full bg-zinc-100 h-2 rounded-full mb-6">
              <div className="bg-indigo-600 h-2 rounded-full w-[45%]" />
            </div>
            <Link to="/dashboard/worker/profile" className="block text-center w-full border border-indigo-600 text-indigo-600 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-all">
              Complete Profile
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-4">Your Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Applications Sent</span>
                <span className="font-bold text-zinc-900">0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Profile Views</span>
                <span className="font-bold text-zinc-900">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Shortlisted</span>
                <span className="font-bold text-zinc-900">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
