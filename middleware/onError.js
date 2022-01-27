function onError(err, req, res, next) {
  console.error(err.stack);
  res.status(500).end('Internal server error');
}

export default onError;
