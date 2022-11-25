require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const NoPermissionError = require('../errors/NoPermissionError');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NoPermissionError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');

  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new NoPermissionError('Необходима авторизация');
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
