// Embeddable widget for meniny365.sk
// Shows today's name days with backlink

if (typeof window !== 'undefined') {
  (function() {
    'use strict';
    
    // Get today's date
    const today = new Date();
    const todayStr = today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0');
  
  // Widget configuration
  const config = {
    containerId: 'meniny365-widget',
    apiUrl: 'https://meniny365.sk/api/widget-data',
    theme: 'dark', // or 'light'
    showBacklink: true
  };
  
  // Create widget HTML
  function createWidget(names) {
    const theme = config.theme === 'light' ? 'light' : 'dark';
    const bgColor = theme === 'light' ? '#ffffff' : '#151821';
    const textColor = theme === 'light' ? '#0c1222' : '#eef2ff';
    const brandColor = theme === 'light' ? '#345bff' : '#7aa2ff';
    
    return `
      <div style="
        background: ${bgColor};
        color: ${textColor};
        border: 1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'};
        border-radius: 8px;
        padding: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      ">
        <div style="
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        ">
          <div style="
            width: 24px;
            height: 24px;
            background: ${brandColor};
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
          ">
            <span style="color: white; font-weight: bold; font-size: 12px;">M</span>
          </div>
          <strong style="color: ${brandColor};">meniny365.sk</strong>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-weight: 600; margin-bottom: 4px;">
            Dnes má meniny:
          </div>
          <div style="
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
          ">
            ${names.map(name => `
              <span style="
                background: ${brandColor};
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
              ">${name}</span>
            `).join('')}
          </div>
        </div>
        
        ${config.showBacklink ? `
          <div style="
            border-top: 1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'};
            padding-top: 8px;
            font-size: 12px;
            color: ${theme === 'light' ? '#6b7280' : '#9ca3af'};
          ">
            <a href="https://meniny365.sk/sk" style="
              color: ${brandColor};
              text-decoration: none;
            ">Zobraziť kalendár menín →</a>
          </div>
        ` : ''}
      </div>
    `;
  }
  
  // Load widget data
  function loadWidget() {
    const container = document.getElementById(config.containerId);
    if (!container) return;
    
    // Show loading state
    container.innerHTML = `
      <div style="
        background: #f3f4f6;
        color: #6b7280;
        border-radius: 8px;
        padding: 16px;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        Načítavam meniny...
      </div>
    `;
    
    // For demo purposes, use static data
    // In production, this would fetch from the API
    const demoNames = ['Ján', 'Jana', 'Janka'];
    
    // Simulate API delay
    setTimeout(() => {
      container.innerHTML = createWidget(demoNames);
    }, 500);
  }
  
  // Initialize widget when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWidget);
  } else {
    loadWidget();
  }
  
    // Expose configuration for customization
    window.meniny365 = {
      config: config,
      load: loadWidget
    };
  })();
}
