class Main {
    init() {
        this.menuLinksWrapper = document.querySelector('.menu-links-wrapper');
        this.body = document.querySelector('body');
        this.rootElement = document.documentElement;
        
        this.getNavData();
        this.bindEvents();
    }

    bindEvents() {
        const menuBtn = document.querySelector('.menu-button');
        const closeBtn = document.querySelector('.menu-top-button--right');
        const backToTopText = document.querySelector('.back-to-top-button-text');
        const backToTopIcon = document.querySelector('.back-to-top-button-icon');

        closeBtn.addEventListener('click', () => {
            if (this.menuLinksWrapper.classList.contains('is-active')) {
                this.menuLinksWrapper.classList.remove('is-active');
            }

            if (this.body.classList.contains('menu-open')) {
                this.body.classList.remove('menu-open');
            }
        });

        menuBtn.addEventListener('click', () => {
            if (!this.menuLinksWrapper.classList.contains('is-active')) {
                this.menuLinksWrapper.classList.add('is-active');
            }

            if (!this.body.classList.contains('menu-open')) {
                this.body.classList.add('menu-open');
            }
        });

        backToTopText.addEventListener('click', () => {
            this.rootElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        backToTopIcon.addEventListener('click', () => {
            this.rootElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    getNavData() {
        this.getJson()
            .then((response) => {
                this.buildNav(response);
                this.buildMenuNav(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    buildNav(data) {
        const wrapper = document.querySelector('.navigation-links');
        
        data.navigation.forEach((element, i) => {
            if (i <= 2) {
                const navElement = document.createElement('li');
                const navElementAnchor = document.createElement('a');
                const navElementAnchorSpan = document.createElement('span');
                const navElementAnchorText = document.createTextNode(element.name);

                navElementAnchor.classList.add('navigation-link');

                navElementAnchorSpan.appendChild(navElementAnchorText);
                navElementAnchor.appendChild(navElementAnchorSpan);
                navElementAnchor.href = element.url;
                navElement.appendChild(navElementAnchor);
                wrapper.appendChild(navElement);
            }
        });
    }

    buildMenuNav(data) {
        const menuLinks = document.querySelector('.menu-links');

        data.navigation.forEach((element, i) => {
            const navElement = document.createElement('li');
            const navElementAnchor = document.createElement('a');
            const navElementAnchorSpan = document.createElement('span');
            const navElementAnchorText = document.createTextNode(element.name);

            navElementAnchor.classList.add('menu-navigation-link');

            navElementAnchorSpan.appendChild(navElementAnchorText);
            navElementAnchor.appendChild(navElementAnchorSpan);
            navElementAnchor.href = element.url;
            navElement.appendChild(navElementAnchor);
            menuLinks.appendChild(navElement);
        });
    }

    async getJson() {
        try {
            const response = await fetch('../assets/navigation.json');
            const data = await response.json();
            return data;
        } catch (error) {
            return console.log(error);
        }
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    const body = document.querySelector('body');
    const main = new Main();

    body.classList.remove('preload');
    main.init();
});