async function handleDownload() {
    const urlInput = document.getElementById('videoUrl').value;
    const resultDiv = document.getElementById('result');

    if (!urlInput) {
        alert("Tempelkan link videonya dulu ya!");
        return;
    }

    resultDiv.innerHTML = "<p>Sedang memproses... Tunggu sebentar ya.</p>";

    const options = {
        method: 'GET',
        headers: {
            // API Key Anda sudah saya pasang di sini
            'X-RapidAPI-Key': 'rbsidT5rQ', 
            'X-RapidAPI-Host': 'social-download-all-in-one.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(`https://social-download-all-in-one.p.rapidapi.com/v1/social/autodetect?url=${encodeURIComponent(urlInput)}`, options);
        const data = await response.json();

        // Logika untuk membaca data 'medias' dari API
        if (data.medias && data.medias.length > 0) {
            // Mengambil link video pertama (biasanya HD / No Watermark)
            const videoLink = data.medias[0].url;
            const title = data.title || "Video Berhasil Ditemukan";

            resultDiv.innerHTML = `
                <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; border: 1px solid #bae6fd; text-align: center;">
                    <p style="font-weight: bold; margin-bottom: 10px; color: #0369a1;">${title}</p>
                    <a href="${videoLink}" target="_blank" rel="noopener noreferrer" 
                       style="display: inline-block; background: #22c55e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                       ⬇️ DOWNLOAD SEKARANG
                    </a>
                    <p style="font-size: 11px; color: #64748b; margin-top: 15px;">
                        Tips: Jika video hanya terputar, klik titik tiga (⋮) di pojok video lalu pilih "Download".
                    </p>
                </div>
            `;
        } else {
            resultDiv.innerHTML = "<p style='color: #ef4444;'>Maaf, video tidak ditemukan. Pastikan link benar dan akun tidak di-private.</p>";
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p style='color: #ef4444;'>Terjadi kesalahan koneksi atau kuota API habis.</p>";
    }
}
