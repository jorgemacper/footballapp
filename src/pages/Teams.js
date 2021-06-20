import { getData } from '../utils/getData'

const SpainLeagueTeams = async () => {
    const spainLeague = await getData(2014)
    const spainLeagueTeams = spainLeague.teams
    return spainLeagueTeams
}

export default SpainLeagueTeams