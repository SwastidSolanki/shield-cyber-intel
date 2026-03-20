"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { Shield, AlertTriangle, Terminal, Server, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface IncidentFormData {
  title: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  logs: string;
  affectedSystems: string;
}

interface IncidentFormProps {
  onSubmit: (data: IncidentFormData) => void;
  isLoading: boolean;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IncidentFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-sans">
      <div className="space-y-2 mb-8">
        <h3 className="text-2xl font-display font-semibold text-white tracking-tight">Report New Incident</h3>
        <p className="text-white/40 text-sm">Provide details below to generate an automated threat assessment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-[10px] font-display font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
             <Info size={12} /> Incident Title
          </label>
          <input
            {...register('title', { required: true })}
            className={cn(
              "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-green/40 transition-all font-sans",
              errors.title && "border-red-500/50"
            )}
            placeholder="e.g., Potential SQL Injection on Auth API"
          />
        </div>

        {/* Severity */}
        <div className="space-y-2">
          <label className="text-[10px] font-display font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle size={12} /> Priority Level
          </label>
          <select
            {...register('severity')}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-green/40 transition-all font-sans appearance-none"
          >
            <option value="Low" className="bg-cyber-surface">Minor / Internal</option>
            <option value="Medium" className="bg-cyber-surface">Moderate / Targeted</option>
            <option value="High" className="bg-cyber-surface">Severe / Critical Infrastructure</option>
            <option value="Critical" className="bg-cyber-surface">Maximum / Potential Data Breach</option>
          </select>
        </div>

        {/* Attack Type */}
        <div className="space-y-2">
          <label className="text-[10px] font-display font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
            <Shield size={12} /> Vector Category
          </label>
          <select
            {...register('type')}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-green/40 transition-all font-sans appearance-none"
          >
            <option value="Phishing" className="bg-cyber-surface">Phishing / Social Engineering</option>
            <option value="DDoS" className="bg-cyber-surface">Denial of Service (DDoS)</option>
            <option value="Ransomware" className="bg-cyber-surface">Ransomware / Extortion</option>
            <option value="SQL Injection" className="bg-cyber-surface">SQL Injection / DB Exposure</option>
            <option value="Brute Force" className="bg-cyber-surface">Credential Stuffing / Brute Force</option>
          </select>
        </div>

        {/* Affected Systems */}
        <div className="space-y-2">
          <label className="text-[10px] font-display font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
            <Server size={12} /> Target Scope
          </label>
          <input
            {...register('affectedSystems')}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-green/40 transition-all font-sans"
            placeholder="e.g., DB-CLUSTER-01, AUTH-API-V2"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-[10px] font-display font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
          Summary of Events
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-green/40 transition-all font-sans"
          placeholder="Describe the anomalies detected..."
        />
      </div>

      {/* Raw Logs */}
      <div className="space-y-2">
        <label className="text-[10px] font-display font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
          <Terminal size={12} /> Raw System Logs
        </label>
        <textarea
          {...register('logs')}
          rows={6}
          className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-cyber-green/80 font-mono text-xs focus:outline-none focus:border-cyber-green/30 transition-all"
          placeholder="Paste relevant log entries here..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-cyber-green text-cyber-black font-display font-bold text-sm tracking-[0.2em] rounded-lg hover:bg-white transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
      >
        {isLoading ? 'Processing Neural Vectors...' : 'Synthesize Report'}
      </button>
    </form>
  );
};

export default IncidentForm;
