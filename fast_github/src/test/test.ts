type RangeScopeType = [start: number, end: number];
const randomUniqueNumbers = (range: RangeScopeType, count: number) => {
	const [start, end] = range;

	if (start > end) {
		return [];
	}

	const maxCount = end - start - 1;
	let numberContainer = new Set<number>();
	const useCount = count >= maxCount ? maxCount : count;

	while (numberContainer.size < useCount) {
		numberContainer.add(Math.floor(Math.random() * (start - end + 1) + end));
	}
	return [...numberContainer].sort();
};

const result = randomUniqueNumbers([1, 10], 2);

console.log(result);
