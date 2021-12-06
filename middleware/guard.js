module.exports.useGuard = (guard) => {
	return async (req, res, next) => {
		try {
			await guard(req);
			next()
		} catch (e) {
			console.error(e)
			// TODO: CUSTOMIZE TO YOUR NEED LATER
			return res.json({ message: e.message });
		}

	};
};
