import { getCompetition } from '../utils/getData'

const laLigaStandings = async () => {
    const laLiga = await getCompetition(2014)
    const standings = laLiga.standings
    const clasification = standings[0].table

    console.log(clasification)

    const view = `
        <div class="clasification">
            <h1>${laLiga.competition.name}</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Posición</td>
                        <td>Equipo</td>
                        <td>PJ</td>
                        <td>G</td>
                        <td>E</td>
                        <td>P</td>
                        <td>Goals</td>
                        <td>Pts.</td>
                        <td>Forma</td>
                    </tr>
                    ${clasification.map(team => `                
                        <tr>
                            <td>${team.position}</td>
                            <td>${team.team.name}</td>
                            <td>${team.playedGames}</td>
                            <td>${team.won}</td>
                            <td>${team.draw}</td>
                            <td>${team.lost}</td>
                            <td>${team.goalsFor}:${team.goalsAgainst}</td>
                            <td>${team.points}</td>
                            <td>${team.form}</td>
                        </tr>
                    `).join('')}
                </tbody>
        </table>
    </div>
    `
    return view
}

const laLigaStandingsByTeam = async (idTeam) => {
    const laLiga = await getCompetition(2014)
    const standings = laLiga.standings
    const clasification = standings[0].table
    const positionTeam = clasification.filter(team => {
        if (parseInt(idTeam) === team.team.id) {
            return team
        }
    })
    const pos = positionTeam[0].position - 1

    if (pos < 4) return clasification.slice(0, 7)
    if (pos > 16) return clasification.slice(13, 20)
    
    return clasification.slice(pos-3,pos+4)
}

export { laLigaStandings, laLigaStandingsByTeam }