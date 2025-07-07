// Theme Switcher
document.addEventListener('DOMContentLoaded', function() {
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('cv-theme') || 'default';
    applyTheme(savedTheme);

    // Set the correct radio button
    const savedRadio = document.querySelector(`input[value="${savedTheme}"]`);
    if (savedRadio) {
        savedRadio.checked = true;
    }

    // Listen for theme changes
    themeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                applyTheme(this.value);
                localStorage.setItem('cv-theme', this.value);
            }
        });
    });

    function applyTheme(theme) {
        // Remove all theme classes
        body.classList.remove('theme-default', 'theme-single-line');

        // Add the selected theme class
        if (theme !== 'default') {
            body.classList.add(`theme-${theme}`);
        }

        // Re-render content with new theme
        if (typeof renderCV === 'function') {
            renderCV();
        }
    }
});