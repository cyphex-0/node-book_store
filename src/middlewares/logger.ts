import fs from "fs";
import  type  { Request, Response, NextFunction } from "express";
export const logger = (req : Request, res: Response, next: NextFunction) => {
  const date = new Date().toISOString();
  const log = `Time : ${date}, Method : ${req.method}, Route : ${req.url} \n`;
  fs.appendFileSync("./Log.txt", log, "utf-8");
  next();
};
