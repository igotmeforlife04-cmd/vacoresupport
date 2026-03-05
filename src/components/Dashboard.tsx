import React from 'react';
import { UserData } from '../types';

interface DashboardProps {
  user: UserData | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">
            Welcome to your VA Core Support Dashboard
          </h1>
          <p className="text-zinc-600">
            {user ? `Hello, ${user.first_name || user.name}!` : 'Welcome!'}
          </p>
        </div>
      </div>
    </div>
  );
};
