import { start } from './server.js';
import { route } from './router.js';
import request from './request.js';

const handleMap = {
  '/': request.start,
  '/index': request.start,
  '/upload': request.upload,
  '/show': request.show,
};

start(route, handleMap);
