'use strict';

module.exports = function (server) {
	
	// Install a `/` route that returns server status
	var path = require('path');
	var router = server.loopback.Router();

	router.use(server.loopback.static(path.resolve(__dirname, '../../client/dist')));
	router.all('/*', function (req, res, next) {
		if (req.originalUrl.includes('/api/')) { // api 호출시에는 캐시 블락		
			res.header("Cache-Control", "no-cache, no-store, must-revalidate");
			res.header("Pragma", "no-cache");
			res.header("Expires", 0);
			next();
		} else {
			res.sendFile('index.html', { root: path.resolve(__dirname, '..', '../client/dist') });
		}
	});

	server.use(router);
};