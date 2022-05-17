module.exports = {
  ok(res, dto) {
    if (dto) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
      return res.status(200).json(dto);
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    return res.sendStatus(200);
  },

  created(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    return res.status(201).sendStatus(201);
  },

  clientError(res, message) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    return res.status(400).send({ status: 400, message });
  },

  unauthorized(res, message) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    return res.status(401).send({ status: 401, message });
  },

  notFound(res, message) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    return res.status(404).send({ status: 404, message });
  },

  fail(res, message) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    return res.status(500).send({ status: 500, message });
  },
};
