/**
 *	@author: baotong.wang@hotmail.com
 *	@lastModiftDate: 2016-06-16
 *	@fileoverview: add a relative reference resolver to the webpack compile process,
 *	@dependence：webpack
 *	@other：bind the resolve to the webpack 'after-resolvers' process
 */

function relativeResolver() {}

relativeResolver.prototype.apply = function(resolver) {
	resolver.plugin('module', function(request, callback) {
		var firstChar = request.request[0],
			isIgnore = firstChar == '/' || firstChar == '\\' || firstChar == '.';		
		
		// only check the require that start with character.
		// if it already a relative path then skip it
		if (isIgnore || request.directory) return callback();

		// change to local relative format and check again
		var path = './' + request.request;

		return this.doResolve(['file','directory'], {
			path: request.path,
			request: path,
			query: request.query
		}, callback, true);
	});
}

function ModuleAsRelativePlugin() {}

// for the detail handle process see WebpackOptionsApply.js file under webpack/lib
ModuleAsRelativePlugin.prototype.apply = function(compiler) {
	// add custom resolver after default resolvers
	compiler.plugin('after-resolvers', function(compiler) {
		compiler.resolvers.normal.apply(new relativeResolver())
		compiler.resolvers.context.apply(new relativeResolver())
		compiler.resolvers.loader.apply(new relativeResolver())
	});
};

module.exports = ModuleAsRelativePlugin;