// Main JavaScript functionality for Acue Store

class AcueStore {
    constructor() {
        this.apps = window.appsData || [];
        this.categories = window.categories || {};
        this.currentFilter = '';
        this.currentSearchTerm = '';
        this.deviceInfo = this.detectDevice();
        this.isOlderDevice = this.detectOlderDevice();
        
        // Optimize for older devices
        if (this.isOlderDevice) {
            this.optimizeForOlderDevices();
        }
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderHotApps();
        this.renderApps();
        this.updateActiveNavLink();
        this.initBadgeModal();
        this.initLGWingSupport();
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
                
                // Special handling for About Store
                if (target === 'about') {
                    this.showBadgeModal('store-info');
                    return;
                }
                
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
            case 'about':
                this.showBadgeModal('store-info');
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
        
        // Reduce loading delay for older devices
        const delay = this.isOlderDevice ? 100 : 300;
        
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
            
            // Use optimized rendering for older devices
            if (this.isOlderDevice) {
                this.renderAppsOptimized(filteredApps);
            } else {
                this.renderApps(filteredApps);
            }
        }, delay);
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
                    <h3>Error 671: Browser Not Supported</h3>
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
        let hotApps = this.apps.filter(app => app.isHot);
        
        // Limit hot apps for older devices
        if (this.isOlderDevice && this.maxHotApps) {
            hotApps = hotApps.slice(0, this.maxHotApps);
        }
        
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
        const modal = document.getElementById('badgeModal');
        const title = document.getElementById('badgeModalTitle');
        const body = document.getElementById('badgeModalBody');
        const icon = document.getElementById('badgeModalIcon');
        
        if (!modal || !title || !body || !icon) return;
        
        const badgeInfo = {
            'data-sharing': {
                title: 'Data Sharing Notice',
                icon: '🌐',
                content: `
                    <p><strong>This app may share data with third parties.</strong></p>
                    <p>The app developer has indicated that this application may collect, use, or share the following types of data:</p>
                    <ul>
                        <li>Personal information (name, email, etc.)</li>
                        <li>Usage data and analytics</li>
                        <li>Device information</li>
                        <li>Location data (if applicable)</li>
                    </ul>
                    <p>Please review the app's privacy policy before downloading to understand how your data will be used.</p>
                `
            },
            'unstable': {
                title: 'Unstable App Warning',
                icon: '⚠️',
                content: `
                    <p><strong>This app may be unstable or contain bugs.</strong></p>
                    <p>Users have reported the following potential issues:</p>
                    <ul>
                        <li>App crashes or freezes</li>
                        <li>Performance issues</li>
                        <li>Feature limitations</li>
                        <li>Compatibility problems</li>
                    </ul>
                    <p>Download at your own risk. Consider looking for alternative apps with better stability ratings.</p>
                `
            },
            'store-info': {
                title: 'About Store',
                icon: 'ⓘ',
                content: `
                    <div class="store-info-content">
                        <p><strong>Store Information</strong></p>
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="info-label">Store UI (Glass):</span>
                                <span class="info-value">3.0</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Security Patch:</span>
                                <span class="info-value">June 22, 2025</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">ASPFU Version:</span>
                                <span class="info-value">Alpha-S6000ASPFUV209</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Axcu Build:</span>
                                <span class="info-value">S6000Y25MJD8SU2O</span>
                            </div>
                        </div>
                        <p>Acue Store provides safe and verified APK downloads from APKPure. All apps are scanned for security before being made available.</p>
                    </div>
                `
            }
        };
        
        const info = badgeInfo[badgeType];
        if (info) {
            title.textContent = info.title;
            icon.textContent = info.icon;
            body.innerHTML = info.content;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Add immediate close button handler after modal is shown
            setTimeout(() => {
                const closeBtn = document.getElementById('badgeModalClose');
                if (closeBtn) {
                    closeBtn.onclick = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.hideBadgeModal();
                    };
                }
            }, 50);
        }
    }

    hideBadgeModal() {
        console.log('hideBadgeModal called'); // Debug log
        const modal = document.getElementById('badgeModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            console.log('Modal hidden successfully'); // Debug log
        } else {
            console.log('Modal element not found'); // Debug log
        }
    }

    initBadgeModal() {
        // Remove any existing event listeners to prevent duplicates
        document.removeEventListener('click', this.modalCloseHandler);
        document.removeEventListener('keydown', this.modalKeyHandler);
        
        // Create bound handlers
        this.modalCloseHandler = (e) => {
            // Check for close button click
            if (e.target.classList.contains('badge-modal-close') || 
                e.target.closest('.badge-modal-close') ||
                e.target.id === 'badgeModalClose' ||
                e.target.closest('#badgeModalClose')) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked'); // Debug log
                this.hideBadgeModal();
                return;
            }
            
            // Check for modal background click
            if (e.target.classList.contains('badge-modal')) {
                console.log('Modal background clicked'); // Debug log
                this.hideBadgeModal();
            }
        };
        
        this.modalKeyHandler = (e) => {
            if (e.key === 'Escape') {
                console.log('Escape key pressed'); // Debug log
                this.hideBadgeModal();
            }
        };
        
        // Add event listeners
        document.addEventListener('click', this.modalCloseHandler, true);
        document.addEventListener('keydown', this.modalKeyHandler);
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

    initLGWingSupport() {
        this.lgWingDetected = this.detectLGWing();
        
        if (this.lgWingDetected) {
            this.setupVirtualTouchpad();
            document.body.classList.add('lg-wing-mode');
        }
        
        // Listen for orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.lgWingDetected = this.detectLGWing();
                if (this.lgWingDetected) {
                    this.setupVirtualTouchpad();
                    document.body.classList.add('lg-wing-mode');
                } else {
                    document.body.classList.remove('lg-wing-mode');
                    this.disableVirtualTouchpad();
                }
            }, 100);
        });
    }

    detectLGWing() {
        // Detect LG Wing specific conditions
        const isLandscape = window.orientation === 90 || window.orientation === -90;
        const screenRatio = window.screen.width / window.screen.height;
        const isLGWingDimensions = (
            (window.screen.width >= 2340 && window.screen.height <= 1080) ||
            (window.innerWidth >= 2340 && window.innerHeight <= 1080)
        );
        
        return isLandscape && isLGWingDimensions && screenRatio > 2;
    }

    setupVirtualTouchpad() {
        const touchpad = document.getElementById('virtualTouchpad');
        const cursor = document.getElementById('touchpadCursor');
        const leftClick = document.getElementById('leftClick');
        const rightClick = document.getElementById('rightClick');
        const scrollMode = document.getElementById('scrollMode');
        
        if (!touchpad || !cursor) return;
        
        let isScrollMode = false;
        let cursorX = 50;
        let cursorY = 50;
        
        // Show secondary display
        const secondaryDisplay = document.getElementById('secondaryDisplay');
        if (secondaryDisplay) {
            secondaryDisplay.style.display = 'block';
        }
        
        // Touchpad movement
        touchpad.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = touchpad.getBoundingClientRect();
            
            cursorX = ((touch.clientX - rect.left) / rect.width) * 100;
            cursorY = ((touch.clientY - rect.top) / rect.height) * 100;
            
            cursorX = Math.max(0, Math.min(100, cursorX));
            cursorY = Math.max(0, Math.min(100, cursorY));
            
            cursor.style.left = cursorX + '%';
            cursor.style.top = cursorY + '%';
            
            if (isScrollMode) {
                this.simulateScroll(cursorX, cursorY);
            } else {
                this.simulateMouseMove(cursorX, cursorY);
            }
        });
        
        // Mouse movement for desktop testing
        touchpad.addEventListener('mousemove', (e) => {
            const rect = touchpad.getBoundingClientRect();
            
            cursorX = ((e.clientX - rect.left) / rect.width) * 100;
            cursorY = ((e.clientY - rect.top) / rect.height) * 100;
            
            cursor.style.left = cursorX + '%';
            cursor.style.top = cursorY + '%';
            
            if (isScrollMode) {
                this.simulateScroll(cursorX, cursorY);
            }
        });
        
        // Left click
        leftClick.addEventListener('click', () => {
            this.simulateClick(cursorX, cursorY, 'left');
            leftClick.classList.add('active');
            setTimeout(() => leftClick.classList.remove('active'), 200);
        });
        
        // Right click
        rightClick.addEventListener('click', () => {
            this.simulateClick(cursorX, cursorY, 'right');
            rightClick.classList.add('active');
            setTimeout(() => rightClick.classList.remove('active'), 200);
        });
        
        // Scroll mode toggle
        scrollMode.addEventListener('click', () => {
            isScrollMode = !isScrollMode;
            scrollMode.classList.toggle('active', isScrollMode);
            touchpad.style.cursor = isScrollMode ? 'ns-resize' : 'crosshair';
        });
    }

    simulateMouseMove(x, y) {
        // Convert touchpad coordinates to main display coordinates
        const mainDisplay = document.getElementById('mainDisplay');
        if (!mainDisplay) return;
        
        const rect = mainDisplay.getBoundingClientRect();
        const targetX = (x / 100) * rect.width;
        const targetY = (y / 100) * rect.height;
        
        // Find element at position
        const elementAtPosition = document.elementFromPoint(targetX, targetY);
        if (elementAtPosition) {
            // Add hover effect
            elementAtPosition.dispatchEvent(new MouseEvent('mouseenter'));
        }
    }

    simulateClick(x, y, button = 'left') {
        const mainDisplay = document.getElementById('mainDisplay');
        if (!mainDisplay) return;
        
        const rect = mainDisplay.getBoundingClientRect();
        const targetX = (x / 100) * rect.width;
        const targetY = (y / 100) * rect.height;
        
        // Find element at position
        const elementAtPosition = document.elementFromPoint(targetX, targetY);
        if (elementAtPosition) {
            if (button === 'left') {
                elementAtPosition.click();
            } else if (button === 'right') {
                elementAtPosition.dispatchEvent(new MouseEvent('contextmenu', {
                    bubbles: true,
                    cancelable: true
                }));
            }
            
            // Visual feedback
            this.showClickFeedback(targetX, targetY);
        }
    }

    simulateScroll(x, y) {
        const mainDisplay = document.getElementById('mainDisplay');
        if (!mainDisplay) return;
        
        const rect = mainDisplay.getBoundingClientRect();
        const targetX = (x / 100) * rect.width;
        const targetY = (y / 100) * rect.height;
        
        // Scroll based on Y position
        const scrollDirection = y > 50 ? 1 : -1;
        const scrollAmount = Math.abs(y - 50) * 2;
        
        mainDisplay.scrollBy(0, scrollDirection * scrollAmount);
    }

    showClickFeedback(x, y) {
        const feedback = document.createElement('div');
        feedback.className = 'click-feedback';
        feedback.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            border: 2px solid #6366F1;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%) scale(0);
            animation: clickFeedback 0.3s ease-out forwards;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }

    disableVirtualTouchpad() {
        const secondaryDisplay = document.getElementById('secondaryDisplay');
        if (secondaryDisplay) {
            secondaryDisplay.style.display = 'none';
        }
    }

    detectOlderDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const memory = navigator.deviceMemory || 4; // Default to 4GB if not available
        const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores
        
        // Check for specific older devices
        const olderDevices = [
            'sm-g935', // Galaxy S7 Edge
            'sm-g930', // Galaxy S7
            'sm-g925', // Galaxy S6 Edge
            'sm-g920', // Galaxy S6
            'iphone 6',
            'iphone 7',
            'iphone 8'
        ];
        
        const isOlderDevice = olderDevices.some(device => userAgent.includes(device));
        const hasLowMemory = memory < 4;
        const hasLowCores = cores < 4;
        
        return isOlderDevice || hasLowMemory || hasLowCores;
    }

    optimizeForOlderDevices() {
        // Reduce animation complexity
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        
        // Disable expensive effects
        const style = document.createElement('style');
        style.textContent = `
            .app-card {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
            }
            
            .category-card {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
            }
            
            .header {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }
            
            .hero::before {
                display: none !important;
            }
            
            body::before {
                display: none !important;
            }
            
            .app-card:hover {
                transform: translateY(-2px) !important;
                animation: none !important;
            }
            
            .category-card:hover {
                transform: translateY(-2px) !important;
                animation: none !important;
            }
        `;
        document.head.appendChild(style);
        
        // Reduce the number of hot apps displayed on mobile
        if (window.innerWidth <= 768) {
            this.maxHotApps = 5;
        }
        
        // Use requestIdleCallback for non-critical operations
        if ('requestIdleCallback' in window) {
            this.useIdleCallback = true;
        }
    }

    renderAppsOptimized(appsToRender = this.apps) {
        if (this.isOlderDevice && this.useIdleCallback) {
            // Render apps in chunks for better performance
            const chunkSize = 6;
            const chunks = [];
            
            for (let i = 0; i < appsToRender.length; i += chunkSize) {
                chunks.push(appsToRender.slice(i, i + chunkSize));
            }
            
            const appsGrid = document.getElementById('appsGrid');
            if (!appsGrid) return;
            
            appsGrid.innerHTML = '';
            
            chunks.forEach((chunk, index) => {
                requestIdleCallback(() => {
                    const chunkHtml = chunk.map(app => this.createAppCard(app)).join('');
                    appsGrid.insertAdjacentHTML('beforeend', chunkHtml);
                    
                    // Add event listeners for this chunk
                    const newCards = appsGrid.querySelectorAll('.app-card:not([data-listeners])');
                    newCards.forEach((card, cardIndex) => {
                        card.setAttribute('data-listeners', 'true');
                        const downloadBtn = card.querySelector('.download-btn');
                        if (downloadBtn) {
                            downloadBtn.addEventListener('click', (e) => {
                                e.preventDefault();
                                const appIndex = index * chunkSize + cardIndex;
                                if (chunk[cardIndex]) {
                                    this.handleDownload(chunk[cardIndex]);
                                }
                            });
                        }
                    });
                });
            });
        } else {
            this.renderApps(appsToRender);
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
