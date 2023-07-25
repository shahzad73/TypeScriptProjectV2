import "reflect-metadata"; 
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { createConnection, Connection } from "typeorm"; 
import { findMany } from './core/mysql';
import AWS from 'aws-sdk';

import {updates} from "./entity/updates"; 

import flash from 'connect-flash';
import compression from 'compression';
//import session from 'express-session';
import bodyParser from 'body-parser';
import hpp from 'hpp';
import "reflect-metadata"



dotenv.config();

//if (!process.env.PORT) {
//   process.exit(1);
//}

const PORT: number = parseInt("7000", 10);
const app = express();

app.use(flash());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet.hidePoweredBy()); // change value of X-Powered-By header to given value
//app.use(helmet.noCache()); // set Cache-Control header
app.use(helmet.noSniff()); // set X-Content-Type-Options header
app.use(helmet.frameguard()); // set X-Frame-Options header
app.use(helmet.xssFilter()); // set X-XSS-Protection header

// This must be before passport initializing
app.use(express.static(`${__dirname}/public`));

app.use(cors());

const cookieVar = {
	secure: process.env.isHTTPSessionSecure, // if site is https then must be true otherwise must be false
	maxAge: 60000 * 60, /* Session expires in 1 hour */
	httpOnly: true, // Mitigate XSS, cookies are not accessible from javascript
	path : '/',
	//domain: 'testingserver.com',
}
/*
const redisOptions = {
	host: "127.0.0.1",
	port: 6379,
	// Add any additional Redis options if needed
};
import RedisStore from "connect-redis";
const store = new RedisStore(redisOptions);


import redis from "redis";
var redisClient = redis.createClient({ url: process.env.REDIS_URL });
app.use(session({
	name: 'Digishares-387674',
	secret: "aaawfwefwefwefwefwefwefweff",
	store: store,
	resave: false,
	saveUninitialized: false,
	rolling: true,
	//cookie: cookieVar
}));
//global["redisClient"] = redisClient;
*/

app.use(hpp());


app.use(bodyParser.json({limit: "2mb"}));
app.use(bodyParser.urlencoded({limit: "2mb", extended: false}));

require('./core/routes')(app);

//Custom error handling
app.use(errorHandler);
app.use(notFoundHandler);


(async () => {

	const connection = await createConnection();

	app.listen(PORT, () => {

		const SESConfig = {
			apiVersion: "latest",
			accessKeyId: process.env.AWS_ACCESS_KEY,
			accessSecretKey: process.env.AWS_SECRET_KEY,
			region: "US-East-1"
		}
		AWS.config.update(SESConfig);

		console.log(`Listening on port ${PORT}`);
	});

})();



 
