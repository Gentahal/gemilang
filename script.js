let kanbanTasks = [{
        id: 'INFRA-409',
        title: 'Optimasi Sharding Redis & Cache Cluster',
        status: 'todo',
        priority: 'Prioritas Tinggi',
        assignee: 'RZ'
    },
    {
        id: 'API-102',
        title: 'Integrasi Telemetri Cuaca Maritim BMKG',
        status: 'todo',
        priority: 'Normal',
        assignee: 'DW'
    },
    {
        id: 'CORE-89',
        title: 'Validasi Skema Autentikasi OAuth2 / JWT Guard',
        status: 'progress',
        priority: 'Urgent',
        assignee: 'AK, BM',
        progress: 78
    },
    {
        id: 'DOC-203',
        title: 'Spesifikasi Kontrak OpenAPI v2.4',
        status: 'done',
        priority: 'Disetujui',
        assignee: 'QA System'
    }
];

function filterTasksByStatus(statusName) {
    return kanbanTasks.filter(function (task) {
        return task.status === statusName;
    });
}

function renderKanbanBoard() {
    const columns = ['todo', 'progress', 'done'];

    columns.forEach(function (col) {
        const container = document.getElementById(col + '-container');
        const counter = document.getElementById(col + '-counter');

        if (!container) return;

        const tasksForColumn = filterTasksByStatus(col);
        let htmlContent = '';

        tasksForColumn.forEach(function (task) {
            let progressHtml = task.progress ? `<progress value="${task.progress}" max="100" style="width: 100%;"></progress><p style="margin: 5px 0 0 0; font-size: 12px;">${task.progress}% Selesai</p>` : '';

            htmlContent += `
                <article class="task-card" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 6px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="display: flex; justify-content: space-between; font-size: 13px; color: #555; margin-bottom: 10px;">
                        <strong>${task.id}</strong>
                        <span style="background: #f0f0f0; padding: 3px 8px; border-radius: 12px;">${task.priority}</span>
                    </div>
                    <h4 style="margin: 0 0 8px 0; font-size: 16px; color: #333;">${task.title}</h4>
                    <p style="font-size: 13px; color: #666; margin: 0 0 10px 0;">PIC: ${task.assignee}</p>
                    ${progressHtml}
                </article>
            `;
        });

        container.innerHTML = htmlContent;

        if (counter) {
            counter.innerText = `(${tasksForColumn.length})`;
        }
    });
}

$(document).ready(function () {
    renderKanbanBoard();

    $('#toggleFormBtn').on('click', function () {
        $('#addTaskFormContainer').slideToggle(300);
        let btnText = $(this).text().includes('+') ? '- Tutup Form Tugas' : '+ Tambah Tugas Baru';
        $(this).text(btnText);
    });

    $('#addTaskForm').on('submit', function (event) {
        event.preventDefault();

        let titleVal = $('#taskTitle').val().trim();
        let priorityVal = $('#taskPriority').val();
        let assigneeVal = $('#taskAssignee').val().trim();

        if (titleVal === '' || priorityVal === '' || assigneeVal === '') {
            $('#formError').text('Gagal: Semua input (Judul, Prioritas, Inisial) wajib diisi!').fadeIn(200).delay(2500).fadeOut(200);
            return;
        }

        let generatedId = 'TKT-' + Math.floor(Math.random() * 900 + 100);

        let newTask = {
            id: generatedId,
            title: titleVal,
            status: 'todo',
            priority: priorityVal,
            assignee: assigneeVal
        };

        kanbanTasks.unshift(newTask);

        renderKanbanBoard();

        $('#formSuccess').text(`Sukses: Tiket ${generatedId} ditambahkan ke TUGAS MASUK!`).fadeIn(200).delay(2500).fadeOut(200);

        $('#addTaskForm')[0].reset();

        setTimeout(function () {
            $('#addTaskFormContainer').slideUp(300);
            $('#toggleFormBtn').text('+ Tambah Tugas Baru');
        }, 1000);
    });

    $(document).on('mouseenter', '.task-card', function () {
        $(this).css({
            'border-left': '4px solid #007bff',
            'cursor': 'pointer'
        });
    }).on('mouseleave', '.task-card', function () {
        $(this).css({
            'border-left': '1px solid #ddd'
        });
    });
});