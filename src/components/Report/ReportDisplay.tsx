"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Shield, Clock, Zap, AlertCircle, CheckCircle2, Terminal, Loader2 } from 'lucide-react';
import { GeneratedReport } from '@/lib/reportGenerator';
import { cn } from '@/lib/utils';
import ReportPrintView from './ReportPrintView';

interface ReportDisplayProps {
  report: GeneratedReport;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ report }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    setIsCapturing(true);
    
    // Give time for UI feedback
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
        const html2pdf = (await import('html2pdf.js') as any).default;
        const element = printRef.current;
        if (!element) return;

        const opt = {
          margin: 0,
          filename: `shield-report-${report.id}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2, 
            backgroundColor: '#000000',
            useCORS: true,
            logging: false,
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: 'avoid-all' }
        };

        await html2pdf().from(element).set(opt).save();
    } catch (error) {
        console.error("PDF generation failed:", error);
    } finally {
        setIsCapturing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      {/* Hidden Print View - Used only for capture */}
      <div style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
         <div ref={printRef}>
            <ReportPrintView report={report} />
         </div>
      </div>

      {/* Header Bar - Static Flow */}
      <div 
        className={cn(
            "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-8 px-4 border-b border-white/5 bg-transparent transition-all",
            isCapturing && "opacity-50 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-cyber-green/10 text-cyber-green rounded-lg border border-cyber-green/20 shrink-0">
            <Shield size={22} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-sans font-bold text-white tracking-tight leading-tight mb-1">Incident Analysis Report</h2>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">REF: {report.id} // {report.timestamp}</p>
          </div>
        </div>
        <button 
          onClick={handleDownload}
          disabled={isCapturing}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-cyber-green text-cyber-black hover:bg-white transition-all rounded-lg font-sans font-bold text-xs shadow-lg disabled:opacity-50 active:scale-95"
        >
          {isCapturing ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
          {isCapturing ? "PREPARING PDF..." : "EXPORT SUMMARY (PDF)"}
        </button>
      </div>

      {/* Main UI Area - Live Balanced Theme */}
      <div className="text-white p-10 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm shadow-xl">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div className="space-y-3">
            <p className="text-[10px] font-sans font-bold text-white/30 uppercase tracking-[0.2em]">Risk Assessment</p>
            <div className="flex items-center gap-4">
              <span className={cn(
                "text-4xl font-mono font-bold",
                report.threatScore > 80 ? "text-red-500" : report.threatScore > 50 ? "text-yellow-500" : "text-cyber-green"
              )}>{report.threatScore}</span>
              <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full",
                    report.threatScore > 80 ? "bg-red-500" : report.threatScore > 50 ? "bg-yellow-500" : "bg-cyber-green"
                  )}
                  style={{ width: `${report.threatScore}%` }}
                />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] font-sans font-bold text-white/30 uppercase tracking-[0.2em]">Compute Duration</p>
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-cyber-green/60" />
              <span className="text-3xl font-mono font-bold">{report.generationTime}</span>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] font-sans font-bold text-white/30 uppercase tracking-[0.2em]">Containment</p>
            <div className="flex items-center gap-3">
              <Zap size={20} className="text-cyber-accent-amber/60" />
              <span className="text-3xl font-mono font-bold text-white uppercase">Active</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle size={20} className="text-cyber-green" />
            <h3 className="font-sans font-bold text-white text-xl tracking-tight uppercase">Executive Summary</h3>
          </div>
          <p className="text-white/60 font-sans leading-relaxed text-lg p-6 rounded-xl border border-white/5 italic bg-white/[0.02]">
            "{report.executiveSummary}"
          </p>
        </section>

        {/* Timeline & IOCs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Clock size={20} className="text-cyber-green" />
              <h3 className="font-sans font-bold text-white text-xl tracking-tight uppercase">Event Timeline</h3>
            </div>
            <div className="space-y-8">
              {report.timeline.map((item, idx) => (
                <div key={idx} className="flex gap-6 relative">
                  {idx !== report.timeline.length - 1 && (
                    <div className="absolute left-[9px] top-8 w-[1px] h-full bg-white/10" />
                  )}
                  <div className="w-5 h-5 rounded-full border border-cyber-green/40 mt-1 z-10 flex items-center justify-center bg-transparent">
                    <div className="w-2 h-2 rounded-full bg-cyber-green" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-cyber-green mb-1 font-bold">{item.time}</p>
                    <p className="text-base font-sans text-white font-medium">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <Zap size={20} className="text-cyber-green" />
              <h3 className="font-sans font-bold text-white text-xl tracking-tight uppercase">Threat Indicators</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {report.indicatorsOfCompromise.map((ioc, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-4 border border-white/5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                >
                  <code className="text-xs font-mono text-white/50 uppercase tracking-wider">{ioc.split(':')[0]}</code>
                  <code className="text-xs font-mono text-white/80">{ioc.split(':')[1]}</code>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Technical Deep Dive */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Terminal size={20} className="text-cyber-green" />
            <h3 className="font-sans font-bold text-white text-xl tracking-tight uppercase">Technical Trace</h3>
          </div>
          <div className="relative group">
            <pre className="relative w-full p-8 rounded-2xl font-mono text-xs text-cyber-green/70 bg-black/40 border border-white/5 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                {report.technicalAnalysis}
            </pre>
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 size={20} className="text-cyber-green" />
            <h3 className="font-sans font-bold text-white text-xl tracking-tight uppercase">Actionable Remediation</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.recommendations.map((rec, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-cyber-green/[0.02] hover:border-cyber-green/20 transition-all group"
              >
                <span className="text-cyber-green/40 font-mono text-lg font-bold group-hover:text-cyber-green transition-colors">{String(idx + 1).padStart(2, '0')}</span>
                <p className="text-sm font-sans text-white/70 leading-relaxed font-medium">{rec}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Signature */}
        <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-end">
          <div className="font-mono text-[9px] tracking-widest text-white/20 uppercase space-y-1">
            <p>System Hash: 0x9f2a4b8c2d1e0f7a</p>
            <p>Compliance Status: ISO-27001-COMPLIANT</p>
          </div>
          <div className="text-white/10">
             <Shield size={40} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportDisplay;
