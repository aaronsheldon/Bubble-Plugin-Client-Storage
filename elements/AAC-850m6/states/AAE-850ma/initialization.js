function(properties, context) {

	// Announce
    return Array.from({ length: localStorage.length }, (_, i) => { return localStorage.key(i); });
}