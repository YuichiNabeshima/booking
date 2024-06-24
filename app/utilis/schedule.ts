/**
 * Returns a timestamp for one week around the date
 */
export const getThisWeek = (day: string) => {
  const dayofweek = new Date(day).getDay();
	const count = 7;
	const week = [...Array(count)].map((_, i) => {
		const date = new Date(day);
		return date.setDate(date.getDate() + i - dayofweek);
	});

	return week;
};
