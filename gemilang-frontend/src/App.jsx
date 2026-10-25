import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardStats from "./components/DashboardStats";
import ProjectList from "./components/ProjectList";
import ProjectForm from "./components/ProjectForm";
import AiAssistantWidget from "./components/AiAssistantWidget";
import ActivityLog from "./components/ActivityLog";
import WeatherWidget from "./components/WeatherWidget";

const INITIAL_PROJECTS = [
  {
    id: 1,
    name: "Portal Pelayanan Publik Terpadu",
    status: "In Progress",
    deadline: "31 Des 2024",
    progress: 78,
    milestone: "14 dari 20 Sprint Selesai",
    icon: "account_balance",
    iconBg: "bg-primary-container/10",
    iconColor: "text-primary-container",
    members: [
      {
        name: "Fatimah Zahra",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDs2KroURloe3EuPwMh_Q9n4LEqy0NO-Z9MVCWkVd5GOlvbaS9bdsamkkeUqDmt39hcdF4ktXyoMy8XlwpruVK6rZywu-FCMStwEZIqgU88rjTjQg4EpJlL9d2-VteHSaUTqrfEtpPl5PENjQsNlJeGzM_f_4aFfolelN181ayITvKGpAfDQWxL3Q0qgB3LItzqcwNZ5pEtoe2-J_mJdEcPdNwq9O3yLeSQpQIUFl784sUo1uakBkqp",
      },
      {
        name: "Rian Hidayat",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDeVPIckYlqO4-Zd4bSc3807SboKm8YFrXbQGQ29ZEt2aEpCIhONUg3DHENO17KirEDVTqDicdeswF4nOReyTg8NrxoqlawDojvmiHMec0LbIAOBXA_5lCgGhcKi48FSb9niKxCmeMlPAqfJ6uuiDkx3W7wJRDCDlxId4WN5erK_4OfMstWtBWdOyIMJp3DzbHvSsVBDeAosq-azQqvDxk6rsCyze36DjWTrx-BYKuSZJ3SvKq4cXbN",
      },
    ],
  },
  {
    id: 2,
    name: "Migrasi Data Warehouse Enterprise",
    status: "Planning",
    deadline: "15 Nov 2024",
    progress: 32,
    milestone: "Analisis Skema Selesai",
    icon: "database",
    iconBg: "bg-status-review/10",
    iconColor: "text-status-review",
    members: [
      {
        name: "Dedi Prasetyo",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCWovcmiDMPb2N7EFLXTw29vdLPcVTFYPr7ENm8J7Wg3NHD6qPoNtD3E7MuLmYSjElsLn13cHqZj41evYtb4z0Wkp2TV-WvMHhEcs_cJFXT_SYGvfbyGXSCCGbxMJR88_zjGSpoZkukKFr5FX8m2limppeXrYEDV1rWxK4GO-umaeuCxYA-7G7YPnWUFqpqJCkVq5eeVbrxw4M2uvSWojWBINWAhp7J39kBjdRQaFrOdigVIfuXmTpV",
      },
    ],
  },
  {
    id: 3,
    name: "Audit Kepatuhan Keamanan ISO 27001",
    status: "On Hold",
    deadline: "05 Des 2024",
    progress: 45,
    milestone: "Menunggu Dokumen Vendor",
    milestoneAlert: true,
    icon: "security",
    iconBg: "bg-priority-medium/10",
    iconColor: "text-priority-medium",
    members: [
      {
        name: "Eko Susanto",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDVjmlpqB5vswNdKCNQWU1anaQj3zrkRcOZ5kbRfP0N1YFRTimv3kIgfto-GZtl_lxksZav8QJAUAN7YrNhZGev2v46fdGmW22H3PLkLB69p-C3MFMFx1_YRqi7GiBlaNx5WZTqKiHLqvBazkgG8RPgd835jg33MVPPz5nhKeQB5asX9SU_jCHNmO2ylRw_U8rCxE3FYrc3PJobGayYtOCPiaawJoW1Bu9i-1qQ13HMDchaExmcrXff",
      },
      {
        name: "Maya Anggraini",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBD20_jEn-PnfIT8mczzVJS0_6QuKKR1G53wGjr-rvjsBraUjhupHbree7mnvuyaSOZMPFNZbugdPl5bYGnslg0o9pPbhww0ZwVJywABss9pke-5H2WdSh4VZ9W8A1vF5tNJRcX701EJTr5WNPcm2fnJAz5ow1dokdqu3GxFQo6GisW_PQh0PJosR1YJK8JnKXwj9UcNOSERXs7NsaVz0fFJBKpEvPP6T8PNPSYcOO7xgcYoqhhhLmE",
      },
    ],
  },
  {
    id: 4,
    name: "Modernisasi Arsitektur Microservices",
    status: "Completed",
    deadline: "20 Okt 2024",
    progress: 100,
    milestone: "100% QA Terpenuhi",
    icon: "speed",
    iconBg: "bg-status-done/10",
    iconColor: "text-status-done",
    members: [
      {
        name: "Hendri Kurniawan",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBEKHKO0-dhSZk4Z1oPornfSqExuK_k_y5Y5FxfNx9X3JJdDlUF-GB3rs4BCGjTwJksTuyy6i9Bf7hKsyxxGxgPLTSyi0ULF6OBEmcPtk2OyAa1k9AZ4uHBmF2zDommDP95sJk2CH_Ar1LMZRwo0ikhVppmx-cM9Y3uA2y6xsQOIiRHVi9SkZuKi5S53avBMdvu_gIqTIvGhP8uS-1O_e2XxQWnzmBJqAOezGYVYwpfd4fue-K9vuP4",
      },
    ],
  },
];

