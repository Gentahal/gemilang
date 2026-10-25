# DESIGN — GEMILANG

**Gerbang Manajemen dan Integrasi Langkah Kerja**
Project Management System Berbasis Web

| Item | Detail |
|---|---|
| Document Type | Design Document (UI/UX) |
| Project | GEMILANG |
| Acuan | PRD GEMILANG v1.0 |
| Version | 1.0 |
| Status | Draft / Development |

> Catatan: dokumen ini diturunkan dari PRD v1.0. Bagian yang bersumber langsung dari PRD ditulis apa adanya. Nilai visual seperti warna, ukuran, dan font bersifat **usulan** dan boleh diubah selama tidak melanggar requirement di PRD.

---

## 1. Tujuan Desain

Desain GEMILANG harus membuat anggota tim dapat melihat pekerjaan yang menjadi tanggungannya dan kondisi proyek secara keseluruhan tanpa harus mencari informasi di banyak tempat. Prinsip utama:

1. **Terpusat** — semua informasi proyek, task, dan progres terlihat dari satu aplikasi.
2. **Ringkas** — dashboard memberi gambaran cepat, detail tersedia satu klik lebih dalam.
3. **Konsisten** — pola komponen, status, dan prioritas sama di seluruh halaman.
4. **Aman secara visual** — aksi yang tidak diizinkan role tertentu tidak ditampilkan atau dinonaktifkan dengan jelas.
5. **Transparan terhadap AI** — output AI selalu dapat ditinjau sebelum disimpan.

## 2. Target Pengguna dan Implikasi Desain

| Role | Konteks Penggunaan | Kebutuhan Desain Utama |
|---|---|---|
| Admin | Mengelola pengguna dan konfigurasi sistem | Tabel user yang bisa dicari, filter role, aksi ubah role |
| Project Manager | Mengelola proyek dan tim | Akses cepat ke create project, manajemen anggota, assignment, monitoring |
| Member | Mengerjakan task yang ditugaskan | Fokus pada "task saya", update status dan progres dengan cepat |

Role memengaruhi apa yang **terlihat**. Member tidak boleh melihat tombol Delete project atau Add Member. Jika fitur tidak tersedia, elemen disembunyikan, bukan ditampilkan lalu gagal saat diklik.

## 3. Informasi Arsitektur (Sitemap)

```
Landing Page (publik)
├── Register
├── Login
├── Forgot Password
└── Reset Password

Aplikasi (setelah login)
├── Dashboard
├── Projects
│   └── Project Detail
│       ├── Overview (status, deadline, progress)
│       ├── Tasks (list)
│       ├── Kanban Board
│       ├── Team (members)
│       ├── Activity Log
│       └── AI Assistant
├── Task Detail (modal atau halaman)
├── Notifications
├── Search & Filter (global / per project)
└── Profile
    └── Admin: User Management (khusus Admin)
```

## 4. Alur Pengguna (User Flow)

Alur di bawah diambil dari PRD bagian 10 dan diperjelas dengan kondisi tepi.

**Registrasi dan Login**
Register → validasi input → login → JWT diterbitkan → Dashboard.
Kondisi tepi: email sudah terdaftar, password tidak memenuhi aturan, kredensial salah (pesan error generik, tidak membocorkan apakah email terdaftar).

**Membuat Project**
Dashboard → Create Project → isi nama, deskripsi, status, deadline → Simpan → Project Detail.
Kondisi tepi: deadline di masa lalu (tampilkan peringatan), nama kosong (validasi inline).

**Menambahkan Member**
Project Detail → tab Team → Add Member → pilih user dan role → Simpan.
Kondisi tepi: user sudah menjadi anggota, user tidak ditemukan.

**Membuat Task**
Project → tab Tasks → Create Task → isi judul, assignee, priority, deadline → Simpan.
Kondisi tepi: assignee bukan anggota project (assignee hanya dipilih dari anggota).

**Mengelola Task via Kanban**
Kanban → drag task ke kolom status baru → status diperbarui → request ke API → database tersimpan → UI diperbarui.
Kondisi tepi: request gagal, kartu harus kembali ke kolom asal dengan notifikasi error.

**AI Task Generation**
Project → AI Assistant → masukkan tujuan project → AI menghasilkan daftar task → user meninjau, mengedit, memilih → Add to Project.
Tidak ada task AI yang tersimpan sebelum user menekan Add to Project.

## 5. Layout dan Navigasi

### 5.1 Struktur Layout Aplikasi (Usulan)

- **Sidebar kiri** (desktop): Dashboard, Projects, Notifications, Profile, dan Admin (jika role Admin).
- **Top bar**: pencarian global, ikon notifikasi dengan badge jumlah belum dibaca, menu avatar user.
- **Area konten**: judul halaman, aksi utama di kanan atas, konten di bawahnya.
- **Breadcrumb** pada halaman detail, misalnya: Projects → Nama Project → Task.

