function(instance, properties, context) {
    
    // Ingest
    const pairs = Math.min(properties.keys.length(), properties.values.length());
    const keys = pairs ? properties.keys.get(0, pairs) : [];
    const values = pairs ? properties.values.get(0, pairs) : [];
    instance.publishState("keys", keys);
    instance.publishState("values", values);
    instance.publishState("context", properties.context);
    
    // Local storage
    if (properties.local) {
        keys.forEach(
            (k, i) => {
                localStorage.setItem(k, values[i] || null);
            }
        );
        instance.publishState("localkeys", Array.from({ length: localStorage.length }, (_, i) => { return localStorage.key(i); }));
    	instance.publishState("local", true);
    	instance.triggerEvent("queried");
    }
    
    // Session storage
    else if (properties.local != null) {
        keys.forEach(
            (k, i) => {
                sessionStorage.setItem(k, values[i] || null);
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