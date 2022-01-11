module.exports.useGuard = (guard) => {
	return async (req, res, next) => {
		try {
			await guard(req);
			next()
		} catch (e) {
			console.error(e)
			return res.json({ message: e.message });
		}

	};
};
