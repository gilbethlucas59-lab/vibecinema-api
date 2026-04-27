let allMedia = [];
const sidebar = document.getElementById('sidebar');

async function loadGallery() {
    try {
        const res = await fetch('http://localhost:5000/api/media');
        allMedia = await res.json();
        renderHomeDashboard(); // Start with the category icons
    } catch (err) { console.error("Gallery failed to load"); }
}

// 1. Create the Category Selection (Dashboard)
function renderHomeDashboard() {
    const container = document.getElementById('movie-container');
    const singleView = document.getElementById('single-media-view');
    sidebar.classList.remove('collapsed');
    if(singleView) singleView.style.display = 'none';
    container.style.display = 'grid';
    container.innerHTML = `
        <div class="category-card" onclick="filterMedia('video')">
            <div class="category-icon">🎥</div>
            <h3>Videos</h3>
            <p>Full HD movies and technical walkthroughs.</p>
        </div>
        <div class="category-card" onclick="filterMedia('audio')">
            <div class="category-icon">🎵</div>
            <h3>Audios</h3>
            <p>Music, podcasts, and audio logic files.</p>
        </div>
        <div class="category-card" onclick="filterMedia('photo')">
            <div class="category-icon">🖼️</div>
            <h3>Photos</h3>
            <p>High-quality "Dripper" photography and tech edits.</p>
        </div>
    `;
}

// 2. Filter and Show the Media Rows
function filterMedia(type) {
    const container = document.getElementById('movie-container');
    container.innerHTML = `
        <button onclick="renderHomeDashboard()" class="back-btn">← Back to Categories</button>
        <h2 style="text-transform: capitalize; color: #e50914;">${type} Gallery</h2>
    `;
    
    const filtered = allMedia.filter(m => m.type === type);
    
    if(filtered.length === 0) {
        container.innerHTML += '<p style="color:#666;">No media found in this category.</p>';
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'media-card';
        card.onclick = () => renderSingleView(item._id);
        
        let icon = item.type === 'video' ? '▶️' : (item.type === 'audio' ? '🎵' : '🖼️');

        card.innerHTML = `
            <div class="media-preview">${icon}</div>
            <div class="media-info">
                <h3 class="media-title">${item.title}</h3>
                <span class="media-type-tag">${item.type}</span>
            </div>`;
        container.appendChild(card);
    });
}

function renderSingleView(id) {
    const item = allMedia.find(m => m._id === id);
    const container = document.getElementById('movie-container');
    const singleView = document.getElementById('single-media-view');
    
    sidebar.classList.add('collapsed');
    container.style.display = 'none';
    singleView.style.display = 'block';
    
    singleView.innerHTML = `
        <button onclick="renderHomeDashboard()" class="back-btn">← Home</button>
        <div style="width:100%; max-width:1000px; margin:auto;">
            <video controls autoplay style="width:100%; border-radius:10px;"><source src="${item.path}"></video>
            <h1 style="color:#fff; margin-top:20px;">${item.title}</h1>
            <p style="color:#aaa;">${item.description || 'No description provided.'}</p>
        </div>`;
}

document.addEventListener('DOMContentLoaded', loadGallery);

function renderTrendingView() {
    const container = document.getElementById('movie-container');
    const singleView = document.getElementById('single-media-view');
    
    // Switch view visibility
    if(singleView) singleView.style.display = 'none';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';

    // Highlight Trending Content
    container.innerHTML = `
        <div class="trending-header">
            <h1 style="color: #e50914; margin-bottom: 5px;">🔥 Trending Now</h1>
            <p style="color: #888;">The most ingenious and highly-rated media on VibeCinema today.</p>
        </div>
        
        <div class="trending-stats">
            <div class="stat-box"><strong>Total Views:</strong> 12.4K</div>
            <div class="stat-box"><strong>Top Category:</strong> Technical Logic</div>
        </div>
    `;

    // Filter media that has "trending" in the title or just show the top 3 items
    const trendingMedia = allMedia.slice(0, 3); 

    if (trendingMedia.length === 0) {
        container.innerHTML += '<p style="color: #444; margin-top: 20px;">No trending data available yet. Start uploading!</p>';
    } else {
        trendingMedia.forEach(item => {
            const card = document.createElement('div');
            card.className = 'media-card';
            card.onclick = () => renderSingleView(item._id);
            
            let icon = item.type === 'video' ? '▶️' : (item.type === 'audio' ? '🎵' : '🖼️');

            card.innerHTML = `
                <div class="media-preview">${icon}</div>
                <div class="media-info">
                    <h3 class="media-title">${item.title}</h3>
                    <span class="media-type-tag">🔥 HOT IN ${item.type.toUpperCase()}</span>
                </div>`;
            container.appendChild(card);
        });
    }
}

function renderProfileView() {
    const container = document.getElementById('movie-container');
    const singleView = document.getElementById('single-media-view');
    
    // Switch view visibility
    if(singleView) singleView.style.display = 'none';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';

    // Build the Profile Dashboard
    container.innerHTML = `
        <div class="profile-header">
            <h1 style="color: #e50914; margin-bottom: 5px;">👤 My Profile</h1>
            <p style="color: #888;">Manage your VibeCinema account and view your technical stats.</p>
        </div>
        
        <div class="profile-card">
            <div class="profile-main-info">
                <div class="profile-avatar">A</div>
                <div class="profile-details">
                    <h2 style="margin: 0;">Ali</h2>
                    <p style="color: #e50914; margin: 5px 0;">Software Developer | Neptune Environment</p>
                    <p style="font-size: 0.9rem; color: #666;">Member since: April 2026</p>
                </div>
            </div>
            
            <hr style="border: 0; border-top: 1px solid #222; margin: 25px 0;">
            
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-value">${allMedia.length}</span>
                    <span class="stat-label">Total Uploads</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">100%</span>
                    <span class="stat-label">System Integrity</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">Active</span>
                    <span class="stat-label">Account Status</span>
                </div>
            </div>

            <button class="post-btn" style="margin-top: 30px; width: auto; padding: 10px 30px;" onclick="window.location.href='login.html'">LOGOUT</button>
        </div>
    `;
}
