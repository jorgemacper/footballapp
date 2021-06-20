const getHash = () => 
    location.hash.slice(1).toLowerCase().replaceAll('/', '') || '/'


export default getHash