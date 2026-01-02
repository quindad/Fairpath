import { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Card } from '../ui/card';

interface ConvictionCategory {
  id: string;
  name: string;
  subcategories: string[];
}

const CONVICTION_CATEGORIES: ConvictionCategory[] = [
  {
    id: 'violent',
    name: 'Violent Offenses',
    subcategories: [
      'Assault',
      'Battery',
      'Robbery',
      'Murder',
      'Manslaughter',
      'Kidnapping',
      'Arson',
      'Domestic Violence'
    ]
  },
  {
    id: 'sex',
    name: 'Sex Offenses',
    subcategories: [
      'Rape',
      'Sexual Assault',
      'Child Pornography',
      'Failure to Register',
      'Indecent Exposure'
    ]
  },
  {
    id: 'drug',
    name: 'Drug Offenses',
    subcategories: [
      'Possession',
      'Trafficking',
      'Distribution',
      'Manufacturing',
      'Paraphernalia',
      'Prescription Fraud'
    ]
  },
  {
    id: 'property',
    name: 'Property Crimes',
    subcategories: [
      'Burglary',
      'Theft',
      'Shoplifting',
      'Auto Theft',
      'Vandalism',
      'Trespassing'
    ]
  },
  {
    id: 'financial',
    name: 'White Collar / Financial Crimes',
    subcategories: [
      'Fraud',
      'Embezzlement',
      'Identity Theft',
      'Forgery',
      'Check Fraud'
    ]
  },
  {
    id: 'weapons',
    name: 'Weapons Crimes',
    subcategories: [
      'Possession of Firearm',
      'Illegal Sale',
      'Carrying Concealed',
      'Brandishing'
    ]
  },
  {
    id: 'public',
    name: 'Public Order Crimes',
    subcategories: [
      'DUI',
      'Disorderly Conduct',
      'Resisting Arrest',
      'Loitering',
      'Open Container'
    ]
  },
  {
    id: 'juvenile',
    name: 'Juvenile Crimes',
    subcategories: [
      'Minor in Possession',
      'Curfew Violation',
      'Truancy',
      'Juvenile Property/Violent Records'
    ]
  }
];

interface ConvictionCategorySelectorProps {
  selectedConvictions: string[];
  onSelectionChange: (convictions: string[]) => void;
  onContinue: () => void;
  onSave?: () => void;
}

export default function ConvictionCategorySelector({
  selectedConvictions,
  onSelectionChange,
  onContinue,
  onSave
}: ConvictionCategorySelectorProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const handleSubcategoryToggle = (subcategory: string) => {
    if (selectedConvictions.includes(subcategory)) {
      onSelectionChange(selectedConvictions.filter(c => c !== subcategory));
    } else {
      onSelectionChange([...selectedConvictions, subcategory]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs tracking-widest text-[#A8F32C] mb-2">
            STEP 3 OF 5
          </div>
          <h1 className="text-3xl mb-3">Select Your Conviction Categories</h1>
          <p className="text-white/60">
            This helps us match you with the right opportunities. Select all that apply to your record.
          </p>
        </div>

        {/* Info Banner */}
        <Card className="bg-[#A8F32C]/10 border-[#A8F32C]/30 p-4 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-white mb-2">
                We ask these questions to match you with the BEST jobs, tax-credit opportunities, 
                housing, and reentry programs.
              </p>
              <p className="text-white/60">
                Your information is private and only shown to employers/landlords you apply to.
              </p>
            </div>
          </div>
        </Card>

        {/* Categories */}
        <div className="space-y-3 mb-8">
          {CONVICTION_CATEGORIES.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);
            const selectedCount = category.subcategories.filter(sub => 
              selectedConvictions.includes(sub)
            ).length;

            return (
              <Card key={category.id} className="bg-[#121212] border-white/10">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <div className="text-white">{category.name}</div>
                      {selectedCount > 0 && (
                        <div className="text-xs text-[#A8F32C] mt-1">
                          {selectedCount} selected
                        </div>
                      )}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-white/60" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white/60" />
                  )}
                </button>

                {/* Subcategories */}
                {isExpanded && (
                  <div className="border-t border-white/10 p-4 space-y-3">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory} className="flex items-center gap-3">
                        <Checkbox
                          id={subcategory}
                          checked={selectedConvictions.includes(subcategory)}
                          onCheckedChange={() => handleSubcategoryToggle(subcategory)}
                        />
                        <Label
                          htmlFor={subcategory}
                          className="text-sm cursor-pointer text-white"
                        >
                          {subcategory}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Selection Summary */}
        {selectedConvictions.length > 0 && (
          <Card className="bg-[#121212] border-[#A8F32C]/30 p-4 mb-6">
            <div className="text-sm text-white/60 mb-2">
              You've selected {selectedConvictions.length} conviction type{selectedConvictions.length !== 1 ? 's' : ''}:
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedConvictions.map((conviction) => (
                <span
                  key={conviction}
                  className="px-3 py-1 bg-[#A8F32C]/20 text-[#A8F32C] rounded-full text-xs"
                >
                  {conviction}
                </span>
              ))}
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {onSave && (
            <Button
              onClick={onSave}
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/5"
            >
              Save & Finish Later
            </Button>
          )}
          <Button
            onClick={onContinue}
            disabled={selectedConvictions.length === 0}
            className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 disabled:opacity-50"
          >
            Continue
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-center text-xs text-white/40 mt-4">
          Don't see your conviction type? Contact support and we'll help you get set up.
        </p>
      </div>
    </div>
  );
}
