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
    }    renderEducation() {
        const educationData = this.dataLoader.getEducationData();
        const container = document.querySelector('#education .section-content');
        if (!container) return;

        container.innerHTML = '';
        educationData.forEach(item => {
            const entry = document.createElement('div');
            entry.className = 'entry';

            // Check if single-line theme is active
            if (document.body.classList.contains('theme-single-line')) {
                entry.innerHTML = `
                    <div class="entry-header">
                        <span class="entry-title">${item.title}</span>
                        <span class="entry-institution">${item.institution}</span>
                        <span class="entry-date">${item.date}</span>
                    </div>
                `;
            } else {
                // Default layout
                entry.innerHTML = `
                    <div class="entry-header">
                        <div class="entry-title">${item.title}</div>
                        <div class="entry-date">${item.date}</div>
                    </div>
                    <div class="entry-institution">${item.institution}</div>
                `;
            }

            container.appendChild(entry);
        });
    }    renderWork() {
        const workData = this.dataLoader.getWorkData();
        const container = document.querySelector('#work .section-content');
        if (!container) return;

        container.innerHTML = '';
        workData.forEach(item => {
            const entry = document.createElement('div');
            entry.className = 'entry';

            // Check if single-line theme is active
            if (document.body.classList.contains('theme-single-line')) {
                entry.innerHTML = `
                    <div class="entry-header">
                        <span class="entry-title">${item.title}</span>
                        <span class="entry-institution">${item.institution}</span>
                        <span class="entry-date">${item.date}</span>
                    </div>
                `;
            } else {
                // Default layout
                entry.innerHTML = `
                    <div class="entry-header">
                        <div class="entry-title">${item.title}</div>
                        <div class="entry-date">${item.date}</div>
                    </div>
                    <div class="entry-institution">${item.institution}</div>
                `;
            }

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

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Check if cvData is available (loaded from cv-data.js)
    if (typeof cvData !== 'undefined') {
        const dataLoader = new CVDataLoader(cvData);
        globalRenderer = new CVRenderer(dataLoader);
        globalRenderer.renderAll();
        console.log('CV data loaded successfully');
    } else {
        console.error('CV data not found. Make sure cv-data.js is loaded.');
    }
});

// Global variables for renderer instance
let globalRenderer = null;

// Add a global render function
function renderCV() {
    if (globalRenderer) {
        globalRenderer.renderAll();
    }
}