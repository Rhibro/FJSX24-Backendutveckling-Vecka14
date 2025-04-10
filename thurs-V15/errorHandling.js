import {logger} from "./logger.js";

function errorHandler(err, req, res, next) {
    logger.error(`Error!!!: ${err.message}`);

    res.status(500).json({error: "Server problem", message: err.message});
}

export default errorHandler;