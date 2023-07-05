function(properties, context) {

	// Announce
    return Array.from({ length: sessionStorage.length }, (_, i) => { return sessionStorage.key(i); });
}