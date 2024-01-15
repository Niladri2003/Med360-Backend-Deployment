const { Express, Request, Response } = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi  = require("swagger-ui-express");
const path=require("path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MED360 Backend API",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers:[
            {
                url:`http://localhost:4000/api/v1`
            }
        ]
    },
    apis: [path.resolve(__dirname,"../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

exports.swaggerDocs = (app, PORT) => {
    console.log(JSON.stringify(swaggerSpec,null,2));
    // Swagger page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log(`Docs available at http://localhost:${PORT}/docs`);
};
