import {areaDeEstudio,carrera,curso, requestAreaDeEstudio, requestCarreras} from "./ajaxRequest.js";

$(document).ready(()=>{
    $(".loading").hide();
    requestCarreras('.load-request')
    requestAreaDeEstudio('.load-request')
    areaDeEstudio(
        '.btn-informacion-areadeestudio',
        '.load-request',
        '.cursoArea',
        '.loadingCursoArea',
        '../cursosArea.html')
    curso(
        '.btn-curso',
        '.load-request',
        '.curso',
        '.loadingCurso',
        '../curso.html')
    carrera(
        '.btn-carrera',
        '.load-request',
        '.carrera',
        '.loadingCarrera',
        '../carrera.html'
    )
    // ajaxRequest('.load-request');
    // jqueryAjaxRequest('.load-ajax-request','.btn-ajax-request');
    // getJsonRequest('.load-json-request','.btn-json-request');
})

$(document).on( "ajaxStart",function(){
    $(".loading").show();
});
$(document).on( "ajaxStop",function(){
    $(".loading").hide();
});
$(document).on('ajaxError',function(){
    Swal.fire('Ha habido un error de conexion', '', 'warning');
})