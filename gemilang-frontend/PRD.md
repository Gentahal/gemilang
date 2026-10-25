**PRODUCT REQUIREMENTS DOCUMENT**

**GEMILANG**

*Gerbang Manajemen dan Integrasi Langkah Kerja*

**Project Management System Berbasis Web**

| Dokumen       | Detail                              |
|---------------|-------------------------------------|
| Document Type | Product Requirements Document (PRD) |
| Project       | GEMILANG                            |
| Purpose       | Project Mata Kuliah Pemrograman Web |
| Version       | 1.0                                 |
| Status        | Draft / Development                 |

# 1. Ringkasan Produk

GEMILANG (Gerbang Manajemen dan Integrasi Langkah Kerja) adalah aplikasi Project Management System berbasis web yang dirancang untuk membantu tim mengelola proyek dan pekerjaan dalam satu platform terpusat. Aplikasi menyediakan pengelolaan proyek, anggota tim, task, deadline, prioritas, progress, dashboard, notifikasi, activity log, integrasi API, dan fitur AI Project Assistant.

# 2. Latar Belakang

Dalam pengerjaan proyek, informasi mengenai pembagian tugas, deadline, prioritas, dan progres sering tersebar di berbagai media. Kondisi tersebut dapat menyulitkan anggota tim dalam mengetahui pekerjaan yang menjadi tanggung jawabnya dan kondisi proyek secara keseluruhan. GEMILANG dikembangkan sebagai platform terpusat untuk membantu tim mengorganisasi pekerjaan secara lebih terstruktur dan memudahkan pemantauan proyek.

# 3. Alasan Pengembangan

GEMILANG dikembangkan untuk memudahkan tim dalam mengelola, membagi, dan memantau pekerjaan serta progres proyek secara terpusat dan terstruktur. Selain sebagai solusi manajemen proyek, GEMILANG menjadi media penerapan berbagai konsep web development modern dari frontend hingga backend, API, AI, testing, optimasi, dan deployment.

# 4. Tujuan Produk

- Menyediakan satu platform terpusat untuk pengelolaan proyek dan task.

- Memudahkan pembagian pekerjaan berdasarkan anggota dan peran.

- Membantu tim memantau status, prioritas, deadline, dan progres proyek.

- Menyediakan dashboard yang memberikan gambaran kondisi proyek secara ringkas.

- Mengintegrasikan REST API, external API, dan AI sebagai bagian dari pengalaman aplikasi.

- Menerapkan praktik authentication, authorization, testing, optimization, dan deployment.

# 5. Target Pengguna

| Role            | Deskripsi                                       | Hak Utama                                                      |
|-----------------|-------------------------------------------------|----------------------------------------------------------------|
| Admin           | Mengelola pengguna dan konfigurasi umum sistem. | User management, role management, monitoring.                  |
| Project Manager | Mengelola proyek dan tim.                       | Create project, manage members, assign task, monitor progress. |
| Member          | Melaksanakan pekerjaan yang ditugaskan.         | View project, update task, comment, update status/progress.    |

# 6. Scope Produk

In Scope

- Landing page dan responsive UI.

- Register, login, logout, JWT authentication, password hashing.

- Role-based authorization.

- User profile.

- Project CRUD dan project detail.

- Team/member management.

- Task CRUD, assignment, status, priority, deadline, comment.

- Kanban board.

- Dashboard dan progress monitoring.

- Search, filter, sorting.

- Notification dan activity log.

- REST API menggunakan NestJS.

- AJAX/asynchronous interaction.

- Integrasi external API.

- AI Project Assistant.

- Testing, security, optimization, dan deployment.

Out of Scope (versi awal)

- Kolaborasi video conference.

- Chat real-time kompleks antar pengguna.

- Sistem pembayaran.

- Mobile native application.

- Integrasi enterprise yang memerlukan infrastruktur khusus.

# 7. Fitur Utama

