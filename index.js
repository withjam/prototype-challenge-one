const loadNavigation = async () => {
    if (!loadNavigation._navigation) {
        try {
            const resp = await fetch('navigation.json');
            const json = await resp.json();
            const { navigation } = json;
            // memoize it
            loadNavigation._navigation = navigation;
        } catch(ex) {
            console.error('error', ex);
        }
    }
    return loadNavigation._navigation;
}

function openSidebar() {
    const navContainer = document.getElementById('sidebar');
    navContainer.classList.add('open');
}

function closeSidebar() {
    const navContainer = document.getElementById('sidebar');
    navContainer.classList.remove('open');
}

// load the page
(async function () {
    document.body.classList.add('loading');
    const navigation = await loadNavigation() || [];
    document.body.classList.remove('loading');
    // render the nav if we got items
    if (navigation && navigation.length) {
        const navContainer = document.getElementById('navigation');
        navContainer.innerHTML = ''; // make sure it's empty
        const navList = document.createElement('UL');
        navigation.forEach(itemData => {
            const navItem = document.createElement('LI');
            navItem.innerHTML = `<a href="${itemData.url ?? ''}">${itemData.name}</a>`;
            navList.appendChild(navItem);
        })
        navContainer.appendChild(navList);
    }
})();

window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;

document.addEventListener('keyup', ev => {
    if (ev.key === 'Escape') {
        window.closeSidebar();
    }
})
