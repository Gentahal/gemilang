export default function ProjectCard({ project, onDeleteProject }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case "In Progress":
        return {
          badgeClass: "bg-surface-container-high text-status-in-progress",
          barClass: "bg-primary-container",
          iconBg: "bg-primary-container/10",
          iconColor: "text-primary-container",
          defaultIcon: "account_balance",
        };
      case "Planning":
        return {
          badgeClass: "bg-surface-container-high text-status-review",
          barClass: "bg-status-review",
          iconBg: "bg-status-review/10",
          iconColor: "text-status-review",
          defaultIcon: "database",
        };
      case "On Hold":
        return {
          badgeClass: "bg-surface-container-high text-priority-medium",
          barClass: "bg-priority-medium",
          iconBg: "bg-priority-medium/10",
          iconColor: "text-priority-medium",
          defaultIcon: "security",
        };
      case "Completed":
        return {
          badgeClass: "bg-surface-container-high text-status-done",
          barClass: "bg-status-done",
          iconBg: "bg-status-done/10",
          iconColor: "text-status-done",
          defaultIcon: "speed",
        };
      default:
        return {
          badgeClass: "bg-surface-container-high text-secondary",
          barClass: "bg-secondary",
          iconBg: "bg-surface-container-low",
          iconColor: "text-secondary",
          defaultIcon: "folder",
        };
    }
  };

  const statusConfig = getStatusConfig(project.status);
  const icon = project.icon || statusConfig.defaultIcon;
  const iconBg = project.iconBg || statusConfig.iconBg;
  const iconColor = project.iconColor || statusConfig.iconColor;

  return (
    <div className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md hover:bg-surface-container-low/50 px-space-sm rounded-lg transition-colors group">
      {/* Left Details */}
      <div className="flex items-start gap-space-md min-w-0">
        <div
          className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}
        >
          <span className={`material-symbols-outlined ${iconColor} text-xl`}>
            {icon}
          </span>
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-xs flex-wrap">
            <span className="font-title-sm text-title-sm font-semibold text-on-surface truncate">
              {project.name}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${statusConfig.badgeClass}`}
            >
              {project.status}
            </span>
          </div>

          <div className="flex items-center gap-space-sm mt-1 text-secondary font-body-sm text-body-sm flex-wrap">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">
                {project.status === "Completed" ? "verified" : "calendar_clock"}
              </span>
              {project.status === "Completed"
                ? `Selesai pada ${project.deadline}`
                : `Tenggat: ${project.deadline}`}
            </span>
            <span>•</span>
            <span
              className={
                project.milestoneAlert ? "text-priority-urgent flex items-center gap-1" : ""
              }
            >
              {project.milestoneAlert && (
                <span className="material-symbols-outlined text-xs">pending_actions</span>
              )}
              {project.milestone || `${project.progress}% deliverables tercapai`}
            </span>
          </div>
        </div>
      </div>

      {/* Right Progress, Avatars & Action */}
      <div className="flex items-center gap-space-md shrink-0 justify-between sm:justify-end">
        {/* Progress bar */}
        <div className="w-28 flex flex-col gap-1">
          <div className="flex justify-between font-label-sm text-label-sm">
            <span className="text-secondary font-medium">Progres</span>
            <span className="text-on-surface font-semibold">{project.progress}%</span>
          </div>
          <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
            <div
              className={`${statusConfig.barClass} h-full rounded-full transition-all duration-300`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Member Avatars */}
        {project.members && project.members.length > 0 ? (
          <div className="flex -space-x-2 overflow-hidden">
            {project.members.map((member, index) => (
              <img
                key={index}
                className="inline-block h-7 w-7 rounded-full object-cover ring-2 ring-surface shadow-sm"
                src={member.avatar}
                alt={member.name || `Anggota tim ${index + 1}`}
                title={member.name}
              />
            ))}
          </div>
        ) : (
          <div className="flex -space-x-2 overflow-hidden">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-high text-xs font-semibold text-secondary ring-2 ring-surface">
              GH
            </span>
          </div>
        )}

        {/* Delete action button */}
        {onDeleteProject && (
          <button
            type="button"
            onClick={() => onDeleteProject(project.id)}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-secondary hover:text-priority-urgent hover:bg-error-container/40 transition-all"
            title="Hapus project dari daftar"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        )}
      </div>
    </div>
  );
}
