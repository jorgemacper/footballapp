import SpainLeagueTeams from './Teams'

const Home = async () => {
    const spainTeams = await SpainLeagueTeams()

    const view = `
        <div class="teams-container">
            ${spainTeams.map(team => `
                <div class="team-card">
                    <a href="#/${team.id}"><img src="${team.crestUrl}" alt="${team.name}"></a>
                </div>
            `).join('')}
        </div>
    `
    return view
}

export default Home