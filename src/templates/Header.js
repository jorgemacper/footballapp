const Header = () => {
    const view = `
        <div class="header-main">
            <div class="header-logo">
                <h1><a href="/">FootballApp</a></h1>
            </div>
            <div class="header-nav">
                <a href="/">Inicio</a>
                <a href="#/laliga">Clasificación</a>
                <a href="#/About">About</a>
            </div>
        </div>
    `
    return view
}

export default Header