export default function App() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Menambahkan project baru (Controlled component interaction)
  const handleAddProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  // Menghapus project (Memungkinkan pengujian conditional rendering data kosong)
  const handleDeleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  // Reset data contoh
  const handleResetMock = () => {
    setProjects(INITIAL_PROJECTS);
  };

  // Filter list project berdasarkan search query
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background font-body-md text-body-md text-on-surface antialiased">
      {/* 1. Komponen Sidebar Navigasi Kiri */}
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Main Layout Wrapper dengan Offset Sidebar (pl-64) */}
      <div className="pl-64">
        {/* 2. Komponen Navbar / Header Atas */}
        <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Konten Utama Aplikasi */}
        <main className="relative pt-16 w-full min-h-screen bg-background">
          <div className="flex flex-col w-full">
            <div className="w-full max-w-7xl mx-auto px-gutter py-space-lg flex flex-col gap-space-xl">
              {/* Top Action / Context Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                      Dashboard Operasional
                    </span>
                    <span className="text-outline-variant font-label-sm">•</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-secondary">
                        calendar_today
                      </span>
                      Kamis, 24 Oktober 2024
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                    Selamat Datang Kembali, Ahmad Faisal
                  </h1>
                  <p className="font-body-md text-body-md text-secondary">
                    Monitoring ringkas seluruh siklus proyek, throughput tim, dan mitigasi bottleneck biro.
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-space-sm">
                  {/* Tombol AI Assistant */}
                  <button
                    className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-ai-surface text-ai-accent font-title-sm text-title-sm shadow-sm hover:bg-ai-border/40 transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-ai-accent text-lg">
                      auto_awesome
                    </span>
                    <span>AI Assistant</span>
                  </button>

                  {/* Tombol Buat Project (Membuka Form Tambah Data) */}
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-sm hover:bg-primary transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">add</span>
                    <span>Buat Project</span>
                  </button>
                </div>
              </div>

              {/* 3. Komponen Ringkasan Statistik Data (4 Kartu Eksekutif) */}
              <DashboardStats
                totalProjects={projects.length}
                totalTasks={148}
                completedTasks={95}
                criticalTasks={9}
              />

              {/* Middle Section: Daftar Project Prioritas & AI Assistant Staging */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                {/* 4. Komponen Daftar Data Proyek (dengan Conditional Rendering & Render List .map()) */}
                <ProjectList
                  projects={filteredProjects}
                  onDeleteProject={handleDeleteProject}
                  onOpenForm={() => setIsFormOpen(true)}
                  onResetMock={handleResetMock}
                />

                {/* 5. Komponen AI Assistant Staging Widget */}
                <AiAssistantWidget />
              </div>

              {/* Bottom Section: Activity Log & External Weather API */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                {/* 6. Komponen Activity Log */}
                <ActivityLog />

                {/* 7. Komponen Weather Widget */}
                <WeatherWidget />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 8. Komponen Form Tambah Data (Controlled Component Modal) */}
      <ProjectForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}
