import { useState } from "react";

export default function AiAssistantWidget() {
  const [applied, setApplied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="lg:col-span-5 xl:col-span-4 p-space-lg rounded-xl bg-ai-surface shadow-sm flex flex-col items-center justify-center text-center gap-space-sm border border-ai-border/50">
        <span className="material-symbols-outlined text-3xl text-ai-accent">auto_awesome</span>
        <p className="font-title-sm text-title-sm font-semibold text-on-surface">
          Draf AI Telah Ditutup
        </p>
        <button
          type="button"
          onClick={() => setDismissed(false)}
          className="text-ai-accent font-label-md text-label-md underline hover:text-primary transition-colors"
        >
          Tampilkan Rekomendasi Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-5 xl:col-span-4 p-space-lg rounded-xl bg-ai-surface shadow-sm flex flex-col justify-between relative overflow-hidden">
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="px-2 py-1 rounded-md bg-ai-border text-ai-accent font-label-md text-label-md flex items-center gap-1 font-bold">
              <span
                className="material-symbols-outlined text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                arrow_back_ios_new
              </span>
              Draf AI (Non-Destructive)
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary">
            Analisis Otomatis v2.4
          </span>
        </div>

        <h3 className="font-title-md text-title-md font-bold text-on-surface mt-space-xs">
          Insight Beban Tim &amp; Bottleneck
        </h3>

        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          AI mendeteksi <strong>18 tugas tertahan di kolom Review</strong> lebih dari 72 jam. Tim Backend membutuhkan bantuan untuk menyelesaikan pull request tertunda.
        </p>

        {/* Recommendation Action Box */}
        <div className="p-space-sm rounded-lg bg-surface shadow-sm flex flex-col gap-space-xs">
          <span className="font-label-md text-label-md text-primary-container font-semibold">
            Rekomendasi Penyesuaian Kapasitas:
          </span>
          <ul className="text-body-sm font-body-sm text-secondary list-disc pl-4 space-y-1">
            <li>Pindahkan 2 reviewer dari Tim Frontend ke Proyek Data Warehouse.</li>
            <li>Jadwalkan sesi unblock 45 menit sebelum cut-off sprint Jumat sore.</li>
          </ul>
        </div>
      </div>

      {/* AI Governance / Action Toolbar */}
      <div className="mt-space-md pt-space-sm flex flex-col gap-space-xs">
        <div className="flex items-center gap-space-sm">
          <button
            onClick={() => setApplied(true)}
            className={`flex-1 py-2 px-space-sm rounded-md font-title-sm text-title-sm transition-colors text-center shadow-sm ${
              applied
                ? "bg-status-done text-white"
                : "bg-primary-container text-on-primary hover:bg-primary"
            }`}
            type="button"
          >
            {applied ? "✓ Saran Diterapkan" : "Terapkan Saran"}
          </button>
          <button
            className="py-2 px-space-sm rounded-md bg-surface text-secondary hover:text-on-surface font-title-sm text-title-sm shadow-sm transition-colors"
            title="Ubah instruksi dengan prompt"
            type="button"
          >
            <span className="material-symbols-outlined text-base align-middle">
              edit_note
            </span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="py-2 px-space-sm rounded-md bg-surface text-priority-urgent hover:bg-error-container transition-colors shadow-sm"
            title="Abaikan draf ini"
            type="button"
          >
            <span className="material-symbols-outlined text-base align-middle">
              close
            </span>
          </button>
        </div>
        <span className="font-label-sm text-label-sm text-secondary text-center">
          Tindakan ini memerlukan konfirmasi otorisasi PM.
        </span>
      </div>
    </div>
  );
}
