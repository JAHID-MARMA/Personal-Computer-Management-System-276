import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiPause, FiSquare, FiClock, FiTrendingUp, FiCalendar, FiTarget } = FiIcons;

const WorkTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSession, setCurrentSession] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);
  const [currentProject, setCurrentProject] = useState('General Work');

  const [sessions] = useState([
    { id: 1, project: 'Web Development', duration: 120, date: '2024-01-12', completed: true },
    { id: 2, project: 'Documentation', duration: 90, date: '2024-01-12', completed: true },
    { id: 3, project: 'Code Review', duration: 45, date: '2024-01-11', completed: true },
    { id: 4, project: 'Planning', duration: 60, date: '2024-01-11', completed: true },
  ]);

  const [weeklyData] = useState([
    { day: 'Mon', hours: 8.5 },
    { day: 'Tue', hours: 7.2 },
    { day: 'Wed', hours: 9.1 },
    { day: 'Thu', hours: 6.8 },
    { day: 'Fri', hours: 8.0 },
    { day: 'Sat', hours: 4.5 },
    { day: 'Sun', hours: 2.0 },
  ]);

  const [projects] = useState([
    { name: 'Web Development', hours: 45.5, color: '#3B82F6' },
    { name: 'Documentation', hours: 12.3, color: '#10B981' },
    { name: 'Code Review', hours: 8.7, color: '#F59E0B' },
    { name: 'Planning', hours: 15.2, color: '#8B5CF6' },
    { name: 'General Work', hours: 18.9, color: '#EF4444' },
  ]);

  useEffect(() => {
    let interval;
    if (isTracking && !isPaused) {
      interval = setInterval(() => {
        setCurrentSession(prev => prev + 1);
        setTodayTotal(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, isPaused]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTracking = () => {
    setIsTracking(true);
    setIsPaused(false);
  };

  const pauseTracking = () => {
    setIsPaused(!isPaused);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setIsPaused(false);
    setCurrentSession(0);
  };

  const getWeeklyChartOption = () => ({
    title: {
      text: 'Weekly Hours',
      textStyle: { color: '#fff', fontSize: 16 }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.8)',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: weeklyData.map(d => d.day),
      axisLine: { lineStyle: { color: '#666' } },
      axisLabel: { color: '#999' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#666' } },
      axisLabel: { color: '#999' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [{
      data: weeklyData.map(d => d.hours),
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#3B82F6' },
            { offset: 1, color: '#1E40AF' }
          ]
        }
      },
      barWidth: '60%'
    }]
  });

  const getProjectChartOption = () => ({
    title: {
      text: 'Project Distribution',
      textStyle: { color: '#fff', fontSize: 16 }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.8)',
      textStyle: { color: '#fff' }
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '60%'],
      data: projects.map(p => ({
        value: p.hours,
        name: p.name,
        itemStyle: { color: p.color }
      })),
      label: {
        color: '#fff'
      }
    }]
  });

  const StatCard = ({ title, value, icon, color }) => (
    <motion.div
      className="glass-effect rounded-xl p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-2">
            <div className={`p-2 rounded-lg ${color} mr-3`}>
              <SafeIcon icon={icon} className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <div className="text-3xl font-bold">{value}</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Work Tracker</h1>
        <p className="text-gray-400">Track your productivity and manage work sessions</p>
      </motion.div>

      {/* Timer Section */}
      <motion.div
        className="glass-effect rounded-xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-6">
          <select
            value={currentProject}
            onChange={(e) => setCurrentProject(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {projects.map(project => (
              <option key={project.name} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-6xl font-mono font-bold mb-8 text-blue-400">
          {formatTime(currentSession)}
        </div>

        <div className="flex justify-center space-x-4">
          {!isTracking ? (
            <button
              onClick={startTracking}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg flex items-center space-x-2 text-lg transition-colors"
            >
              <SafeIcon icon={FiPlay} className="w-6 h-6" />
              <span>Start</span>
            </button>
          ) : (
            <>
              <button
                onClick={pauseTracking}
                className={`${isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white px-8 py-4 rounded-lg flex items-center space-x-2 text-lg transition-colors`}
              >
                <SafeIcon icon={isPaused ? FiPlay : FiPause} className="w-6 h-6" />
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
              <button
                onClick={stopTracking}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg flex items-center space-x-2 text-lg transition-colors"
              >
                <SafeIcon icon={FiSquare} className="w-6 h-6" />
                <span>Stop</span>
              </button>
            </>
          )}
        </div>

        {isTracking && (
          <div className="mt-4 text-gray-400">
            {isPaused ? 'Session paused' : 'Session in progress...'}
          </div>
        )}
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Total"
          value={formatTime(todayTotal)}
          icon={FiClock}
          color="bg-blue-600"
        />
        <StatCard
          title="This Week"
          value="46.1h"
          icon={FiCalendar}
          color="bg-green-600"
        />
        <StatCard
          title="Average Daily"
          value="6.6h"
          icon={FiTrendingUp}
          color="bg-purple-600"
        />
        <StatCard
          title="Goal Progress"
          value="92%"
          icon={FiTarget}
          color="bg-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ReactECharts
            option={getWeeklyChartOption()}
            style={{ height: '300px' }}
            theme="dark"
          />
        </motion.div>

        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ReactECharts
            option={getProjectChartOption()}
            style={{ height: '300px' }}
            theme="dark"
          />
        </motion.div>
      </div>

      {/* Recent Sessions */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-4">Recent Sessions</h3>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div>
                  <h4 className="font-medium">{session.project}</h4>
                  <p className="text-sm text-gray-400">{session.date}</p>
                </div>
              </div>
              <div className="text-lg font-mono">
                {formatTime(session.duration * 60)}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WorkTracker;