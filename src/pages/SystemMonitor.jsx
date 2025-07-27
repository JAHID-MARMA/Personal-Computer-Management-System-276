import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCpu, FiActivity, FiHardDrive, FiWifi, FiThermometer } = FiIcons;

const SystemMonitor = () => {
  const [systemData, setSystemData] = useState({
    cpu: [],
    memory: [],
    network: [],
    timestamps: []
  });

  const [currentStats, setCurrentStats] = useState({
    cpu: 45,
    memory: 62,
    disk: 78,
    temperature: 68,
    networkUp: 12.5,
    networkDown: 45.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString();
      
      setCurrentStats(prev => ({
        ...prev,
        cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(95, prev.memory + (Math.random() - 0.5) * 5)),
        temperature: Math.max(45, Math.min(85, prev.temperature + (Math.random() - 0.5) * 3)),
        networkUp: Math.max(0, Math.min(100, prev.networkUp + (Math.random() - 0.5) * 5)),
        networkDown: Math.max(0, Math.min(100, prev.networkDown + (Math.random() - 0.5) * 10))
      }));

      setSystemData(prev => {
        const newData = {
          cpu: [...prev.cpu.slice(-19), currentStats.cpu],
          memory: [...prev.memory.slice(-19), currentStats.memory],
          network: [...prev.network.slice(-19), currentStats.networkDown],
          timestamps: [...prev.timestamps.slice(-19), timeStr]
        };
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentStats.cpu, currentStats.memory, currentStats.networkDown]);

  const getChartOption = (data, color, name) => ({
    title: {
      text: name,
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
      data: systemData.timestamps,
      axisLine: { lineStyle: { color: '#666' } },
      axisLabel: { color: '#999' }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLine: { lineStyle: { color: '#666' } },
      axisLabel: { color: '#999' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [{
      data: data,
      type: 'line',
      smooth: true,
      lineStyle: { color: color, width: 2 },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: color + '40' },
            { offset: 1, color: color + '10' }
          ]
        }
      }
    }]
  });

  const StatCard = ({ title, value, unit, icon, color, subtitle }) => (
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
          <div className="text-3xl font-bold">{value}{unit}</div>
          {subtitle && <div className="text-sm text-gray-400 mt-1">{subtitle}</div>}
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
        <h1 className="text-3xl font-bold mb-2">System Monitor</h1>
        <p className="text-gray-400">Real-time system performance monitoring</p>
      </motion.div>

      {/* Current Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="CPU Usage"
          value={currentStats.cpu}
          unit="%"
          icon={FiCpu}
          color="bg-blue-600"
        />
        <StatCard
          title="Memory Usage"
          value={currentStats.memory}
          unit="%"
          icon={FiActivity}
          color="bg-green-600"
        />
        <StatCard
          title="Disk Usage"
          value={currentStats.disk}
          unit="%"
          icon={FiHardDrive}
          color="bg-yellow-600"
        />
        <StatCard
          title="Temperature"
          value={currentStats.temperature}
          unit="°C"
          icon={FiThermometer}
          color="bg-red-600"
        />
        <StatCard
          title="Network Upload"
          value={currentStats.networkUp}
          unit=" Mbps"
          icon={FiWifi}
          color="bg-purple-600"
        />
        <StatCard
          title="Network Download"
          value={currentStats.networkDown}
          unit=" Mbps"
          icon={FiWifi}
          color="bg-indigo-600"
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
            option={getChartOption(systemData.cpu, '#3B82F6', 'CPU Usage')}
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
            option={getChartOption(systemData.memory, '#10B981', 'Memory Usage')}
            style={{ height: '300px' }}
            theme="dark"
          />
        </motion.div>
      </div>

      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ReactECharts
          option={getChartOption(systemData.network, '#8B5CF6', 'Network Activity')}
          style={{ height: '300px' }}
          theme="dark"
        />
      </motion.div>
    </div>
  );
};

export default SystemMonitor;