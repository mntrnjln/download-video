async function handleDownload() {
    const url = document.getElementById('videoUrl').value;
    const resultDiv = document.getElementById('result');

    if (!url) {
        alert("Silakan masukkan URL terlebih dahulu!");
        return;
    }

    resultDiv.innerHTML = "Sedang memproses...";

    // Contoh integrasi API (Logika sederhana)
    try {
        // Di sini Anda akan melakukan 'fetch' ke API penyedia download
        // Contoh: fetch('https://api-downloader-anda.com/download?url=' + url)
        
        // Simulasi hasil:
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div style="border: 1px solid #ddd; padding: 10px; border-radius: 8px;">
                    <p>Video Siap!</p>
                    <a href="#" style="background: green; color: white; padding: 10px; text-decoration: none; border-radius: 5px;">Download MP4</a>
                </div>
            `;
        }, 2000);
        
    } catch (error) {
        resultDiv.innerHTML = "Terjadi kesalahan. Pastikan link benar.";
    }
}
