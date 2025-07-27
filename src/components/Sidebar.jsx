import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiHome, FiMonitor, FiCheckSquare, FiFolder, FiClock, FiSettings } = FiIcons;

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/system', icon: FiMonitor, label: 'System Monitor' },
    { path: '/tasks', icon: FiCheckSquare, label: 'Task Manager' },
    { path: '/files', icon: FiFolder, label: 'File Manager' },
    { path: '/work', icon: FiClock, label: 'Work Tracker' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-gray-800 border-r border-gray-700 transition-all duration-300 z-50 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <h1 className="text-xl font-bold gradient-text">Personal MCP</h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <SafeIcon icon={FiMenu} className="w-5 h-5" />
        </button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <SafeIcon icon={item.icon} className="w-5 h-5" />
            {!collapsed && (
              <span className="ml-3 font-medium">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;