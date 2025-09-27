'use client'

import { useState } from 'react'
import UserProfile from '@/components/UserProfile'
import StatsCard from '@/components/StatsCard'
import RecentFilesCard from '@/components/RecentFilesCard'
import QuickActionsCard from '@/components/QuickActionsCard'
import ActivityCard from '@/components/ActivityCard'

export default function DashboardPage() {
  const [user] = useState({
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: 'Ocak 2024',
    totalGames: 24,
    winRate: 68
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Hoş geldin, {user.name.split(' ')[0]}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Yeni Oyun
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* User Profile - Left Sidebar */}
          <div className="lg:col-span-1">
            <UserProfile user={user} />
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-3">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatsCard
                title="Toplam Oyun"
                value={user.totalGames}
                icon="🎮"
                color="blue"
                change="+12%"
                changeType="positive"
              />
              <StatsCard
                title="Kazanma Oranı"
                value={`${user.winRate}%`}
                icon="🏆"
                color="green"
                change="+5%"
                changeType="positive"
              />
              <StatsCard
                title="Bu Ay Oynanan"
                value="8"
                icon="📅"
                color="purple"
                change="+2"
                changeType="positive"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Files */}
              <RecentFilesCard />
              
              {/* Quick Actions */}
              <QuickActionsCard />
            </div>

            {/* Activity Feed */}
            <div className="mt-8">
              <ActivityCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
