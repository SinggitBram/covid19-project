$(document).ready(() => {

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/news'
    }).done( data => {
        // console.log('MASUK SINI CLIENT')
        // console.log(data);
        for( let i = 0; i < 9; i++ ){
            $('#theNews').append(`
            <div class="card  col-4" style="width: 18rem">
                <img class="card-img-top" src="${data.data[i].urlToImage}">
                <div id="title" class="card-body">
                <h5 class="card-title text-dark">${data.data[i].title}</h5>
                <p class="card-text text-dark">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="${data.data[i].url}" class="btn btn-primary">Read More</a>
                </div>
            </div>
            `)
        }
    }).fail( err => {
        console.log(err);
    });

})