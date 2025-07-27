import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SystemMonitor from './pages/SystemMonitor';
import TaskManager from './pages/TaskManager';
import FileManager from './pages/FileManager';
import WorkTracker from './pages/WorkTracker';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/system" element={<SystemMonitor />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/files" element={<FileManager />} />
            <Route path="/work" element={<WorkTracker />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;