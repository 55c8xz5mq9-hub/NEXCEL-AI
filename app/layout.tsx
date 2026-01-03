import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// Headline Font - Future-Premium
// General Sans ist eine kommerzielle Schrift (Fontshare)
// Plus Jakarta Sans wird als hochwertige Alternative verwendet (ähnliche moderne Sans)
// Falls General Sans verfügbar ist, kann es hier als localFont eingefügt werden
const generalSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-headline",
  display: "swap",
});

// Body Font - Inter (Future-Premium)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// Lazy load heavy components
const NeuralAIBackground = dynamic(() => import("@/components/NeuralAIBackground"), {
  ssr: false,
  loading: () => null,
});

const NeuralCursor = dynamic(() => import("@/components/NeuralCursor"), {
  ssr: false,
  loading: () => null,
});

const CookieBanner = dynamic(() => import("@/components/CookieBanner"), {
  ssr: false,
});

const WhatsAppChat = dynamic(() => import("@/components/WhatsAppChat"), {
  ssr: false,
});

const AnalyticsTracker = dynamic(() => import("@/components/AnalyticsTracker"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "NEXCEL AI • Individuelle KI-Systeme & Softwarelösungen",
  description: "Intelligente Software. Maßgeschneiderte KI. Zukunft, die funktioniert. Individuelle KI-Systeme, Automationen und digitale Produkte für Unternehmen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`dark ${generalSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.classList.remove('dark', 'light');
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  // Fallback to dark if error
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Ensure nextjs-portal appears after #__next-build-watcher (DOM order fix)
                // Target: Index 5, directly after #__next-build-watcher
                // Specifically targets: nextjs-portal[data-cursor-element-id="cursor-el-10"]
                function reorderPortal() {
                  try {
                    // Find the specific portal with data-cursor-element-id="cursor-el-10"
                    const portal = document.querySelector('nextjs-portal[data-cursor-element-id="cursor-el-10"]');
                    const buildWatcher = document.getElementById('__next-build-watcher');
                    
                    if (!portal || !buildWatcher) {
                      return;
                    }
                    
                    // Only process if portal is a direct child of body
                    if (portal.parentNode === document.body && buildWatcher.parentNode === document.body) {
                      const bodyChildren = Array.from(document.body.children);
                      const watcherIndex = bodyChildren.indexOf(buildWatcher);
                      const portalIndex = bodyChildren.indexOf(portal);
                      
                      // Target: Portal should be at index 5 (directly after build watcher)
                      // Check if portal is already in correct position (watcherIndex + 1)
                      if (portalIndex !== watcherIndex + 1 && portalIndex !== -1 && watcherIndex !== -1) {
                        // Insert portal directly after build watcher
                        // This ensures nextSiblingPath is "div#__next-build-watcher" and index is 5
                        if (buildWatcher.nextSibling) {
                          buildWatcher.parentNode.insertBefore(portal, buildWatcher.nextSibling);
                        } else {
                          buildWatcher.parentNode.appendChild(portal);
                        }
                      }
                    }
                  } catch (e) {
                    console.warn('Portal reordering error:', e);
                  }
                }
                
                // Run immediately and on DOMContentLoaded
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', reorderPortal);
                } else {
                  reorderPortal();
                }
                
                // Also run after delays to catch dynamically added portals
                setTimeout(reorderPortal, 100);
                setTimeout(reorderPortal, 300);
                setTimeout(reorderPortal, 500);
                setTimeout(reorderPortal, 1000);
                
                // Use MutationObserver to watch for portal creation - More aggressive
                function setupObserver() {
                  try {
                    if (typeof MutationObserver === 'undefined') return;
                    if (!document.body) return;
                    if (!(document.body instanceof Node)) return;
                    
                    let observerTimeout;
                    const observer = new MutationObserver(function(mutations) {
                      // Debounce to avoid excessive calls
                      clearTimeout(observerTimeout);
                      observerTimeout = setTimeout(function() {
                        mutations.forEach(function(mutation) {
                          if (mutation.addedNodes && mutation.addedNodes.length) {
                            mutation.addedNodes.forEach(function(node) {
                              if (node && node.nodeName === 'NEXTJS-PORTAL' || 
                                  (node && node.nodeType === 1 && node.querySelector && node.querySelector('nextjs-portal'))) {
                                setTimeout(reorderPortal, 10);
                              }
                            });
                          }
                        });
                      }, 50);
                    });
                    
                    observer.observe(document.body, {
                      childList: true,
                      subtree: false // Only watch direct children for performance
                    });
                  } catch (e) {
                    console.warn('MutationObserver setup error:', e);
                  }
                }
                
                // Setup observer when body is ready
                if (document.body && document.body instanceof Node) {
                  setupObserver();
                } else {
                  // Wait for body to be ready
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', setupObserver);
                  } else {
                    setTimeout(setupObserver, 100);
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`min-h-screen relative transition-colors duration-500 ${inter.className}`} style={{ 
        background: "linear-gradient(180deg, #0C0F1A 0%, #111622 50%, #0C0F1A 100%)",
        position: "relative",
        fontFamily: "var(--font-body)",
      }}>
        <ThemeProvider>
          {/* Neural AI Energy Background - Premium Dark Mode */}
          <NeuralAIBackground />
          
          {/* Neural Cursor */}
          <NeuralCursor />
          
          {/* Content with proper z-index */}
          <div style={{ 
            minHeight: "100vh",
            position: "relative",
            zIndex: 1,
            background: "transparent",
          }}>
            {children}
          </div>
          
          {/* DSGVO-konformes Cookie-Banner */}
          <CookieBanner />
          
          {/* High-End WhatsApp Chat */}
          <WhatsAppChat />
          
          {/* Analytics Tracker */}
          <AnalyticsTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}