### 5.2 Responsive

PRD mensyaratkan UI yang responsive. Breakpoint yang disarankan mengikuti default Tailwind.

| Breakpoint | Perilaku |
|---|---|
| Mobile (< 768px) | Sidebar menjadi drawer, Kanban menampilkan satu kolom dengan tab status horizontal |
| Tablet (768–1023px) | Sidebar ringkas (ikon), Kanban scroll horizontal |
| Desktop (≥ 1024px) | Sidebar penuh, Kanban seluruh kolom terlihat |

Catatan: PRD tidak mewajibkan mobile native. Responsive web sudah cukup untuk cakupan v1.0.

## 6. Halaman dan Komponen Utama

### 6.1 Landing Page
Tujuan: menjelaskan GEMILANG, fitur, cara kerja, dan mengajak user mendaftar atau login (CTA).
Bagian yang disarankan: hero dengan headline dan CTA utama, daftar fitur singkat, cara kerja dalam 3 langkah, CTA penutup.

### 6.2 Halaman Autentikasi
Halaman Register, Login, Forgot Password, dan Reset Password dengan form terpusat.
- Field email dan password dengan validasi inline.
- Tombol show/hide password.
- Pesan error di atas form untuk kegagalan umum, di bawah field untuk kesalahan spesifik.

### 6.3 Dashboard
Menampilkan ringkasan project dan task (FR-13).

Komponen:
- **Kartu statistik**: jumlah project aktif, task per status, task overdue, task assigned ke saya.
- **Daftar deadline terdekat**: project dan task yang mendekati tanggal jatuh tempo.
- **Progress project**: bar progres per project.
- **Aktivitas terbaru**: ringkasan dari Activity Log.

Requirement PRD: angka pada dashboard harus konsisten dengan data project dan task (acceptance criteria bagian 17).

### 6.4 Daftar Project
- Tabel atau grid kartu dengan kolom: nama, status, deadline, progres, jumlah anggota.
- Toolbar: search, filter status, sorting (deadline, nama, progres), tombol Create Project.
- Pagination di bagian bawah (PRD bagian 16).

### 6.5 Project Detail
Header berisi nama project, badge status, deadline, nama manager, dan progres. Di bawahnya tab:
Overview · Tasks · Kanban · Team · Activity · AI Assistant

### 6.6 Kanban Board
Kolom sesuai status task FR-09: **To Do**, **In Progress**, **Review**, **Done**.

- Kartu task menampilkan: judul, badge priority, avatar assignee, deadline.
- Drag and drop untuk memindahkan kartu antar kolom. Ini termasuk fitur enhancement setelah MVP (PRD bagian 19), jadi pada MVP cukup menyediakan dropdown status pada kartu.
- Setiap perubahan status mengirim request ke API. Saat request berjalan, kartu menampilkan indikator loading. Jika gagal, kartu kembali ke posisi asal.

### 6.7 Task Detail
Tampil sebagai modal atau panel samping. Berisi:
- Judul dan deskripsi (dapat diedit oleh pihak berwenang)
- Status, priority, assignee, deadline
- Daftar comment dengan input di bagian bawah
- Riwayat perubahan (dari Activity Log)

### 6.8 Form Create / Edit Task
Field: judul (wajib), deskripsi, assignee (dropdown anggota project), priority (Low, Medium, High, Urgent), status, deadline.

Tombol AI "Bantu tulis deskripsi" dapat ditambahkan pada field deskripsi (FR-18, AI Task Description Generator). Hasil AI diisi ke field sebagai draf dan dapat diedit sebelum disimpan.

### 6.9 Team Management
- Tabel anggota: avatar, nama, email, role dalam project.
- Tombol Add Member (hanya Project Manager dan Admin).
- Aksi per baris: ubah role, hapus anggota (dengan konfirmasi dialog).

### 6.10 Notifications
- Daftar notifikasi dengan ikon tipe (assignment, deadline, invitation, perubahan task).
- Notifikasi belum dibaca ditandai dengan latar berbeda dan titik biru.
- Aksi "Tandai dibaca" per item dan "Tandai semua dibaca".

### 6.11 Activity Log
Daftar kronologis aktivitas pada project dan task, dengan filter berdasarkan user atau jenis aksi. Setiap entri menampilkan siapa, apa, kapan.

### 6.12 Search dan Filter
- Search bar global untuk mencari project dan task.
- Pada halaman daftar: filter status, priority, assignee, rentang deadline.
- Filter aktif ditampilkan sebagai chip yang bisa dihapus satu per satu.
- Hasil pencarian diperbarui tanpa reload penuh (AJAX).

