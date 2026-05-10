async function handleDownload() {
    const urlInput = document.getElementById('videoUrl').value;
    const resultDiv = document.getElementById('result');

    if (!urlInput) {
        alert("Tempelkan link videonya dulu ya!");
        return;
    }

    resultDiv.innerHTML = "<p>Sedang memproses lewat Zivofly... Tunggu sebentar.</p>";

    // Konfigurasi khusus Zivofly
    // API KEY: rbsidT5rQ
    const apiKey = 'rbsidT5rQ'; 
    const apiUrl = `https://api.zivofly.com/api/v1/download?url=${encodeURIComponent(urlInput)}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log(data); // Untuk cek hasil di console

        if (data.status === "success" || data.data) {
            // Zivofly biasanya mengembalikan data di dalam objek 'data'
            const videoData = data.data;
            const videoLink = videoData.url || videoData.main_url;
            const title = videoData.title || "Video Berhasil Ditemukan";

            resultDiv.innerHTML = `
                <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; border: 1px solid #bbf7d0; text-align: center;">
                    <p style="font-weight: bold; margin-bottom: 10px; color: #166534;">${title}</p>
                    <a href="${videoLink}" target="_blank" rel="noopener noreferrer" 
                       style="display: inline-block; background: #22c55e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                       ⬇️ DOWNLOAD SEKARANG
                    </a>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `<p style='color: #ef4444;'>Gagal: ${data.message || "Video tidak ditemukan"}</p>`;
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p style='color: #ef4444;'>Terjadi kesalahan koneksi ke server Zivofly.</p>";
    }
}
