import { ValidationError } from "sequelize";

/**
 * 비동기 에러 핸들링 함수
 */
function asyncHandler(handler) {
    return async function(req,res,next) {
        try {
            await handler(req,res,next);
        } catch(e){
            console.log(e.name);
            console.log(e.message);
            next(e);
        }
    }
} 

/**
 * 에러 핸들링
 * 클라이언트에게 알맞은 response 반환
*/ 
function errorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        const messages = err.errors.map(e => e.message);
        res.status(400).json({ errors: messages });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {asyncHandler, errorHandler};