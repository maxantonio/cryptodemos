# Ejemplo de Truffle - Ganache con varias tecnicas

##### Es necesario tener instalado:

1- Node.js: https://nodejs.org/es/ \
2- Ganache: https://www.trufflesuite.com/ganache \
3- Truffle: https://www.trufflesuite.com/truffle


##### Pasos a seguir:

Iniciar una blockchain de prueba utilizando Ganache

Instalar dependencias:

        npm install

Compilar contratos:

        truffle compile

Desplegar contratos:

        truffle migrate

##### App

Compila y recarga  para el desarrollo:

    npm start

Una vez corriendo la aplicacion tiene dos menu principales para acceder a las opciones
1- usando billetera metamask, aqui se probara los contratos validando las transacciones con la billetera metamask por lo cual debera tenerla instalada 
2- usando llave privada para validar las transacciones.  Aqui se le pedira registrar la llave privada almenos una vez esta llave debe ser
la llave de la cuenta que creo los contratos la primera vez y luego puede usarse cualquier llave privada cuya cuenta ya posea tokens 


