"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Shield, Activity, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import StatCard from '@/components/Dashboard/StatCard';
import AttackBarChart from '@/components/Dashboard/AttackBarChart';
import SeverityDoughnut from '@/components/Dashboard/SeverityDoughnut';
import TrendLineChart from '@/components/Dashboard/TrendLineChart';
import CyberLoader from '@/components/Effects/CyberLoader';
import { fetchIncidentData } from '@/data/cyberAttackData';
import { DATASET_SOURCE, highLevelStats } from '@/data/realWorldData';
import AttackRadarChart from '@/components/Dashboard/AttackRadarChart';
import ThreatAreaChart from '@/components/Dashboard/ThreatAreaChart';
import VulnerabilityRoots from '@/components/Dashboard/VulnerabilityRoots';
import DefenseTips from '@/components/Dashboard/DefenseTips';
import { ExternalLink, Users } from 'lucide-react';
import gsap from 'gsap';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchIncidentData();
      setData(result);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!loading && mainRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // Hero Animation
        tl.from(".hero-line-1", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power4.out"
        })
          .from(".hero-line-2", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
          }, "-=0.6")
          .from(".hero-cta", {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
          }, "-=0.2")

          // Dashboard Items Staggered Reveal
          .from(".reveal-item", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          }, "-=0.4");
      }, mainRef);

      return () => ctx.revert();
    }
  }, [loading]);

  if (loading) return <CyberLoader />;

  return (
    <div ref={mainRef} className="space-y-16 pb-24 px-4 overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-12 max-w-4xl">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-green/5 border border-cyber-green/10 text-cyber-green text-[10px] font-mono tracking-widest uppercase">
            <Activity size={12} /> Live Threat Intelligence Engine
          </div>
          <h1 className="hero-line-1 text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            SHIELD: Guarding What Matters Most  <span className="text-cyber-green italic">Relentlessly</span>.
          </h1>
          <p className="hero-line-2 text-lg md:text-xl text-white/40 font-sans max-w-2xl leading-relaxed">
            The standard in automated threat telemetry and ISO-compliant analysis. Monitor, analyze, and neutralize threats with SHIELD.
          </p>
          <div className="hero-cta pt-4 flex flex-wrap gap-4">
            <Link href="/report">
              <button className="flex items-center gap-3 px-8 py-4 bg-cyber-green text-cyber-black font-bold rounded-lg hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-cyber-green/20 text-sm">
                <Shield size={20} />
                START INCIDENT AUDIT
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="reveal-item">
          <StatCard label="Total Intelligence Signals" value={highLevelStats.totalSignals} trend="up" icon={<Shield size={24} />} />
        </div>
        <div className="reveal-item">
          <StatCard label="Mean Severity Index" value={highLevelStats.meanSeverity} trend="stable" icon={<Activity size={24} />} />
        </div>
        <div className="reveal-item">
          <StatCard label="Buffer Pressure" value={highLevelStats.bufferPressure} trend="down" icon={<Zap size={24} />} />
        </div>
        <div className="reveal-item">
          <StatCard label="Impacted User Base" value={highLevelStats.usersAffected} trend="up" icon={<Users size={24} />} />
        </div>
      </div>

      {/* Dataset Attribution */}
      <div className="reveal-item flex items-center gap-4 py-4 px-6 cyber-panel rounded-xl border-cyber-green/20 bg-cyber-green/5 w-fit">
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Data_Intel</div>
        <Link
          href={DATASET_SOURCE.url}
          target="_blank"
          className="flex items-center gap-2 text-cyber-green hover:text-white transition-colors group"
        >
          <span className="text-xs font-bold tracking-tight">{DATASET_SOURCE.name}</span>
          <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>

      {/* Primary Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="reveal-item">
          <AttackBarChart />
        </div>
        <div className="reveal-item">
          <AttackRadarChart />
        </div>
        <div className="reveal-item">
          <ThreatAreaChart />
        </div>
        <div className="reveal-item">
          <VulnerabilityRoots />
        </div>
      </div>

      <div className="reveal-item">
        <DefenseTips />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="reveal-item">
          <TrendLineChart />
        </div>
      </div>

      {/* Secondary Metrics & CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="reveal-item lg:col-span-1">
          <SeverityDoughnut />
        </div>
        <div className="reveal-item lg:col-span-2">
          <div className="cyber-panel p-10 rounded-2xl h-full flex flex-col justify-center space-y-8 bg-gradient-to-br from-white/5 to-transparent border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Shield size={200} />
            </div>
            <div className="space-y-4 relative z-10">
              <h3 className="text-3xl font-bold text-white tracking-tight">Need a formal report?</h3>
              <p className="text-white/40 text-base leading-relaxed max-w-xl">
                Our synthesis engine processes raw log data against the latest threat indicators of compromise (IoC) to generate presentation-ready PDF reports.
              </p>
            </div>
            <Link href="/report" className="relative z-10">
              <button className="flex items-center gap-3 text-cyber-green font-bold text-sm tracking-[0.2em] group/btn">
                INITIATE AUDIT SEQUENCE <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
