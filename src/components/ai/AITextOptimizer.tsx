import { useState } from 'react';
import { Sparkles, Wand2, Check, Copy, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';

interface AITextOptimizerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  context?: 'resume' | 'cover-letter' | 'bio' | 'message' | 'general';
  label?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  showOptimizeButton?: boolean;
  autoOptimize?: boolean;
}

export default function AITextOptimizer({
  value,
  onChange,
  placeholder = 'Write naturally... AI will make it sound professional',
  context = 'general',
  label,
  disabled = false,
  rows = 4,
  maxLength,
  showOptimizeButton = true,
  autoOptimize = false,
}: AITextOptimizerProps) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedText, setOptimizedText] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleOptimize = async () => {
    if (!value.trim() || isOptimizing) return;

    setIsOptimizing(true);

    // Simulate AI optimization (replace with real AI API call)
    setTimeout(() => {
      const optimized = optimizeText(value, context);
      setOptimizedText(optimized);
      setShowPreview(true);
      setIsOptimizing(false);
    }, 1500);
  };

  const handleAccept = () => {
    if (optimizedText) {
      onChange(optimizedText);
      setShowPreview(false);
      setOptimizedText(null);
    }
  };

  const handleReject = () => {
    setShowPreview(false);
    setOptimizedText(null);
  };

  const handleCopy = () => {
    if (optimizedText) {
      navigator.clipboard.writeText(optimizedText);
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm text-white/80">
          {label}
          {showOptimizeButton && (
            <span className="ml-2 text-xs text-[#A8F32C]">
              <Sparkles className="inline h-3 w-3 mr-1" />
              AI-powered optimization available
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className="bg-white/5 border-white/20 text-white resize-none pr-12"
        />

        {showOptimizeButton && value.trim() && !disabled && (
          <Button
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="absolute bottom-2 right-2 h-8 px-3 bg-gradient-to-r from-[#A8F32C] to-[#7BC41A] text-black hover:scale-105 transition-transform text-xs"
          >
            {isOptimizing ? (
              <>
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Wand2 className="h-3 w-3 mr-1" />
                AI Optimize
              </>
            )}
          </Button>
        )}
      </div>

      {maxLength && (
        <div className="text-xs text-white/40 text-right">
          {value.length} / {maxLength} characters
        </div>
      )}

      {/* Optimized Preview */}
      {showPreview && optimizedText && (
        <Card className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#A8F32C]">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI Optimized Version</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 px-2 text-xs text-white/60 hover:text-white"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>

          <div className="bg-black/30 rounded-lg p-3 text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
            {optimizedText}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleAccept}
              className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            >
              <Check className="h-4 w-4 mr-2" />
              Use This Version
            </Button>
            <Button
              onClick={handleReject}
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/5"
            >
              Keep Original
            </Button>
          </div>

          <div className="text-xs text-white/40 text-center">
            AI improved: grammar, clarity, professionalism
          </div>
        </Card>
      )}
    </div>
  );
}

// AI Text Optimization Logic (placeholder - replace with real AI API)
function optimizeText(text: string, context: string): string {
  // In production, this would call an AI API (OpenAI, Claude, etc.)
  // For now, we'll do smart text improvements

  let optimized = text.trim();

  // Capitalize first letter of sentences
  optimized = optimized.replace(/(^|[.!?]\s+)([a-z])/g, (match, p1, p2) => {
    return p1 + p2.toUpperCase();
  });

  // Context-specific improvements
  switch (context) {
    case 'resume':
      optimized = optimizeResume(optimized);
      break;
    case 'cover-letter':
      optimized = optimizeCoverLetter(optimized);
      break;
    case 'bio':
      optimized = optimizeBio(optimized);
      break;
    case 'message':
      optimized = optimizeMessage(optimized);
      break;
    default:
      optimized = optimizeGeneral(optimized);
  }

  return optimized;
}

function optimizeResume(text: string): string {
  // Make resume bullet points action-oriented
  const actionVerbs = [
    'Managed', 'Developed', 'Led', 'Implemented', 'Achieved', 'Improved',
    'Coordinated', 'Executed', 'Delivered', 'Increased', 'Streamlined'
  ];

  let optimized = text;

  // Add action verbs if starting with "I"
  optimized = optimized.replace(/^I\s+(\w+)/gim, (match, verb) => {
    const randomAction = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    return randomAction;
  });

  // Remove personal pronouns
  optimized = optimized.replace(/\b(I|me|my|mine)\b/gi, '');

  // Clean up extra spaces
  optimized = optimized.replace(/\s+/g, ' ').trim();

  return optimized;
}

function optimizeCoverLetter(text: string): string {
  let optimized = text;

  // Make more professional
  optimized = optimized.replace(/\bhey\b/gi, 'Hello');
  optimized = optimized.replace(/\bthanks\b/gi, 'Thank you');
  optimized = optimized.replace(/\bwanna\b/gi, 'want to');
  optimized = optimized.replace(/\bgonna\b/gi, 'going to');

  // Add professional closing if missing
  if (!optimized.includes('Sincerely') && !optimized.includes('Best regards')) {
    optimized += '\n\nSincerely,';
  }

  return optimized;
}

function optimizeBio(text: string): string {
  let optimized = text;

  // Third person if first person detected
  optimized = optimized.replace(/^I am/gi, 'They are');
  optimized = optimized.replace(/\bI\b/g, 'they');
  optimized = optimized.replace(/\bme\b/g, 'them');
  optimized = optimized.replace(/\bmy\b/g, 'their');

  // Make concise
  optimized = optimized.replace(/\breally\b/gi, '');
  optimized = optimized.replace(/\bvery\b/gi, '');
  optimized = optimized.replace(/\bjust\b/gi, '');

  return optimized.trim();
}

function optimizeMessage(text: string): string {
  let optimized = text;

  // Professional but friendly
  optimized = optimized.replace(/^hi\b/gi, 'Hi');
  optimized = optimized.replace(/^hey\b/gi, 'Hello');

  // Fix common typos
  optimized = optimized.replace(/\bu\b/g, 'you');
  optimized = optimized.replace(/\bur\b/g, 'your');
  optimized = optimized.replace(/\br\b/g, 'are');

  return optimized;
}

function optimizeGeneral(text: string): string {
  let optimized = text;

  // Fix common issues
  optimized = optimized.replace(/\s+/g, ' '); // Multiple spaces
  optimized = optimized.replace(/([.!?])\s*([a-z])/g, (m, p1, p2) => p1 + ' ' + p2.toUpperCase()); // Capitalize after punctuation
  optimized = optimized.replace(/\bi\b/g, 'I'); // Capitalize I
  optimized = optimized.replace(/([.!?])+/g, '$1'); // Multiple punctuation

  // Remove slang/casual
  optimized = optimized.replace(/\blol\b/gi, '');
  optimized = optimized.replace(/\bomg\b/gi, '');
  optimized = optimized.replace(/\bbtw\b/gi, 'by the way');
  optimized = optimized.replace(/\bfyi\b/gi, 'for your information');

  return optimized.trim();
}

// Inline AI Optimizer (simple version without preview)
export function InlineAIOptimizer({ value, onChange, placeholder, context, label, ...props }: AITextOptimizerProps) {
  return (
    <AITextOptimizer
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      context={context}
      label={label}
      showOptimizeButton={true}
      {...props}
    />
  );
}
