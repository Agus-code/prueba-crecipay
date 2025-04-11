# prueba-crecipay

Technical challenge for crecipay

## Instructions

### Install dependencies

```bash
  npm run install
```

### Requeriments

- node >= 20

## Scripts

```bash
  npm run dev  //Run app in development mode
  npm run build //Build code from ts in watch mode
  npm start //Build ts code and start application
```

## Endpoints

Server runs on port 5000

```bash
    POST /deals // Upload deals by cvs file, the key for the file must be "deals"
    GET /commissions/deal/{deal_id} // return deal with ID sended in params 
    GET /commissions/rep/{rep}?month=YYYY-MM // return deals that matchs with rep sended in params and month in query
    DELETE /deals // remove all dels in DB
```


## Explicación final

# Utilice las siguientes herramientas para el desarrollo
- Node / para el desarrollo de la aplicacion
- Express / framework para la creacion de las rutas del api
- No utilice base de datos, guardo todo en memoria 

