// KEY: AIzaSyBeHIj8_oRG4T1KjA6YCQB8tOEh124EypA
var pagina = -10;
var flag=false;
var win = $(window);
var idBuscada;
var añadirListener=0;

function busquedaLibro() {
    var valorBuscado = document.getElementById('search').value;
    pagina+=10;
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q="+valorBuscado+"&key=AIzaSyBeHIj8_oRG4T1KjA6YCQB8tOEh124EypA&startIndex="+pagina+"&maxResults=10",
        dataType: "json",
        success: function (data) {
            for(let i=0;i<data.items.length;i++){
                try{
                    var imagenLibro = data.items[i].volumeInfo.imageLinks.smallThumbnail;
                }catch (e) {
                    var imagenLibro = "assets/imagenes/imagenNo.png";
                }
                $('#resultados').append('<div class="card col-lg-3 col-md-4 col-sm-6 col-xs-12 col-12" style="height: 500px; display: inline-block;">\n' +
                    '  <img class="card-img-top rounded-right" src="' + imagenLibro +'" style="width: 100%;" alt="'+data.items[i].id+'">\n' +
                    '  <div class="card-body">\n' +
                    '  <h5 class="card-title">' + data.items[i].volumeInfo.title + '</h5>\n' +
                    '  <p class="card-text">Autor: ' + data.items[i].volumeInfo.authors + '</p>\n' +
                    '  <button type="button" class="btn btn-secondary claseDetallar" data-toggle="modal" data-target="#miModal">Detallar</button>'+
                    '	</div>');
                document.getElementsByClassName("claseDetallar")[añadirListener].addEventListener("click", detallarLibro);
                añadirListener++;
            }
            flag=false;
            $("#loading").hide();
        },
        type: 'GET'
    });

}
function detallarLibro(e){
    idBuscada = e.target.parentElement.parentElement.getElementsByTagName("img")[0].alt;
    $('#tituloDetalles').empty();
    $('#imagenDetalles').attr("src","");
    $('#autorDetalles').empty();
    $('#categoriaDetalles').empty();
    $('#editorialDetalles').empty();
    $('#fechaDetalles').empty();
    $('#paginasDetalles').empty();
    $('#valoracionDetalles').empty();
    $('#precioDetalles').empty();
    $('#compraDetalles').empty();
    $('#descripcionDetalles').empty();
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q="+idBuscada+"&key=AIzaSyBeHIj8_oRG4T1KjA6YCQB8tOEh124EypA&startIndex=0&maxResults=1",
        dataType: "json",
        success: function (data) {
            for(let i=0;i<data.items.length;i++) {
                try{
                    var imagenLibro = data.items[i].volumeInfo.imageLinks.smallThumbnail;
                }catch (e) {
                    var imagenLibro = "assets/imagenes/imagenNo.png";
                }
                try {
                    $('#tituloDetalles').append(data.items[i].volumeInfo.title);
                    $('#imagenDetalles').attr("src", imagenLibro);
                    $('#autorDetalles').append("Autor: " + data.items[i].volumeInfo.authors);
                    $('#categoriaDetalles').append("Categoría: " + data.items[i].volumeInfo.categories);
                    $('#editorialDetalles').append("Editorial: " + data.items[i].volumeInfo.publisher);
                    $('#fechaDetalles').append("Fecha de publicación: " + data.items[i].volumeInfo.publishedDate);
                    $('#paginasDetalles').append("Páginas: " + data.items[i].volumeInfo.pageCount);
                    $('#valoracionDetalles').append("Valoración: " + data.items[i].volumeInfo.averageRating);
                    $('#precioDetalles').append("Precio: " + data.items[i].saleInfo.retailPrice.amount + "€");
                    $('#compraDetalles').attr("href", data.items[i].saleInfo.buyLink);
                    $('#compraDetalles').append("Comprar aquí");
                    $('#descripcionDetalles').append("Resumen: " + data.items[i].volumeInfo.description);
                }catch (e) {}

            }
        },
        type: 'GET'
    });
}

function limpiarResultados(){
    $('#resultados').empty();
    pagina = -10;
    añadirListener=0;
    busquedaLibro();
}

win.scroll(function() {
    if ($(document).height() - win.height() <= (win.scrollTop()+20) && document.getElementById("search").value != "") {
        if (flag == false) {
            flag = true;
            $("#loading").show();
            busquedaLibro();
        }
    }
});
