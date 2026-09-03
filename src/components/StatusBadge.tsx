import React from 'react';
import { Verdict, SubclaimStatus, EvidenceStatus, EvidenceStrength, Relevance } from '../types';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, Clock, ShieldCheck, Scale, Compass } from 'lucide-react';

interface VerdictBadgeProps {
  verdict: Verdict;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({ verdict, size = 'md', showIcon = true }) => {
  const getStyles = () => {
    switch (verdict) {
      case 'SUPPORTED':
        return {
          bg: 'bg-[#182218] text-[#B9CBB5] border-[#727E6E]/70',
          icon: ShieldCheck,
          label: 'SUPPORTED',
          dot: 'bg-[#727E6E]',
        };
      case 'MISLEADING':
        return {
          bg: 'bg-[#28180E] text-[#FEAC7C] border-[#FE813C]/70',
          icon: AlertTriangle,
          label: 'MISLEADING',
          dot: 'bg-[#FE813C]',
        };
      case 'CONTRADICTED':
        return {
          bg: 'bg-[#261316] text-[#E0A2A6] border-[#BC656A]/70',
          icon: XCircle,
          label: 'CONTRADICTED',
          dot: 'bg-[#BC656A]',
        };
      case 'OUTDATED':
        return {
          bg: 'bg-[#191C16] text-[#A5ABA0] border-[#363B2F]',
          icon: Clock,
          label: 'OUTDATED',
          dot: 'bg-[#727E6E]',
        };
      case 'INSUFFICIENT EVIDENCE':
      default:
        return {
          bg: 'bg-[#191C16] text-[#A5ABA0] border-[#363B2F]',
          icon: HelpCircle,
          label: 'INSUFFICIENT EVIDENCE',
          dot: 'bg-[#727E6E]',
        };
    }
  };

  const config = getStyles();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider font-semibold border rounded',
    md: 'text-xs px-2.5 py-1 tracking-wider font-semibold border rounded-md',
    lg: 'text-sm px-3 py-1.5 tracking-wider font-bold border rounded-md shadow-sm',
  };

  return (
    <span
      id={`verdict-badge-${verdict.toLowerCase().replace(/\s+/g, '-')}`}
      className={`inline-flex items-center gap-1.5 font-mono uppercase transition-colors ${config.bg} ${sizeClasses[size]}`}
    >
      {showIcon && <Icon className={size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'} />}
      <span>{config.label}</span>
    </span>
  );
};

interface SubclaimBadgeProps {
  status: SubclaimStatus;
}

export const SubclaimBadge: React.FC<SubclaimBadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case 'SUPPORTED':
        return {
          bg: 'bg-[#182218] text-[#B9CBB5] border-[#727E6E]/70',
          label: 'SUPPORTED',
          icon: CheckCircle2,
        };
      case 'MIXED EVIDENCE':
        return {
          bg: 'bg-[#28180E] text-[#FEAC7C] border-[#FE813C]/70',
          label: 'MIXED EVIDENCE',
          icon: Scale,
        };
      case 'CONTRADICTED':
        return {
          bg: 'bg-[#261316] text-[#E0A2A6] border-[#BC656A]/70',
          label: 'CONTRADICTED',
          icon: XCircle,
        };
      case 'NOT SUFFICIENTLY SUPPORTED':
        return {
          bg: 'bg-[#191C16] text-[#A5ABA0] border-[#363B2F]',
          label: 'NOT SUFFICIENTLY SUPPORTED',
          icon: HelpCircle,
        };
      case 'CONTEXTUAL':
      default:
        return {
          bg: 'bg-[#1A201C] text-[#B5C2B4] border-[#556052]/60',
          label: 'CONTEXTUAL',
          icon: Compass,
        };
    }
  };

  const config = getStyles();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${config.bg}`}>
      <Icon className="w-2.5 h-2.5" />
      <span>{config.label}</span>
    </span>
  );
};

interface EvidenceStatusBadgeProps {
  status: EvidenceStatus;
}

export const EvidenceStatusBadge: React.FC<EvidenceStatusBadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case 'supports':
        return {
          bg: 'bg-[#182218] text-[#B9CBB5] border-[#727E6E]/70',
          label: 'SUPPORTS CLAIM',
        };
      case 'contradicts':
        return {
          bg: 'bg-[#261316] text-[#E0A2A6] border-[#BC656A]/70',
          label: 'CONTRADICTS CLAIM',
        };
      case 'contextual':
        return {
          bg: 'bg-[#1A201C] text-[#B5C2B4] border-[#556052]/60',
          label: 'CONTEXTUAL',
        };
      case 'unclear':
      default:
        return {
          bg: 'bg-[#191C16] text-[#A5ABA0] border-[#363B2F]',
          label: 'UNCLEAR / INCONCLUSIVE',
        };
    }
  };

  const config = getStyles();

  return (
    <span className={`inline-flex items-center text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded border ${config.bg}`}>
      {config.label}
    </span>
  );
};

export const QualityTag: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const isHigh = value.toLowerCase() === 'high';
  const isMedium = value.toLowerCase() === 'medium';
  return (
    <div className="inline-flex items-center gap-1 text-xs text-[#8A9084] font-mono">
      <span className="text-[#646A5E] font-normal">{label}:</span>
      <span className={`font-semibold ${isHigh ? 'text-[#FE813C]' : isMedium ? 'text-[#D8DCD5]' : 'text-[#8A9084]'}`}>
        {value.toUpperCase()}
      </span>
    </div>
  );
};
