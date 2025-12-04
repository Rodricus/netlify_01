// Simple privacy-friendly analytics
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Console log for development
    if (import.meta.env.DEV) {
        console.log('[Analytics]', eventName, properties)
        return
    }

    // Send to analytics in production
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, properties)
    }
}

// Predefined event trackers
export const analytics = {
    // Page views
    pageView: (pageName: string) => {
        trackEvent('page_view', { page_name: pageName })
    },

    // Layer interactions
    layerToggled: (layerNumber: number, enabled: boolean) => {
        trackEvent('layer_toggled', { layer_number: layerNumber, enabled })
    },

    layerExpanded: (layerNumber: number) => {
        trackEvent('layer_expanded', { layer_number: layerNumber })
    },

    viewedCode: (layerNumber: number) => {
        trackEvent('viewed_code', { layer_number: layerNumber })
    },

    viewedData: (layerNumber: number) => {
        trackEvent('viewed_data', { layer_number: layerNumber })
    },

    // User actions
    customPromptSubmitted: (promptLength: number) => {
        trackEvent('custom_prompt_submitted', { prompt_length: promptLength })
    },

    compareModeToggled: (enabled: boolean) => {
        trackEvent('compare_mode_toggled', { enabled })
    },

    layerExported: (layerNumber: number) => {
        trackEvent('layer_exported', { layer_number: layerNumber })
    },

    layerShared: (layerNumber: number) => {
        trackEvent('layer_shared', { layer_number: layerNumber })
    },

    // External links
    articleClicked: (location: 'header' | 'intro' | 'footer') => {
        trackEvent('article_clicked', { location })
    },

    socialShareClicked: (platform: 'linkedin' | 'twitter' | 'facebook') => {
        trackEvent('social_share_clicked', { platform })
    },

    // Journey milestones
    completedIntro: () => {
        trackEvent('completed_intro')
    },

    revealedArchitecture: () => {
        trackEvent('revealed_architecture')
    },

    viewedAllLayers: () => {
        trackEvent('viewed_all_layers')
    },

    // Time tracking
    timeSpent: (seconds: number) => {
        trackEvent('time_spent', { seconds })
    }
}
