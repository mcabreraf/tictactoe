# Tic Tac Toe Game!

## ¿Como esta hecho el proyecto?

El proyecto esta hecho con MERN, es decir, **MongoDB**, **ExpresJS**, **React** y **NodeJS**. Dentro de este mismo repo encontraremos que en el directorio principal se encuentra el FrontEnd y dentro del mismo un carpeta llamada "Backend" donde estara el servidor y la base de datos. La base de datos esta alojada en **MongoDB Atlas**.

Las invitaciones al proyecto a los debidas personas de interes fueron enviadas. Si por algun motivo no es posible conectarse a la base datos, se deben hacer lo siguientes pasos:

1. Ir a la pagina de MongoDB Atlas (https://www.mongodb.com/cloud/atlas) y crear una cuenta o iniciar sesion si ya se tiene..
2. Crear un cluster donde se almacenaran las bases de datos y las respectivas configuraciones.
3. Conectar a la aplicacion mediante la opcion "Connect your application". Al hacer click aqui, aparece un enlace. Para este proyecto, el enlace aparece asi:

```
mongodb+srv://tictactoe:<password>@cluster0.nsuh8.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority
```
Y se reemplazaron los campos `<password>` y `<dbname>` por tictactoe en ambos casos. Para el link que les aparezca, deben cambiar estos mismos campos, y luego reemplazar ese enlace en la siguiente ruta:
```
tictactoe/backend/.env
```
En ese archivo colocamos despues del 'ATLAS_URI=' el enlance. Por ejemplo:
```
ATLAS_URI=mongodb+srv://tictactoe:tictactoe@cluster0.nsuh8.gcp.mongodb.net/tictactoe?retryWrites=true&w=majority
```
Por esto:
```
ATLAS_URI="tu enlace"
```
Luego de esto, el proyecto deberia funcionar sin mas complicaciones!
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

Con eso seria suficiente para que el proyecto empiece a funcionar!

## ¿Como jugar?

Al iniciar el juego esta detenido, no permite hacer nada. Para empezar a jugar debemos presionar el boton **Play**. Al presionar aqui, se habilitan las demas opciones del proyecto y se puede empezar a presionar los cuadrados del tablero. El juego terminara cuando **'X'** o **'O'** hagan un tres en raya, o exista un empate entre los dos. Cuando un juego termine, se anunciara el ganador. Tambien hay un listado con los movimientos pasados a lo cuales un jugador se va a poder devolver. Para empezar un nuevo juego, se debe presionar el boton **New Game**, lo que hara que el juego se reinicie y el estado del juego anterior se guarde, por si en algun momento el jugador decide continuar su juego despues. Cabe resaltar que si el juego ha finalizado (es decir, hubo un ganador) no se va a poder continuar esa partida. El boton **Restart** solo va a reiniciar el estado del juego actual sin guardar su estado. El boton **Save** se encuentra deshabilitado y solo se activara cuando estemos viendo un juego viejo, y en consecuencia, el boton **New Game** se deshabilitara para evitar crear juegos repetidos. El objetivo de este boton es guardar el estado de nuestro juego previo cuando queramos. Y eso es todo!
