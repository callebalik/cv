// CV Data Loader - simplified version using embedded data
class CVDataLoader {
    constructor(data) {
        this.data = data || [];
    }

    getDataBySection(section) {
        return this.data.filter(item => item.section === section);
    }

    getPersonalData() {
        return this.getDataBySection('personal')[0];
    }

    getEducationData() {
        return this.getDataBySection('education');
    }

    getWorkData() {
        return this.getDataBySection('work');
    }

    getResearchData() {
        return this.getDataBySection('research');
    }

    getContactData() {
        return this.getDataBySection('contact');
    }
}

// CV Renderer
class CVRenderer {
    constructor(dataLoader) {
        this.dataLoader = dataLoader;
    }

    renderName() {
        const personalData = this.dataLoader.getPersonalData();
        if (personalData) {
            document.querySelector('.name').textContent = personalData.title;
        }
    }

    renderEducation() {
        const educationData = this.dataLoader.getEducationData();
        const container = document.querySelector('#education .section-content');
        if (!container) return;

        container.innerHTML = '';
        educationData.forEach(item => {
            const entry = document.createElement('div');
            entry.className = 'entry';
            entry.innerHTML = `
                <div class="entry-header">
                    <div class="entry-title">${item.title}</div>
                    <div class="entry-date">${item.date}</div>
                </div>
                <div class="entry-institution">${item.institution}</div>
            `;
            container.appendChild(entry);
        });
    }

    renderWork() {
        const workData = this.dataLoader.getWorkData();
        const container = document.querySelector('#work .section-content');
        if (!container) return;

        container.innerHTML = '';
        workData.forEach(item => {
            const entry = document.createElement('div');
            entry.className = 'entry';
            entry.innerHTML = `
                <div class="entry-header">
                    <div class="entry-title">${item.title}</div>
                    <div class="entry-date">${item.date}</div>
                </div>
                <div class="entry-institution">${item.institution}</div>
            `;
            container.appendChild(entry);
        });
    }

    renderResearch() {
        const researchData = this.dataLoader.getResearchData();
        const container = document.querySelector('#research .section-content');
        if (!container) return;

        container.innerHTML = '';
        researchData.forEach(item => {
            const entry = document.createElement('div');
            entry.className = 'research-entry';

            let titleHtml = item.title;
            if (item.title.length > 60) {
                titleHtml = item.title.replace(/\s+/g, ' ').replace(/(.{60}[^\s]*)\s/g, '$1<br>');
            }

            let entryHtml = `
                <div class="research-header">
                    <div class="research-type">${item.description}</div>
                    <div class="research-year">${item.date}</div>
                </div>
                <div class="research-title">${titleHtml}</div>
            `;

            if (item.reference) {
                entryHtml += `<div class="research-reference">Referens: <em>${item.reference}</em></div>`;
            }

            entry.innerHTML = entryHtml;
            container.appendChild(entry);
        });
    }

    renderContact() {
        const contactData = this.dataLoader.getContactData();
        const container = document.querySelector('#contact .contact-list');
        if (!container) return;

        container.innerHTML = '';
        contactData.forEach(item => {
            const li = document.createElement('li');
            let label = '';
            if (item.category === 'email') label = 'Epost: ';
            if (item.category === 'address') label = 'Adress: ';
            if (item.category === 'phone') label = 'Telefon: ';

            li.textContent = label + item.title;
            container.appendChild(li);
        });
    }

    renderAll() {
        this.renderName();
        this.renderEducation();
        this.renderWork();
        this.renderResearch();
        this.renderContact();
    }
}

// Portrait enlargement functionality
class PortraitEnlarger {
    constructor() {
        this.portrait = document.querySelector('.portrait');
        this.overlay = document.querySelector('#portraitOverlay');
        this.isEnlarged = false;
        this.init();
    }

    init() {
        if (this.portrait && this.overlay) {
            this.portrait.addEventListener('click', () => this.toggleEnlarged());
            this.overlay.addEventListener('click', () => this.closeEnlarged());
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isEnlarged) {
                    this.closeEnlarged();
                }
            });
        }
    }

    toggleEnlarged() {
        if (this.isEnlarged) {
            this.closeEnlarged();
        } else {
            this.openEnlarged();
        }
    }    openEnlarged() {
        // Create enlarged image element
        const enlargedImg = document.createElement('img');
        enlargedImg.src = '../assets/portrait.png';
        enlargedImg.classList.add('portrait-enlarged');
        enlargedImg.alt = 'Carl Ollvik Aasa';
        
        // Show overlay and enlarged image
        this.overlay.classList.add('active');
        this.overlay.appendChild(enlargedImg);
        this.isEnlarged = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeEnlarged() {
        // Remove enlarged image
        const enlargedImg = this.overlay.querySelector('.portrait-enlarged');
        if (enlargedImg) {
            enlargedImg.remove();
        }
        
        // Hide overlay
        this.overlay.classList.remove('active');
        this.isEnlarged = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Check if cvData is available (loaded from cv-data.js)
    if (typeof cvData !== 'undefined') {
        const dataLoader = new CVDataLoader(cvData);
        const renderer = new CVRenderer(dataLoader);
        renderer.renderAll();
        console.log('CV data loaded successfully');
    } else {
        console.error('CV data not found. Make sure cv-data.js is loaded.');
    }

    // Initialize portrait enlarger
    new PortraitEnlarger();
});