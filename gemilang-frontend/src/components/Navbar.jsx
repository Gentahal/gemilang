export default function Navbar({
  searchQuery = "",
  onSearchChange,
  user = {
    name: "Ahmad Faisal",
    role: "Project Manager",
    avatar: "/images/avatar.jpeg",
  },
}) {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40">
      <div className="h-16 w-full px-gutter-desktop flex items-center justify-between gap-space-md">
        {/* Search Bar */}
        <div className="flex items-center flex-1 max-w-lg">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-secondary">
              search
            </span>
            <input
              className="w-full h-9 pl-10 pr-space-md rounded-md bg-background text-on-surface font-body-md text-body-md placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
              placeholder="Cari proyek, task, atau anggota... [Ctrl+K]"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            />
            <kbd className="absolute right-space-sm top-1/2 -translate-y-1/2 px-space-xs py-0.5 rounded bg-surface text-secondary font-label-sm text-label-sm shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Right Section Actions & Profile */}
        <div className="flex items-center gap-space-md">
          {/* Weather Widget Chip */}
          <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1.5 rounded-md bg-surface-container-low text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary text-sm">
              partly_cloudy_day
            </span>
            <span className="font-label-md text-label-md font-medium text-on-surface">
              Jakarta 29°C
            </span>
            <span className="text-outline-variant font-label-sm">•</span>
            <span className="font-label-sm text-label-sm text-secondary">
              Kelembapan 74%
            </span>
          </div>

          <div className="h-6 w-px bg-border hidden xl:block"></div>

          {/* Notifications Button */}
          <button
            className="relative p-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
            type="button"
            title="Notifikasi"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-priority-urgent"></span>
          </button>

          {/* Help Button */}
          <button
            className="p-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
            type="button"
            title="Bantuan & Dokumentasi"
          >
            <span className="material-symbols-outlined">help_outline</span>
          </button>

          <div className="h-6 w-px bg-border"></div>

          {/* Profile User Info */}
          <div className="flex items-center gap-space-sm cursor-pointer group">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-[0_1px_8px_rgba(0,0,0,0.04)] group-hover:ring-2 group-hover:ring-primary-container transition-all"
              src={user.avatar}
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-title-sm text-title-sm text-on-surface font-medium leading-none">
                {user.name}
              </span>
              <span className="font-label-sm text-label-sm text-secondary leading-tight mt-0.5">
                {user.role}
              </span>
            </div>
            <span className="material-symbols-outlined text-secondary text-sm group-hover:text-on-surface transition-colors">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
