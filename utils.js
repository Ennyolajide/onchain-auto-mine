function clicks(energy, clickLevel){
    return  { 'clicks':  (Math.floor(parseInt(energy) / parseInt(clickLevel))) };
}


module.exports = { clicks }