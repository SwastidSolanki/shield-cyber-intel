"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Shield, Activity, Zap, ArrowRight, ExternalLink, Users } from 'lucide-react';
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
import { useScroll, useTransform, motion } from 'framer-motion';
import gsap from 'gsap';
import TextDecoder from '@/components/Effects/TextDecoder';

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Define transforms unconditionally to follow Rules of Hooks
  const scrollOpacity = useTransform(scrollY, [50, 150], [0, 1]);
  const scrollTranslateY = useTransform(scrollY, [50, 150], [20, 0]);
  const scrollScale = useTransform(scrollY, [50, 150], [0.95, 1]);

  // Determine actual values based on device type (client-side only)
  const statsOpacity = isMobile ? scrollOpacity : 1;
  const statsTranslateY = isMobile ? scrollTranslateY : 0;
  const statsScale = isMobile ? scrollScale : 1;

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
        tl.from(".hero-line-2", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.5
          })
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
    <div ref={mainRef} className="space-y-24 pb-24 px-4 overflow-x-hidden relative">
      {/* Hero Section */}
      <section className="pt-16 max-w-5xl relative z-10">
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-green/5 border border-cyber-green/20 text-cyber-green text-[10px] font-mono tracking-[0.3em] uppercase glow-border"
          >
            <Activity size={14} className="animate-pulse" /> Live Threat Intelligence Engine
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-[-0.05em] text-white leading-[0.95]">
            <TextDecoder text="SHIELD: GUARDING" className="block" />
            <span className="text-cyber-green italic">
              <TextDecoder text="WHAT MATTERS MOST" />
            </span>
          </h1>
          
          <p className="hero-line-2 text-xl md:text-2xl text-white/40 font-sans max-w-2xl leading-relaxed">
            The global standard in automated threat telemetry and ISO-compliant logic. Monitor, analyze, and neutralize with <span className="text-white/80">SHIELD Engine v4.0</span>.
          </p>

          <div className="hero-cta pt-6 flex flex-wrap gap-6">
            <Link href="/report">
              <button className="group relative flex items-center gap-4 px-10 py-5 bg-cyber-green text-cyber-black font-black rounded-xl hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,65,0.3)] text-sm tracking-widest uppercase">
                <Shield size={22} />
                START INCIDENT AUDIT
                <div className="absolute inset-0 rounded-xl border-2 border-cyber-green scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Stats - Conditional Reveal on Scroll */}
      <motion.div 
        style={{ opacity: statsOpacity, y: statsTranslateY, scale: statsScale }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
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
      </motion.div>

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
          <AttackRadarChart /> {/* Using Radar as second chart as per original grid intent or variety */}
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