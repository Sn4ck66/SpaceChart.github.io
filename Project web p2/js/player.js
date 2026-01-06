/**
 * Audio Player System for Space Chart
 */

class AudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.currentSong = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.volume = 0.8;
        this.playlist = [];
        this.currentIndex = -1;
        this.lastVolume = 0.8;
        
        this.init();
    }
    
    init() {
        this.audio.volume = this.volume;
        
        // Get DOM elements
        this.playBtn = document.getElementById('playBtn');
        this.playIcon = document.getElementById('playIcon');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.volumeBtn = document.getElementById('volumeBtn');
        this.volumeIcon = document.getElementById('volumeIcon');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.progressSlider = document.getElementById('progressSlider');
        this.progressFill = document.getElementById('progressFill');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationTimeEl = document.getElementById('durationTime');
        this.playerTitle = document.getElementById('playerTitle');
        this.playerArtist = document.getElementById('playerArtist');
        this.playerCover = document.getElementById('playerCover');
        
        // Audio event listeners
        this.audio.addEventListener('loadedmetadata', () => {
            this.duration = this.audio.duration;
            this.durationTimeEl.textContent = this.formatTime(this.duration);
        });
        
        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
        });
        
        this.audio.addEventListener('ended', () => {
            this.next();
        });
        
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.updatePlayButton();
        });
        
        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updatePlayButton();
        });
        
        // Button event listeners
        if (this.playBtn) {
            this.playBtn.addEventListener('click', () => this.togglePlay());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Volume controls
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }
        
        if (this.volumeBtn) {
            this.volumeBtn.addEventListener('click', () => this.toggleMute());
        }
        
        // Progress controls
        if (this.progressSlider) {
            this.progressSlider.addEventListener('input', (e) => {
                const percent = e.target.value;
                if (this.progressFill) {
                    this.progressFill.style.width = `${percent}%`;
                }
                
                if (this.duration) {
                    const time = (percent / 100) * this.duration;
                    if (this.currentTimeEl) {
                        this.currentTimeEl.textContent = this.formatTime(time);
                    }
                    this.audio.currentTime = time;
                }
            });
        }
        
        // Initialize UI
        this.updatePlayButton();
        this.updateVolumeUI();
        
        // Set default playlist to top10
        this.setPlaylist(songsData.top10);
        
        // Make player globally accessible
        window.spaceChartPlayer = this;
    }
    
    playSong(song) {
        if (!song || !song.audio) return;
        
        this.currentSong = song;
        this.audio.src = song.audio;
        
        // Update UI
        if (this.playerTitle) this.playerTitle.textContent = song.title;
        if (this.playerArtist) this.playerArtist.textContent = song.artist;
        if (this.playerCover) {
            this.playerCover.src = song.cover;
            this.playerCover.alt = `${song.title} - ${song.artist}`;
        }
        
        // Play audio
        this.audio.play().catch(e => {
            console.log('Audio play error:', e);
        });
        
        // Add to history
        this.addToHistory(song);
    }
    
    playSongById(id) {
        // Find song in all data
        let song = null;
        let sourceArray = null;
        
        // Check all arrays
        const arraysToCheck = [
            { data: songsData.top10, name: 'top10' },
            { data: songsData.top10Global, name: 'top10Global' },
            { data: songsData.thailand, name: 'thailand' },
            { data: songsData.global, name: 'global' }
        ];
        
        for (const arrayData of arraysToCheck) {
            song = arrayData.data.find(s => s.id === id);
            if (song) {
                sourceArray = arrayData.data;
                break;
            }
        }
        
        // Also check album songs
        if (!song) {
            for (const album of songsData.albums) {
                if (album.songs) {
                    const albumSong = album.songs.find(s => s.id === id);
                    if (albumSong) {
                        // Create a song object from album song
                        song = {
                            id: albumSong.id,
                            title: albumSong.title,
                            artist: albumSong.artist || album.artist,
                            audio: albumSong.audio,
                            cover: album.cover
                        };
                        break;
                    }
                }
            }
        }
        
        if (song) {
            if (sourceArray) {
                this.setPlaylist(sourceArray);
                this.currentIndex = sourceArray.findIndex(s => s.id === id);
            }
            this.playSong(song);
        }
    }
    
    setPlaylist(songs) {
        this.playlist = [...songs];
    }
    
    togglePlay() {
        if (!this.currentSong) {
            // Play first song from top10 if nothing is playing
            if (songsData.top10.length > 0) {
                this.setPlaylist(songsData.top10);
                this.currentIndex = 0;
                this.playSong(songsData.top10[0]);
            }
            return;
        }
        
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(e => {
                console.log('Audio play error:', e);
            });
        }
    }
    
    prev() {
        if (this.playlist.length === 0) return;
        
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.playlist.length - 1;
        }
        
        this.playSong(this.playlist[this.currentIndex]);
    }
    
    next() {
        if (this.playlist.length === 0) return;
        
        this.currentIndex++;
        if (this.currentIndex >= this.playlist.length) {
            this.currentIndex = 0;
        }
        
        this.playSong(this.playlist[this.currentIndex]);
    }
    
    setVolume(value) {
        this.volume = value;
        this.audio.volume = value;
        this.updateVolumeUI();
    }
    
    toggleMute() {
        if (this.audio.volume > 0) {
            this.lastVolume = this.audio.volume;
            this.setVolume(0);
        } else {
            this.setVolume(this.lastVolume || 0.8);
        }
    }
    
    updateProgress() {
        if (!this.duration) return;
        
        this.currentTime = this.audio.currentTime;
        const percent = (this.currentTime / this.duration) * 100;
        
        if (this.progressFill) {
            this.progressFill.style.width = `${percent}%`;
        }
        
        if (this.progressSlider) {
            this.progressSlider.value = percent;
        }
        
        if (this.currentTimeEl) {
            this.currentTimeEl.textContent = this.formatTime(this.currentTime);
        }
    }
    
    updatePlayButton() {
        if (!this.playIcon) return;
        
        if (this.isPlaying) {
            this.playIcon.className = 'fas fa-pause';
            if (this.playBtn) {
                this.playBtn.setAttribute('aria-label', 'Pause');
            }
        } else {
            this.playIcon.className = 'fas fa-play';
            if (this.playBtn) {
                this.playBtn.setAttribute('aria-label', 'Play');
            }
        }
    }
    
    updateVolumeUI() {
        if (!this.volumeIcon || !this.volumeSlider) return;
        
        this.volumeSlider.value = this.volume * 100;

        const volumeFill = document.getElementById('volumeFill');
        if (volumeFill) {
            volumeFill.style.width = `${this.volume * 100}%`;
        }
        
        if (this.volume === 0) {
            this.volumeIcon.className = 'fas fa-volume-mute';
        } else if (this.volume < 0.5) {
            this.volumeIcon.className = 'fas fa-volume-down';
        } else {
            this.volumeIcon.className = 'fas fa-volume-up';
        }
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    addToHistory(song) {
        try {
            let history = JSON.parse(localStorage.getItem('spaceChartHistory') || '[]');
            
            // Remove if already exists
            history = history.filter(item => item.id !== song.id);
            
            // Add to beginning
            history.unshift({
                id: song.id,
                title: song.title,
                artist: song.artist,
                cover: song.cover,
                timestamp: new Date().toISOString()
            });
            
            // Keep only last 20 songs
            if (history.length > 20) {
                history = history.slice(0, 20);
            }
            
            localStorage.setItem('spaceChartHistory', JSON.stringify(history));
        } catch (e) {
            console.log('LocalStorage error:', e);
        }
    }
}

// Initialize player
let player;

function initPlayer() {
    player = new AudioPlayer();
    
    // Add event listeners to song cards
    document.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.song-card, .song-list-item, .song-slide, .song-card__play, .song-list-item__play, .song-slide__play, .song-card__cover, .song-list-item__cover, .song-slide__cover, .track-item, .track-play');
        if (playBtn) {
            const songCard = playBtn.closest('.song-card, .song-list-item, .song-slide, .track-item');
            if (songCard) {
                const songId = parseInt(songCard.dataset.songId);
                if (!isNaN(songId)) {
                    player.playSongById(songId);
                    e.preventDefault();
                }
            }
        }
    });
    
    return player;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AudioPlayer,
        initPlayer
    };
}