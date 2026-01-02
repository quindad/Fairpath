import FairPathLogo, { FairPathLogoHorizontal, FairPathIcon, FairPathWordmark } from '../common/FairPathLogo';
import { Card } from '../ui/card';

interface LogoShowcaseProps {
  onBack: () => void;
}

export default function LogoShowcase({ onBack }: LogoShowcaseProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="text-[#A8F32C] hover:underline mb-8"
        >
          ← Back
        </button>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">FairPath Industries Logo</h1>
          <p className="text-white/60 text-lg">
            Corporate identity showcase • Rising steps pathway design
          </p>
        </div>

        {/* Primary Logo - Dark Variant */}
        <Card className="bg-white p-12 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-black mb-2">Primary Logo (Light Backgrounds)</h2>
            <p className="text-black/60">Variant: "dark" • Use on white, light gray, or light-colored backgrounds</p>
          </div>
          <div className="flex justify-center">
            <FairPathLogo size={200} variant="dark" />
          </div>
        </Card>

        {/* Primary Logo - Light Variant */}
        <Card className="bg-black border-white/20 p-12 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-white mb-2">Primary Logo (Dark Backgrounds)</h2>
            <p className="text-white/60">Variant: "light" • Use on black, dark gray, or dark-colored backgrounds</p>
          </div>
          <div className="flex justify-center">
            <FairPathLogo size={200} variant="light" />
          </div>
        </Card>

        {/* Horizontal Logos */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white p-12">
            <div className="text-center mb-4">
              <h3 className="font-bold text-black mb-2">Horizontal Layout (Light Backgrounds)</h3>
              <p className="text-black/60 text-sm">Perfect for navigation bars and headers</p>
            </div>
            <div className="flex justify-center">
              <FairPathLogoHorizontal height={50} variant="dark" />
            </div>
          </Card>

          <Card className="bg-black border-white/20 p-12">
            <div className="text-center mb-4">
              <h3 className="font-bold text-white mb-2">Horizontal Layout (Dark Backgrounds)</h3>
              <p className="text-white/60 text-sm">Perfect for navigation bars and headers</p>
            </div>
            <div className="flex justify-center">
              <FairPathLogoHorizontal height={50} variant="light" />
            </div>
          </Card>
        </div>

        {/* Icon Only Versions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white p-12">
            <div className="text-center mb-4">
              <h3 className="font-bold text-black mb-2">Icon Only (Light Backgrounds)</h3>
              <p className="text-black/60 text-sm">For app icons, favicons, and social profiles</p>
            </div>
            <div className="flex justify-center gap-8">
              <FairPathIcon size={120} variant="dark" />
              <FairPathIcon size={80} variant="dark" />
              <FairPathIcon size={50} variant="dark" />
            </div>
          </Card>

          <Card className="bg-black border-white/20 p-12">
            <div className="text-center mb-4">
              <h3 className="font-bold text-white mb-2">Icon Only (Dark Backgrounds)</h3>
              <p className="text-white/60 text-sm">For app icons, favicons, and social profiles</p>
            </div>
            <div className="flex justify-center gap-8">
              <FairPathIcon size={120} variant="light" />
              <FairPathIcon size={80} variant="light" />
              <FairPathIcon size={50} variant="light" />
            </div>
          </Card>
        </div>

        {/* Wordmark Only Versions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white p-12">
            <div className="text-center mb-4">
              <h3 className="font-bold text-black mb-2">Wordmark Only (Light Backgrounds)</h3>
              <p className="text-black/60 text-sm">Text-only version for special applications</p>
            </div>
            <div className="flex flex-col items-center gap-8">
              <FairPathWordmark size="xl" variant="dark" />
              <FairPathWordmark size="lg" variant="dark" />
              <FairPathWordmark size="md" variant="dark" />
              <FairPathWordmark size="sm" variant="dark" />
            </div>
          </Card>

          <Card className="bg-black border-white/20 p-12">
            <div className="text-center mb-4">
              <h3 className="font-bold text-white mb-2">Wordmark Only (Dark Backgrounds)</h3>
              <p className="text-white/60 text-sm">Text-only version for special applications</p>
            </div>
            <div className="flex flex-col items-center gap-8">
              <FairPathWordmark size="xl" variant="light" />
              <FairPathWordmark size="lg" variant="light" />
              <FairPathWordmark size="md" variant="light" />
              <FairPathWordmark size="sm" variant="light" />
            </div>
          </Card>
        </div>

        {/* Color Palette */}
        <Card className="bg-[#121212] border-white/20 p-12 mb-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Brand Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-32 bg-[#A8F32C] rounded-lg mb-3"></div>
              <p className="font-bold text-white">Lime Green</p>
              <p className="text-white/60 text-sm">#A8F32C</p>
              <p className="text-white/40 text-xs">Primary brand color</p>
            </div>
            <div className="text-center">
              <div className="h-32 bg-[#7BC41A] rounded-lg mb-3"></div>
              <p className="font-bold text-white">Green Accent</p>
              <p className="text-white/60 text-sm">#7BC41A</p>
              <p className="text-white/40 text-xs">Step platforms</p>
            </div>
            <div className="text-center">
              <div className="h-32 bg-black border border-white/20 rounded-lg mb-3"></div>
              <p className="font-bold text-white">Black</p>
              <p className="text-white/60 text-sm">#000000</p>
              <p className="text-white/40 text-xs">Primary dark</p>
            </div>
            <div className="text-center">
              <div className="h-32 bg-white rounded-lg mb-3"></div>
              <p className="font-bold text-white">White</p>
              <p className="text-white/60 text-sm">#FFFFFF</p>
              <p className="text-white/40 text-xs">Primary light</p>
            </div>
            <div className="text-center">
              <div className="h-32 bg-[#121212] border border-white/20 rounded-lg mb-3"></div>
              <p className="font-bold text-white">Dark Gray</p>
              <p className="text-white/60 text-sm">#121212</p>
              <p className="text-white/40 text-xs">Background accent</p>
            </div>
            <div className="text-center">
              <div className="h-32 bg-gradient-to-br from-[#A8F32C] to-[#7BC41A] rounded-lg mb-3"></div>
              <p className="font-bold text-white">Gradient</p>
              <p className="text-white/60 text-sm">Lime to Green</p>
              <p className="text-white/40 text-xs">Accent gradient</p>
            </div>
          </div>
        </Card>

        {/* Logo Meaning */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/10 to-[#7BC41A]/10 border-[#A8F32C]/20 p-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Logo Symbolism</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="font-bold text-white mb-2">Rising Steps</h3>
              <p className="text-white/60">
                Each step represents progress in the reentry journey. Ascending from bottom-left to top-right symbolizes upward mobility and hope.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">➡️</div>
              <h3 className="font-bold text-white mb-2">Forward Arrow</h3>
              <p className="text-white/60">
                The arrow points forward, representing direction, momentum, and not looking back. Moving toward a brighter future.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛤️</div>
              <h3 className="font-bold text-white mb-2">The Path</h3>
              <p className="text-white/60">
                The staircase literally forms a path - the "FairPath" - providing a clear, structured route to success and stability.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-black/30 rounded-lg border border-[#A8F32C]/30">
            <p className="text-white/80 text-center italic">
              "Every step counts. Every step matters. We're climbing together, one step at a time, toward a fair future for all."
            </p>
            <p className="text-[#A8F32C] text-center mt-2 font-bold">
              — FairPath Industries Mission
            </p>
          </div>
        </Card>

        {/* Usage Guidelines */}
        <div className="mt-12 bg-[#121212] border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Usage Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6 text-white/80">
            <div>
              <h3 className="text-white font-bold mb-3">✅ DO</h3>
              <ul className="space-y-2 text-sm">
                <li>• Use on black backgrounds for maximum impact</li>
                <li>• Maintain clear space around the logo</li>
                <li>• Use horizontal layout for navigation</li>
                <li>• Use icon-only for app icons and favicons</li>
                <li>• Maintain aspect ratio when scaling</li>
                <li>• Use variant="light" on dark backgrounds</li>
                <li>• Use variant="dark" on light backgrounds</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">❌ DON'T</h3>
              <ul className="space-y-2 text-sm">
                <li>• Don't distort or stretch the logo</li>
                <li>• Don't change the colors (except variants)</li>
                <li>• Don't add effects (shadows, glows)</li>
                <li>• Don't rotate or flip the logo</li>
                <li>• Don't use on busy backgrounds</li>
                <li>• Don't use wrong variant for background</li>
                <li>• Don't make the logo smaller than 40px</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-12 bg-[#0a0a0a] border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Code Usage Examples</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold mb-2">Primary Logo</h3>
              <pre className="bg-black/50 p-4 rounded-lg text-[#A8F32C] text-sm overflow-x-auto">
{`import FairPathLogo from './components/common/FairPathLogo';

<FairPathLogo size={200} variant="light" />`}
              </pre>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">Horizontal Logo (Navigation)</h3>
              <pre className="bg-black/50 p-4 rounded-lg text-[#A8F32C] text-sm overflow-x-auto">
{`import { FairPathLogoHorizontal } from './components/common/FairPathLogo';

<FairPathLogoHorizontal height={50} variant="light" />`}
              </pre>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">Icon Only (App Icon)</h3>
              <pre className="bg-black/50 p-4 rounded-lg text-[#A8F32C] text-sm overflow-x-auto">
{`import { FairPathIcon } from './components/common/FairPathLogo';

<FairPathIcon size={120} variant="dark" />`}
              </pre>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">Wordmark Only</h3>
              <pre className="bg-black/50 p-4 rounded-lg text-[#A8F32C] text-sm overflow-x-auto">
{`import { FairPathWordmark } from './components/common/FairPathLogo';

<FairPathWordmark size="lg" variant="light" />`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
