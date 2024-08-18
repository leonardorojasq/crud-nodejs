const express = require("express");
const routerApi = require("./routes/index");
const path = require("path")

//swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition: {
        openapi: "1.0.0",
        info: {
            title: "Node js",
            version: "1.0.0"
        },
        servers: [{
            url: "http://localhost:3000"
        }
    ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
};


//middlewares
const { logErrors, errorHandler, boomErrorHandler  } = require('./middlewares/error.handler');
const swaggerJSDoc = require("swagger-jsdoc");
const { version } = require("joi");

//setting
const app = express();
const port = 3000;
 

app.use(express.json());
app.use(
    "/api-doc",
     swaggerUI.serve,
     swaggerUI.setup(swaggerJsDoc(swaggerSpec))
    );


app.get('/', (req, res)=>{
    res.send("Index")
})




routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler)




app.listen(port)