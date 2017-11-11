function requestInterceptor(RestangularProvider) {
	// use the custom query parameters function to format the API request correctly
	RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params) {

		// if(operation == "get" && what == 'jobs'){						
		// 	params._filters = 'filter[include]=reviews'; 
		// 	console.log(params._filters);	
		// 	return 	{ params: params, headers: headers };
		// }

		// 이력서 정보 호출시 include thumbnail
		if(operation == "get" && what === "resumes"){
			params._filters = 'filter[include]=thumbnails'; 			
		}

		// 리스트 검색, 페이징 처리
		if (operation === "getList") {

			// custom pagination params
			if (params._page) {
				params["filter[skip]"] = (params._page - 1) * params._perPage;
				params["filter[limit]"] = params._perPage;
			}
			delete params._page;
			delete params._perPage;

			// custom sort params
			if (params._sortField) {
				params["filter[order]"] = params._sortField + " " + (params._sortDir || 'ASC');
				delete params._sortField;
				delete params._sortDir;
			}

			// custom filters
			if (params._filters) {
				var filterClause = "";
				var i = 0;
				for (var filter in params._filters) {
					if (filter.endsWith('id') || filter.endsWith('Id')) {
						params["filter[where][and][" + i + "][" + filter + "]"] = params._filters[filter];
					} else {
						params["filter[where][and][" + i + "][" + filter + "][regexp]"] = "/" + params._filters[filter] + "/i";
					}

					i++;
				}
				delete params._filters;
			}

		
			// if (headers['Content-Range']) {
			// 	headers['X-Total-Count'] = headers['Content-Range'].split('/').pop();
			// }
		}

		params["access_token"] = window.localStorage.getItem('token');

		return { params: params, headers: headers };
	});
}

function responseInterceptor(RestangularProvider) {
	RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response) {

		console.log('data', data);
		if (operation === 'getList') {
			var Result = JSON.parse(Get(url + '/count?access_token=' + window.localStorage.getItem('token')));
			response.totalCount = Result.count;
		}
		return data;
	});
}

function Get(yourUrl) {
	var Httpreq = new XMLHttpRequest();
	Httpreq.open("GET", yourUrl, false);
	Httpreq.send(null);
	return Httpreq.responseText;
}

export default { requestInterceptor, responseInterceptor }
