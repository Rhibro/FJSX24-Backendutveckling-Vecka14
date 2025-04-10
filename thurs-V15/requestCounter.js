let requestCount = 0;

function requestCounter(req, res, next) {
    requestCount++;

    console.log(`totalt antal inkommande request: ${requestCount}`);

    next();
}

export default requestCounter;