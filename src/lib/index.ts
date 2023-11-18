export function generateId() {
	return Math.floor(1000 + Math.random() * 9000).toFixed(1);
}

export function validateLinks(urlLink: string, shortLink: string) {
	// Check if all links ara empty or constains empty spaces

	const urlLinkWarn: boolean = /^\s*$/.test(urlLink);
	const shortLinkWarn: boolean = /^\s*$/.test(shortLink);

	return {
		urlLinkWarn,
		shortLinkWarn
	};
}
