// AIzaSyBeHIj8_oRG4T1KjA6YCQB8tOEh124EypA

function busquedaLibro() {
    var valorBuscado = document.getElementById('search').value;
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q="+valorBuscado+"&key=AIzaSyBeHIj8_oRG4T1KjA6YCQB8tOEh124EypA",
        dataType: "json",
        success: function (data) {
            for(let i=0;i<data.items.length;i++){
                $('#resultados').append('<div class="card col-lg-3 col-md-4 col-sm-6 col-xs-12 col-12" style="height: 350px; display: inline-flex;">\n' +
                    '  <img class="card-img-top" style="height: 300px; width: 100%;" src="' + data.items[i].volumeInfo.imageLinks.smallThumbnail + '" onerror="noCargada(this)">\n' +
                    '  <div class="card-body">\n' +
                    '  <h5 class="card-title">' + data.items[i].volumeInfo.title + '</h5>\n' +
                    '  <p class="card-text">Autor:' + data.items[i].volumeInfo.authors + '</p>\n' +
                    '  <a href="#" class="btn btn-secondary">Detallar</a>'+
                    '	</div>')
            }
        },
        type: 'GET'
    });
}

$(document).ready(function() {
    var win = $(window);

    // Each time the user scrolls
    win.scroll(function() {
        // End of the document reached?
        if ($(document).height() - win.height() <= (win.scrollTop()+20)) {
            //$('#loading').show();

            busquedaLibro();
        }
    });
});