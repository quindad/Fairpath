import { Check, Crown, Zap, Gift as GiftIcon, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';

interface SubscriptionPageProps {
  onSubscribe: () => void;
  isSubscriber: boolean;
}

export default function SubscriptionPage({ onSubscribe, isSubscriber }: SubscriptionPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#A8F32C]/10 via-transparent to-transparent" />
        <div className="relative px-6 pt-8 pb-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#A8F32C]/10 border border-[#A8F32C]/20 rounded-full px-4 py-2 mb-4">
              <Crown className="h-4 w-4 text-[#A8F32C]" />
              <span className="text-xs text-[#A8F32C]">PREMIUM MEMBERSHIP</span>
            </div>
            
            <h1 className="text-4xl mb-3">FairPath+</h1>
            <p className="text-white/60 max-w-md mx-auto">
              Save money on applications and get priority access to opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Card */}
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent rounded-3xl p-1">
          <div className="bg-[#121212] rounded-3xl p-8 border border-[#A8F32C]/20">
            <div className="text-center mb-8">
              <div className="text-5xl mb-2">$2</div>
              <div className="text-white/60">per month</div>
            </div>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <BenefitItem
                icon={Zap}
                title="Save $10 per Application"
                description="Pay $65 instead of $75 for each FastTrack application"
              />
              <BenefitItem
                icon={GiftIcon}
                title="7 Monthly Claims"
                description="Claim up to 7 free items per month instead of just 1"
              />
              <BenefitItem
                icon={TrendingUp}
                title="Priority Matching"
                description="Get notified first when new opportunities match your profile"
              />
            </div>

            {isSubscriber ? (
              <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/20 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-[#A8F32C] mb-2">
                  <Check className="h-5 w-5" />
                  <span>Active Subscription</span>
                </div>
                <p className="text-sm text-white/60">
                  You're saving $10 on every FastTrack application
                </p>
              </div>
            ) : (
              <Button
                onClick={onSubscribe}
                className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14 text-base"
              >
                Activate FairPath+
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Value Breakdown */}
      <div className="px-6 pb-8">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl mb-4 text-center">How Much You Save</h3>
          
          <div className="bg-[#121212] rounded-2xl p-6 border border-white/5 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div>
                <div className="text-sm text-white/60 mb-1">One Application</div>
                <div className="text-lg">$10 savings</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/60 mb-1">Standard</div>
                <div className="text-lg line-through text-white/40">$75</div>
                <div className="text-lg text-[#A8F32C]">$65</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white/60 mb-1">Five Applications</div>
                <div className="text-lg">$50 savings</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/60 mb-1">Standard</div>
                <div className="text-lg line-through text-white/40">$375</div>
                <div className="text-lg text-[#A8F32C]">$325</div>
              </div>
            </div>

            <div className="bg-[#A8F32C]/5 border border-[#A8F32C]/20 rounded-xl p-4 mt-4">
              <p className="text-sm text-white/80 text-center">
                <strong className="text-[#A8F32C]">Break even in just one application!</strong>
                <br />
                After your first FastTrack, you've already saved more than the subscription cost.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="px-6 pb-8">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl mb-4 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-3">
            <FAQItem
              question="Can I cancel anytime?"
              answer="Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
            />
            <FAQItem
              question="Do my unused claims roll over?"
              answer="No, your 7 monthly marketplace claims reset at the start of each billing month."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept all major credit and debit cards through our secure payment processor."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ icon: Icon, title, description }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon className="h-5 w-5 text-[#A8F32C]" />
      </div>
      <div className="flex-1">
        <h4 className="mb-1">{title}</h4>
        <p className="text-sm text-white/60">{description}</p>
      </div>
      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-[#121212] rounded-xl p-4 border border-white/5">
      <h4 className="text-sm mb-2">{question}</h4>
      <p className="text-sm text-white/60">{answer}</p>
    </div>
  );
}