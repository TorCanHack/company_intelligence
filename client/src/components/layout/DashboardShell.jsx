import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardShell({ current, topbar, children }) {
  return (
    <div className="font-script h-screen overflow-hidden bg-sketch-bg px-6 py-10">
      <div className="mx-auto h-full max-w-295">
        <div className="flex h-full overflow-hidden rounded-sm border border-sketch-border bg-white shadow-sm">
          <Sidebar current={current} />

          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <div className="flex-none">{topbar ?? <Topbar />}</div>
            <div className="flex-1 overflow-y-auto p-5.5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
