var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    //log: 'trace',
    setTimeout: 50000
});

//var client = require('/Sy/ws-node/project1/site/config/config');
var data = [];

/* GET home page. */
router.get('/', async function (req, res, next) {
    //res.render('index', { title: '여기가 search' });
    if (req.query.query == '' || req.query.query == null || req.query.query == undefined) {

        res.send('missing parameters');
    } else {
        var query = req.query.query;
        console.log(query);

        
            var data = [];
            async function run() {
                const response = await client.search({
                    index: "recommend_2019.11.19",
                    body: {
                        "query": {
                            "simple_query_string": {
                                "query": query
                            }
                        }
                    }
                })
                
                for (const tweet of response.hits.hits) {
                    console.log('tweet:', tweet);
                    data.push(tweet);
                  }
                res.send(data);
                
            };

            //console.log("result >>>" + result);
    //        res.send(result);
    
        run().catch(console.log);
    }
});

module.exports = router;
