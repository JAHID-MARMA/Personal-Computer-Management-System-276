import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCpu, FiHardDrive, FiActivity, FiCheckCircle, FiClock, FiTrendingUp } = FiIcons;

const Dashboard = () => {
  const [systemStats, setSystemStats] = useState({
    cpu: 45,
    memory: 62,
    disk: 78,
    network: 23
  });

  const [quickStats, setQuickStats] = useState({
    tasksCompleted: 12,
    hoursWorked: 6.5,
    filesOrganized: 34,
    productivity: 87
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 5)),
        disk: prev.disk,
        network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 20))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, unit, icon, color, progress }) => (
    <motion.div
      className="glass-effect rounded-xl p-6 card-hover"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <SafeIcon icon={icon} className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{value}{unit}</div>
          <div className="text-gray-400 text-sm">{title}</div>
        </div>
      </div>
      {progress !== undefined && (
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${color.replace('bg-', 'bg-')}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      )}
    </motion.div>
  );

  const QuickActionCard = ({ title, description, icon, color, onClick }) => (
    <motion.div
      className="glass-effect rounded-xl p-6 card-hover cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className={`p-3 rounded-lg ${color} w-fit mb-4`}>
        <SafeIcon icon={icon} className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your system overview.</p>
      </motion.div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="CPU Usage"
          value={systemStats.cpu}
          unit="%"
          icon={FiCpu}
          color="bg-blue-600"
          progress={systemStats.cpu}
        />
        <StatCard
          title="Memory"
          value={systemStats.memory}
          unit="%"
          icon={FiActivity}
          color="bg-green-600"
          progress={systemStats.memory}
        />
        <StatCard
          title="Disk Usage"
          value={systemStats.disk}
          unit="%"
          icon={FiHardDrive}
          color="bg-yellow-600"
          progress={systemStats.disk}
        />
        <StatCard
          title="Network"
          value={systemStats.network}
          unit=" Mbps"
          icon={FiTrendingUp}
          color="bg-purple-600"
          progress={systemStats.network}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tasks Completed"
          value={quickStats.tasksCompleted}
          unit=""
          icon={FiCheckCircle}
          color="bg-emerald-600"
        />
        <StatCard
          title="Hours Worked"
          value={quickStats.hoursWorked}
          unit="h"
          icon={FiClock}
          color="bg-indigo-600"
        />
        <StatCard
          title="Files Organized"
          value={quickStats.filesOrganized}
          unit=""
          icon={FiHardDrive}
          color="bg-orange-600"
        />
        <StatCard
          title="Productivity"
          value={quickStats.productivity}
          unit="%"
          icon={FiTrendingUp}
          color="bg-pink-600"
          progress={quickStats.productivity}
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard
            title="System Cleanup"
            description="Clean temporary files and optimize performance"
            icon={FiActivity}
            color="bg-red-600"
            onClick={() => console.log('System cleanup')}
          />
          <QuickActionCard
            title="Backup Files"
            description="Create backup of important documents"
            icon={FiHardDrive}
            color="bg-blue-600"
            onClick={() => console.log('Backup files')}
          />
          <QuickActionCard
            title="Start Work Session"
            description="Begin tracking your productivity"
            icon={FiClock}
            color="bg-green-600"
            onClick={() => console.log('Start work session')}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;