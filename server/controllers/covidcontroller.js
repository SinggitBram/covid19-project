const axios = require("axios");

class covidController {
    static globalstat(req, res) {
        axios({
            "method": "GET",
            "url": "https://covid-193.p.rapidapi.com/statistics",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": process.env.COVID_API_KEY
            }
        })
            .then((response) => {
                let countries = response.data.response
                // let all = countries.find(x => x.country === 'All') find global stats
                let topCountries = []
                //SORT BY TOTAL CASE
                countries.sort(function (a, b) {
                    var keyA = a.cases.total
                    var keyB = b.cases.total
                    // Compare the 2 dates
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                });
                //PUSH ALL & TOP10 Cases to Table
                for (let i = 0; i < 11; i++) {
                    topCountries.push(countries[i])
                }

                res.status(200).json({ topCountries })

            })
            .catch((error) => {
                console.log(error)
                res.status(400).json(error)
            })
    }


    static countrystat(req, res) {
        let country = req.params.country
        axios({
            "method": "GET",
            "url": "https://covid-193.p.rapidapi.com/statistics",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "21eedf4d07msha5d52bf1a701aa8p19733bjsn8fa2554194df"
            }, "params": {
                "country": country
            }
        })
            .then((response) => {
                let countryData = response.data.response
                if (countryData.length > 0) {
                    res.status(200).json({ countryData })
                } else {
                    res.status(404).json({ msg: 'country not found' })
                }

            })
            .catch((error) => {
                console.log(error)
                res.status(400).json(error)
            })

    }


}

module.exports = covidController