| Fitur                  | Deskripsi                                                      |
|------------------------|----------------------------------------------------------------|
| Landing Page           | Informasi GEMILANG, fitur, cara kerja, dan CTA.                |
| Authentication         | Register, login, logout, forgot/reset password, JWT.           |
| User & Role Management | Profile, role, permission, dan pengelolaan user.               |
| Dashboard              | Ringkasan project, task, progress, deadline, dan aktivitas.    |
| Project Management     | CRUD project, status, deadline, progress, manager, members.    |
| Team Management        | Tambah/hapus anggota, role anggota, dan assignment.            |
| Task Management        | CRUD task, assignee, priority, status, deadline, comment.      |
| Kanban Board           | Visualisasi task berdasarkan status dan perpindahan task.      |
| Search & Filter        | Pencarian dan penyaringan project/task.                        |
| Notification           | Assignment, deadline, invitation, dan perubahan task.          |
| Activity Log           | Riwayat aktivitas pada project dan task.                       |
| REST API               | API untuk auth, user, project, team, task, notification.       |
| External API           | Integrasi layanan eksternal yang relevan.                      |
| AI Project Assistant   | Generate task, task description, project summary, project Q&A. |
| Testing                | Unit, API, authentication, authorization, dan feature testing. |
| Optimization           | Pagination, indexing, query/API optimization, lazy loading.    |
| Deployment             | Frontend, backend, database, environment, CI/CD, HTTPS.        |

# 8. Functional Requirements

| ID    | Requirement        | Acceptance Summary                                                      |
|-------|--------------------|-------------------------------------------------------------------------|
| FR-01 | User Registration  | User dapat membuat akun dengan data yang valid.                         |
| FR-02 | User Login         | User dapat login menggunakan email dan password.                        |
| FR-03 | JWT Authentication | Sistem menerbitkan dan memvalidasi JWT untuk endpoint terlindungi.      |
| FR-04 | Role Authorization | Akses fitur dibatasi berdasarkan role.                                  |
| FR-05 | Project CRUD       | User berwenang dapat membuat, melihat, mengubah, dan menghapus project. |
| FR-06 | Project Member     | Project Manager dapat mengelola anggota project.                        |
| FR-07 | Task CRUD          | User berwenang dapat membuat, melihat, mengubah, dan menghapus task.    |
| FR-08 | Task Assignment    | Task dapat diberikan kepada anggota project.                            |
| FR-09 | Task Status        | Status task dapat diubah antara To Do, In Progress, Review, dan Done.   |
| FR-10 | Task Priority      | Task memiliki prioritas Low, Medium, High, dan Urgent.                  |
| FR-11 | Deadline           | Project dan task memiliki tanggal deadline.                             |
| FR-12 | Kanban             | Task ditampilkan berdasarkan status dalam Kanban Board.                 |
| FR-13 | Dashboard          | Sistem menampilkan ringkasan statistik project dan task.                |
| FR-14 | Search/Filter      | User dapat mencari dan memfilter data.                                  |
| FR-15 | Notification       | Sistem membuat notifikasi untuk event penting.                          |
| FR-16 | Activity Log       | Sistem mencatat aktivitas penting.                                      |
| FR-17 | REST API           | Frontend dapat berkomunikasi dengan backend melalui REST API.           |
| FR-18 | AI Assistant       | User dapat meminta bantuan AI berdasarkan konteks project.              |
| FR-19 | Testing            | Fitur utama memiliki test untuk memastikan perilaku sesuai requirement. |
| FR-20 | Deployment         | Aplikasi dapat dijalankan pada environment production.                  |

# 9. Status dan Aturan Task

| Kategori       | Nilai                                     |
|----------------|-------------------------------------------|
| Task Status    | To Do, In Progress, Review, Done          |
| Priority       | Low, Medium, High, Urgent                 |
| Project Status | Planning, In Progress, On Hold, Completed |

# 10. User Flow Utama

**Registrasi & Login:** Register → Validasi → Login → JWT → Dashboard

**Membuat Project:** Dashboard → Create Project → Isi data → Simpan → Project Detail

**Menambahkan Member:** Project Detail → Team → Add Member → Pilih User/Role → Simpan

**Membuat Task:** Project → Task → Create Task → Assign Member → Set Priority/Deadline → Simpan

**Mengelola Task:** Kanban → Pilih/drag task → Update status → API → Database → UI

**AI Task Generation:** Project → AI Assistant → Masukkan tujuan project → AI menghasilkan task → Review → Add to Project

# 11. Teknologi yang Digunakan

