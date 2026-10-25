export default function DashboardStats({
  totalProjects = 12,
  totalTasks = 148,
  completedTasks = 95,
  criticalTasks = 9,
}) {
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
      {/* Metric 1: Active Projects */}
      <div className="p-space-lg rounded-xl bg-surface shadow-sm flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-start justify-between relative z-10">
          <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">
            Project Aktif
          </span>
          <div className="p-2 rounded-lg bg-surface-container-low text-primary-container">
            <span className="material-symbols-outlined">folder_managed</span>
          </div>
        </div>
        <div className="relative z-10 mt-space-md">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">
              {totalProjects}
            </span>
            <span className="font-title-sm text-title-sm text-secondary">
              Inisiasi &amp; Eksekusi
            </span>
          </div>
          <div className="flex items-center gap-space-xs mt-space-xs text-status-done font-label-md text-label-md">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span className="font-semibold">+2 Project baru</span>
            <span className="text-secondary font-normal">bulan ini</span>
          </div>
        </div>
      </div>

      {/* Metric 2: Total Tasks & Completion */}
      <div className="p-space-lg rounded-xl bg-surface shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-start justify-between">
          <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">
            Total Task
          </span>
          <div className="p-2 rounded-lg bg-surface-container-low text-tertiary-container">
            <span className="material-symbols-outlined">task_alt</span>
          </div>
        </div>
        <div className="mt-space-md">
          <div className="flex items-baseline justify-between">
            <span className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">
              {totalTasks}
            </span>
            <span className="font-label-md text-label-md text-status-done font-semibold bg-surface-container-low px-2 py-0.5 rounded-full">
              {completionPercentage}% Selesai
            </span>
          </div>
          <div className="w-full bg-surface-container-low h-2 rounded-full mt-space-sm overflow-hidden">
            <div
              className="bg-status-done h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <span className="font-label-sm text-label-sm text-secondary block mt-1.5">
            {completedTasks} dari {totalTasks} tugas terverifikasi selesai
          </span>
        </div>
      </div>

      {/* Metric 3: Task Status Distribution */}
      <div className="p-space-lg rounded-xl bg-surface shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">
            Distribusi Status
          </span>
          <span className="font-label-sm text-label-sm text-secondary">
            {totalTasks} Total
          </span>
        </div>
        <div className="mt-space-sm flex flex-col gap-space-xs">
          {/* Multi-segmented track */}
          <div className="h-2 w-full rounded-full flex overflow-hidden bg-surface-container-low">
            <div
              className="bg-status-todo"
              style={{ width: "21.6%" }}
              title="To Do: 32"
            ></div>
            <div
              className="bg-status-in-progress"
              style={{ width: "30.4%" }}
              title="In Progress: 45"
            ></div>
            <div
              className="bg-status-review"
              style={{ width: "12.2%" }}
              title="Review: 18"
            ></div>
            <div
              className="bg-status-done"
              style={{ width: "35.8%" }}
              title="Done: 53"
            ></div>
          </div>
          {/* Legend Grid */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-space-xs font-label-sm text-label-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-status-todo"></span>
              <span className="text-secondary">To Do:</span>
              <span className="font-semibold text-on-surface">32</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-status-in-progress"></span>
              <span className="text-secondary">Progress:</span>
              <span className="font-semibold text-on-surface">45</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-status-review"></span>
              <span className="text-secondary">Review:</span>
              <span className="font-semibold text-on-surface">18</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-status-done"></span>
              <span className="text-secondary">Done:</span>
              <span className="font-semibold text-on-surface">53</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric 4: Overdue & Critical Deadlines */}
      <div className="p-space-lg rounded-xl bg-surface shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-start justify-between">
          <span className="font-label-md text-label-md text-priority-urgent uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-priority-urgent animate-bounce">
              warning
            </span>
            Atensi Kritis
          </span>
          <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
            Urgent
          </span>
        </div>
        <div className="mt-space-md">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-lg text-display-lg font-bold text-priority-urgent">
              {criticalTasks}
            </span>
            <span className="font-title-sm text-title-sm text-on-surface font-semibold">
              Tugas Terancam
            </span>
          </div>
          <div className="mt-space-xs p-space-xs px-space-sm rounded bg-surface-container-low flex items-center justify-between text-secondary font-label-sm text-label-sm">
            <span>&lt; 48 Jam tersisa</span>
            <span className="text-priority-urgent font-semibold">5 Overdue</span>
          </div>
        </div>
      </div>
    </div>
  );
}