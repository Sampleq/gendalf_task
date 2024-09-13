export function menuOpener() {
    const btn = document.getElementById('menu_opener');
    // console.log(btn);

    const menu = document.getElementById('menu');
    const nav = document.getElementById('nav');

    btn.addEventListener('click', toggleMenu);

    function toggleMenu() {
        console.log('Clicked');

        nav.classList.toggle('header__nav_mob');

        nav.addEventListener('click', () => {
            nav.classList.remove('header__nav_mob');
        }, { once: true })

    }

}