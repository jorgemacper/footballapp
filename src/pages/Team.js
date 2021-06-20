import getHash from '../utils/getHash'
import { getTeam, getSquad } from '../utils/getData'
import { laLigaStandingsByTeam } from '../pages/Competitions'

const Team = async () => {
    const id = getHash()
    const team = await getTeam(id)
    const squad = await getSquad(id)
    const standingsTeam = await laLigaStandingsByTeam(id)
    console.log(standingsTeam)
    const today = new Date()
    const view = `
        <div class="team-container">
            <div class="team-info">
                <div class="team-info--header">
                    <img src="${team.crestUrl}" alt="${team.name}">
                    <h2>${team.name}</h2>
                </div>
                <p>Fundado: ${team.founded}</p>
                <p>Website: <a href="${team.website}" target="blank">${team.website}</a></p>
            </div>
            <div class="team-squad">
                <h3>Cuerpo técnico</h3>
                ${squad.coachs.map(p => `
                    <div class="team-player"><span class="player-position ${p.position}"></span> ${p.name} <div><span class="country-flag"><img src="${p.countryFlag}" alt="${p.nationality}"><span class="tooltip-text">${p.nationality}</span></span> <span class="player-age">${p.age} años</span></div> </div>
                `).join('')}
                <h3>Porteros</h3>
                ${squad.goalkeepers.map(p => `
                    <div class="team-player"><span class="player-position ${p.position}"></span> ${p.name} <div><span class="country-flag"><img src="${p.countryFlag}" alt="${p.nationality}"><span class="tooltip-text">${p.nationality}</span></span> <span class="player-age">${p.age} años</span></div> </div>
                `).join('')}
                <h3>Defensas</h3>
                ${squad.defenders.map(p => `
                    <div class="team-player"><span class="player-position ${p.position}"></span> ${p.name} <div><span class="country-flag"><img src="${p.countryFlag}" alt="${p.nationality}"><span class="tooltip-text">${p.nationality}</span></span> <span class="player-age">${p.age} años</span></div> </div>
                `).join('')}
                <h3>Centrocampistas</h3>
                ${squad.midfielders.map(p => `
                    <div class="team-player"><span class="player-position ${p.position}"></span> ${p.name} <div><span class="country-flag"><img src="${p.countryFlag}" alt="${p.nationality}"><span class="tooltip-text">${p.nationality}</span></span> <span class="player-age">${p.age} años</span></div> </div>
                `).join('')}
                <h3>Delanteros</h3>
                ${squad.attackers.map(p => `
                    <div class="team-player"><span class="player-position ${p.position}"></span> ${p.name} <div><span class="country-flag"><img src="${p.countryFlag}" alt="${p.nationality}"><span class="tooltip-text">${p.nationality}</span></span> <span class="player-age">${p.age} años</span></div> </div>
                `).join('')}
            </div>
            <div class="team-standings">
                <table>
                    <tr class="team-standings--title">
                        <td>Pos.</td>
                        <td>Equipo</td>
                        <td>Puntos</td>
                    </tr>
                ${standingsTeam.map(t => `
                    
                    <tr class="${(t.team.id === parseInt(id)) ? 'team-name--current' : 'team-name'}">
                        <td>${t.position}</td>
                        <td>${t.team.name}</td>
                        <td>${t.points}</td>
                    </tr>
                    
                `).join('')}
                </table>
            </div>
        </div>
    `
    return view
}

export default Team