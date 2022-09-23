// const _ = require('lodash')

module.exports = {
    getSlug : (name) => {
        return name.toLowerCase().replace(/ /g,"_")
    }
}