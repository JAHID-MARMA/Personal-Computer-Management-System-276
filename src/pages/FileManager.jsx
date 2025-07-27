import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFolder, FiFile, FiSearch, FiGrid, FiList, FiDownload, FiTrash2, FiEdit3, FiPlus } = FiIcons;

const FileManager = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPath, setCurrentPath] = useState('/home/user');

  const [files] = useState([
    { id: 1, name: 'Documents', type: 'folder', size: '--', modified: '2024-01-10', items: 24 },
    { id: 2, name: 'Downloads', type: 'folder', size: '--', modified: '2024-01-12', items: 15 },
    { id: 3, name: 'Pictures', type: 'folder', size: '--', modified: '2024-01-08', items: 156 },
    { id: 4, name: 'Videos', type: 'folder', size: '--', modified: '2024-01-05', items: 8 },
    { id: 5, name: 'project-report.pdf', type: 'file', size: '2.4 MB', modified: '2024-01-11' },
    { id: 6, name: 'presentation.pptx', type: 'file', size: '8.7 MB', modified: '2024-01-09' },
    { id: 7, name: 'data-analysis.xlsx', type: 'file', size: '1.2 MB', modified: '2024-01-07' },
    { id: 8, name: 'backup-config.json', type: 'file', size: '156 KB', modified: '2024-01-06' },
  ]);

  const [storageStats] = useState({
    total: 1000,
    used: 750,
    free: 250
  });

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (file) => {
    if (file.type === 'folder') return FiFolder;
    const ext = file.name.split('.').pop()?.toLowerCase();
    return FiFile;
  };

  const getFileTypeColor = (file) => {
    if (file.type === 'folder') return 'text-blue-400';
    const ext = file.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'text-red-400';
      case 'doc':
      case 'docx': return 'text-blue-400';
      case 'xls':
      case 'xlsx': return 'text-green-400';
      case 'ppt':
      case 'pptx': return 'text-orange-400';
      case 'json': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const FileCard = ({ file }) => (
    <motion.div
      className="glass-effect rounded-xl p-4 card-hover cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex flex-col items-center text-center">
        <SafeIcon 
          icon={getFileIcon(file)} 
          className={`w-12 h-12 mb-3 ${getFileTypeColor(file)}`} 
        />
        <h3 className="font-medium text-sm mb-1 truncate w-full" title={file.name}>
          {file.name}
        </h3>
        <div className="text-xs text-gray-400">
          {file.type === 'folder' ? `${file.items} items` : file.size}
        </div>
        <div className="text-xs text-gray-500 mt-1">{file.modified}</div>
      </div>
      <div className="flex justify-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 rounded bg-blue-600 hover:bg-blue-700 transition-colors">
          <SafeIcon icon={FiEdit3} className="w-3 h-3" />
        </button>
        <button className="p-1 rounded bg-green-600 hover:bg-green-700 transition-colors">
          <SafeIcon icon={FiDownload} className="w-3 h-3" />
        </button>
        <button className="p-1 rounded bg-red-600 hover:bg-red-700 transition-colors">
          <SafeIcon icon={FiTrash2} className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );

  const FileRow = ({ file }) => (
    <motion.div
      className="glass-effect rounded-lg p-4 flex items-center justify-between card-hover cursor-pointer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center space-x-4">
        <SafeIcon 
          icon={getFileIcon(file)} 
          className={`w-6 h-6 ${getFileTypeColor(file)}`} 
        />
        <div>
          <h3 className="font-medium">{file.name}</h3>
          <div className="text-sm text-gray-400">
            {file.type === 'folder' ? `${file.items} items` : file.size}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-400">{file.modified}</div>
        <div className="flex space-x-2">
          <button className="p-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors">
            <SafeIcon icon={FiEdit3} className="w-4 h-4" />
          </button>
          <button className="p-2 rounded bg-green-600 hover:bg-green-700 transition-colors">
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
          </button>
          <button className="p-2 rounded bg-red-600 hover:bg-red-700 transition-colors">
            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
          </button>
        </div>
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
          <h1 className="text-3xl font-bold mb-2">File Manager</h1>
          <p className="text-gray-400">Organize and manage your files efficiently</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>New Folder</span>
        </button>
      </motion.div>

      {/* Storage Stats */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">Storage Usage</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Used: {storageStats.used} GB</span>
          <span className="text-sm text-gray-400">Free: {storageStats.free} GB</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(storageStats.used / storageStats.total) * 100}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <div className="text-sm text-gray-400">
            {currentPath}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <SafeIcon icon={FiGrid} className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <SafeIcon icon={FiList} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* File Grid/List */}
      <div className="min-h-96">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFiles.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </div>
        )}

        {filteredFiles.length === 0 && (
          <motion.div
            className="text-center py-12 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <SafeIcon icon={FiSearch} className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No files found matching your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FileManager;