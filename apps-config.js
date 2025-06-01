// Apps Configuration
// This file contains all app data and APKPure download links
// To add new apps or modify existing ones, edit the appsData array below

const appsData = [
    {
        id: 'youtube',
        name: 'YouTube',
        developer: 'Google LLC',
        category: 'entertainment',
        rating: 4.1,
        description: 'Enjoy your favorite videos and channels with the official YouTube app.',
        icon: 'fab fa-youtube',
        downloadUrl: 'https://apkpure.com/youtube/com.google.android.youtube/downloading',
        isHot: true,
        badges: ["data-sharing"]
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        developer: 'WhatsApp LLC',
        category: 'social',
        rating: 4.3,
        description: 'Simple. Reliable. Secure messaging and calling for everyone.',
        icon: 'fab fa-whatsapp',
        downloadUrl: 'https://apkpure.com/whatsapp-messenger/com.whatsapp/downloading',
        isHot: true,
        badges: ["data-sharing"]
    },
    {
        id: 'instagram',
        name: 'Instagram',
        developer: 'Instagram',
        category: 'social',
        rating: 4.2,
        description: 'Create and share your photos, stories, and videos with friends.',
        icon: 'fab fa-instagram',
        downloadUrl: 'https://apkpure.com/instagram/com.instagram.android/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        developer: 'TikTok Ltd.',
        category: 'entertainment',
        rating: 4.4,
        description: 'Create short videos with music, filters and new effects.',
        icon: 'fab fa-tiktok',
        downloadUrl: 'https://apkpure.com/tiktok/com.zhiliaoapp.musically/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'spotify',
        name: 'Spotify',
        developer: 'Spotify Ltd.',
        category: 'music',
        rating: 4.3,
        description: 'Play millions of songs and podcasts on your device.',
        icon: 'fab fa-spotify',
        downloadUrl: 'https://apkpure.com/spotify-music-and-podcasts/com.spotify.music/downloading'
    },
    {
        id: 'facebook',
        name: 'Facebook',
        developer: 'Meta Platforms, Inc.',
        category: 'social',
        rating: 3.9,
        description: 'Connect with friends, family and people who share your interests.',
        icon: 'fab fa-facebook',
        downloadUrl: 'https://apkpure.com/facebook/com.facebook.katana/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'telegram',
        name: 'Telegram',
        developer: 'Telegram FZ-LLC',
        category: 'social',
        rating: 4.5,
        description: 'Fast and secure messaging app with powerful features.',
        icon: 'fab fa-telegram',
        downloadUrl: 'https://apkpure.com/telegram/org.telegram.messenger/downloading'
    },
    {
        id: 'netflix',
        name: 'Netflix',
        developer: 'Netflix, Inc.',
        category: 'entertainment',
        rating: 4.2,
        description: 'Watch TV series, movies and more on your mobile device.',
        icon: 'fas fa-film',
        downloadUrl: 'https://apkpure.com/netflix/com.netflix.mediaclient/downloading'
    },
    {
        id: 'uber',
        name: 'Uber',
        developer: 'Uber Technologies, Inc.',
        category: 'productivity',
        rating: 4.1,
        description: 'Request a ride, hop in, and go anywhere you want.',
        icon: 'fab fa-uber',
        downloadUrl: 'https://apkpure.com/uber/com.ubercab/downloading'
    },
    {
        id: 'pubg',
        name: 'PUBG Mobile',
        developer: 'PUBG Corporation',
        category: 'games',
        rating: 4.0,
        description: 'The most intense free-to-play multiplayer action on mobile.',
        icon: 'fas fa-crosshairs',
        downloadUrl: 'https://apkpure.com/pubg-mobile/com.tencent.ig/downloading'
    },
    {
        id: 'zoom',
        name: 'Zoom',
        developer: 'Zoom Video Communications',
        category: 'productivity',
        rating: 4.1,
        description: 'Video conferencing, web conferencing, online meetings.',
        icon: 'fas fa-video',
        downloadUrl: 'https://apkpure.com/zoom-cloud-meetings/us.zoom.videomeetings/downloading'
    },
    {
        id: 'X',
        name: 'X',
        developer: 'X Inc.',
        category: 'social',
        rating: 3.8,
        description: 'Join the conversation about what you care about.',
        icon: 'fab fa-twitter',
        downloadUrl: 'https://apkpure.com/twitter/com.twitter.android/downloading'
    },
    {
        id: 'discord',
        name: 'Discord',
        developer: 'Discord Inc.',
        category: 'social',
        rating: 4.2,
        description: 'Chat, hang out, and stay close with your friends and communities.',
        icon: 'fab fa-discord',
        downloadUrl: 'https://apkpure.com/discord-talk-video-chat/com.discord/downloading'
    },
    {
        id: 'amazon',
        name: 'Amazon Shopping',
        developer: 'Amazon Mobile LLC',
        category: 'productivity',
        rating: 4.3,
        description: 'Browse, search, get product details, read reviews, and purchase.',
        icon: 'fab fa-amazon',
        downloadUrl: 'https://apkpure.com/amazon-shopping/com.amazon.mshop.android.shopping/downloading'
    },
    {
        id: 'vsco',
        name: 'VSCO',
        developer: 'VSCO',
        category: 'photography',
        rating: 4.2,
        description: 'Photo and video editing with filters and tools.',
        icon: 'fas fa-camera-retro',
        downloadUrl: 'https://apkpure.com/vsco-photo-video-editor/com.vsco.cam/downloading'
    },
    {
        id: 'snapchat',
        name: 'Snapchat',
        developer: 'Snap Inc',
        category: 'social',
        rating: 4.0,
        description: 'Share the moment with your friends and family.',
        icon: 'fab fa-snapchat',
        downloadUrl: 'https://apkpure.com/snapchat/com.snapchat.android/downloading'
    },
    {
        id: 'pinterest',
        name: 'Pinterest',
        developer: 'Pinterest',
        category: 'social',
        rating: 4.4,
        description: 'Discover recipes, home ideas, style inspiration and more.',
        icon: 'fab fa-pinterest',
        downloadUrl: 'https://apkpure.com/pinterest/com.pinterest/downloading'
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        developer: 'LinkedIn Corporation',
        category: 'productivity',
        rating: 4.1,
        description: 'Professional network to advance your career.',
        icon: 'fab fa-linkedin',
        downloadUrl: 'https://apkpure.com/linkedin/com.linkedin.android/downloading'
    },
    {
        id: 'adobe-photoshop',
        name: 'Adobe Photoshop Express',
        developer: 'Adobe Inc.',
        category: 'photography',
        rating: 4.3,
        description: 'Photo editing and collage making app.',
        icon: 'fas fa-palette',
        downloadUrl: 'https://apkpure.com/adobe-photoshop-express/com.adobe.psmobile/downloading'
    },
    {
        id: 'canva',
        name: 'Canva',
        developer: 'Canva',
        category: 'productivity',
        rating: 4.5,
        description: 'Design anything. Publish anywhere.',
        icon: 'fas fa-paint-brush',
        downloadUrl: 'https://apkpure.com/canva-design-photo-video/com.canva.editor/downloading'
    },
    {
        id: 'roblox',
        name: 'Roblox',
        developer: 'Roblox Corporation',
        category: 'games',
        rating: 4.4,
        description: 'Join millions of people and discover an infinite variety of immersive experiences.',
        icon: 'fas fa-cube',
        downloadUrl: 'https://apkpure.com/roblox/com.roblox.client/downloading',
        isHot: true
    },
    {
        id: 'gmail',
        name: 'Gmail',
        developer: 'Google LLC',
        category: 'productivity',
        rating: 4.2,
        description: 'Fast, secure, and up to 15 GB of storage for your emails.',
        icon: 'fas fa-envelope',
        downloadUrl: 'https://apkpure.com/gmail/com.google.android.gm/downloading',
        isHot: true,
        badges: ["data-sharing"]
    },
    {
        id: 'outlook',
        name: 'Microsoft Outlook',
        developer: 'Microsoft Corporation',
        category: 'productivity',
        rating: 4.1,
        description: 'Easily organize your inbox and schedule. Connect across devices.',
        icon: 'fab fa-microsoft',
        downloadUrl: 'https://apkpure.com/microsoft-outlook/com.microsoft.office.outlook/downloading'
    },
    {
        id: 'tiktok-lite',
        name: 'TikTok Lite',
        developer: 'TikTok Ltd.',
        category: 'entertainment',
        rating: 4.3,
        description: 'Lighter version of TikTok for creating and sharing short videos.',
        icon: 'fab fa-tiktok',
        downloadUrl: 'https://apkpure.com/tiktok-lite/com.zhiliaoapp.musically.go/downloading',
        isHot: true
    },
    {
        id: 'google-chrome',
        name: 'Google Chrome',
        developer: 'Google LLC',
        category: 'productivity',
        rating: 4.0,
        description: 'Fast, secure web browser with Google services integration.',
        icon: 'fab fa-chrome',
        downloadUrl: 'https://apkpure.com/chrome-browser/com.android.chrome/downloading'
    },
    {
        id: 'among-us',
        name: 'Among Us',
        developer: 'InnerSloth LLC',
        category: 'games',
        rating: 4.2,
        description: 'Find the impostor among your crewmates in this social deduction game.',
        icon: 'fas fa-user-secret',
        downloadUrl: 'https://apkpure.com/among-us/com.innersloth.spacemafia/downloading',
        isHot: true
    },
    {
        id: 'google-maps',
        name: 'Google Maps',
        developer: 'Google LLC',
        category: 'productivity',
        rating: 4.3,
        description: 'Navigate with real-time traffic updates and explore places.',
        icon: 'fas fa-map-marked-alt',
        downloadUrl: 'https://apkpure.com/google-maps/com.google.android.apps.maps/downloading'
    },
    {
        id: 'viber',
        name: 'Viber',
        developer: 'Viber Media S.à r.l.',
        category: 'social',
        rating: 4.1,
        description: 'Free messaging and calling app with end-to-end encryption.',
        icon: 'fab fa-viber',
        downloadUrl: 'https://apkpure.com/viber-messenger/com.viber.voip/downloading'
    },
    {
        id: 'skype',
        name: 'Skype',
        developer: 'Microsoft Corporation',
        category: 'social',
        rating: 4.0,
        description: 'Video calling and messaging for staying connected worldwide.',
        icon: 'fab fa-skype',
        downloadUrl: 'https://apkpure.com/skype/com.skype.raider/downloading',
        badges: ["unstable"]
    },
    {
        id: 'clash-of-clans',
        name: 'Clash of Clans',
        developer: 'Supercell',
        category: 'games',
        rating: 4.5,
        description: 'Build your village, raise an army, and battle with millions of players.',
        icon: 'fas fa-shield-alt',
        downloadUrl: 'https://apkpure.com/clash-of-clans/com.supercell.clashofclans/downloading',
        isHot: true
    },
    {
        id: 'google-drive',
        name: 'Google Drive',
        developer: 'Google LLC',
        category: 'productivity',
        rating: 4.2,
        description: 'Store, sync, and share files across all your devices.',
        icon: 'fab fa-google-drive',
        downloadUrl: 'https://apkpure.com/google-drive/com.google.android.apps.docs/downloading'
    },
    {
        id: 'candy-crush-saga',
        name: 'Candy Crush Saga',
        developer: 'King',
        category: 'games',
        rating: 4.3,
        description: 'Match three candies to progress through hundreds of levels.',
        icon: 'fas fa-candy-cane',
        downloadUrl: 'https://apkpure.com/candy-crush-saga/com.king.candycrushsaga/downloading'
    },
    {
        id: 'microsoft-word',
        name: 'Microsoft Word',
        developer: 'Microsoft Corporation',
        category: 'productivity',
        rating: 4.1,
        description: 'Create, edit, and share documents on the go.',
        icon: 'fas fa-file-word',
        downloadUrl: 'https://apkpure.com/microsoft-word/com.microsoft.office.word/downloading'
    },
    {
        id: 'google-photos',
        name: 'Google Photos',
        developer: 'Google LLC',
        category: 'photography',
        rating: 4.2,
        description: 'Backup photos and videos with 15GB of free storage.',
        icon: 'fas fa-images',
        downloadUrl: 'https://apkpure.com/google-photos/com.google.android.apps.photos/downloading'
    },
    {
        id: 'minecraft',
        name: 'Minecraft',
        developer: 'Mojang',
        category: 'games',
        rating: 4.4,
        description: 'Build, explore, and survive in infinite worlds.',
        icon: 'fas fa-cubes',
        downloadUrl: 'https://apkpure.com/minecraft/com.mojang.minecraftpe/downloading',
        isHot: true
    },
    {
        id: 'wechat',
        name: 'WeChat',
        developer: 'Tencent',
        category: 'social',
        rating: 4.0,
        description: 'All-in-one communication app with messaging, calling, and payments.',
        icon: 'fab fa-weixin',
        downloadUrl: 'https://apkpure.com/wechat/com.tencent.mm/downloading'
    },
    {
        id: 'clash-royale',
        name: 'Clash Royale',
        developer: 'Supercell',
        category: 'games',
        rating: 4.3,
        description: 'Real-time strategy battles with cards from the Clash universe.',
        icon: 'fas fa-crown',
        downloadUrl: 'https://apkpure.com/clash-royale/com.supercell.clashroyale/downloading'
    },
    {
        id: 'google-translate',
        name: 'Google Translate',
        developer: 'Google LLC',
        category: 'productivity',
        rating: 4.3,
        description: 'Translate text, speech, images, or conversations in over 100 languages.',
        icon: 'fas fa-language',
        downloadUrl: 'https://apkpure.com/google-translate/com.google.android.apps.translate/downloading'
    },
    {
        id: 'opera-browser',
        name: 'Opera Browser',
        developer: 'Opera',
        category: 'productivity',
        rating: 4.2,
        description: 'Fast browser with built-in VPN, ad blocker, and crypto wallet.',
        icon: 'fab fa-opera',
        downloadUrl: 'https://apkpure.com/opera-browser/com.opera.browser/downloading'
    },
    {
        id: 'google-authenticator',
        name: 'Google Authenticator',
        developer: 'Google LLC',
        category: 'productivity',
        rating: 4.2,
        description: 'Generate verification codes for 2-step verification.',
        icon: 'fas fa-shield-alt',
        downloadUrl: 'https://apkpure.com/google-authenticator/com.google.android.apps.authenticator2/downloading',
        isHot: true
    },
    {
        id: 'discord',
        name: 'Discord',
        developer: 'Discord Inc.',
        category: 'social',
        rating: 4.3,
        description: 'Chat, hang out, and stay close with your friends and communities.',
        icon: 'fab fa-discord',
        downloadUrl: 'https://apkpure.com/discord-chat-talk-hangout/com.discord/downloading',
        isHot: true
    },
    {
        id: 'telegram',
        name: 'Telegram',
        developer: 'Telegram FZ-LLC',
        category: 'social',
        rating: 4.4,
        description: 'Fast, secure messaging with cloud storage.',
        icon: 'fab fa-telegram',
        downloadUrl: 'https://apkpure.com/telegram/org.telegram.messenger/downloading',
        isHot: true
    },
    {
        id: 'nova-launcher',
        name: 'Nova Launcher',
        developer: 'TeslaCoil Software',
        category: 'productivity',
        rating: 4.5,
        description: 'Highly customizable home screen replacement.',
        icon: 'fas fa-rocket',
        downloadUrl: 'https://apkpure.com/nova-launcher/com.teslacoilsw.launcher/downloading'
    },
    {
        id: '1password',
        name: '1Password',
        developer: 'AgileBits Inc.',
        category: 'productivity',
        rating: 4.6,
        description: 'Password manager for secure digital life.',
        icon: 'fas fa-key',
        downloadUrl: 'https://apkpure.com/1password/com.onepassword.android/downloading'
    },
    {
        id: 'pubg-mobile',
        name: 'PUBG Mobile',
        developer: 'PUBG Corporation',
        category: 'games',
        rating: 4.2,
        description: 'Battle royale game with realistic graphics.',
        icon: 'fas fa-crosshairs',
        downloadUrl: 'https://apkpure.com/pubg-mobile/com.tencent.ig/downloading',
        isHot: true
    },


    {
        id: 'reddit',
        name: 'Reddit',
        developer: 'Reddit Inc.',
        category: 'social',
        rating: 4.2,
        description: 'The front page of the internet. Join communities and discussions.',
        icon: 'fab fa-reddit',
        downloadUrl: 'https://apkpure.com/reddit/com.reddit.frontpage/downloading'
    },

    {
        id: 'evernote',
        name: 'Evernote',
        developer: 'Evernote Corporation',
        category: 'productivity',
        rating: 4.0,
        description: 'Note-taking and organization app for your ideas.',
        icon: 'fas fa-sticky-note',
        downloadUrl: 'https://apkpure.com/evernote/com.evernote/downloading'
    },

    {
        id: 'duolingo',
        name: 'Duolingo',
        developer: 'Duolingo',
        category: 'productivity',
        rating: 4.5,
        description: 'Learn languages for free with fun, bite-sized lessons.',
        icon: 'fas fa-graduation-cap',
        downloadUrl: 'https://apkpure.com/duolingo/com.duolingo/downloading',
        isHot: true
    },
    {
        id: 'twitch',
        name: 'Twitch',
        developer: 'Twitch Interactive, Inc.',
        category: 'entertainment',
        rating: 4.2,
        description: 'Watch live streams and connect with your favorite creators.',
        icon: 'fab fa-twitch',
        downloadUrl: 'https://apkpure.com/twitch/tv.twitch.android.app/downloading'
    },
    {
        id: 'microsoft-teams',
        name: 'Microsoft Teams',
        developer: 'Microsoft Corporation',
        category: 'productivity',
        rating: 4.0,
        description: 'Collaborate and communicate with your team.',
        icon: 'fas fa-users',
        downloadUrl: 'https://apkpure.com/microsoft-teams/com.microsoft.teams/downloading'
    },

    {
        id: 'kaspersky',
        name: 'Kaspersky Mobile Antivirus',
        developer: 'Kaspersky Lab',
        category: 'productivity',
        rating: 4.3,
        description: 'Protect your device from viruses and malware.',
        icon: 'fas fa-shield-virus',
        downloadUrl: 'https://apkpure.com/kaspersky-mobile-antivirus/com.kms.free/downloading'
    },
    {
        id: 'wps-office',
        name: 'WPS Office',
        developer: 'Kingsoft Office Software',
        category: 'productivity',
        rating: 4.3,
        description: 'Complete office suite with word, excel, and powerpoint.',
        icon: 'fas fa-file-alt',
        downloadUrl: 'https://apkpure.com/wps-office/cn.wps.moffice_eng/downloading'
    },
    {
        id: 'truecaller',
        name: 'Truecaller',
        developer: 'True Software Scandinavia AB',
        category: 'productivity',
        rating: 4.1,
        description: 'Identify unknown callers and block spam calls.',
        icon: 'fas fa-phone',
        downloadUrl: 'https://apkpure.com/truecaller/com.truecaller/downloading'
    },

    {
        id: 'apple-music',
        name: 'Apple Music',
        developer: 'Apple Inc.',
        category: 'music',
        rating: 4.1,
        description: 'Stream over 100 million songs ad-free.',
        icon: 'fab fa-apple',
        downloadUrl: 'https://apkpure.com/apple-music/com.apple.android.music/downloading'
    },
    {
        id: 'soundcloud',
        name: 'SoundCloud',
        developer: 'SoundCloud',
        category: 'music',
        rating: 4.2,
        description: 'Discover and stream music from emerging artists.',
        icon: 'fab fa-soundcloud',
        downloadUrl: 'https://apkpure.com/soundcloud/com.soundcloud.android/downloading'
    },

    {
        id: 'khan-academy',
        name: 'Khan Academy',
        developer: 'Khan Academy',
        category: 'productivity',
        rating: 4.5,
        description: 'Free education platform for learning various subjects.',
        icon: 'fas fa-book-open',
        downloadUrl: 'https://apkpure.com/khan-academy/org.khanacademy.android/downloading'
    },
    {
        id: 'chrome-browser',
        name: 'Chrome Browser',
        developer: 'Google LLC',
        category: 'productivity',
        rating: 4.1,
        description: 'Fast, secure web browser with Google services integration.',
        icon: 'fab fa-chrome',
        downloadUrl: 'https://apkpure.com/chrome-browser/com.android.chrome/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'firefox',
        name: 'Firefox Browser',
        developer: 'Mozilla',
        category: 'productivity',
        rating: 4.3,
        description: 'Fast, private & safe web browser that blocks trackers.',
        icon: 'fab fa-firefox',
        downloadUrl: 'https://apkpure.com/firefox-browser/org.mozilla.firefox/downloading'
    },
    {
        id: 'youtube-music',
        name: 'YouTube Music',
        developer: 'Google LLC',
        category: 'music',
        rating: 4.2,
        description: 'Stream music and discover new favorites.',
        icon: 'fab fa-youtube',
        downloadUrl: 'https://apkpure.com/youtube-music/com.google.android.apps.youtube.music/downloading',
        badges: ["data-sharing"],
        isHot: true
    },
    {
        id: 'amazon-prime-video',
        name: 'Amazon Prime Video',
        developer: 'Amazon Mobile LLC',
        category: 'entertainment',
        rating: 4.0,
        description: 'Watch movies, TV shows and original content.',
        icon: 'fab fa-amazon',
        downloadUrl: 'https://apkpure.com/amazon-prime-video/com.amazon.avod.thirdpartyclient/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'disney-plus',
        name: 'Disney+',
        developer: 'Disney',
        category: 'entertainment',
        rating: 4.1,
        description: 'Stream Disney, Pixar, Marvel, Star Wars & National Geographic.',
        icon: 'fas fa-play-circle',
        downloadUrl: 'https://apkpure.com/disney/com.disney.disneyplus/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'hbo-max',
        name: 'HBO Max',
        developer: 'WarnerMedia Direct, LLC',
        category: 'entertainment',
        rating: 4.0,
        description: 'Stream HBO, Warner Bros movies and Max Originals.',
        icon: 'fas fa-film',
        downloadUrl: 'https://apkpure.com/hbo-max/com.hbo.hbonow/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'call-of-duty-mobile',
        name: 'Call of Duty Mobile',
        developer: 'Activision Publishing',
        category: 'games',
        rating: 4.2,
        description: 'Free-to-play first-person shooter mobile game.',
        icon: 'fas fa-crosshairs',
        downloadUrl: 'https://apkpure.com/call-of-duty-mobile/com.activision.callofduty.shooter/downloading',
        isHot: true
    },
    {
        id: 'free-fire',
        name: 'Free Fire',
        developer: 'Garena International I',
        category: 'games',
        rating: 4.1,
        description: 'Ultimate survival shooter game for mobile.',
        icon: 'fas fa-fire',
        downloadUrl: 'https://apkpure.com/free-fire/com.dts.freefireth/downloading',
        isHot: true
    },
    {
        id: 'mobile-legends',
        name: 'Mobile Legends',
        developer: 'Moonton',
        category: 'games',
        rating: 4.3,
        description: 'Classic MOBA game reimagined for mobile.',
        icon: 'fas fa-sword',
        downloadUrl: 'https://apkpure.com/mobile-legends-bang-bang/com.mobile.legends/downloading',
        isHot: true
    },
    {
        id: 'genshin-impact',
        name: 'Genshin Impact',
        developer: 'miHoYo Limited',
        category: 'games',
        rating: 4.4,
        description: 'Open-world action RPG with stunning visuals.',
        icon: 'fas fa-magic',
        downloadUrl: 'https://apkpure.com/genshin-impact/com.miHoYo.GenshinImpact/downloading',
        isHot: true
    },
    {
        id: 'brawl-stars',
        name: 'Brawl Stars',
        developer: 'Supercell',
        category: 'games',
        rating: 4.3,
        description: 'Fast-paced 3v3 multiplayer and battle royale.',
        icon: 'fas fa-star',
        downloadUrl: 'https://apkpure.com/brawl-stars/com.supercell.brawlstars/downloading',
        isHot: true
    },
    {
        id: 'garena-free-fire-max',
        name: 'Free Fire MAX',
        developer: 'Garena International I',
        category: 'games',
        rating: 4.2,
        description: 'Enhanced version of Free Fire with better graphics.',
        icon: 'fas fa-fire-flame-curved',
        downloadUrl: 'https://apkpure.com/free-fire-max/com.dts.freefiremax/downloading',
        isHot: true
    },
    {
        id: 'valorant-mobile',
        name: 'VALORANT Mobile',
        developer: 'Riot Games',
        category: 'games',
        rating: 4.1,
        description: 'Tactical 5v5 character-based shooter.',
        icon: 'fas fa-bullseye',
        downloadUrl: 'https://apkpure.com/valorant-mobile/com.riotgames.valorantmobile/downloading',
        badges: ["unstable"]
    },
    {
        id: 'facebook-messenger',
        name: 'Messenger',
        developer: 'Meta Platforms, Inc.',
        category: 'social',
        rating: 4.0,
        description: 'Free messaging app to connect with friends.',
        icon: 'fab fa-facebook-messenger',
        downloadUrl: 'https://apkpure.com/messenger/com.facebook.orca/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'google-meet',
        name: 'Google Meet',
        developer: 'Google LLC',
        category: 'productivity',
        rating: 4.1,
        description: 'Video calling and conferencing for everyone.',
        icon: 'fas fa-video',
        downloadUrl: 'https://apkpure.com/google-meet/com.google.android.apps.meetings/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'adobe-lightroom',
        name: 'Adobe Lightroom',
        developer: 'Adobe Inc.',
        category: 'photography',
        rating: 4.3,
        description: 'Professional photo editing and organizing.',
        icon: 'fas fa-image',
        downloadUrl: 'https://apkpure.com/adobe-lightroom/com.adobe.lrmobile/downloading'
    },
    {
        id: 'picsart',
        name: 'PicsArt',
        developer: 'PicsArt, Inc.',
        category: 'photography',
        rating: 4.2,
        description: 'Photo and video editor with creative tools.',
        icon: 'fas fa-palette',
        downloadUrl: 'https://apkpure.com/picsart-photo-video-editor/com.picsart.studio/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'snapseed',
        name: 'Snapseed',
        developer: 'Google LLC',
        category: 'photography',
        rating: 4.4,
        description: 'Professional photo editor with precise control.',
        icon: 'fas fa-camera',
        downloadUrl: 'https://apkpure.com/snapseed/com.niksoftware.snapseed/downloading'
    }
    {
        id: 'google-calendar',
        name: 'Google Calendar',
        developer: 'Google LLC',
        category: 'productivity',
        rating: 4.2,
        description: 'Organize your schedule and share events.',
        icon: 'fas fa-calendar',
        downloadUrl: 'https://apkpure.com/google-calendar/com.google.android.calendar/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'google-assistant',
        name: 'Google Assistant',
        developer: 'Google LLC',
        category: 'productivity',
        rating: 4.1,
        description: 'Your personal Google Assistant.',
        icon: 'fas fa-microphone',
        downloadUrl: 'https://apkpure.com/google-assistant/com.google.android.apps.googleassistant/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'mi-remote',
        name: 'Mi Remote controller',
        developer: 'Xiaomi Inc.',
        category: 'productivity',
        rating: 4.2,
        description: 'Universal remote control for home appliances.',
        icon: 'fas fa-tv',
        downloadUrl: 'https://apkpure.com/mi-remote-controller/com.duokan.phone.remotecontroller/downloading'
    },
    {
        id: 'es-file-explorer',
        name: 'ES File Explorer',
        developer: 'ES Global',
        category: 'productivity',
        rating: 4.0,
        description: 'All-in-one file manager and free local and cloud storage.',
        icon: 'fas fa-folder',
        downloadUrl: 'https://apkpure.com/es-file-explorer/com.estrongs.android.pop/downloading',
        badges: ["data-sharing"]
    },
    {
        id: 'mx-player',
        name: 'MX Player',
        developer: 'MX Media',
        category: 'entertainment',
        rating: 4.2,
        description: 'Powerful video player with advanced features.',
        icon: 'fas fa-play',
        downloadUrl: 'https://apkpure.com/mx-player/com.mxtech.videoplayer.ad/downloading'
    },
    {
        id: 'vlc-player',
        name: 'VLC for Android',
        developer: 'VideoLAN',
        category: 'entertainment',
        rating: 4.3,
        description: 'Free multimedia player for all formats.',
        icon: 'fas fa-play-circle',
        downloadUrl: 'https://apkpure.com/vlc-for-android/org.videolan.vlc/downloading'
    }
];

// Category definitions
const categories = {
    social: { name: 'Social', icon: 'fas fa-users' },
    entertainment: { name: 'Entertainment', icon: 'fas fa-play-circle' },
    games: { name: 'Games', icon: 'fas fa-gamepad' },
    productivity: { name: 'Productivity', icon: 'fas fa-briefcase' },
    photography: { name: 'Photography', icon: 'fas fa-camera' },
    music: { name: 'Music', icon: 'fas fa-music' }
};

// Export for use in other files
window.appsData = appsData;
window.categories = categories;

    // Badge definitions
window.badgeTypes = {
    "data-sharing": {
        icon: "🌐",
        name: "Data sharing app",
        reason: "The following app is giving and sharing data with servers (unsecured)."
    },
    "unstable": {
        icon: "⚠️",
        name: "Unstable App",
        reason: "App is unstable or may not work at all."
    }
};