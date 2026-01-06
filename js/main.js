/**
 * Main JavaScript for Space Chart
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize utilities
    if (typeof initUtils === 'function') {
        initUtils();
    }

    // Initialize audio player
    if (typeof initPlayer === 'function') {
        initPlayer();
    }

    // Initialize page-specific features
    initPage();

    // Initialize tooltips
    initTooltips();
});

// Initialize page-specific features
function initPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    switch (page) {
        case 'index.html':
            initHomePage();
            break;
        case 'Wtop10-songsTH.html':
            initTop10Page();
            break;
        case 'Wtop10-songsGB.html':
            initTop10GlobalPage();
            break;
        case 'Dtop10-songsTH.html':
            initDailyThailandPage();
            break;
        case 'Dtop10-songsGB.html':
            initDailyGlobalPage();
            break;
        case 'Wtop3-AlbumsTH.html':
            initTopArtistsPage();
            break;
        case 'aboutMe.html':
            // ไม่ต้องทำอะไรสำหรับหน้า About Me เพราะมีข้อมูลอยู่ใน HTML แล้ว
            break;
    }
}

// Initialize Home Page
function initHomePage() {
    // ฟังก์ชัน page-meta ถูกลบออกแล้ว
}

// Initialize Weekly Top 10 Thailand page
function initTop10Page() {
    const container = document.querySelector('main');
    if (!container) return;

    // ตรวจสอบว่ามี search-bar และ songs-grid อยู่แล้วหรือไม่
    const existingSearchBar = document.querySelector('.search-bar');
    const existingGrid = document.getElementById('songsGrid');
    
    // ถ้ายังไม่มี search-bar ให้สร้าง
    if (!existingSearchBar) {
        const searchBarHTML = `
            <div class="search-bar">
                <i class="fas fa-search search-bar__icon"></i>
                <input type="text" class="search-bar__input" id="searchInput" placeholder="ค้นหาชื่อเพลงหรือศิลปิน...">
            </div>
        `;
        
        // หาตำแหน่งที่จะเพิ่ม search-bar (หลัง page-meta)
        const pageMeta = document.querySelector('.page-meta');
        if (pageMeta) {
            pageMeta.insertAdjacentHTML('afterend', searchBarHTML);
        } else {
            container.insertAdjacentHTML('beforeend', searchBarHTML);
        }
    }
    
    // ถ้ายังไม่มี songs-grid ให้สร้างใหม่
    if (!existingGrid) {
        const songsGrid = document.createElement('div');
        songsGrid.className = 'songs-grid';
        songsGrid.id = 'songsGrid';
        container.appendChild(songsGrid);
        
        // Render songs
        renderSongs(songsData.top10, songsGrid);
        
        // Initialize search function สำหรับ grid
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterSongsInGrid(searchTerm, songsGrid);
            }, 300));
        }
        
        // Initialize tilt effect
        setTimeout(() => {
            if (typeof initTiltEffect === 'function') {
                initTiltEffect();
            }
        }, 100);
    } else {
        // ถ้ามีอยู่แล้วแค่ render songs
        renderSongs(songsData.top10, existingGrid);
        
        // Initialize search function สำหรับ grid
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterSongsInGrid(searchTerm, existingGrid);
            }, 300));
        }
        
        // Initialize tilt effect
        setTimeout(() => {
            if (typeof initTiltEffect === 'function') {
                initTiltEffect();
            }
        }, 100);
    }
}

// Initialize Weekly Top 10 Global page
function initTop10GlobalPage() {
    const container = document.querySelector('main');
    if (!container) return;

    // ตรวจสอบว่ามี search-bar และ songs-grid อยู่แล้วหรือไม่
    const existingSearchBar = document.querySelector('.search-bar');
    const existingGrid = document.getElementById('songsGrid');
    
    // ถ้ายังไม่มี search-bar ให้สร้าง
    if (!existingSearchBar) {
        const searchBarHTML = `
            <div class="search-bar">
                <i class="fas fa-search search-bar__icon"></i>
                <input type="text" class="search-bar__input" id="searchInput" placeholder="ค้นหาชื่อเพลงหรือศิลปิน...">
            </div>
        `;
        
        // หาตำแหน่งที่จะเพิ่ม search-bar (หลัง page-meta)
        const pageMeta = document.querySelector('.page-meta');
        if (pageMeta) {
            pageMeta.insertAdjacentHTML('afterend', searchBarHTML);
        } else {
            container.insertAdjacentHTML('beforeend', searchBarHTML);
        }
    }
    
    // ถ้ายังไม่มี songs-grid ให้สร้างใหม่
    if (!existingGrid) {
        const songsGrid = document.createElement('div');
        songsGrid.className = 'songs-grid';
        songsGrid.id = 'songsGrid';
        container.appendChild(songsGrid);
        
        // Render songs
        renderSongs(songsData.top10Global, songsGrid);
        
        // Initialize search function สำหรับ grid
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterSongsInGrid(searchTerm, songsGrid);
            }, 300));
        }
        
        // Initialize tilt effect
        setTimeout(() => {
            if (typeof initTiltEffect === 'function') {
                initTiltEffect();
            }
        }, 100);
    } else {
        // ถ้ามีอยู่แล้วแค่ render songs
        renderSongs(songsData.top10Global, existingGrid);
        
        // Initialize search function สำหรับ grid
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterSongsInGrid(searchTerm, existingGrid);
            }, 300));
        }
        
        // Initialize tilt effect
        setTimeout(() => {
            if (typeof initTiltEffect === 'function') {
                initTiltEffect();
            }
        }, 100);
    }
}

// Initialize Daily Thailand page
function initDailyThailandPage() {
    const container = document.querySelector('main');
    if (!container) return;

    // ตรวจสอบว่ามี search-bar และ songs-list อยู่แล้วหรือไม่
    const existingSearchBar = document.querySelector('.search-bar');
    const existingList = document.getElementById('songsList');
    
    // ถ้ายังไม่มี search-bar ให้สร้าง
    if (!existingSearchBar) {
        const searchBarHTML = `
            <div class="search-bar">
                <i class="fas fa-search search-bar__icon"></i>
                <input type="text" class="search-bar__input" id="searchInput" placeholder="ค้นหาชื่อเพลงหรือศิลปิน...">
            </div>
        `;
        
        // หาตำแหน่งที่จะเพิ่ม search-bar (หลัง page-meta)
        const pageMeta = document.querySelector('.page-meta');
        if (pageMeta) {
            pageMeta.insertAdjacentHTML('afterend', searchBarHTML);
        } else {
            container.insertAdjacentHTML('beforeend', searchBarHTML);
        }
    }
    
    // ถ้ายังไม่มี songs-list ให้สร้างใหม่
    if (!existingList) {
        const songsList = document.createElement('div');
        songsList.className = 'songs-list';
        songsList.id = 'songsList';
        container.appendChild(songsList);
        
        // Render songs as list
        renderSongsAsList(songsData.thailand, songsList);
        
        // Initialize search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterSongs(searchTerm, songsList);
            }, 300));
        }
    } else {
        // ถ้ามีอยู่แล้วแค่ render songs
        renderSongsAsList(songsData.thailand, existingList);
        
        // Initialize search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterSongs(searchTerm, existingList);
            }, 300));
        }
    }
}

// Initialize Daily Global page
function initDailyGlobalPage() {
    const container = document.querySelector('main');
    if (!container) return;

    // ตรวจสอบว่ามี search-bar และ songs-list อยู่แล้วหรือไม่
    const existingSearchBar = document.querySelector('.search-bar');
    const existingList = document.getElementById('songsList');
    
    // ถ้ายังไม่มี search-bar ให้สร้าง
    if (!existingSearchBar) {
        const searchBarHTML = `
            <div class="search-bar">
                <i class="fas fa-search search-bar__icon"></i>
                <input type="text" class="search-bar__input" id="searchInput" placeholder="ค้นหาชื่อเพลงหรือศิลปิน...">
            </div>
        `;
        
        // หาตำแหน่งที่จะเพิ่ม search-bar (หลัง page-meta)
        const pageMeta = document.querySelector('.page-meta');
        if (pageMeta) {
            pageMeta.insertAdjacentHTML('afterend', searchBarHTML);
        } else {
            container.insertAdjacentHTML('beforeend', searchBarHTML);
        }
    }
    
    // ถ้ายังไม่มี songs-list ให้สร้างใหม่
    if (!existingList) {
        const songsList = document.createElement('div');
        songsList.className = 'songs-list';
        songsList.id = 'songsList';
        container.appendChild(songsList);
        
        // Render songs as list
        renderSongsAsList(songsData.global, songsList);
        
        // Initialize search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterSongs(searchTerm, songsList);
            }, 300));
        }
    } else {
        // ถ้ามีอยู่แล้วแค่ render songs
        renderSongsAsList(songsData.global, existingList);
        
        // Initialize search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterSongs(searchTerm, existingList);
            }, 300));
        }
    }
}

// Initialize Top Artists page
function initTopArtistsPage() {
    const container = document.querySelector('main');
    if (!container) return;

    // ตรวจสอบว่ามี search-bar และ artists-list อยู่แล้วหรือไม่
    const existingSearchBar = document.querySelector('.search-bar');
    const existingList = document.getElementById('artistsList');
    
    // ถ้ายังไม่มี search-bar ให้สร้าง
    if (!existingSearchBar) {
        const searchBarHTML = `
            <div class="search-bar">
                <i class="fas fa-search search-bar__icon"></i>
                <input type="text" class="search-bar__input" id="searchInput" placeholder="ค้นหาชื่อศิลปิน...">
            </div>
        `;
        
        // หาตำแหน่งที่จะเพิ่ม search-bar (หลัง page-meta)
        const pageMeta = document.querySelector('.page-meta');
        if (pageMeta) {
            pageMeta.insertAdjacentHTML('afterend', searchBarHTML);
        } else {
            container.insertAdjacentHTML('beforeend', searchBarHTML);
        }
    }
    
    // ถ้ายังไม่มี artists-list ให้สร้างใหม่
    if (!existingList) {
        const artistsList = document.createElement('div');
        artistsList.className = 'artists-list';
        artistsList.id = 'artistsList';
        container.appendChild(artistsList);
        
        // Render artists
        renderArtists(songsData.dailyArtists, artistsList);
        
        // Initialize search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterArtists(searchTerm, artistsList);
            }, 300));
        }
    } else {
        // ถ้ามีอยู่แล้วแค่ render artists
        renderArtists(songsData.dailyArtists, existingList);
        
        // Initialize search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterArtists(searchTerm, existingList);
            }, 300));
        }
    }
}

// Render songs as grid
function renderSongs(songs, container) {
    if (!songs || !container) return;

    // เคลียร์เฉพาะ content ของ container ไม่ใช่ลบทั้ง container
    container.innerHTML = '';

    songs.forEach(song => {
        const trendIcon = getTrendIcon(song.trend, song.trendPosition);
        const trendText = getTrendText(song.trend, song.trendPosition);

        const songCard = document.createElement('div');
        songCard.className = 'song-card';
        songCard.dataset.songId = song.id;

        songCard.innerHTML = `
            <div class="song-card__rank">#${song.rank}</div>
            <div class="song-card__trend tooltip" data-tooltip="${trendText}">
                ${trendIcon}
            </div>
            <div class="song-card__cover">
                <img src="${song.cover}" alt="${song.title} - ${song.artist}" loading="lazy">
                <div class="song-card__play">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="song-card__info">
                <h3 class="song-card__title">${song.title}</h3>
                <p class="song-card__artist">${song.artist}</p>
                <div class="song-card__stats">
                    <div class="stat-item">
                        <span class="stat-value">${song.stats.peak}</span>
                        <span class="stat-label">
                            Peak
                            <span class="stat-help tooltip" data-tooltip="อันดับสูงสุดที่เคยได้">?</span>
                        </span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${song.stats.streak}</span>
                        <span class="stat-label">
                            Streak
                            <span class="stat-help tooltip" data-tooltip="จำนวนสัปดาห์ที่ติดชาร์ต">?</span>
                        </span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${song.stats.streams}</span>
                        <span class="stat-label">
                            Streams
                            <span class="stat-help tooltip" data-tooltip="จำนวนการฟังทั้งหมด">?</span>
                        </span>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(songCard);
    });

    // Re-initialize tooltips for new elements
    setTimeout(initTooltips, 100);
}

// Render songs as list
function renderSongsAsList(songs, container) {
    if (!songs || !container) return;

    // เคลียร์เฉพาะ content ของ container ไม่ใช่ลบทั้ง container
    container.innerHTML = '';

    songs.forEach(song => {
        const trendIcon = getTrendIcon(song.trend, song.trendPosition);
        const trendText = getTrendText(song.trend, song.trendPosition);

        const listItem = document.createElement('div');
        listItem.className = 'song-list-item';
        listItem.dataset.songId = song.id;

        listItem.innerHTML = `
            <div class="song-list-item__rank">#${song.rank}</div>
            <div class="song-list-item__trend tooltip" data-tooltip="${trendText}">
                ${trendIcon}
            </div>
            <div class="song-list-item__cover">
                <img src="${song.cover}" alt="${song.title} - ${song.artist}" loading="lazy">
                <div class="song-list-item__play">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="song-list-item__info">
                <h3 class="song-list-item__title">${song.title}</h3>
                <p class="song-list-item__artist">${song.artist}</p>
            </div>
            <div class="song-list-item__stats">
                <div class="stat-item">
                    <span class="stat-value">${song.stats.peak}</span>
                    <span class="stat-label">
                        Peak
                        <span class="stat-help tooltip" data-tooltip="อันดับสูงสุดที่เคยได้">?</span>
                    </span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${song.stats.streak}</span>
                    <span class="stat-label">
                        Streak
                        <span class="stat-help tooltip" data-tooltip="จำนวนสัปดาห์ที่ติดชาร์ต">?</span>
                    </span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${song.stats.streams}</span>
                    <span class="stat-label">
                        Streams
                        <span class="stat-help tooltip" data-tooltip="จำนวนการฟังทั้งหมด">?</span>
                    </span>
                </div>
            </div>
        `;

        container.appendChild(listItem);
    });

    // Re-initialize tooltips for new elements
    setTimeout(initTooltips, 100);
}

// Render artists
function renderArtists(artists, container) {
    if (!artists || !container) return;

    // เคลียร์เฉพาะ content ของ container ไม่ใช่ลบทั้ง container
    container.innerHTML = '';

    artists.forEach(artist => {
        const trendIcon = getTrendIcon(artist.trend, artist.trendPosition);
        const trendText = getTrendText(artist.trend, artist.trendPosition);

        const artistItem = document.createElement('div');
        artistItem.className = 'artist-item';
        artistItem.dataset.artistId = artist.id;

        artistItem.innerHTML = `
            <div class="artist-item__rank">#${artist.rank}</div>
            <div class="artist-item__trend tooltip" data-tooltip="${trendText}">
                ${trendIcon}
            </div>
            <div class="artist-item__avatar">
                <img src="${artist.cover}" alt="${artist.name}" loading="lazy">
            </div>
            <div class="artist-item__info">
                <h3 class="artist-item__name">${artist.name}</h3>
                <div class="artist-item__top-songs">
                    <span class="top-songs-label">เพลงดัง:</span>
                    <div class="top-songs-list">
                        ${artist.songs.map(song => `<span class="song-tag">${song}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="artist-item__stats">
                <div class="stat-item">
                    <span class="stat-value">${artist.stats.peak}</span>
                    <span class="stat-label">
                        Peak
                        <span class="stat-help tooltip" data-tooltip="อันดับสูงสุดที่เคยได้">?</span>
                    </span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${artist.stats.streak}</span>
                    <span class="stat-label">
                        Streak
                        <span class="stat-help tooltip" data-tooltip="จำนวนวันที่ติดชาร์ต">?</span>
                    </span>
                </div>
            </div>
        `;

        container.appendChild(artistItem);
    });

    // Re-initialize tooltips for new elements
    setTimeout(initTooltips, 100);
}

// Filter songs based on search term (สำหรับ list layout)
function filterSongs(searchTerm, container) {
    const items = container.querySelectorAll('.song-list-item');

    items.forEach(item => {
        const title = item.querySelector('.song-list-item__title').textContent.toLowerCase();
        const artist = item.querySelector('.song-list-item__artist').textContent.toLowerCase();

        if (title.includes(searchTerm) || artist.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// เพิ่มฟังก์ชันสำหรับค้นหาใน songs-grid (สำหรับ grid layout)
function filterSongsInGrid(searchTerm, container) {
    const items = container.querySelectorAll('.song-card');
    
    items.forEach(item => {
        const title = item.querySelector('.song-card__title').textContent.toLowerCase();
        const artist = item.querySelector('.song-card__artist').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || artist.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Filter artists based on search term
function filterArtists(searchTerm, container) {
    const items = container.querySelectorAll('.artist-item');

    items.forEach(item => {
        const name = item.querySelector('.artist-item__name').textContent.toLowerCase();

        if (name.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize tooltips
function initTooltips() {
    // Tooltips are already handled by CSS
    // This function is kept for compatibility
}

// Initialize particles
function initParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 4 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(particle);
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}