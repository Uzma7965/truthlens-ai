import React from 'react';
import { EvidenceSource } from '../types';
import { EvidenceStatusBadge, QualityTag } from './StatusBadge';
import { ExternalLink, Quote, Building2, Calendar, ShieldCheck, FileText } from 'lucide-react';

interface EvidenceCardProps {
  source: EvidenceSource;
  isHighlighted?: boolean;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ source, isHighlighted = false }) => {
  return (
    <div
      id={`evidence-card-${source.id}`}
      className={`bg-[#151712] border rounded-xl p-4 sm:p-5 transition-all shadow-sm flex flex-col justify-between ${
        isHighlighted
          ? 'border-[#FE813C] ring-2 ring-[#FE813C]/30 bg-[#1D2018]'
          : 'border-[#262921] hover:border-[#FE813C]/60'
      }`}
    >
      <div>
        {/* Top Header: Publication & Date */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#22261D]">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#FE813C]" />
            <span className="font-semibold text-xs text-[#FFFFFF] font-mono">
              {source.publication}
            </span>
            {source.domain && (
              <span className="text-[10px] text-[#6E7569] font-mono">({source.domain})</span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#A6AC9F] font-mono">
            <Calendar className="w-3 h-3 text-[#6E7569]" />
            <span>{source.publicationDate}</span>
          </div>
        </div>

        {/* Headline */}
        <h3 className="text-sm sm:text-base font-semibold text-[#FFFFFF] leading-snug mb-2.5">
          {source.headline}
        </h3>

        {/* Status Badge & Quality Indicators */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <EvidenceStatusBadge status={source.status} />
          <QualityTag label="Strength" value={source.evidenceStrength} />
          <QualityTag label="Relevance" value={source.relevance} />
        </div>

        {/* Evidence Summary */}
        <p className="text-xs text-[#D8DCD5] leading-relaxed mb-3">
          {source.summary}
        </p>

        {/* Quote Excerpt if present */}
        {source.quoteExcerpt && (
          <div className="p-2.5 rounded-lg bg-[#11130E] border border-[#262921] mb-3 flex items-start gap-2">
            <Quote className="w-3.5 h-3.5 text-[#FE813C] shrink-0 mt-0.5" />
            <p className="text-xs italic text-[#C9D0C6] font-serif leading-relaxed">
              {source.quoteExcerpt}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="pt-2.5 border-t border-[#22261D] flex items-center justify-between gap-2">
        <span className="text-[10px] font-mono text-[#FE813C]/80 uppercase tracking-wider flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#FE813C]" />
          <span>Live Web Evidence</span>
        </span>

        {source.url && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold text-[#D8DCD5] hover:text-[#0E0F0B] bg-[#1E211A] hover:bg-[#FE813C] border border-[#32362C] hover:border-[#FE813C] rounded-md transition-colors cursor-pointer group"
          >
            <span>Read source</span>
            <ExternalLink className="w-3 h-3 text-[#8A9084] group-hover:text-[#0E0F0B]" />
          </a>
        )}
      </div>
    </div>
  );
};
