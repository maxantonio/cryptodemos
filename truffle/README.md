# Ejemplo de uso de contratos inteligentes

como prerequisitos para ejecutar el proyecto es necesario tener instalado 

1- ganache
2- truffle.js
3- Metamask 

Para hacer funcionar el proyecto correr ganache, iniciar una blockchain e incorporar la configuracion de truffle presente en 
el proyecto 'truffle-config.js'

modificar esta configuracion de ser necesario para las espicificaciones de la blockchain a utilizar

## Compilar y desplegar contratos
para compilar los contratos presentes en la carpeta contracts ejecutar
        
        truffle compile

Una vez compilados para desplegar ejecutar 

        truffle deploy

## correr aplicacion que usa contratos
Para ejecutar la aplicacion instalar as dependencias usando el comando 

        yarn install

y una vez instalada las dependencias ejecutar el proyecto 

        yarn start

## configurar metamask para operar los tokens
Una vez desplegados los contratos en la red blockchain de prueba es necesario configurar metamask
o alguna billetera para operar sobre la red de prueba utilizada, los datos de la red se puede ver al abrir la aplicacion
ganache es necesario especificar alguna de las cuentas que aqui proveen con saldo predefinido y ademas agregar los tokens con las direcciones especificadas en la pestaña de contratos de la aplicacion Ganache. una vez hecha estas operaciones estamos listo para usar la aplicacion la cual se vinculara automaticamente con la billetera metamask para realizar las transacciones