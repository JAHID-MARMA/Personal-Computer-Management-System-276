import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiCheck, FiTrash2, FiEdit3, FiClock, FiFlag, FiCalendar } = FiIcons;

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the new feature',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-15',
      category: 'work'
    },
    {
      id: 2,
      title: 'System backup',
      description: 'Backup important files and configurations',
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-01-10',
      category: 'maintenance'
    },
    {
      id: 3,
      title: 'Team meeting preparation',
      description: 'Prepare slides and agenda for weekly team meeting',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-01-12',
      category: 'work'
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: 'work'
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        status: 'pending'
      };
      setTasks([...tasks, task]);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        category: 'work'
      });
      setShowAddForm(false);
    }
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-yellow-400';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const TaskCard = ({ task }) => (
    <motion.div
      className="glass-effect rounded-xl p-6 card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <button
            onClick={() => toggleTaskStatus(task.id)}
            className={`p-2 rounded-lg transition-colors ${
              task.status === 'completed' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          >
            <SafeIcon icon={FiCheck} className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${
              task.status === 'completed' ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </h3>
            <p className="text-gray-400 text-sm mt-1">{task.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition-colors"
          >
            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiCalendar} className="w-4 h-4" />
            <span>{task.dueDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiFlag} className="w-4 h-4" />
            <span className="capitalize">{task.category}</span>
          </div>
        </div>
        <span className={`capitalize ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>
    </motion.div>
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Task Manager</h1>
          <p className="text-gray-400">Organize and track your tasks efficiently</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex space-x-4">
        {['all', 'pending', 'in-progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {status} ({status === 'all' ? tasks.length : tasks.filter(t => t.status === status).length})
          </button>
        ))}
      </div>

      {/* Add Task Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="glass-effect rounded-xl p-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="learning">Learning</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Enter task description"
              />
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={addTask}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </AnimatePresence>
        {filteredTasks.length === 0 && (
          <motion.div
            className="text-center py-12 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <SafeIcon icon={FiCheck} className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No tasks found for the selected filter.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;