const fs = require('fs');


const getRecomendaciones = async () => {

    try {
        const item =  await fs.promises.readFile('./data/recomendaciones.json','utf-8', ( err, data ) => item);
        return JSON.parse(item);
    } catch (error) {
        console.log(error);
    }

} 

module.exports = {
    getRecomendaciones,
}