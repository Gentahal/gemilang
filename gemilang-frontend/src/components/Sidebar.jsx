export default function Sidebar({ activeNav = "dashboard", onNavChange }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "projects", label: "Projects", icon: "folder_open" },
    { id: "kanban-board", label: "Kanban Board", icon: "view_kanban" },
    { id: "notifications", label: "Notifications", icon: "notifications", badge: 3 },
    { id: "user-management", label: "User Management", icon: "group" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 px-space-md flex items-center gap-space-sm bg-surface">
          <img
            alt="GEMILANG Logo"
            className="h-9 w-9 object-cover rounded-md shadow-sm"
            src="/images/logo/logo.jpeg"
          />
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">
              GEMILANG
            </span>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
              Enterprise PMS
            </span>
          </div>
        </div>

        {/* Agency Unit Badge */}
        <div className="px-space-md py-space-sm">
          <div className="px-space-sm py-space-xs rounded bg-surface-container-low flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-sm text-secondary">
              domain
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
              Biro Teknologi & Operasional
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-space-xs px-space-sm py-space-sm">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavChange && onNavChange(item.id)}
                className={`flex items-center justify-between px-space-md py-space-sm rounded-lg transition-all group text-left ${
                  isActive
                    ? "bg-primary-container text-on-primary font-title-sm shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <span
                    className={`material-symbols-outlined transition-colors ${
                      isActive
                        ? "text-on-primary"
                        : "text-on-surface-variant group-hover:text-on-surface"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-title-sm text-title-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-space-xs py-0.5 rounded-full font-label-sm text-label-sm ${
                      isActive
                        ? "bg-white/20 text-on-primary"
                        : "bg-secondary-container text-on-secondary-fixed"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
