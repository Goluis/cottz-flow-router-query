var FlowQuery = function () {};
FlowRouter.query = new FlowQuery();

FlowQuery.prototype.set = function (key, value) {
	var queryParams = _.clone(this.params());

	if (typeof key === 'object') {
		var newQueryParams = _.reduce(key, function (memo, v, k) {
			if (v === undefined || v === '' || v === null)
				return _.omit(memo, k);

			memo[k] = v;
			return memo;
		}, queryParams);

		if (_.isEqual(this.params(), newQueryParams)) return false;

		return this.go(newQueryParams);
	}

	if (value === undefined || value === '' || value === null) {
		if (key in queryParams)
			return this.go(_.omit(queryParams, key));
		return false;
	}

	if (queryParams[key] === value) return false;
	queryParams[key] = value;

	return this.go(queryParams);
};

FlowQuery.prototype.unset = function () {
	if (_.isEmpty(this.params()))
		return false;
	return this.go({});
};

FlowQuery.prototype.get = function (key) {
	return FlowRouter.getQueryParam(key);
};

FlowQuery.prototype.getNonreactive = function (key) {
	return FlowRouter._current.queryParams[key];
};

FlowQuery.prototype.go = function (queryParams) {
	var current = FlowRouter._current;
	FlowRouter.go(current.route.path, current.params, queryParams);
	return true;
};

FlowQuery.prototype.params = function () {
	return FlowRouter._current.queryParams;
};