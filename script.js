// Main JavaScript functionality for Acue Store

class AcueStore {
    constructor() {
        this.apps = window.appsData || [];
        this.categories = window.categories || {};
        this.currentFilter = '';
        this.currentSearchTerm = '';
        this.deviceInfo = this.detectDevice();

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderHotApps();
        this.renderApps();
        this.updateActiveNavLink();
        this.initBadgeModal();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentSearchTerm = e.target.value.toLowerCase().trim();
                this.filterAndRenderApps();
            });
        }

        // Category filtering
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.filterByCategory(category);
                this.updateActiveCategoryCard(card);
            });
        });

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.handleNavigation(target);
                this.updateActiveNavLink(link);
            });
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    handleNavigation(target) {
        switch(target) {
            case 'home':
                this.currentFilter = '';
                this.currentSearchTerm = '';
                document.getElementById('searchInput').value = '';
                this.clearActiveCategoryCards();
                break;
            case 'games':
                this.filterByCategory('games');
                break;
            case 'apps':
                this.currentFilter = '';
                this.currentSearchTerm = '';
                document.getElementById('searchInput').value = '';
                this.clearActiveCategoryCards();
                break;
            case 'categories':
                // Scroll to categories section
                const categoriesSection = document.querySelector('.categories-section');
                if (categoriesSection) {
                    categoriesSection.scrollIntoView({ behavior: 'smooth' });
                }
                return;
        }
        this.filterAndRenderApps();
    }

    filterByCategory(category) {
        this.currentFilter = category;
        this.currentSearchTerm = '';
        document.getElementById('searchInput').value = '';
        this.filterAndRenderApps();
    }

    filterAndRenderApps() {
        this.showLoading();

        // Simulate loading delay for better UX
        setTimeout(() => {
            let filteredApps = [...this.apps];

            // Apply category filter
            if (this.currentFilter) {
                filteredApps = filteredApps.filter(app => 
                    app.category === this.currentFilter
                );
            }

            // Apply search filter
            if (this.currentSearchTerm) {
                filteredApps = filteredApps.filter(app =>
                    app.name.toLowerCase().includes(this.currentSearchTerm) ||
                    app.developer.toLowerCase().includes(this.currentSearchTerm) ||
                    app.description.toLowerCase().includes(this.currentSearchTerm) ||
                    app.category.toLowerCase().includes(this.currentSearchTerm)
                );
            }

            this.hideLoading();
            this.renderApps(filteredApps);
        }, 300);
    }

    renderApps(appsToRender = this.apps) {
        const appsGrid = document.getElementById('appsGrid');
        const noResults = document.getElementById('noResults');

        if (!appsGrid) return;

        if (appsToRender.length === 0) {
            appsGrid.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
            return;
        }

        if (noResults) noResults.style.display = 'none';

        appsGrid.innerHTML = appsToRender.map(app => this.createAppCard(app)).join('');

        // Add click event listeners to download buttons
        const downloadButtons = appsGrid.querySelectorAll('.download-btn');
        downloadButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const app = appsToRender[index];
                this.handleDownload(app);
            });
        });

        // Add click event listeners to badges
        const badges = appsGrid.querySelectorAll('.app-badge');
        badges.forEach(badge => {
            badge.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const badgeType = badge.dataset.badgeType;
                this.showBadgeModal(badgeType);
            });
        });
    }

    createAppCard(app, isHot = false) {
        const categoryInfo = this.categories[app.category] || { name: app.category };
        const stars = this.generateStars(app.rating);
        const hotBadge = isHot ? '<div class="hot-badge">🔥 HOT</div>' : '';
        const badges = this.createAppBadges(app.badges || []);

        return `
            <div class="app-card ${isHot ? 'hot-app' : ''}" data-app-id="${app.id}">
                ${hotBadge}
                <div class="app-header">
                    <div class="app-icon">
                        <i class="${app.icon}"></i>
                    </div>
                    <div class="app-info">
                        <div class="app-name">${app.name}</div>
                        <div class="app-developer">${app.developer}</div>
                        <div class="app-rating">
                            <span class="rating-stars">${stars}</span>
                            <span class="rating-value">${app.rating}</span>
                        </div>
                        ${badges}
                    </div>
                </div>
                <div class="app-description">
                    ${app.description}
                </div>
                <div class="app-footer">
                    <span class="app-category">${categoryInfo.name}</span>
                    <a href="${app.downloadUrl}" class="download-btn" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-download"></i>
                        Download
                    </a>
                </div>
            </div>
        `;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let stars = '';

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        // Half star
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    createAppBadges(badges) {
        if (!badges || badges.length === 0) return '';

        const badgeTypes = window.badgeTypes || {};

        const badgeHtml = badges.map(badgeType => {
            const badge = badgeTypes[badgeType];
            if (!badge) return '';

            return `<span class="app-badge badge-${badgeType}" data-badge-type="${badgeType}">${badge.icon}</span>`;
        }).join('');

        return badgeHtml ? `<div class="app-badges">${badgeHtml}</div>` : '';
    }

    handleDownload(app) {
        // Check if browser is available
        if (!this.isBrowserAvailable()) {
            this.showBrowserError();
            return;
        }

        // Add download tracking or analytics here if needed
        console.log(`Downloading ${app.name} from ${app.downloadUrl}`);

        // Show a brief loading state on the button
        const button = document.querySelector(`[data-app-id="${app.id}"] .download-btn`);
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
            button.style.pointerEvents = 'none';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.pointerEvents = 'auto';
            }, 2000);
        }

        // Open APKPure download link in new tab
        window.open(app.downloadUrl, '_blank', 'noopener,noreferrer');
    }

    isBrowserAvailable() {
        // Check if we're in a proper browser environment
        if (typeof window === 'undefined' || typeof window.open !== 'function') {
            return false;
        }

        // Check user agent for known browsers
        const userAgent = navigator.userAgent.toLowerCase();
        const browsers = ['chrome', 'firefox', 'safari', 'edge', 'opera', 'samsung', 'ucbrowser'];

        return browsers.some(browser => userAgent.includes(browser)) || 
               userAgent.includes('mozilla') || 
               userAgent.includes('webkit');
    }

    showBrowserError() {
        const errorModal = this.createBrowserErrorModal();
        document.body.appendChild(errorModal);

        // Show modal
        setTimeout(() => {
            errorModal.classList.add('show');
        }, 10);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideBrowserErrorModal(errorModal);
        }, 5000);
    }

    createBrowserErrorModal() {
        const modal = document.createElement('div');
        modal.className = 'browser-error-modal';
        modal.innerHTML = `
            <div class="browser-error-content">
                <div class="browser-error-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Error 671: Browser Required</h3>
                </div>
                <div class="browser-error-body">
                    <p>Please have a Web Browser ready to download the app.</p>
                    <p>Make sure you have Chrome, Firefox, Safari, or another browser installed on your device.</p>
                </div>
                <button class="browser-error-close" onclick="this.closest('.browser-error-modal').remove()">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        `;

        return modal;
    }

    hideBrowserErrorModal(modal) {
        if (modal && modal.parentNode) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    updateActiveNavLink(activeLink = null) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));

        if (activeLink) {
            activeLink.classList.add('active');
        } else {
            // Default to home
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    updateActiveCategoryCard(activeCard) {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => card.classList.remove('active'));
        activeCard.classList.add('active');
    }

    clearActiveCategoryCards() {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => card.classList.remove('active'));
    }

    showLoading() {
        const loading = document.getElementById('loading');
        const appsGrid = document.getElementById('appsGrid');
        const noResults = document.getElementById('noResults');

        if (loading) loading.style.display = 'block';
        if (appsGrid) appsGrid.style.display = 'none';
        if (noResults) noResults.style.display = 'none';
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        const appsGrid = document.getElementById('appsGrid');

        if (loading) loading.style.display = 'none';
        if (appsGrid) appsGrid.style.display = 'grid';
    }

    // Public methods for external use
    addApp(appData) {
        if (!appData.id || !appData.name || !appData.downloadUrl) {
            console.error('Invalid app data. Required fields: id, name, downloadUrl');
            return false;
        }

        // Check if app already exists
        const existingApp = this.apps.find(app => app.id === appData.id);
        if (existingApp) {
            console.warn(`App with id "${appData.id}" already exists`);
            return false;
        }

        // Add default values for missing fields
        const newApp = {
            category: 'productivity',
            rating: 4.0,
            description: 'No description available.',
            icon: 'fas fa-mobile-alt',
            developer: 'Unknown Developer',
            ...appData
        };

        this.apps.push(newApp);
        this.renderApps();
        return true;
    }

    removeApp(appId) {
        const index = this.apps.findIndex(app => app.id === appId);
        if (index !== -1) {
            this.apps.splice(index, 1);
            this.renderApps();
            return true;
        }
        return false;
    }

    searchApps(searchTerm) {
        this.currentSearchTerm = searchTerm.toLowerCase().trim();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = searchTerm;
        }
        this.filterAndRenderApps();
    }

    renderHotApps() {
        const hotApps = this.apps.filter(app => app.isHot);
        const hotAppsGrid = document.getElementById('hotAppsGrid');

        if (!hotAppsGrid) return;

        hotAppsGrid.innerHTML = hotApps.map(app => this.createAppCard(app, true)).join('');

        // Add click event listeners to download buttons
        const downloadButtons = hotAppsGrid.querySelectorAll('.download-btn');
        downloadButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const app = hotApps[index];
                this.handleDownload(app);
            });
        });

        // Add click event listeners to badges
        const badges = hotAppsGrid.querySelectorAll('.app-badge');
        badges.forEach(badge => {
            badge.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const badgeType = badge.dataset.badgeType;
                this.showBadgeModal(badgeType);
            });
        });
    }



    showBadgeModal(badgeType) {
        const badgeTypes = window.badgeTypes || {};
        const badge = badgeTypes[badgeType];

        if (!badge) return;

        const modal = document.getElementById('badgeModal');
        const icon = document.getElementById('badgeModalIcon');
        const title = document.getElementById('badgeModalTitle');
        const body = document.getElementById('badgeModalBody');

        if (modal && icon && title && body) {
            icon.textContent = badge.icon;
            title.textContent = badge.name;
            body.textContent = badge.reason;
            modal.classList.add('show');
        }
    }

    hideBadgeModal() {
        const modal = document.getElementById('badgeModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    initBadgeModal() {
        const modal = document.getElementById('badgeModal');
        const closeBtn = document.getElementById('badgeModalClose');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideBadgeModal();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideBadgeModal();
                }
            });
        }

        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideBadgeModal();
            }
        });
    }

    detectDevice() {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        const maxTouchPoints = navigator.maxTouchPoints;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        let deviceType = 'Desktop';
        let os = 'Unknown';
        let browser = 'Unknown';

        // Detect OS
        if (/Android/i.test(userAgent)) {
            os = 'Android';
            deviceType = 'Mobile';
        } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
            os = 'iOS';
            deviceType = /iPad/i.test(userAgent) ? 'Tablet' : 'Mobile';
        } else if (/Windows NT/i.test(userAgent)) {
            os = 'Windows';
        } else if (/Mac OS X/i.test(userAgent)) {
            os = 'macOS';
        } else if (/Linux/i.test(userAgent)) {
            os = 'Linux';
        }

        // Detect Browser
        if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent)) {
            browser = 'Chrome';
        } else if (/Firefox/i.test(userAgent)) {
            browser = 'Firefox';
        } else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
            browser = 'Safari';
        } else if (/Edg/i.test(userAgent)) {
            browser = 'Edge';
        }

        // Refine device type based on screen size and touch
        if (deviceType === 'Desktop') {
            if (maxTouchPoints > 0 && screenWidth <= 1024) {
                deviceType = 'Tablet';
            } else if (screenWidth <= 768) {
                deviceType = 'Mobile';
            }
        }

        return {
            type: deviceType,
            os: os,
            browser: browser,
            screenWidth: screenWidth,
            screenHeight: screenHeight,
            touchEnabled: maxTouchPoints > 0
        };
    }

    displayDeviceInfo() {
        const deviceIndicator = document.getElementById('deviceIndicator');
        if (deviceIndicator) {
            const device = this.deviceInfo;
            const deviceIcon = this.getDeviceIcon(device.type);
            deviceIndicator.innerHTML = `${deviceIcon} ${device.type} | ${device.os}`;
            deviceIndicator.title = `Device: ${device.type}\nOS: ${device.os}\nBrowser: ${device.browser}\nScreen: ${device.screenWidth}x${device.screenHeight}\nTouch: ${device.touchEnabled ? 'Yes' : 'No'}`;
        }
    }

    getDeviceIcon(deviceType) {
        switch (deviceType) {
            case 'Mobile':
                return '📱';
            case 'Tablet':
                return '📱';
            case 'Desktop':
                return '💻';
            default:
                return '🖥️';
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.acueStore = new AcueStore();
});

// Add category active state styles
const style = document.createElement('style');
style.textContent = `
    .category-card.active {
        background-color: hsl(var(--primary-color));
        color: white;
        transform: translateY(-4px);
        box-shadow: 0 8px 24px hsla(var(--primary-color) / 0.3);
    }
    
    .category-card.active i {
        color: white;
    }
    
    .category-card.active span {
        color: white;
    }
`;
document.head.appendChild(style);