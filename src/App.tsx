import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FarmProvider, useFarm } from './context/FarmContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';

// Lazy-loaded Views for ultra-fast initial load & code splitting
const DashboardView = React.lazy(() => import('./pages/DashboardView').then((m) => ({ default: m.DashboardView })));
const AnimalsView = React.lazy(() => import('./pages/AnimalsView').then((m) => ({ default: m.AnimalsView })));
const AiAdvisorView = React.lazy(() => import('./pages/AiAdvisorView').then((m) => ({ default: m.AiAdvisorView })));
const MultiAgentView = React.lazy(() => import('./pages/MultiAgentView').then((m) => ({ default: m.MultiAgentView })));
const ScheduleView = React.lazy(() => import('./pages/ScheduleView').then((m) => ({ default: m.ScheduleView })));
const BarnsView = React.lazy(() => import('./pages/BarnsView').then((m) => ({ default: m.BarnsView })));
const InventoryView = React.lazy(() => import('./pages/InventoryView').then((m) => ({ default: m.InventoryView })));
const HealthLogsView = React.lazy(() => import('./pages/HealthLogsView').then((m) => ({ default: m.HealthLogsView })));
const ReportsView = React.lazy(() => import('./pages/ReportsView').then((m) => ({ default: m.ReportsView })));
const SdlcFactoryView = React.lazy(() => import('./pages/SdlcFactoryView').then((m) => ({ default: m.SdlcFactoryView })));
const PromptComparisonView = React.lazy(() => import('./pages/PromptComparisonView').then((m) => ({ default: m.PromptComparisonView })));

const PageLoadingSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-28 bg-emerald-900/10 rounded-2xl border border-emerald-900/10 flex items-center px-6">
      <div className="w-48 h-8 bg-emerald-800/20 rounded-lg" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="h-28 bg-slate-200/70 rounded-2xl" />
      <div className="h-28 bg-slate-200/70 rounded-2xl" />
      <div className="h-28 bg-slate-200/70 rounded-2xl" />
    </div>
    <div className="h-72 bg-slate-200/70 rounded-2xl" />
  </div>
);

function MainApp() {
  const { activeTab, setActiveTab } = useFarm();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleQuickAdd = () => {
    setActiveTab('animals');
    // AnimalsView will trigger modal via custom event or tab
    window.dispatchEvent(new CustomEvent('farmpro-open-add-animal'));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 pb-16 lg:pb-0">
      {/* Top Navigation */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* Main Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto items-start">
        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Dynamic Content View with Smooth HeroUI Page Transitions & Lazy Loading */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <Suspense fallback={<PageLoadingSkeleton />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {activeTab === 'dashboard' && <DashboardView onOpenAddAnimal={handleQuickAdd} />}
                {activeTab === 'animals' && <AnimalsView />}
                {activeTab === 'sdlc-factory' && <SdlcFactoryView />}
                {activeTab === 'prompt-comparison' && <PromptComparisonView />}
                {activeTab === 'multi-agent' && <MultiAgentView />}
                {activeTab === 'ai-advisor' && <AiAdvisorView />}
                {activeTab === 'schedule' && <ScheduleView />}
                {activeTab === 'barns' && <BarnsView />}
                {activeTab === 'inventory' && <InventoryView />}
                {activeTab === 'health-logs' && <HealthLogsView />}
                {activeTab === 'reports' && <ReportsView />}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (< 1024px) */}
      <MobileBottomNav onQuickAddAnimal={handleQuickAdd} />

      {/* Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
}

export function App() {
  return (
    <ToastProvider>
      <FarmProvider>
        <MainApp />
      </FarmProvider>
    </ToastProvider>
  );
}

export default App;
