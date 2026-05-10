async function handleDownload() {
    const urlInput = document.getElementById('videoUrl').value;
    const resultDiv = document.getElementById('result');

    if (!urlInput) {
        alert("Tempelkan link videonya dulu ya!");
        return;
    }

    resultDiv.innerHTML = "<p>Sedang mencari video... Mohon tunggu.</p>";

    // Konfigurasi API (Contoh menggunakan RapidAPI)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '56a6de5ca6msh5f955175b59c8b6p195...', // Ganti dengan Key dari RapidAPI
            'X-RapidAPI-Host': 'social-download-all-in-one.p.rapidapi.com'
        }
    };

    try {
        // Memanggil API untuk memproses link
        const response = await fetch(`https://social-download-all-in-one.p.rapidapi.com/v1/social/autodetect?url=${encodeURIComponent(urlInput)}`, options);
        const data = await response.json();

        if (data.url || data.links) {
            // Jika berhasil, tampilkan tombol download asli
            const videoLink = data.url || data.links[0].link;
            resultDiv.innerHTML = `
                <div style="background: #e7f3ff; padding: 15px; border-radius: 10px;">
                    <p>✅ Video Ditemukan!</p>
                    <a href="${videoLink}" target="_blank" download 
                       style="display: inline-block; background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                       Klik untuk Simpan Video
                    </a>
                </div>
            `;
        } else {
            resultDiv.innerHTML = "<p>Gagal mengambil video. Pastikan link benar dan publik.</p>";
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p>Terjadi kesalahan koneksi ke server.</p>";
    }
}
