function clicks(energy, clickLevel){
    const _clicks = Math.floor(parseInt(energy) / parseInt(clickLevel))
    return  { 'clicks':  (_clicks > 10000 ? (_clicks / 3) : _clicks) };
}

module.exports = { clicks }