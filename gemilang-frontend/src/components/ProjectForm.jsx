import { useState } from "react";

export default function ProjectForm({ isOpen, onClose, onAddProject }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Planning");
  const [deadline, setDeadline] = useState("");
  const [progress, setProgress] = useState(0);
  const [milestone, setMilestone] = useState("");
  const [icon, setIcon] = useState("account_balance");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Nama project wajib diisi!");
      return;
    }

    const newProject = {
      id: Date.now(),
      name: name.trim(),
      status,
      deadline: deadline ? deadline : "31 Des 2024",
      progress: Number(progress) || 0,
      milestone: milestone.trim() || `${progress}% deliverables tercapai`,
      icon,
      members: [
        {
          name: "Ahmad Faisal",
          avatar: "/images/avatar.jpeg",
        },
      ],
    };

    onAddProject(newProject);

    // Reset Form
    setName("");
    setStatus("Planning");
    setDeadline("");
    setProgress(0);
    setMilestone("");
    setIcon("account_balance");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface w-full max-w-lg rounded-xl shadow-xl border border-border overflow-hidden">
        {/* Header Modal */}
        <div className="px-space-lg py-space-md bg-surface-container-low border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="p-2 rounded-lg bg-primary-container text-on-primary">
              <span className="material-symbols-outlined text-lg">add_box</span>
            </div>
            <div>
              <h2 className="font-title-md text-title-md font-bold text-on-surface">
                Tambah Project Baru
              </h2>
              <p className="font-label-sm text-label-sm text-secondary">
                Entitas Manajemen Siklus Proyek GEMILANG
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-space-lg flex flex-col gap-space-md">
          {error && (
            <div className="p-space-sm rounded-lg bg-error-container text-on-error-container font-label-md text-label-md flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-base">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Nama Project */}
          <div className="flex flex-col gap-1">
            <label className="font-title-sm text-title-sm text-on-surface">
              Nama Project <span className="text-priority-urgent">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              className="w-full px-space-sm py-2 rounded-lg bg-background border border-border text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all"
              placeholder="Contoh: Digitalisasi Arsip Biro Wilayah"
              autoFocus
            />
          </div>

          {/* Status & Deadline (2 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1">
              <label className="font-title-sm text-title-sm text-on-surface">
                Status Proyek
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-space-sm py-2 rounded-lg bg-background border border-border text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-title-sm text-title-sm text-on-surface">
                Tenggat Waktu / Deadline
              </label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-space-sm py-2 rounded-lg bg-background border border-border text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                placeholder="Misal: 15 Jan 2025"
              />
            </div>
          </div>

          {/* Progress & Milestone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="font-title-sm text-title-sm text-on-surface">
                  Progres Awal ({progress}%)
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="w-full accent-primary-container cursor-pointer mt-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-title-sm text-title-sm text-on-surface">
                Target / Milestone Deliverables
              </label>
              <input
                type="text"
                value={milestone}
                onChange={(e) => setMilestone(e.target.value)}
                className="w-full px-space-sm py-2 rounded-lg bg-background border border-border text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                placeholder="Misal: Sprint 1 Rilis UI"
              />
            </div>
          </div>

          {/* Kategori Ikon */}
          <div className="flex flex-col gap-1">
            <label className="font-title-sm text-title-sm text-on-surface">
              Ikon Identitas Project
            </label>
            <div className="flex items-center gap-space-sm">
              {[
                { id: "account_balance", label: "Publik" },
                { id: "database", label: "Data" },
                { id: "security", label: "Keamanan" },
                { id: "speed", label: "Performa" },
                { id: "cloud_sync", label: "Cloud" },
                { id: "api", label: "API" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIcon(item.id)}
                  className={`p-2 rounded-lg border flex items-center justify-center transition-all ${
                    icon === item.id
                      ? "border-primary-container bg-primary-container/10 text-primary-container font-semibold ring-2 ring-primary-container/30"
                      : "border-border text-secondary hover:bg-surface-container-low hover:text-on-surface"
                  }`}
                  title={item.label}
                >
                  <span className="material-symbols-outlined text-lg">{item.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-space-sm pt-space-md border-t border-border flex items-center justify-end gap-space-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-2 rounded-lg text-secondary hover:bg-surface-container-low hover:text-on-surface font-title-sm text-title-sm transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-sm hover:bg-primary transition-colors"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Tambah</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
