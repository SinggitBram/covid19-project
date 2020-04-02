$(document).ready(function () {
    tableHeader()
    tableBody()

    $('#searchCountryForm').submit(function (e) {
        e.preventDefault()
        const country = $('#searchCountry').val()
        console.log(country)
        if (country != null && country.trim() != '') {
            $.ajax({
                url: `http://localhost:3000/covid/${country}`,
                type: "GET",
            }).done(res => {
                let data = res.countryData[0]
                tableHeader()
                $('#tableBody').append(`<tr>
                        <td class="text-white">${data.country}</td>
                        <td class="text-white">${data.cases.total}</td>
                        <td class="text-white">${data.cases.new}</td>
                        <td class="text-white">${data.deaths.total}</td>
                        <td class="text-white">${data.deaths.new}</td>
                        <td class="text-white">${data.cases.recovered}</td>
                    </tr>`)
                tableBody()
            }).fail(err => {
                console.log(err)
                /////////////////////error
            })

        }

    })


    $('#covid-main').click(function (e) {
        e.preventDefault()
        tableHeader()
        tableBody()
    })

})


function tableHeader() {
    $('#tableholder').html(`<table class="table">
        <thead class="thead-light">
            <tr>
                <th scope="col">Country</th>
                <th scope="col">Cases</th>
                <th scope="col">New Cases</th>
                <th scope="col">Deaths</th>
                <th scope="col">New Deaths</th>
                <th scope="col">Recovered</th>
            </tr>
        </thead>
        <tbody id="tableBody">
        </tbody>
    </table>`)
}
function tableBody() {
    $.ajax({
        url: 'http://localhost:3000/covid',
        type: 'GET'
    }).done(res => {
        let data = res.topCountries
        for (let i in data) {
            $('#tableBody').append(
                `<tr>
                    <td class="text-white">${data[i].country}</td>
                    <td class="text-white">${data[i].cases.total}</td>
                    <td class="text-white">${data[i].cases.new}</td>
                    <td class="text-white">${data[i].deaths.total}</td>
                    <td class="text-white">${data[i].deaths.new}</td>
                    <td class="text-white">${data[i].cases.recovered}</td>
                </tr>`
            )
        }
        console.log(res.topCountries)
    })
}

