async function handleDownload() {
    const urlInput = document.getElementById('videoUrl').value;
    const resultDiv = document.getElementById('result');

    if (!urlInput) {
        alert("Tempelkan link videonya dulu ya!");
        return;
    }

    resultDiv.innerHTML = "<p>Sedang memproses... Tunggu sebentar.</p>";

    let apiUrl = "";
    let platform = "";

    // Deteksi Platform
    if (urlInput.includes("tiktok.com")) {
        apiUrl = `https://api.fromscratch.web.id/v1/api/down/tiktok?url=${encodeURIComponent(urlInput)}`;
        platform = "TikTok";
    } else if (urlInput.includes("twitter.com") || urlInput.includes("x.com")) {
        apiUrl = `https://api.fromscratch.web.id/v1/api/down/twitter?url=${encodeURIComponent(urlInput)}`;
        platform = "Twitter";
    } else if (urlInput.includes("instagram.com")) {
        apiUrl = `https://api.fromscratch.web.id/v1/api/down/instagram?url=${encodeURIComponent(urlInput)}`;
        platform = "Instagram";
    } else {
        resultDiv.innerHTML = "<p style='color: orange;'>Gunakan link TikTok, IG, atau Twitter/X ya.</p>";
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const json = await response.json();

        // Sesuai JSON yang kamu kirim, data ada di dalam 'json.data'
        if (json.status === 200 && json.data) {
            const hasil = json.data;
            
            // Ambil link video (no_watermark untuk TikTok, url untuk yang lain)
            const videoLink = hasil.no_watermark || hasil.url || hasil.video;
            const title = hasil.title || `Video ${platform} Berhasil`;

            resultDiv.innerHTML = `
                <div style="background: #fdfcfb; padding: 20px; border-radius: 12px; border: 1px solid #eee; text-align: center;">
                    <img src="${hasil.cover || ''}" style="width: 100px; border-radius: 8px; margin-bottom: 10px;" alt="Cover">
                    <p style="font-weight: bold; margin-bottom: 15px;">${title}</p>
                    <a href="${videoLink}" target="_blank" rel="noopener noreferrer" 
                       style="display: inline-block; background: #000; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                       ⬇️ DOWNLOAD VIDEO
                    </a>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `<p style='color: red;'>Gagal: ${json.message || "Video tidak ditemukan"}</p>`;
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p style='color: red;'>Terjadi kesalahan pada server API.</p>";
    }
}
