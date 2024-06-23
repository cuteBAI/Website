const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const url = new URL('https://krbai.flowus.cn');
  url.searchParams.set('embed', 'true');

  // 保留请求路径
  if (req.url !== '/') {
    url.pathname = req.url;
  }

  try {
    const response = await fetch(url.toString(), {
      method: req.method,
      headers: req.headers,
    });

    const data = await response.text();

    res.status(response.status);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'text/html');
    res.send(data);
  } catch (error) {
    res.status(500).send('Error proxying request');
  }
};
