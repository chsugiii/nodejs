var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:3100',
    log:'trace',
    setTimeout : 50000
})

module.exports; client;