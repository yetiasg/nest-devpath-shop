# nest-devpath-shop


## backend

### env file
create ```development.emv``` file based on ```example.env```

### mailer config
in  ```development.emv``` type your google email and password to send messages via gmail, type email and password for admin user which will be created on application bootstrap

run npm install in root backend direcory


## frontend

run npm install in root backend direcory

```npm run serve``` to run frontend

login to admin account


Cart and buy option is not implemented yet on frontend site.
You have to 'buy' products by sending request (based on DTO) to proper endpoint ( POST /orders )
