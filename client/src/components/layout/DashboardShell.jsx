import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardShell({ current, topbar, children }) {
  return (
    <div className="font-script min-h-screen bg-sketch-bg px-6 py-10">
      <div className="mx-auto max-w-295">
        <div className="flex min-h-190 overflow-hidden rounded-sm border border-sketch-border bg-white shadow-sm">
          <Sidebar current={current} />

          <div className="flex min-w-0 flex-1 flex-col">
            {topbar ?? <Topbar />}
            <div className="p-5.5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
