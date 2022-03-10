function onError(err, req, res, next) {
  console.error(err.stack);
  res.status(err.statusCode || 500).end(err.message || 'Internal server error');
}

export default onError;
