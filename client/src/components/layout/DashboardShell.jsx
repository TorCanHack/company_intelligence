import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardShell({ current, topbar, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="font-script h-screen overflow-hidden bg-sketch-bg sm:px-6 sm:py-10">
      <div className="mx-auto h-full max-w-295">
        <div className="flex h-full overflow-hidden rounded-none border border-sketch-border bg-white shadow-sm sm:rounded-sm">
          <Sidebar current={current} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <div className="flex flex-none items-center gap-3 border-b border-dashed border-sketch-divider px-3.5 py-2.5 md:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                className="text-sketch-text"
              >
                <Menu className="size-5" />
              </button>
              <span className="font-handwritten text-sm text-sketch-heading">Company Intelligence</span>
            </div>
            <div className="flex-none">{topbar ?? <Topbar />}</div>
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-5.5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