### 6.13 AI Project Assistant
Panel chat atau halaman khusus di dalam project. Fitur:

1. **Generate task**: input tujuan project → daftar task usulan dengan judul, deskripsi, priority.
2. **Project summary**: tombol "Ringkas project" yang menghasilkan ringkasan kondisi dan progres.
3. **Project Q&A**: kotak tanya bebas, jawaban berdasarkan data project yang boleh diakses user.

Aturan desain AI (PRD bagian 15):
- Output AI selalu ditandai sebagai **draf AI** dengan label yang jelas.
- Daftar task usulan dapat dicentang, diedit, atau dibuang sebelum tombol **Add to Project** aktif.
- Jika user tidak memiliki akses, jawaban AI tidak menampilkan data tersebut, dan UI tidak menampilkan placeholder yang membocorkan keberadaannya.

### 6.14 Profile dan User Management
- **Profile**: avatar, nama, email, form update profil.
- **User Management** (Admin): tabel user dengan search, filter role, aksi ubah role.

## 7. Matriks Visibilitas Fitur per Role

Simbol: ✓ tersedia · ✗ tidak tampil · R hanya baca

| Fitur | Admin | Project Manager | Member |
|---|:---:|:---:|:---:|
| Lihat dashboard | ✓ | ✓ | ✓ |
| Create project | ✓ | ✓ | ✗ |
| Edit project | ✓ | ✓ (milik sendiri / project yang dikelola) | ✗ |
| Delete project | ✓ | ✗ | ✗ |
| Add / hapus member | ✓ | ✓ | ✗ |
| Create / assign task | ✓ | ✓ | ✗ |
| Update status / progres task | ✓ | ✓ | ✓ (task miliknya) |
| Delete task | ✓ | ✓ | ✗ |
| Comment | ✓ | ✓ | ✓ |
| Lihat activity log | ✓ | ✓ | R |
| AI Assistant | ✓ | ✓ | ✓ (sesuai akses project) |
| User management | ✓ | ✗ | ✗ |

Catatan: matriks ini merupakan turunan dari "Hak Utama" di PRD bagian 5 dan FR-04. Detail akses per aksi harus disepakati ulang saat implementasi backend, dan UI mengikuti keputusan tersebut.

## 8. Sistem Status dan Prioritas

Status dan prioritas harus konsisten di semua halaman. Nilai resmi berasal dari PRD bagian 9.

### 8.1 Status Task

| Nilai | Makna | Warna Usulan |
|---|---|---|
| To Do | Belum dikerjakan | Abu-abu |
| In Progress | Sedang dikerjakan | Biru |
| Review | Menunggu peninjauan | Ungu |
| Done | Selesai | Hijau |

### 8.2 Priority

| Nilai | Warna Usulan | Ikon |
|---|---|---|
| Low | Abu-abu muda | Panah bawah |
| Medium | Kuning | Garis datar |
| High | Oranye | Panah atas |
| Urgent | Merah | Tanda seru |

Warna priority tidak boleh menjadi satu-satunya penanda. Gunakan ikon atau teks agar tetap terbaca oleh pengguna dengan keterbatasan penglihatan warna.

### 8.3 Status Project

| Nilai | Warna Usulan |
|---|---|
| Planning | Biru muda |
| In Progress | Biru |
| On Hold | Kuning |
| Completed | Hijau |

## 9. Sistem Visual (Usulan)

Bagian ini belum ditentukan di PRD. Berikut titik awal yang dapat diimplementasikan dengan Tailwind CSS.

### 9.1 Warna

| Token | Nilai Usulan | Penggunaan |
|---|---|---|
| `primary` | Indigo 600 (`#4F46E5`) | Tombol utama, link, fokus |
| `surface` | Putih (`#FFFFFF`) | Kartu, panel |
| `background` | Slate 50 (`#F8FAFC`) | Latar aplikasi |
| `text-primary` | Slate 900 (`#0F172A`) | Teks utama |
| `text-muted` | Slate 500 (`#64748B`) | Teks sekunder |
| `border` | Slate 200 (`#E2E8F0`) | Garis pemisah |
| `success` / `warning` / `danger` | Hijau / Kuning / Merah | Feedback dan status |

### 9.2 Tipografi

- Font: Inter (fallback: system-ui, sans-serif)
- Skala: 12 / 14 / 16 / 20 / 24 / 32 px
- Judul halaman: 24px semibold; judul kartu: 16px semibold; body: 14–16px regular

### 9.3 Spacing dan Radius
- Spacing mengikuti kelipatan 4px (skala Tailwind).
- Radius kartu: `rounded-lg` (8px). Tombol dan input: `rounded-md` (6px).
- Bayangan kartu: `shadow-sm`, hanya untuk elemen yang mengambang (dropdown, modal).

