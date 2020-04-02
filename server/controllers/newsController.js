const axios = require('axios');

class NewsController {
    static viewNews(req,res){
        axios({
            "method": "GET",
            "url": `https://newsapi.org/v2/everything?q=covid`,
            "headers": {
                "X-Api-Key": "a24ccfcf672c4d959b3f07826a1de397"
            }
          }).then( data => {
              console.log(data.data.articles[0]);
              res.status(200).json({ data: data.data.articles });
          }).catch( err => {
              res.status(400).json({ message: 'Data not found' });
          });
    }
}

module.exports = NewsController;