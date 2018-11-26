"use strict";

//Declaracion del constructor
function Person(name, surname) {
    this.name = name || "";
    this.surname = surname || "";

    this.getApellido = function(){
        return this.surname;
    };

    this.getNombre = function(){
        return this.name;
    };
    
}//Fin de Person
Person.prototype.datos = function() {
    return this.surname + ", " + this.name;
};

//Declaracion del contructor y los metodos de ArrayPersonas
function ArrayPersonas(){
    var list = [];
    const ELEMENTOS_MAXIMOS = 10;
    
    //Devuelve true o false en función de si la lista está vacía.
    this.isEmpty = function () {
        return (list.length === 0);
    };

    //Devuelve true o false en función de si la lista está llena.
    this.isFull = function(){
        return (list.length === ELEMENTOS_MAXIMOS);
    };

    //Devuelve el número de elementos de la lista.
    this.size = function(){
        return list.length;
    };

    //Añade un nuevo elemento a la lista manteniendo la relación de orden. Devuelve el tamaño de la lista una vez añadido.
    this.add = function (elem) {
        var longitud = this.size();
        var i = 0;
        var colocado = false;
        if (!(elem instanceof Person)) {
            throw new noneInstanceOf();
        }
        if (!this.isFull()){
            //Si esta vacia se añade a la primera posicion
            if(this.isEmpty()){
                list[0] = elem;
            }else{
                //recorre la lista
                while ((i < longitud) || !(colocado)){
                    //Si el apellido es igual se mira el nombre
                    if (elem.getApellido() == list[i].getApellido()) {
                        //Si el nombre va antes en orden alfabetico se coloca delante
                        if(elem.getNombre() < list[i].getNombre()){
                            list.splice(i,0,elem); 
                            colocado = true;
                            //se iguala i a la longitud para que salga del bucle
                            //ya que solo con !(colocado) repetia de nuevo el bucle
                            i = longitud;
                        }
                    }else{
                        if (elem.getApellido() < list[i].getApellido()) {
                            list.splice(i,0,elem); 
                            colocado = true;
                            //se iguala i a la longitud para que salga del bucle
                            //ya que solo con !(colocado) repetia de nuevo el bucle
                            i = longitud;
                        }
                    }//Fin del if
                    i++;
                }//Fin del while
            }//Fin del if empty
        } else {
            throw new fullList();
        }
        return longitud;
    };

    //Devuelve el elemento de la lista de la posición indicada.
    this.get = function (index) {
        var elemento = NaN;
        var longitud = this.size(list);
        //Si el index es menor que la longitud devuelve el elemento 
        if (index < longitud) {
            elemento = list[index].datos();
        } else{
            throw new outIndex();
        }
        return elemento;
    };

    //Devuelve la cola en formato cadena. El delimitador de elementos será “-“
    this.toString = function () {
        var cadena = "";
        if (!(this.isEmpty(list))){
            var longitud = this.size(list);	
            for (var i = 0; i < longitud-1; i++){
                cadena += list[i].datos() + " - ";
            } 		 		
            cadena += list[i].datos(); 		
        } 	
        return cadena;
    };

    //Devuelve la posición del elemento indicado. Si el elemento no está en la lista devuelve -1.
    this.indexOf = function (elem){
        if ((elem instanceof Person)) {
            return list.indexOf(elem);
        }else{
            throw new noneInstanceOf();
        }
    };

    //Devuelve la posición del elemento indicado comenzando por el final. Si el elemento no está en la lista devuelve -1
    this.lastIndexOf = function (elem){
        if ((elem instanceof Person)) {
            return list.lastIndexOf(elem);
        }else{
            throw new noneInstanceOf();
        }
    };

    //Devuelve el máximo número de elementos que podemos tener en la lista.
    this.capacity = function (){
        return ELEMENTOS_MAXIMOS;
    };

    //Vacía la lista.
    this.clear = function (){
        if (!this.isEmpty()){
            list.splice(0, list.length);		 		
        } 	
    };

    //Devuelve el primer elemento de la lista
    this.firstElement = function (){
        var primero;
        if (!this.isEmpty(list)){
            primero = list[0].datos(); 		
        } else {
            throw new emptyList();
        }
        return primero;
    };

    //Devuelve el ultimo elemento de la lista
    this.lastElement = function (){
        var ultimo;
        if (!this.isEmpty()){
            ultimo = list[this.size()-1].datos(); 		
        } else {
            throw new emptyList();
        }
        return ultimo;
    };

    //Elimina el elemento de la posición indicada. Devuelve el elemento borrado.
    this.remove = function (index){
        var borrado = list[index].datos();
        var longitud = this.size();
        if (index >= longitud) {
            throw new outIndex();
        } 
        if (!this.isEmpty()){
            list.splice(index, 1);
        } else {
            throw new removeEmpty();
        }
        return borrado;
    };

    //Elimina el elemento indicado de la lista.Devuelve true si se ha podido borrar el elemento, false en caso contrario.
    this.removeElement = function (elem){
        var eliminado = false;
        var encontrado = this.indexOf(elem);
        if (elem instanceof Person) {
            //Si esta el numero lo elimina
            if (encontrado != -1) {
                this.remove(encontrado);
                eliminado = true;
            }
        }else{
            throw new noneInstanceOf();
        }
        return eliminado;
    };

}//Fin de ArrayPersonas