| Layer              | Teknologi / Konsep            | Penerapan                             |
|--------------------|-------------------------------|---------------------------------------|
| Frontend           | HTML, CSS                     | Struktur dan styling dasar            |
| UI                 | Tailwind CSS                  | Responsive UI dan component styling   |
| Client Logic       | JavaScript, jQuery            | Interaction, validation, AJAX         |
| Frontend Framework | React                         | Dashboard, Kanban, dynamic components |
| Backend            | NestJS                        | REST API dan business logic           |
| Authentication     | JWT                           | Authentication & authorization        |
| Database           | PostgreSQL                    | Persistensi data                      |
| API                | REST API                      | Komunikasi frontend-backend           |
| External API       | Weather/Email/layanan relevan | Integrasi data/layanan eksternal      |
| AI                 | AI API                        | AI Project Assistant                  |
| Testing            | Unit/API/Integration testing  | Quality assurance                     |
| Deployment         | Cloud hosting + CI/CD         | Production deployment                 |

# 12. Arsitektur Tingkat Tinggi

Frontend React menangani antarmuka dan interaksi pengguna. Frontend berkomunikasi dengan backend NestJS melalui REST API. Backend menangani authentication, authorization, business logic, dan akses database PostgreSQL. Backend juga menjadi perantara untuk integrasi external API dan AI sehingga credential layanan eksternal tidak diletakkan secara langsung pada client.

Alur:

- User → React/Tailwind → REST API → NestJS → PostgreSQL

- ↘ External API

- ↘ AI API

# 13. Entitas Data Awal

| Entity        | Atribut Kunci / Relasi                                                   |
|---------------|--------------------------------------------------------------------------|
| User          | id, name, email, password, role, avatar                                  |
| Project       | id, name, description, status, deadline, ownerId                         |
| ProjectMember | projectId, userId, role                                                  |
| Task          | id, projectId, title, description, status, priority, dueDate, assigneeId |
| Comment       | id, taskId, userId, content, createdAt                                   |
| Notification  | id, userId, type, message, isRead                                        |
| ActivityLog   | id, projectId, userId, action, metadata, createdAt                       |

# 14. API Endpoint Awal

| Method | Endpoint                | Fungsi                    |
|--------|-------------------------|---------------------------|
| POST   | /auth/register          | Registrasi user           |
| POST   | /auth/login             | Login dan mendapatkan JWT |
| GET    | /users/me               | Profil user aktif         |
| PATCH  | /users/me               | Update profil             |
| GET    | /projects               | Daftar project            |
| POST   | /projects               | Membuat project           |
| GET    | /projects/:id           | Detail project            |
| PATCH  | /projects/:id           | Update project            |
| DELETE | /projects/:id           | Delete project            |
| GET    | /projects/:id/members   | Daftar anggota            |
| POST   | /projects/:id/members   | Tambah anggota            |
| GET    | /projects/:id/tasks     | Daftar task               |
| POST   | /projects/:id/tasks     | Membuat task              |
| PATCH  | /tasks/:id              | Update task               |
| DELETE | /tasks/:id              | Delete task               |
| GET    | /notifications          | Daftar notifikasi         |
| PATCH  | /notifications/:id/read | Tandai notifikasi dibaca  |

# 15. AI Requirements

- AI Task Generator: menghasilkan daftar task dari tujuan/deskripsi project.

- AI Task Description Generator: membantu membuat deskripsi task.

- AI Project Summary: merangkum kondisi dan progress project.

- AI Project Q&A: menjawab pertanyaan berdasarkan data project yang diizinkan.

- AI harus menerima context yang relevan saja dan tidak boleh mengekspos data project/user yang tidak berwenang.

- AI output harus dapat ditinjau user sebelum menjadi data permanen.

# 16. Non-Functional Requirements

| Kategori        | Requirement                                                                                          |
|-----------------|------------------------------------------------------------------------------------------------------|
| Performance     | Halaman utama dan dashboard memiliki loading state; endpoint menggunakan pagination pada data besar. |
| Security        | Password di-hash; JWT digunakan untuk endpoint terlindungi; role authorization diterapkan.           |
| Reliability     | Error handling dan validation tersedia pada frontend dan backend.                                    |
| Usability       | UI konsisten, responsive, memiliki loading, empty, dan error state.                                  |
| Maintainability | Kode modular, struktur backend berbasis module, dan dokumentasi API tersedia.                        |
| Scalability     | API dan database dirancang agar dapat menambah project/task tanpa perubahan arsitektur besar.        |
| Testability     | Fitur utama memiliki automated test yang relevan.                                                    |

# 17. Testing & Acceptance

