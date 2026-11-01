import { useState, useEffect, useId } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

async function requestExternalTasks(simulateFailure = false, signal) {
  const targetEndpoint = simulateFailure
    ? "https://jsonplaceholder.typicode.com/invalid-endpoint-404"
    : `${API_URL}?_limit=6`;

  const response = await fetch(targetEndpoint, { signal });

  if (!response.ok) {
    throw new Error(
      `Gagal mengambil data backlog dari server (Status HTTP ${response.status}).`
    );
  }

  return response.json();
}

const TEAM_MEMBERS = [
  { id: 1, name: "Fatimah Zahra (Frontend)" },
  { id: 2, name: "Rian Hidayat (Backend)" },
  { id: 3, name: "Dedi Prasetyo (Data Engineer)" },
  { id: 4, name: "Eko Susanto (SecOps)" },
  { id: 5, name: "Maya Anggraini (QA Analyst)" },
  { id: 6, name: "Hendri Kurniawan (DevOps)" },
];

const getAssigneeName = (userId) => {
  const found = TEAM_MEMBERS.find((member) => member.id === Number(userId));
  return found ? found.name : `Anggota Tim #${userId}`;
};

export default function ExternalTaskSync() {
  // State utama untuk konsumsi API (Data, Loading, Error)
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk form pengiriman task baru (POST)
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("1");
  const [fieldError, setFieldError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postFeedback, setPostFeedback] = useState(null);

  // ID unik untuk aksesibilitas relasi <label> dan <input>
  const baseId = useId();
  const titleInputId = `${baseId}-task-title`;
  const titleErrorId = `${baseId}-task-title-error`;
  const assigneeSelectId = `${baseId}-task-assignee`;

  // Fungsi pemuatan ulang data (dipanggil pada tombol "Coba Lagi", "Muat Ulang", atau "Uji Error")
  const fetchExternalTasks = async (simulateFailure = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await requestExternalTasks(simulateFailure);
      setTasks(data);
    } catch (err) {
      setError(
        err.message ||
          "Tidak dapat terhubung ke server API. Periksa koneksi internet Anda."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Pengambilan data awal otomatis saat komponen pertama kali dipasang (mount)
  useEffect(() => {
    const controller = new AbortController();

    requestExternalTasks(false, controller.signal)
      .then((data) => {
        setTasks(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(
          err.message ||
            "Tidak dapat terhubung ke server API. Periksa koneksi internet Anda."
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Validasi input pada event blur (menghindari pesan error prematur saat masih mengetik)
  const handleTitleBlur = () => {
    if (taskTitle.length > 0 && taskTitle.trim().length < 4) {
      setFieldError("Judul task minimal terdiri dari 4 karakter.");
    }
  };

  // Fungsi pengiriman data baru ke API menggunakan metode POST
  const handleCreateTask = async (e) => {
    e.preventDefault();
    setPostFeedback(null);

    const trimmedTitle = taskTitle.trim();
    if (!trimmedTitle) {
      setFieldError("Judul task wajib diisi sebelum dikirim ke API.");
      return;
    }
    if (trimmedTitle.length < 4) {
      setFieldError("Judul task minimal terdiri dari 4 karakter.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title: trimmedTitle,
          completed: false,
          userId: Number(selectedUserId),
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Gagal mengirim task baru ke server (Status HTTP ${response.status}).`
        );
      }

      const createdTask = await response.json();

      // Pastikan key tetap unik apabila mock API selalu mengembalikan id: 201
      const hasDuplicateId = tasks.some((item) => item.id === createdTask.id);
      const normalizedTask = {
        ...createdTask,
        id: hasDuplicateId ? Date.now() : createdTask.id,
      };

      setTasks((prevTasks) => [normalizedTask, ...prevTasks]);
      setTaskTitle("");
      setFieldError("");
      setPostFeedback({
        type: "success",
        message: `Task "${normalizedTask.title}" berhasil dikirim via HTTP POST (ID #${normalizedTask.id}).`,
      });
    } catch (err) {
      setPostFeedback({
        type: "error",
        message:
          err.message || "Terjadi kendala jaringan saat mengirim data task.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle status lokal untuk simulasi review cepat pada item API
  const handleToggleTaskStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <section className="p-space-lg rounded-xl bg-surface shadow-sm flex flex-col gap-space-lg">
      {/* Header Panel Sinkronisasi API */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-space-md border-b border-border/60">
        <div className="flex items-start sm:items-center gap-space-sm">
          <div className="p-2 rounded-lg bg-surface-container-low text-primary-container shrink-0">
            <span
              className="material-symbols-outlined text-lg"
              aria-hidden="true"
            >
              cloud_sync
            </span>
          </div>
          <div>
            <div className="flex items-center gap-space-xs flex-wrap">
              <h2 className="font-title-md text-title-md font-bold text-on-surface">
                Sinkronisasi Backlog Task Eksternal (REST API)
              </h2>
              {!isLoading && !error && (
                <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-status-done font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-done"></span>
                  GET /todos • {tasks.length} Item
                </span>
              )}
            </div>
            <p className="font-label-sm text-label-sm text-secondary mt-0.5">
              Integrasi langsung dengan endpoint publik JSONPlaceholder menggunakan{" "}
              <code className="px-1 py-0.5 rounded bg-surface-container-low text-on-surface">
                fetch()
              </code>
            </p>
          </div>
        </div>

        {/* Tombol Utilitas Refresh & Uji Kondisi Error */}
        <div className="flex items-center gap-space-xs shrink-0">
          <button
            type="button"
            onClick={() => fetchExternalTasks(false)}
            disabled={isLoading}
            className="flex items-center gap-1 px-space-sm py-1.5 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors disabled:opacity-50 cursor-pointer"
          >
            <span
              className={`material-symbols-outlined text-sm ${
                isLoading ? "animate-spin" : ""
              }`}
              aria-hidden="true"
            >
              refresh
            </span>
            <span>Muat Ulang</span>
          </button>

          <button
            type="button"
            onClick={() => fetchExternalTasks(true)}
            disabled={isLoading}
            className="flex items-center gap-1 px-space-sm py-1.5 rounded-lg border border-border text-secondary hover:text-priority-urgent hover:border-priority-urgent/40 font-label-md text-label-md transition-colors disabled:opacity-50 cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-sm"
              aria-hidden="true"
            >
              bug_report
            </span>
            <span>Uji Error</span>
          </button>
        </div>
      </div>

      {/* Interaksi Form POST: Tambah Task Baru ke API */}
      <form
        method="POST"
        action={API_URL}
        onSubmit={handleCreateTask}
        noValidate
        className="p-space-md rounded-xl bg-surface-container-low/60 border border-border/70 flex flex-col gap-space-sm"
      >
        <div className="flex items-center justify-between flex-wrap gap-space-xs">
          <span className="font-title-sm text-title-sm font-semibold text-on-surface flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-base text-primary-container"
              aria-hidden="true"
            >
              send
            </span>
            Tambah Task Baru ke Server API (HTTP POST)
          </span>
          <span className="font-label-sm text-label-sm text-secondary">
            POST https://jsonplaceholder.typicode.com/todos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-start">
          {/* Input Judul Task */}
          <div className="md:col-span-6 flex flex-col gap-1">
            <label
              htmlFor={titleInputId}
              className="font-label-md text-label-md text-on-surface"
            >
              Judul Task Pekerjaan <span className="text-priority-urgent">*</span>
            </label>
            <input
              id={titleInputId}
              name="title"
              type="text"
              required
              minLength={4}
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
                if (fieldError) setFieldError("");
              }}
              onBlur={handleTitleBlur}
              aria-invalid={fieldError ? "true" : "false"}
              aria-describedby={fieldError ? titleErrorId : undefined}
              placeholder="Contoh: Integrasi endpoint autentikasi JWT NestJS"
              className={`w-full px-space-sm py-2 rounded-lg bg-surface border font-body-md text-body-md text-on-surface placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary-container transition-all ${
                fieldError ? "border-priority-urgent" : "border-border"
              }`}
            />
            {fieldError && (
              <span
                id={titleErrorId}
                role="alert"
                className="font-label-sm text-label-sm text-priority-urgent flex items-center gap-1 mt-0.5"
              >
                <span
                  className="material-symbols-outlined text-xs"
                  aria-hidden="true"
                >
                  error
                </span>
                {fieldError}
              </span>
            )}
          </div>

          {/* Pilihan Anggota Tim (6 opsi -> menggunakan <select>) */}
          <div className="md:col-span-4 flex flex-col gap-1">
            <label
              htmlFor={assigneeSelectId}
              className="font-label-md text-label-md text-on-surface"
            >
              Ditugaskan Kepada (PIC)
            </label>
            <select
              id={assigneeSelectId}
              name="userId"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full px-space-sm py-2 rounded-lg bg-surface border border-border font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
            >
              {TEAM_MEMBERS.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tombol Submit POST */}
          <div className="md:col-span-2 flex flex-col justify-end md:pt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-space-md rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-sm hover:bg-primary transition-colors flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer"
            >
              <span
                className={`material-symbols-outlined text-base ${
                  isSubmitting ? "animate-spin" : ""
                }`}
                aria-hidden="true"
              >
                {isSubmitting ? "progress_activity" : "add_task"}
              </span>
              <span>{isSubmitting ? "Mengirim..." : "Kirim POST"}</span>
            </button>
          </div>
        </div>

        {/* Feedback Pengiriman POST */}
        {postFeedback && (
          <div
            role={postFeedback.type === "error" ? "alert" : "status"}
            className={`mt-1 px-space-sm py-2 rounded-lg font-body-sm text-body-sm flex items-center justify-between gap-space-sm ${
              postFeedback.type === "error"
                ? "bg-error-container text-on-error-container"
                : "bg-status-done/15 text-on-surface border border-status-done/30"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span
                className={`material-symbols-outlined text-base ${
                  postFeedback.type === "error"
                    ? "text-on-error-container"
                    : "text-status-done"
                }`}
                aria-hidden="true"
              >
                {postFeedback.type === "error" ? "error" : "check_circle"}
              </span>
              <span>{postFeedback.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setPostFeedback(null)}
              className="text-secondary hover:text-on-surface p-0.5"
              aria-label="Tutup pesan status"
            >
              <span
                className="material-symbols-outlined text-sm"
                aria-hidden="true"
              >
                close
              </span>
            </button>
          </div>
        )}
      </form>

      {/* Area Render State: 1. LOADING, 2. ERROR (+ Tombol Coba Lagi), 3. SUCCESS (Render List .map()) */}
      {isLoading ? (
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center gap-space-xs text-secondary font-body-sm text-body-sm">
            <span
              className="material-symbols-outlined text-base animate-spin text-primary-container"
              aria-hidden="true"
            >
              sync
            </span>
            <span>Sedang memuat daftar task dari server eksternal...</span>
          </div>

          {/* Skeleton Cards sesuai bentuk konten */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
            {[1, 2, 3, 4, 5, 6].map((placeholderId) => (
              <div
                key={placeholderId}
                className="p-space-md rounded-xl border border-border bg-surface-container-low/40 animate-pulse flex flex-col gap-space-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="h-4 w-20 bg-surface-container-high rounded"></div>
                  <div className="h-5 w-24 bg-surface-container-high rounded-full"></div>
                </div>
                <div className="h-4 w-4/5 bg-surface-container-high rounded mt-1"></div>
                <div className="h-3 w-1/2 bg-surface-container rounded mt-1"></div>
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div
          role="alert"
          className="p-space-lg rounded-xl bg-error-container/50 border border-priority-urgent/30 flex flex-col items-center justify-center text-center gap-space-sm"
        >
          <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
            <span
              className="material-symbols-outlined text-2xl"
              aria-hidden="true"
            >
              cloud_off
            </span>
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <h3 className="font-title-md text-title-md font-bold text-on-surface">
              Gagal Memuat Data Backlog API
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {error}
            </p>
          </div>
          {/* Interaksi Khusus Kondisi Error: Tombol "Coba Lagi" */}
          <button
            type="button"
            onClick={() => fetchExternalTasks(false)}
            className="mt-1 flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-sm hover:bg-primary transition-colors cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-base"
              aria-hidden="true"
            >
              replay
            </span>
            <span>Coba Lagi</span>
          </button>
        </div>
      ) : (
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 gap-space-sm list-none p-0 m-0"
        >
          {tasks.map((task) => {
            const isDone = Boolean(task.completed);
            return (
              <li
                key={task.id}
                className="p-space-md rounded-xl border border-border bg-background/60 hover:bg-surface-container-low/50 transition-colors flex flex-col justify-between gap-space-sm"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-space-xs">
                    <span className="font-label-sm text-label-sm font-semibold text-primary-container bg-primary-container/10 px-2 py-0.5 rounded">
                      #TK-{task.id}
                    </span>

                    <button
                      type="button"
                      aria-pressed={isDone}
                      onClick={() => handleToggleTaskStatus(task.id)}
                      className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                        isDone
                          ? "bg-status-done/15 text-status-done"
                          : "bg-surface-container-high text-status-in-progress"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-xs"
                        aria-hidden="true"
                      >
                        {isDone ? "check_circle" : "pending"}
                      </span>
                      <span>{isDone ? "Done" : "In Progress"}</span>
                      <span className="sr-only"> untuk task #{task.id}</span>
                    </button>
                  </div>

                  <p
                    className={`font-title-sm text-title-sm font-semibold leading-snug ${
                      isDone
                        ? "line-through text-secondary"
                        : "text-on-surface"
                    }`}
                  >
                    {task.title}
                  </p>
                </div>

                <div className="pt-space-xs border-t border-border/60 flex items-center justify-between font-label-sm text-label-sm text-secondary">
                  <span className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-xs"
                      aria-hidden="true"
                    >
                      person
                    </span>
                    {getAssigneeName(task.userId)}
                  </span>
                  <span>API Sync</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