/* FUNCIONES DE ERRORES */
/* objeto BaseException */
function BaseException() {} //Objeto vacio
BaseException.prototype = new Error(); //Herencia del objeto Error.
BaseException.prototype.constructor = BaseException; //Definimos el constructor
//Sobrescribimos el método toString para personalizarlos
BaseException.prototype.toString = function(){
	return this.name + ": " + this.message;
};

//Error de el objeto no es Person
function noneInstanceOf(){ 
    this.name = "noneInstanceOf";
    this.message = "El elemento no es un objeto Person";
}
noneInstanceOf.prototype = new BaseException(); //hereda de myError
noneInstanceOf.prototype.constructor = noneInstanceOf; // creamos un constructor para este tipo de error

//Error de lista llena
function fullList(){ 
    this.name = "fullList";
    this.message = "La lista está llena. No puedes añadir mas elementos";
}
fullList.prototype = new BaseException(); //hereda de myError
fullList.prototype.constructor = fullList; // creamos un constructor para este tipo de error

//Error de lista llena
function outIndex(){ 
    this.name = "outIndex";
    this.message = "El indice no debe ser mayor que la longitud de la lista ("+longitud+")";
}
outIndex.prototype = new BaseException(); //hereda de myError
outIndex.prototype.constructor = outIndex; // creamos un constructor para este tipo de error

//Error de lista llena
function emptyList(){ 
    this.name = "emptyList";
    this.message = "La lista está vacia";
}
emptyList.prototype = new BaseException(); //hereda de myError
emptyList.prototype.constructor = emptyList; // creamos un constructor para este tipo de error

//Error de lista llena
function removeEmpty(){ 
    this.name = "emptyList";
    this.message = "La lista está vacia. No se puede eliminar.";
}
emptyList.prototype = new BaseException(); //hereda de myError
emptyList.prototype.constructor = emptyList; // creamos un constructor para este tipo de error

/* FUNCIONES QUE USA LA PAGINA Y LA CONSOLA */ 

//Llamamos a la funcion create para rellenar la lista con NaN
var listaPersonas = new ArrayPersonas();

//Añade el numero a la lista y lo muestra en la pagina
function rellenar(nombre, apellido){
    var error = document.getElementById ("error");
    var lista = document.getElementById ("lista");
    error.innerHTML = "";  
     try {
         //Creamos el objeto con los parametros introducidos
         var elemento = new Person(nombre, apellido);
         listaPersonas.add(elemento);
         lista.innerHTML = listaPersonas;
     } catch (err) {
         error.innerHTML = err;
     }	
 }

