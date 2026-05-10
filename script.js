async function handleDownload() {
    const urlInput = document.getElementById('videoUrl').value;
    const resultDiv = document.getElementById('result');

    if (!urlInput) {
        alert("Tempelkan link videonya dulu ya!");
        return;
    }

    resultDiv.innerHTML = "<p>Sedang menganalisis link dan memproses... Tunggu sebentar.</p>";

    let apiUrl = "";
    let platform = "";

    // Logika Deteksi Otomatis berdasarkan Link
    if (urlInput.includes("tiktok.com")) {
        apiUrl = `https://api.fromscratch.web.id/v1/api/down/tiktok?url=${encodeURIComponent(urlInput)}`;
        platform = "TikTok";
    } else if (urlInput.includes("twitter.com") || urlInput.includes("x.com")) {
        apiUrl = `https://api.fromscratch.web.id/v1/api/down/twitter?url=${encodeURIComponent(urlInput)}`;
        platform = "Twitter/X";
    } else if (urlInput.includes("instagram.com")) {
        apiUrl = `https://api.fromscratch.web.id/v1/api/down/instagram?url=${encodeURIComponent(urlInput)}`;
        platform = "Instagram";
    } else {
        resultDiv.innerHTML = "<p style='color: orange;'>Maaf, saat ini hanya mendukung TikTok, Twitter, dan Instagram.</p>";
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Mengambil data hasil (Biasanya di data.result)
        if (data.status === true || data.result) {
            const res = data.result;
            
            // Mencari link video (Bisa berbeda tiap platform, kita buat fleksibel)
            const downloadLink = res.video || res.url || (res.medias && res.medias[0].url);
            const title = res.title || `Video ${platform} Berhasil Diambil`;

            resultDiv.innerHTML = `
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;">
                    <p style="font-weight: bold; margin-bottom: 10px; color: #1e293b;">${title}</p>
                    <a href="${downloadLink}" target="_blank" rel="noopener noreferrer" 
                       style="display: inline-block; background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                       ⬇️ DOWNLOAD VIDEO ${platform.toUpperCase()}
                    </a>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `<p style='color: #ef4444;'>Gagal mengambil data dari ${platform}. Pastikan link benar.</p>`;
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = `<p style='color: #ef4444;'>Terjadi kesalahan koneksi ke API ${platform}.</p>`;
    }
}
