const API = 'https://flagcdn.com/en/codes.json'
const urlImg = 'https://flagcdn.com/16x12/'

const getFlag = async (countryName) => {
    const countryCode = await getCountryCode(countryName)
    if (typeof countryCode === 'undefined') {
        return undefined
    }
    const flag = `${urlImg}${countryCode}.png`
    return flag
}

const getCountryCode = async (countryName) => {
    const response = await fetch(API)
    const data = await response.json()
    const dataArr = Object.entries(data)
    const result = dataArr.filter(country => country[1] === countryName)
    if (result.length === 0) {
        return undefined
    }
    return result[0][0]
}

export default getFlag