//Elimina el numero a la lista en la posicion introducida
function eliminarEnPosicion(posicion){
    var error = document.getElementById ("error");
    var lista = document.getElementById ("lista");
    error.innerHTML = ""; 
    if (posicion != "") {
        try {
            //Se parsea la posicion a interge
            posicion = parseInt(posicion);
            listaPersonas.remove(posicion);
            lista.innerHTML = listaPersonas;
        } catch (err) {
            error.innerHTML = err;
        }
    }else{
        error.innerHTML = "No has seleccionado posicion";
    } 
    	
 }

//Elimina el numero introducido en el input
function eliminar(nombre, apellido){
    var error = document.getElementById ("error");
    var lista = document.getElementById ("lista");
    error.innerHTML = "";  
    try {
        var elemento = new Person(nombre, apellido);
        if (listaPersonas.removeElement(elemento) === false) {
            error.innerHTML = "No se ha eliminado por que no se ha encontrado la persona en la lista";
        }else{
            lista.innerHTML = listaPersonas;
        }  
    } catch (err) {
        error.innerHTML = err;
    }	
 }

//Funcion que prueba las funciones mostrando los resultados por consola
function testFunciones() {
    //Se crean los objetos
    var listaTest = new ArrayPersonas();
    var objeto = new Person("Carolina","Ramirez");
    var objeto1 = new Person("Ramon","Martinez");
    var objeto2 = new Person("Marco","Diaz");
    var objeto3 = new Person("Augusto","Martinez");
    var objeto4 = new Person("Barry","Allen");
    //Se añaden los objetos a la lista
    listaTest.add(objeto);
    listaTest.add(objeto1); 
    listaTest.add(objeto2);
    listaTest.add(objeto3);
    listaTest.add(objeto4);		

    //Se muestran por consola los resultados
 	console.log("¿Esta vacía?: " + listaTest.isEmpty());
    console.log("Longitud: " + listaTest.size());
    console.log("¿Esta llena?: " + listaTest.isFull());
    console.log("Capacidad total: "+ listaTest.capacity());
    console.log("Añadimos el numero 'Ramon Garcia': " + listaTest.add(new Person("Ramon","Garcia")));
    console.log("Lista: " + listaTest.toString());   
    console.log("Elemento de la posicion 4: "+ listaTest.get(4));
    console.log("La lista formateada: " + listaTest.toString());	
    console.log("Busca la persona 'Ramon Martinez' en la lista. Posicion: " + listaTest.indexOf(objeto1));
    console.log("Busca la persona 'Sarah Connor' en la lista. Posicion: " + listaTest.lastIndexOf(new Person("Sarah","Connor")));
    console.log("Capacidad maxima de la lista: "+ listaTest.capacity());
    console.log("Primer elemento de la lista: " + listaTest.firstElement());
    console.log("Ultimo elemento de la lista: " + listaTest.lastElement());
    console.log("Se elimina el elemento de la posicion 2: "+ listaTest.remove(2));
    console.log("Lista: " + listaTest.toString());
    console.log("Se elimina a 'Sarah Connor' de la lista. ¿Se ha borrado? " + listaTest.removeElement(new Person("Sarah","Connor")));
    console.log("Se elimina a " + objeto3.datos() + " de la lista. ¿Se ha borrado? " + listaTest.removeElement(objeto3));
    console.log("Lista: " + listaTest.toString());
    console.log("Se vacia la lista: "); 
    listaTest.clear();
    console.log("Lista: " + listaTest.toString());
    try {
        console.log("Primer elemento de la lista: "+ listaTest.firstElement());
    } catch (error) {
        console.log("Primer elemento de la lista. Error: " + error.message);
    }
}

window.onload = testFunciones;