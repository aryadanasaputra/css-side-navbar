// Mendapatkan elemen tombol toggle sidebar dan sidebar dari DOM
const toggleButtonSidebar = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

/**
 * Fungsi untuk membuka atau menutup sidebar.
 * Saat sidebar ditutup, semua submenu akan ditutup secara otomatis.
 */
function toggleSidebar() {
    // Tambah/hapus kelas 'close' untuk membuka/menutup sidebar
    sidebar.classList.toggle('close');
    toggleButtonSidebar.classList.toggle('rotate'); // Memutar ikon toggle sidebar


    closeAllSubmenu();
}

/**
 * Fungsi untuk menutup semua submenu.
 */
function closeAllSubmenu() {
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show'); // Hapus kelas 'show' untuk submenu
        ul.style.height = '0'; // Reset tinggi submenu ke 0 (animasi menutup)
        ul.previousElementSibling.classList.remove('rotate'); // Reset ikon submenu
    });
}

/**
 * Fungsi untuk membuka atau menutup submenu.
 * @param {HTMLElement} button - Tombol yang di-klik untuk mengaktifkan submenu.
 */
function toggleSubmenu(button) {

    if (!button.nextElementSibling.classList.contains('show')) {
        closeAllSubmenu();
    }
    // Ambil elemen submenu berikutnya yang terkait dengan tombol
    const subMenu = button.nextElementSibling;

    // Toggle rotasi ikon untuk menandai status buka/tutup submenu
    button.classList.toggle('rotate');

    // Jika sidebar dalam kondisi tertutup, buka sidebar terlebih dahulu
    if (sidebar.classList.contains('close')) {
        sidebar.classList.toggle('close'); // Buka sidebar
        toggleButtonSidebar.classList.toggle('rotate'); // Reset rotasi ikon toggle sidebar
    }

    // Jika submenu sudah terbuka, lakukan animasi menutup
    if (subMenu.classList.contains('show')) {
        // Set tinggi awal submenu untuk memulai animasi transisi
        subMenu.style.height = `${subMenu.scrollHeight}px`;

        // Gunakan requestAnimationFrame untuk memastikan transisi berjalan lancar
        requestAnimationFrame(() => {
            subMenu.style.height = '0'; // Ubah tinggi ke 0 (animasi menutup)
        });

        // Hapus kelas 'show' untuk menandai submenu ditutup
        subMenu.classList.remove('show');
    } else {
        // Animasi membuka submenu
        subMenu.style.height = '0'; // Set tinggi awal submenu ke 0
        subMenu.classList.add('show'); // Tambahkan kelas 'show' untuk menandai submenu terbuka

        // Gunakan requestAnimationFrame untuk memperbarui tinggi dengan nilai aktual
        requestAnimationFrame(() => {
            subMenu.style.height = `${subMenu.scrollHeight}px`; // Set tinggi ke ukuran penuh submenu
        });
    }

    // Reset properti height setelah animasi selesai
    subMenu.addEventListener(
        'transitionend', // Event yang dipicu setelah transisi selesai
        () => {
            if (subMenu.classList.contains('show')) {
                subMenu.style.height = 'auto'; // Set tinggi auto untuk mempertahankan ukuran
            } else {
                subMenu.style.height = ''; // Hapus properti height saat submenu ditutup
            }
        },
        { once: true } // Event listener hanya berjalan sekali per transisi
    );
}
