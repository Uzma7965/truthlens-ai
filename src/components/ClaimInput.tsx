import React, { useState, useEffect, useRef } from 'react';
import { Search, CornerDownLeft, AlertCircle, X, Sparkles } from 'lucide-react';

interface ClaimInputProps {
  claim: string;
  onChange: (value: string) => void;
  onInvestigate: (claimText: string) => void;
  isLoading: boolean;
  errorMessage?: string | null;
  onClearError?: () => void;
}

const MAX_CHAR_LIMIT = 1000;

export const ClaimInput: React.FC<ClaimInputProps> = ({
  claim,
  onChange,
  onInvestigate,
  isLoading,
  errorMessage,
  onClearError,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (errorMessage) {
      setLocalError(errorMessage);
    }
  }, [errorMessage]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = claim.trim();

    if (!trimmed) {
      setLocalError('Please enter a claim to investigate.');
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
      return;
    }

    if (trimmed.length > MAX_CHAR_LIMIT) {
      setLocalError(`Claim exceeds recommended limit of ${MAX_CHAR_LIMIT} characters.`);
      return;
    }

    setLocalError(null);
    if (onClearError) onClearError();
    onInvestigate(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const charCount = claim.length;
  const isOverLimit = charCount > MAX_CHAR_LIMIT;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`relative bg-[#151712] border rounded-xl transition-all shadow-md ${
            localError
              ? 'border-[#BC656A] ring-2 ring-[#BC656A]/30'
              : 'border-[#262921] focus-within:border-[#FE813C] focus-within:ring-1 focus-within:ring-[#FE813C]/40'
          }`}
        >
          {/* Main Textarea */}
          <div className="p-3.5 sm:p-4">
            <textarea
              id="claim-input-textarea"
              ref={textareaRef}
              value={claim}
              onChange={(e) => {
                onChange(e.target.value);
                if (localError) setLocalError(null);
                if (onClearError) onClearError();
              }}
              onKeyDown={handleKeyDown}
              rows={3}
              placeholder="Paste a claim, headline, or statement to investigate..."
              className="w-full bg-transparent text-[#FFFFFF] placeholder:text-[#6E7569] resize-none outline-none text-sm sm:text-base leading-relaxed font-sans"
              disabled={isLoading}
              maxLength={1200}
            />
          </div>

          {/* Bottom Bar inside Input Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 px-3.5 pb-3 pt-1 border-t border-[#20231C]">
            {/* Left status / Character count */}
            <div className="flex items-center gap-2.5 text-xs">
              <span
                className={`font-mono text-[11px] transition-colors ${
                  isOverLimit
                    ? 'text-[#BC656A] font-semibold'
                    : charCount > 800
                    ? 'text-[#FE813C]'
                    : 'text-[#6E7569]'
                }`}
              >
                {charCount} / {MAX_CHAR_LIMIT} chars
              </span>

              {claim.length > 0 && (
                <button
                  id="clear-claim-input-btn"
                  type="button"
                  onClick={() => {
                    onChange('');
                    if (localError) setLocalError(null);
                  }}
                  className="text-[#8A9084] hover:text-[#FFFFFF] transition-colors flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-2">
              <span className="hidden sm:inline-block text-[10px] font-mono text-[#6E7569]">
                ⌘ + Enter
              </span>
              <button
                id="investigate-submit-btn"
                type="submit"
                disabled={isLoading || !claim.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#FE813C] hover:bg-[#FF9457] active:bg-[#E86D28] disabled:bg-[#1E211A] disabled:text-[#565C50] disabled:cursor-not-allowed text-[#0E0F0B] text-xs font-mono font-bold rounded-md transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#0E0F0B]" />
                <span>Investigate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error message toast */}
        {localError && (
          <div
            id="claim-input-error-alert"
            className="mt-2.5 p-2.5 rounded-lg bg-[#241315] border border-[#BC656A]/70 text-[#E2A4A8] text-xs flex items-center gap-2 animate-in fade-in font-sans"
          >
            <AlertCircle className="w-4 h-4 text-[#BC656A] shrink-0" />
            <span className="font-medium">{localError}</span>
          </div>
        )}
      </form>
    </div>
  );
};
