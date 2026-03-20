"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText, Activity } from 'lucide-react';
import Header from '@/components/Layout/Header';
import IncidentForm, { IncidentFormData } from '@/components/Report/IncidentForm';
import ReportDisplay from '@/components/Report/ReportDisplay';
import CyberLoader from '@/components/Effects/CyberLoader';
import { generateIncidentReport, GeneratedReport } from '@/lib/reportGenerator';

export default function ReportPage() {
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (data: IncidentFormData) => {
    setIsGenerating(true);
    try {
      const generatedReport = await generateIncidentReport(data);
      setReport(generatedReport);
    } catch (error) {
      console.error("Report generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetReport = () => {
    setReport(null);
  };

  return (
    <div className="min-h-screen pb-20">
      

      <div className="max-w-4xl mx-auto px-6 mt-12">
        {/* Navigation / Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <Link 
              href="/" 
              className="group flex items-center gap-2 text-white/40 hover:text-cyber-green transition-colors font-mono text-[10px] tracking-[0.2em] mb-4"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              RETURN_TO_SYSTEM
            </Link>
            <h2 className="text-4xl font-display font-bold text-white tracking-tight">
              {report ? 'Analysis Complete' : 'Threat Assessment'}
            </h2>
            <p className="text-white/40 font-sans text-base max-w-lg leading-relaxed">
              {report 
                ? 'Heuristic analysis engine has finalized the threat assessment report. Review and export for compliance.' 
                : 'Input raw system logs and telemetry data for automated threat categorization and synthesis.'}
            </p>
          </div>

          <div className="flex gap-4">
             <div className="p-5 cyber-panel rounded-2xl flex items-center gap-4 border border-white/5">
                <FileText className="text-cyber-green/60" size={24} />
                <div className="text-right">
                    <p className="text-[9px] font-display font-bold text-white/30 uppercase tracking-widest">Format</p>
                    <p className="text-xs font-mono font-bold text-white">PDF / ISO-27</p>
                </div>
             </div>
             <div className="p-5 cyber-panel rounded-2xl flex items-center gap-4 border border-white/5">
                <Activity size={24} className={report ? "text-cyber-green/60" : "text-cyber-accent-amber/60 animate-pulse"} />
                <div className="text-right">
                    <p className="text-[9px] font-display font-bold text-white/30 uppercase tracking-widest">Engine</p>
                    <p className="text-xs font-mono font-bold text-white">HEURISTIC_V4</p>
                </div>
             </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <CyberLoader />
            </motion.div>
          ) : report ? (
            <motion.div
              key="report"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ReportDisplay report={report} />
              
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={resetReport}
                  className="px-8 py-3 bg-white/5 border border-white/10 text-white font-display text-xs tracking-widest hover:bg-white/10 transition-all rounded"
                >
                  NEW_ANALYSIS_REQUEST
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="cyber-panel p-8 rounded-lg shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-green/5 blur-[100px] pointer-events-none" />
              <IncidentForm onSubmit={handleGenerate} isLoading={isGenerating} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Decoration */}
      <div className="fixed bottom-10 right-10 opacity-10 pointer-events-none -z-10 select-none">
        <h1 className="text-[120px] font-display leading-none text-cyber-green">RECON</h1>
      </div>
    </div>
  );
}
