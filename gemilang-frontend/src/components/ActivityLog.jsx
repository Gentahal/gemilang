export default function ActivityLog() {
  const activities = [
    {
      id: 1,
      user: "Budi Santoso",
      action: "memindahkan task ke Review",
      time: "10 menit yang lalu",
      icon: "commit",
      iconBg: "bg-surface-container-high text-status-in-progress",
      detail: (
        <>
          Task <span className="font-semibold text-on-surface">#TK-1084 Implementasi OAuth2 Provider</span> pada project Portal Pelayanan.
        </>
      ),
    },
    {
      id: 2,
      user: "GEMILANG AI Assistant",
      action: "menghasilkan draf sprint",
      time: "32 menit yang lalu",
      icon: "auto_awesome",
      iconBg: "bg-ai-surface text-ai-accent",
      detail: (
        <>
          Rekomendasi alokasi sprint 21 telah diarsipkan ke panel peninjauan non-destruktif.
        </>
      ),
    },
    {
      id: 3,
      user: "Siti Rahma",
      action: "menandai prioritas Urgent",
      time: "1 jam yang lalu",
      icon: "priority_high",
      iconBg: "bg-surface-container-high text-priority-urgent",
      detail: (
        <>
          Task <span className="font-semibold text-on-surface">#TK-1042 Patch Kerentanan CVE Database Server</span> mendekati batas 24 jam.
        </>
      ),
    },
    {
      id: 4,
      user: "Ahmad Faisal",
      action: "menyetujui Deployment Staging",
      time: "3 jam yang lalu",
      icon: "check_circle",
      iconBg: "bg-surface-container-high text-status-done",
      detail: (
        <>
          Versi rilis v2.4.1-rc berhasil divalidasi dengan integrasi CI/CD pipelines.
        </>
      ),
    },
  ];

  return (
    <div className="lg:col-span-8 p-space-lg rounded-xl bg-surface shadow-sm flex flex-col">
      <div className="flex items-center justify-between pb-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="p-2 rounded-lg bg-surface-container-low text-secondary">
            <span className="material-symbols-outlined text-lg">history</span>
          </div>
          <div>
            <h2 className="font-title-md text-title-md font-bold text-on-surface">
              Aktivitas Terbaru
            </h2>
            <p className="font-label-sm text-label-sm text-secondary">
              Jejak audit operasional biro secara realtime
            </p>
          </div>
        </div>
        <span className="font-label-sm text-label-sm text-secondary">
          Live Synchronized
        </span>
      </div>

      {/* Activity Timeline List */}
      <div className="flex flex-col gap-space-md">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start gap-space-md">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${item.iconBg}`}
            >
              <span className="material-symbols-outlined text-base">
                {item.icon}
              </span>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-baseline justify-between flex-wrap gap-space-xs">
                <span className="font-title-sm text-title-sm text-on-surface font-medium">
                  {item.user} {item.action}
                </span>
                <span className="font-label-sm text-label-sm text-secondary">
                  {item.time}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mt-0.5">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
