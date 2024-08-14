// start();
const cors = require("cors");
const express = require("express");
const app = express();
const passport = require("passport");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

require("dotenv").config();
require("./config/passport")(passport);
// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Configurer CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// connect config
const connectDB = require("./config/connect");
app.use(passport.initialize());

app.use(cors());

// routes
const vehiculeRouter = require("./routes/vehicule");
const employeRouter = require("./routes/employe/employe");
const chauffeurRouter = require("./routes/employe/chauffeur");
const permisRouter = require("./routes/employe/permis");
const consomationRouter = require("./routes/carburant/carburant");
const carteRouter = require("./routes/carburant/carte");
const demandeTransportRouter = require("./routes/demandeTransport");
const fdrRouter = require("./routes/fdr");
const userRouter = require("./routes/users");

app.use(express.json());

app.use("/api/v1/vehicule", vehiculeRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chauffeur", chauffeurRouter);
app.use("/api/v1/permis", permisRouter);
app.use("/api/v1/carte", carteRouter);
app.use("/api/v1/consomation", consomationRouter);
app.use("/api/v1/employe", employeRouter);
app.use("/api/v1/fdr", fdrRouter);
app.use("/api/v1/demandeTransport", demandeTransportRouter);

// app.use(errorHandlerMiddleware());
const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
