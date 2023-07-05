function(instance, properties, context) {
    
    // Ingest
    const keys = properties.keys.length() ? properties.keys.get(0, properties.keys.length()) : [];
    instance.publishState("keys", keys);
    instance.publishState("values", []);
    instance.publishState("context", properties.context);
    
    // Local storage
    if (properties.local) {
        keys.forEach(
        	(k) => {
            	localStorage.removeItem(k);
            }
        );
        instance.publishState("localkeys", Array.from({ length: localStorage.length }, (_, i) => { return localStorage.key(i); }));
    	instance.publishState("local", true);
    	instance.triggerEvent("queried");
    }
    
    // Session storage
    else if (properties.local != null) {
        keys.forEach(
        	(k) => {
            	sessionStorage.removeItem(k);
            }
        );
        instance.publishState("sessionkeys", Array.from({ length: sessionStorage.length }, (_, i) => { return sessionStorage.key(i); }));
    	instance.publishState("local", false);
    	instance.triggerEvent("queried");
    }
    
    // No storage
    else {
    	instance.publishState("local", null);
    }
}