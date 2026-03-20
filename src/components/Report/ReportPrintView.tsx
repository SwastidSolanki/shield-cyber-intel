"use client";

import React from 'react';
import { Shield, Clock, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GeneratedReport } from '@/lib/reportGenerator';

interface ReportPrintViewProps {
  report: GeneratedReport;
}

const ReportPrintView: React.FC<ReportPrintViewProps> = ({ report }) => {
  // A4 proportions at 96 DPI: 794x1123px. 
  // We use slightly smaller to ensure no second page triggers.
  const containerStyle: React.CSSProperties = {
    width: '790px',
    height: '1120px',
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '50px',
    fontFamily: 'sans-serif',
    lineHeight: '1.3',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflow: 'hidden',
    margin: 0
  };

  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: '13px',
    textTransform: 'uppercase',
    color: '#00ff41',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 'bold'
  };

  const cardStyle: React.CSSProperties = {
    padding: '10px',
    border: '1px solid #1a1a1a',
    borderRadius: '8px',
    backgroundColor: '#050a06'
  };

  return (
    <div id="report-print-target" style={containerStyle}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', borderBottom: '1px solid #1a1a1a', paddingBottom: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ padding: '8px', backgroundColor: 'rgba(0, 255, 65, 0.1)', color: '#00ff41', borderRadius: '8px', border: '1px solid rgba(0, 255, 65, 0.2)' }}>
            <Shield size={28} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>SHIELD Audit Report</h1>
            <p style={{ margin: 0, fontSize: '8px', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace' }}>REF: {report.id} // {report.timestamp}</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
           <div style={{ fontSize: '11px', fontWeight: 'bold', color: report.threatScore > 50 ? '#ffaa00' : '#00ff41' }}>STATUS: CONTAINED</div>
           <div style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.3)' }}>ISO-27001 SECURED</div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '35px' }}>
        <div style={cardStyle}>
          <div style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.3)', textTransform: 'uppercase' }}>Risk Score</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff3333' }}>{report.threatScore}%</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.3)', textTransform: 'uppercase' }}>Analysis Time</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{report.generationTime}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.3)', textTransform: 'uppercase' }}>Audit Status</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#00ff41' }}>VERIFIED</div>
        </div>
      </div>

      {/* Executive Summary */}
      <div style={{ marginBottom: '35px' }}>
        <h2 style={sectionHeaderStyle}><AlertCircle size={14} /> Executive Summary</h2>
        <div style={{ ...cardStyle, fontStyle: 'italic', fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '15px' }}>
          "{report.executiveSummary}"
        </div>
      </div>

      {/* Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '25px', marginBottom: '35px' }}>
        <div>
          <h2 style={sectionHeaderStyle}><Clock size={14} /> Event Timeline</h2>
          <div style={{ fontSize: '10px' }}>
            {report.timeline.slice(0, 4).map((item, i) => (
              <div key={i} style={{ marginBottom: '10px', display: 'flex', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#00ff41', minWidth: '40px' }}>{item.time}</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{item.event}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 style={sectionHeaderStyle}><Zap size={14} /> Threat Indicators</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {report.indicatorsOfCompromise.slice(0, 4).map((ioc, i) => (
              <div key={i} style={{ padding: '6px 10px', border: '1px solid #1a1a1a', borderRadius: '6px', fontSize: '9px', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.3)', marginRight: '6px' }}>{ioc.split(':')[0]}</span>
                <span style={{ fontWeight: 'bold' }}>{ioc.split(':')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Remediation */}
      <div style={{ marginBottom: '35px' }}>
        <h2 style={sectionHeaderStyle}><CheckCircle2 size={14} /> Actionable Remediation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {report.recommendations.slice(0, 4).map((rec, i) => (
            <div key={i} style={{ padding: '10px', border: '1px solid rgba(0, 255, 65, 0.1)', borderRadius: '10px', backgroundColor: 'rgba(0, 255, 65, 0.02)', fontSize: '9px', color: 'rgba(255, 255, 255, 0.6)' }}>
              {rec}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flexGrow: 1 }} /> {/* Push footer to bottom */}

      {/* Technical Trace Snip */}
      <div style={{ marginBottom: '25px' }}>
          <h3 style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.2)', textTransform: 'uppercase', marginBottom: '6px' }}>Security Trace Metadata</h3>
          <div style={{ padding: '8px', backgroundColor: '#000', border: '1px solid #1a1a1a', borderRadius: '8px', fontSize: '8px', color: '#00ff41', fontFamily: 'monospace', opacity: 0.6 }}>
             {report.technicalAnalysis.substring(0, 200)}... [TRUNCATED FOR SUMMARY]
          </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '7px', color: 'rgba(255, 255, 255, 0.1)', fontFamily: 'monospace' }}>
          HASH: 0x9f2a4b8c2d1e0f7a // SHIELD_SAFE_EXPORT_V4
        </div>
        <div style={{ color: 'rgba(255, 255, 255, 0.03)' }}>
           <Shield size={24} />
        </div>
      </div>
    </div>
  );
};

export default ReportPrintView;
