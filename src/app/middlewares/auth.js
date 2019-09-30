import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";
import { promisify } from "util";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  //pega somente a parte Token de Authorization
  const [, token] = authHeader.split(" ");

  try {
    //Me retorna as informações que foi passada para o token na sua criação, nesse caso, o ID do user
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
