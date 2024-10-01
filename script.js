import config from './config.js';

const DownloadSong = document.getElementById('download');

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });
});

async function downloadSong() {
    const urlOfSong = document.getElementById('urlOfSong').value;
    const songCover = document.getElementById('SongCover');
    const songName = document.getElementById('song-name');
    const artistName = document.getElementById('artist-name');
    const releaseDate = document.getElementById('release-date');

    if (!urlOfSong) {
        alert("Enter a URL of Song !");
        return;
    }

    const url = `https://spotify-downloader9.p.rapidapi.com/downloadSong?songId=${encodeURIComponent(urlOfSong)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': config.API_KEY, // Use the API_KEY from config.js
            'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.success) {
            const songData = result.data;
            songCover.src = songData.cover;
            songName.textContent = songData.title;
            artistName.textContent = songData.artist;
            releaseDate.textContent = songData.releaseDate;

            document.getElementById("main-content").style.display = "none";
            document.getElementById("container").style.display = "block";

            const downloadButton = document.getElementById('download-button');
            downloadButton.onclick = () => {
                if (songData.downloadLink) {
                    window.location.href = songData.downloadLink;
                } else {
                    alert("Download link not available.");
                }
            };
        } else {
            alert("Couldn't fetch your song!");
        }
    } catch (error) {
        console.error(error);
        alert("Error fetching API");
    }
}

DownloadSong.onclick = downloadSong;
