# Tic Tac Toe Game!

Hola! Este es un projecto realizado como prueba tecnica para la convocatoria de talentos NodeJS de Talenta365. En este readme encontraras la informacion necesaria para entender el proyecto y su magnitud.

## ¿Como esta hecho el proyecto?

El proyecto esta hecho con MERN, es decir, **MongoDB**, **ExpresJS**, **React** y **NodeJS**. Dentro de este mismo repo encontraremos que en el directorio principal se encuentra el FrontEnd y dentro del mismo un carpeta llamada "Backend" donde estara el servidor y la base de datos. La base de datos esta alojada en **MongoDB Atlas**.

## ¿Como instalo y pruebo el repositorio?

Para instalar y probar el repositorio lo primero que tenemos que hacer es clonar este repositorio. Seleccionado la ruta donde queramos clonarlo, nos digirimos a la terminal y escribimos
```
...ruta/git clone https://github.com/mcabreraf/tictactoe.git
```
Una vez clonado el repositorio, debemos instalar los paquetes que usa el proyecto para su funcionamiento. Para eso iremos a las siguientes rutas y haremos los siguientes comandos.
```
...ruta/tictactoe/backend/npm install

...ruta/tictactoe/yarn 
```
**NOTA:** Es necesario contar con NodeJS y Yarn instalados previamente en nuestro computador.

Luego debemos encender el servidor para que se conecte a la base de datos. Para ello, hacemos el siguiente comando.
```
...ruta/tictactoe/backend/npm start
```
Tambien es posible usar Nodemon si se cuenta con este instalado en nuestro computador.
```
...ruta/tictactoe/backend/nodemon
```

Si todo sale bien, deberian aparecer los siguientes mensajes en nuestro terminal:
```
Server is listening on port 5000!
Connected to database successfully!
```
Esto significa que nuestro servidor y nuestra base de datos estan funcionando correctamente.

El siguiente paso es iniciar el cliente. Para ellos, hacemos el siguiente comando.
```
...ruta/tictactoe/yarn start
```

Es posible que al hacer este comando, aparezca el siguiente mensaje:
```
? Something is already running on port 3000.

Would you like to run the app on another port instead? (Y/n)
```
Si este es el caso, solo debemos presionar la tecla Y de nuestro teclado en la consola e inmediatamente se nos abrira el cliente.

Con eso seria suficiente para que el proyecto empieze a funcionar!

## ¿Como jugar?

Al iniciar el juego esta detenido, no permite hacer nada. Para empezar a jugar debemos presionar el boton **Play**. Al presionar aqui, se habilitan las demas opciones del proyecto y se puede empezar a presionar los cuadrados del tablero. El juego terminara cuando **'X'** o **'O'** hagan un tres en raya, o exista un empate entre los dos. Cuando un juego termine, se anunciara el ganador. Tambien hay un listado con los movimientos pasados a lo cuales un jugador se va a poder devolver. Para empezar un nuevo juego, se debe presionar el boton **New Game**, lo que hara que el juego se reinicie y el estado del juego anterior se guarde, por si en algun momento el jugador decide continuar su juego despues. Cabe resaltar que si el juego ha finalizado (es decir, hubo un ganador) no se va a poder continuar esa partida. El boton **Restart** solo va a reiniciar el estado del juego actual sin guardar su estado. El boton **Save** se encuentra deshabilitado y solo se activara cuando estemos viendo un juego viejo, y en consecuencia, el boton **New Game** se deshabilitara para evitar crear juegos repetidos. El objetivo de este boton es guardar el estado de nuestro juego previo cuando queramos. Y eso es todo!

## ¿Que se implemento?

* Todo el codigo se encuentra en este repositorio.
* Los commits se encuentran en intervalos de 3 horas, con excepcion de aquellos intervalos para dormir.
* El backend esta creado en NodeJS.
* Se utiliza el framework ExpressJS.
* El juego se crea en backend y persiste en base de datos.
* La base de datos es MongoDB.
* Ambos jugadores son personas.
* Los juegos puedan detenerse y reanudarse.
* Se muestra un listado con juegos viejos.
* Las jugadas de los jugadores estan quedan guardadas y pueden ser reanudadas si el juego no ha finalizado.
* El FrontEnd muestra el juego.
* El FrontEnd avisa que jugador tiene el turno.
* El FrontEnd es una single page, no es necesario actualizarlo.
* El juego finaliza cuando hay un 3 en raya.
* El juego dice quien gano.
* En caso de empate, el juego termina y avisa que hubo un empate.
* Se muestra un listado de juegos iniciados y el ultimo ganador de la sesion.
* Se hace uso de ReactJS.
* Se usa Bootstrap como preprocesador de css.
* Se hace uso de webpack manual (no mediante create-react-app).
* Las pruebas estan automatizadas.
* **No tengo Twitter!** pero si me encanta #javascript 😅
* Este es el Readme con las debidas explicaciones!
* Se hace entrega del proyecto en GitHub!