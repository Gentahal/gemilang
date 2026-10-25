import ProjectCard from "./ProjectCard";

export default function ProjectList({
  projects = [],
  onDeleteProject,
  onOpenForm,
  onResetMock,
}) {
  return (
    <div className="lg:col-span-7 xl:col-span-8 p-space-lg rounded-xl bg-surface shadow-sm flex flex-col">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-space-md border-b border-border/50">
        <div className="flex items-center gap-space-sm">
          <div className="p-2 rounded-lg bg-surface-container-low text-primary-container">
            <span className="material-symbols-outlined text-lg">layers</span>
          </div>
          <div>
            <h2 className="font-title-md text-title-md font-bold text-on-surface">
              Project Prioritas &amp; Progres
            </h2>
            <p className="font-label-sm text-label-sm text-secondary">
              Pantauan deliverables strategis kuartal ini ({projects.length} project terdaftar)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-space-sm">
          {projects.length === 0 && onResetMock && (
            <button
              type="button"
              onClick={onResetMock}
              className="text-secondary hover:text-on-surface font-label-md text-label-md flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-xs">restart_alt</span>
              Reset Data Demo
            </button>
          )}
          <a
            className="font-label-md text-label-md text-primary-container hover:text-primary font-semibold flex items-center gap-1 transition-colors"
            href="#all-projects"
          >
            Lihat Semua Proyek
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Conditional Rendering: Check if list is empty or has items */}
      <div className="mt-space-sm flex-1">
        {projects.length === 0 ? (
          <div className="py-12 px-space-md text-center bg-surface-container-low/40 rounded-xl border border-dashed border-border flex flex-col items-center justify-center gap-space-sm">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-2xl">folder_off</span>
            </div>
            <p className="font-title-md text-title-md font-bold text-on-surface">
              Belum ada data project
            </p>
            <p className="font-body-sm text-body-sm text-secondary max-w-sm">
              Saat ini belum ada data project yang tersimpan. Silakan klik tombol di bawah untuk menambahkan project baru ke dalam sistem GEMILANG.
            </p>
            <div className="flex items-center gap-space-sm mt-space-xs">
              {onOpenForm && (
                <button
                  type="button"
                  onClick={onOpenForm}
                  className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-sm hover:bg-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  <span>Tambah Project Baru</span>
                </button>
              )}
              {onResetMock && (
                <button
                  type="button"
                  onClick={onResetMock}
                  className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface border border-border text-on-surface font-title-sm text-title-sm hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined text-base">restart_alt</span>
                  <span>Muat Data Contoh</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-transparent">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDeleteProject={onDeleteProject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
