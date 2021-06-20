import getFlag from '../utils/getFlag'
import config from '../../config'

const API = config.API
const API_KEY = config.API_KEY

const headers = new Headers()
headers.append('X-Auth-token', API_KEY)

const requestOptions = {
    method: 'GET',
    headers: headers
}

const getData = async (idCompetition) => {
    const response = await fetch(`${API}competitions/${idCompetition}/teams`, requestOptions)
    const data = await response.json()
    return data
}

const getTeam = async (idTeam) => {
    const response = await fetch(`${API}teams/${idTeam}`, requestOptions)
    const data = await response.json()
    return data
}

const getCompetition = async (idCompetition) => {
    const response = await fetch(`${API}competitions/${idCompetition}/standings?standingType=HOME`, requestOptions)
    const data = await response.json()
    return data
}

const getSquad = async (idTeam) => {
    const team = await getTeam(idTeam)
    const squadData = team.squad

    // Creating a new Array with the data that I need
    const squad = squadData.map(player => {
        const result = new Object()

        result['name'] = player.name
        result['nationality'] = player.nationality
        result['age'] = ageOfPlayer(player)

        if (player.role === 'PLAYER') {
            result['position'] = player.position.toLowerCase()
        }
        if (player.role === 'COACH') {
            result['position'] = player.role.toLowerCase()
        }

        return result
    })

    // Adding the flag of the player nationality country
    await addCountryFlag(squad)

    // Order the array -> Coach, Goalkeepers, Defenders, Midfielders, Attackers
    const squadOrdered = orderSquad(squad)

    // returning the ordered array
    return squadOrdered
}

const addCountryFlag = async (squad) => {
    // This functions return the squad's array with a new property "countryFlag" which contains the url of the country's flag.
    console.log(squad)
    for (let i=0; i<squad.length;i++) {
        let countryFlag = await getFlag(squad[i].nationality)

        // if countryFlag is not found on the API for some reason, we put an icon as default.
        if (countryFlag === undefined) {
            countryFlag = './imgs/icon-countryflag-undefined.png'
        }

        squad[i]['countryFlag'] = countryFlag
    }
    return squad
}

const ageOfPlayer = (player) => {
    // This function return the age of a player in a string
    // We pass a player as an argument
    // Getting the dateOfBirth of a player
    const birthdate = (player.dateOfBirth) ? new Date(player.dateOfBirth) : ''
    // Getting the current date
    const today = new Date()

    // If no birthdate
    if (!birthdate) {
        return 'No birthdate data'
    }

    // If birthdate, then we calculate the age in miliseconds
    const age = today.getTime() - birthdate.getTime()
    // We parse the age of the player from miliseconds to years
    const ageParsedInYears = Math.floor(age/(1000*60*60*24*365))

    return ageParsedInYears
}

const orderSquad = (squad) => {
    const playerTypes = {
        'coachs': squad.filter(player => player.position === 'coach'),
        'goalkeepers': squad.filter(player => player.position === 'goalkeeper'),
        'defenders': squad.filter(player => player.position === 'defender'),
        'midfielders': squad.filter(player => player.position === 'midfielder'),
        'attackers': squad.filter(player => player.position === 'attacker')
    }

    return playerTypes
}

export { getData, getTeam, getSquad, getCompetition }