- User tidak dapat mengakses halaman protected tanpa authentication.

- User dengan role tidak sesuai tidak dapat menjalankan action yang tidak diizinkan.

- Project dapat dibuat, dilihat, diubah, dan dihapus oleh role yang berwenang.

- Task dapat dibuat, di-assign, diubah statusnya, dan dihapus sesuai permission.

- Perubahan status Kanban tersimpan ke database.

- Dashboard menampilkan data yang konsisten dengan project/task.

- Search dan filter mengembalikan data sesuai parameter.

- AI-generated task dapat ditinjau sebelum ditambahkan ke project.

- API menangani invalid input dan error dengan response yang sesuai.

- Production deployment dapat diakses dan environment secret tidak diekspos.

# 18. WBS / Development Roadmap

| Phase   | Area               | Output                                                |
|---------|--------------------|-------------------------------------------------------|
| Phase 1 | Project Setup      | Repository, React, NestJS, PostgreSQL, environment    |
| Phase 2 | Authentication     | Register, login, JWT, role, authorization             |
| Phase 3 | Project            | Project CRUD, detail, status, deadline                |
| Phase 4 | Task & Team        | Task CRUD, assignment, members, priority              |
| Phase 5 | Dashboard & Kanban | Dashboard, progress, Kanban, drag/drop                |
| Phase 6 | Interaction        | Search, filter, AJAX, notifications, activity log     |
| Phase 7 | Integration        | External API dan AI Project Assistant                 |
| Phase 8 | Quality            | Testing, security hardening, optimization             |
| Phase 9 | Release            | Production database, deployment, CI/CD, documentation |

# 19. Prioritas MVP

Fitur minimum yang harus selesai agar GEMILANG sudah menjadi produk yang dapat digunakan:

- Authentication + JWT

- Role & authorization

- Project CRUD

- Team/member management

- Task CRUD

- Task assignment/status/priority/deadline

- Dashboard dasar

- REST API NestJS

- PostgreSQL database

Fitur enhancement setelah MVP:

- Kanban drag & drop

- Search/filter

- Notifications

- Activity log

- External API

- AI Project Assistant

- Testing lanjutan

- Performance optimization

- CI/CD dan production deployment

# 20. Risiko dan Mitigasi

| Risiko                  | Dampak                            | Mitigasi                                              |
|-------------------------|-----------------------------------|-------------------------------------------------------|
| Scope terlalu besar     | Project tidak selesai             | Gunakan MVP dan prioritas bertahap.                   |
| AI terlalu kompleks     | Waktu development bertambah       | Mulai dari AI Task Generator dan Summary.             |
| Integrasi API gagal     | Fitur bergantung external service | Gunakan abstraction/service layer dan fallback state. |
| Bug pada authentication | Data dan akses tidak aman         | Testing auth/authorization sejak awal.                |
| Database query lambat   | Dashboard/task lambat             | Pagination, indexing, dan query optimization.         |
| Deployment issue        | Aplikasi tidak dapat diakses      | Deploy bertahap sejak fitur core stabil.              |

# 21. Definition of Done

- Feature telah diimplementasikan sesuai requirement.

- Frontend terhubung dengan API yang sesuai.

- Validation dan error handling tersedia.

- Authorization sesuai role telah diuji.

- Tidak terdapat bug blocker pada feature.

- Feature telah melalui review/testing.

- Dokumentasi atau catatan implementasi diperbarui jika diperlukan.

- Feature siap digunakan pada environment yang ditargetkan.

# 22. Success Criteria

- Pengguna dapat membuat akun dan login dengan aman.

- Project dapat dibuat dan dikelola oleh role yang sesuai.

- Task dapat ditugaskan dan dipantau sampai selesai.

- Progress project dapat dilihat melalui dashboard/Kanban.

- Frontend dan backend berkomunikasi melalui REST API NestJS.

- JWT authentication dan role authorization berjalan.

- Minimal satu external API dan satu fitur AI berhasil diintegrasikan.

- Fitur utama memiliki pengujian.

- Aplikasi berhasil di-deploy ke environment production.

# 23. Catatan Pengembangan

PRD ini merupakan baseline untuk pengembangan GEMILANG dalam mata kuliah Pemrograman Web. Detail UI, endpoint, database schema, provider external API/AI, serta deployment dapat berubah selama implementasi selama tidak menghilangkan tujuan utama dan requirement inti produk.