## 10. Komponen Dasar

| Komponen | Varian | Catatan |
|---|---|---|
| Button | primary, secondary, ghost, danger | Tombol destruktif selalu meminta konfirmasi |
| Input / Textarea / Select | default, error, disabled | Pesan error di bawah field |
| Badge | status, priority, role | Gunakan ikon atau teks selain warna |
| Avatar | foto, inisial | Fallback ke inisial jika foto tidak ada |
| Card | statistik, project, task | Satu pola kartu yang dipakai ulang |
| Table | sortable, dengan pagination | Kolom aksi di kanan |
| Modal / Dialog | konfirmasi, form ringkas | Fokus terjebak di dalam modal, bisa ditutup dengan Esc |
| Toast | sukses, error, info | Otomatis hilang kecuali error |
| Progress bar | linear | Menampilkan persentase dalam teks |
| Chip filter | aktif, dapat dihapus | Muncul di atas hasil filter |
| Dropdown menu | aksi per item | Navigasi keyboard |

## 11. State UI

Setiap halaman dan komponen data wajib memiliki empat kondisi (PRD bagian 16, Usability):

| State | Perilaku |
|---|---|
| **Loading** | Skeleton sesuai bentuk konten, bukan spinner di tengah layar kosong |
| **Empty** | Ilustrasi sederhana, penjelasan singkat, dan satu CTA (misal: "Buat project pertama") |
| **Error** | Pesan jelas dalam bahasa Indonesia, tombol Coba Lagi |
| **Success / Data** | Tampilan normal dengan data |

Untuk aksi tulis (simpan, ubah status, hapus), tampilkan status tombol "Menyimpan..." dan nonaktifkan agar tidak terkirim dua kali.

## 12. Interaksi dan Feedback

- **Optimistic update** hanya untuk perubahan kecil seperti status task di Kanban. Jika gagal, UI kembali ke kondisi sebelumnya dan menampilkan toast error.
- **Konfirmasi** diminta untuk Delete project, Delete task, dan hapus member.
- **Validasi** dilakukan di frontend dan backend. Frontend menampilkan error lebih dulu agar user tidak menunggu request yang pasti gagal.
- **Pesan error API** ditampilkan dalam bahasa yang dapat dipahami user, bukan kode error mentah.

## 13. Aksesibilitas

Target minimum mengikuti WCAG 2.1 level AA sebagai usulan.

- Kontras teks minimal 4.5:1 untuk body dan 3:1 untuk teks besar.
- Semua fungsi dapat diakses dengan keyboard, termasuk Kanban (sediakan dropdown status sebagai alternatif drag and drop).
- Setiap input memiliki label yang terhubung.
- Ikon tanpa teks memiliki atribut `aria-label`.
- Notifikasi toast menggunakan `aria-live` agar terbaca screen reader.
- Fokus terlihat jelas pada semua elemen interaktif.

## 14. Performa dari Sisi UI

Sesuai PRD bagian 16 dan 20:

- Halaman utama dan dashboard menampilkan loading state, tidak menunggu semua data sebelum menampilkan layout.
- Daftar project, task, dan notifikasi menggunakan pagination atau infinite scroll dengan batas item per halaman.
- Gambar avatar dan aset berat menggunakan lazy loading.
- Pencarian menggunakan debounce agar tidak mengirim request setiap ketukan tombol.

## 15. Pertimbangan Desain untuk Testing

Desain yang mudah diuji membantu pemenuhan requirement Testing (FR-19). Setiap komponen interaktif sebaiknya memiliki atribut `data-testid` atau label yang stabil. Alur kritis yang disarankan untuk E2E test:

1. Register → login → dashboard tampil
2. Create project → project muncul di daftar
3. Add member → member tampil di Team
4. Create task → assign → ubah status di Kanban → status tersimpan setelah reload
5. Login sebagai Member → tombol Delete project tidak tampil

## 16. Pertanyaan Terbuka

Hal berikut belum ditentukan dalam PRD dan perlu diputuskan sebelum implementasi UI:

1. Apakah Task Detail berbentuk modal atau halaman terpisah?
2. Apakah AI Assistant berbentuk panel chat atau halaman penuh?
3. Apakah Member dapat membuat project, atau hanya Project Manager dan Admin?
4. Apakah notifikasi menggunakan polling atau cukup refresh manual pada MVP?
5. Apakah ada mode gelap (dark mode) pada v1.0?

## 17. Referensi

- PRD GEMILANG v1.0 (bagian 5, 7, 8, 9, 10, 12, 15, 16, 17, 19)
- Tailwind CSS: https://tailwindcss.com
- WCAG 2.1: https://www.w3.org/TR/WCAG21/
