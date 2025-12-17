"use client";

// Chronex AI - Logistik Dashboard Visualisierung
// Edel, luxuriös, realistisch

export default function ChronexDashboard() {
  return (
    <div className="w-full h-full p-4 sm:p-6" style={{ height: "100%", minHeight: "400px" }}>
      <svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="dash-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 245, 255, 0.05)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgba(0, 245, 255, 0.02)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="chart-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Dashboard Background */}
        <rect width="800" height="450" rx="12" fill="url(#dash-bg)" />
        
        {/* Header */}
        <rect x="20" y="20" width="760" height="50" rx="8" fill="rgba(0, 245, 255, 0.08)" stroke="rgba(0, 245, 255, 0.2)" strokeWidth="1" />
        <text x="40" y="45" fill="#00F5FF" fontSize="18" fontWeight="600" fontFamily="system-ui, -apple-system">Chronex AI Dashboard</text>
        <text x="650" y="45" fill="rgba(0, 245, 255, 0.6)" fontSize="14" fontFamily="system-ui, -apple-system">Live</text>
        <circle cx="680" cy="35" r="4" fill="#00F5FF" filter="url(#glow)">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        
        {/* Stats Cards */}
        <g>
          {/* Card 1 */}
          <rect x="20" y="90" width="180" height="100" rx="8" fill="rgba(0, 245, 255, 0.06)" stroke="rgba(0, 245, 255, 0.15)" strokeWidth="1" />
          <text x="30" y="115" fill="rgba(0, 245, 255, 0.5)" fontSize="12" fontFamily="system-ui, -apple-system">Aktive Touren</text>
          <text x="30" y="145" fill="#00F5FF" fontSize="32" fontWeight="700" fontFamily="system-ui, -apple-system">47</text>
          <text x="30" y="165" fill="rgba(0, 245, 255, 0.4)" fontSize="11" fontFamily="system-ui, -apple-system">+12% vs. gestern</text>
          
          {/* Card 2 */}
          <rect x="220" y="90" width="180" height="100" rx="8" fill="rgba(0, 245, 255, 0.06)" stroke="rgba(0, 245, 255, 0.15)" strokeWidth="1" />
          <text x="230" y="115" fill="rgba(0, 245, 255, 0.5)" fontSize="12" fontFamily="system-ui, -apple-system">Optimierte Route</text>
          <text x="230" y="145" fill="#00F5FF" fontSize="32" fontWeight="700" fontFamily="system-ui, -apple-system">94%</text>
          <text x="230" y="165" fill="rgba(0, 245, 255, 0.4)" fontSize="11" fontFamily="system-ui, -apple-system">Durchschnittliche Effizienz</text>
          
          {/* Card 3 */}
          <rect x="420" y="90" width="180" height="100" rx="8" fill="rgba(0, 245, 255, 0.06)" stroke="rgba(0, 245, 255, 0.15)" strokeWidth="1" />
          <text x="430" y="115" fill="rgba(0, 245, 255, 0.5)" fontSize="12" fontFamily="system-ui, -apple-system">Kostenersparnis</text>
          <text x="430" y="145" fill="#00F5FF" fontSize="32" fontWeight="700" fontFamily="system-ui, -apple-system">€2.4K</text>
          <text x="430" y="165" fill="rgba(0, 245, 255, 0.4)" fontSize="11" fontFamily="system-ui, -apple-system">Heute gespart</text>
          
          {/* Card 4 */}
          <rect x="620" y="90" width="160" height="100" rx="8" fill="rgba(0, 245, 255, 0.06)" stroke="rgba(0, 245, 255, 0.15)" strokeWidth="1" />
          <text x="630" y="115" fill="rgba(0, 245, 255, 0.5)" fontSize="12" fontFamily="system-ui, -apple-system">Fahrzeuge</text>
          <text x="630" y="145" fill="#00F5FF" fontSize="32" fontWeight="700" fontFamily="system-ui, -apple-system">28</text>
          <text x="630" y="165" fill="rgba(0, 245, 255, 0.4)" fontSize="11" fontFamily="system-ui, -apple-system">Alle verfügbar</text>
        </g>
        
        {/* Chart Area */}
        <rect x="20" y="210" width="480" height="220" rx="8" fill="rgba(0, 245, 255, 0.04)" stroke="rgba(0, 245, 255, 0.15)" strokeWidth="1" />
        <text x="30" y="235" fill="#00F5FF" fontSize="16" fontWeight="600" fontFamily="system-ui, -apple-system">Tourenverlauf (7 Tage)</text>
        
        {/* Chart Grid */}
        <line x1="40" y1="250" x2="480" y2="250" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" />
        <line x1="40" y1="300" x2="480" y2="300" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" />
        <line x1="40" y1="350" x2="480" y2="350" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" />
        <line x1="40" y1="400" x2="480" y2="400" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" />
        
        {/* Chart Bars */}
        <rect x="60" y="320" width="50" height="100" rx="4" fill="url(#chart-grad)" filter="url(#glow)" />
        <rect x="130" y="280" width="50" height="140" rx="4" fill="url(#chart-grad)" filter="url(#glow)" />
        <rect x="200" y="260" width="50" height="160" rx="4" fill="url(#chart-grad)" filter="url(#glow)" />
        <rect x="270" y="240" width="50" height="180" rx="4" fill="url(#chart-grad)" filter="url(#glow)" />
        <rect x="340" y="250" width="50" height="170" rx="4" fill="url(#chart-grad)" filter="url(#glow)" />
        <rect x="410" y="270" width="50" height="150" rx="4" fill="url(#chart-grad)" filter="url(#glow)" />
        
        {/* Active Tours List */}
        <rect x="520" y="210" width="260" height="220" rx="8" fill="rgba(0, 245, 255, 0.04)" stroke="rgba(0, 245, 255, 0.15)" strokeWidth="1" />
        <text x="530" y="235" fill="#00F5FF" fontSize="16" fontWeight="600" fontFamily="system-ui, -apple-system">Aktive Touren</text>
        
        {/* Tour Items */}
        <g>
          <rect x="530" y="250" width="240" height="35" rx="4" fill="rgba(0, 245, 255, 0.05)" />
          <circle cx="545" cy="267" r="4" fill="#00F5FF" filter="url(#glow)" />
          <text x="560" y="270" fill="rgba(255, 255, 255, 0.9)" fontSize="12" fontFamily="system-ui, -apple-system">Tour #1247 → München</text>
          <text x="560" y="285" fill="rgba(0, 245, 255, 0.5)" fontSize="10" fontFamily="system-ui, -apple-system">ETA: 14:30</text>
        </g>
        
        <g>
          <rect x="530" y="295" width="240" height="35" rx="4" fill="rgba(0, 245, 255, 0.05)" />
          <circle cx="545" cy="312" r="4" fill="#00F5FF" filter="url(#glow)" />
          <text x="560" y="315" fill="rgba(255, 255, 255, 0.9)" fontSize="12" fontFamily="system-ui, -apple-system">Tour #1248 → Berlin</text>
          <text x="560" y="330" fill="rgba(0, 245, 255, 0.5)" fontSize="10" fontFamily="system-ui, -apple-system">ETA: 16:45</text>
        </g>
        
        <g>
          <rect x="530" y="340" width="240" height="35" rx="4" fill="rgba(0, 245, 255, 0.05)" />
          <circle cx="545" cy="357" r="4" fill="#00F5FF" filter="url(#glow)" />
          <text x="560" y="360" fill="rgba(255, 255, 255, 0.9)" fontSize="12" fontFamily="system-ui, -apple-system">Tour #1249 → Hamburg</text>
          <text x="560" y="375" fill="rgba(0, 245, 255, 0.5)" fontSize="10" fontFamily="system-ui, -apple-system">ETA: 18:20</text>
        </g>
        
        <g>
          <rect x="530" y="385" width="240" height="35" rx="4" fill="rgba(0, 245, 255, 0.05)" />
          <circle cx="545" cy="402" r="4" fill="#00F5FF" filter="url(#glow)" />
          <text x="560" y="405" fill="rgba(255, 255, 255, 0.9)" fontSize="12" fontFamily="system-ui, -apple-system">Tour #1250 → Köln</text>
          <text x="560" y="420" fill="rgba(0, 245, 255, 0.5)" fontSize="10" fontFamily="system-ui, -apple-system">ETA: 20:15</text>
        </g>
      </svg>
    </div>
  );
}

