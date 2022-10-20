import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import DatabaseError  from './../models/errors/databaseError.model';
import AuthenticationError from '../models/errors/authenticationError.model';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof DatabaseError) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    
    } else if (err instanceof AuthenticationError){
        res.sendStatus(StatusCodes.FORBIDDEN);
    } else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

export default errorHandler;