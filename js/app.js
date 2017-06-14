var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
  $(document).on("click", ".eliminar", borrar);
};

var borrar = function(e){
	e.preventDefault();
	var elemento = $(e.target);
	var padre = elemento.parent().parent();
  	var id = padre.data('clave');
	  padre.remove();
   	var url_id = api.url + id;
   	//console.log(url_id);
  	$.ajax({
    	url: url_id,
    	type: "DELETE",
    	//success: function (data){
    //alert("holi");
    //}
  });
}

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);
  });
}
            
var crearTarea = function (tarea) {
  var nombre = tarea.name;
  var estado = tarea.status[0];
  // creamos la fila
  var $tr = $("<tr />");
  // creamos la celda del nombre
  var $nombreTd = $("<td />");
  $nombreTd.text(nombre);
  // creamos la celda del estado
  var $estadoTd = $("<td />");
  $estadoTd.text(estado);
  //columna de acciones
  var $acciones = $("<td />");
  //creamos el span de los iconos
  var $ver = $("<span />");
  var $editar = $("<span />");
  var $eliminar = $("<span />");
  //agregamos la clase al span
  $ver.addClass("glyphicon glyphicon-eye-open");
  $editar.addClass("glyphicon glyphicon-pencil");
  $eliminar.addClass("glyphicon glyphicon-remove eliminar");
  // agregamos las celdas a la fila
  $tr.append($nombreTd);
  $tr.append($estadoTd);
  $tr.append($acciones);
  $acciones.append($ver);
  $acciones.append($editar);
  $acciones.append($eliminar);
  // agregamos filas a la tabla
  $tasksList.append($tr);
};

var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
  });
};

$(document).ready(cargarPagina);