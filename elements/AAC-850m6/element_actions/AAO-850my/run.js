function(instance, properties, context) {
    
    // Ingest
    const keys = properties.keys.length() ? properties.keys.get(0, properties.keys.length()) : [];
    const values = [];
    const founds = [];
    instance.publishState("context", properties.context);
    
    // Local storage
    if (properties.local) {
        keys.forEach(
        	(k) => {
                const v = localStorage.getItem(k);
                if (v != null) {
                	founds.push(k);
                    values.push(v);
                }
            }
        );
        instance.publishState("values", values);
        instance.publishState("keys", founds);
    	instance.publishState("local", true);
    	instance.triggerEvent("queried");
    }
    
    // Session storage
    else if (properties.local != null) {
        keys.forEach(
        	(k) => {
                const v = sessionStorage.getItem(k);
                if (v != null) {
                	founds.push(k);
                    values.push(v);
                }
            }
        );
        instance.publishState("values", values);
        instance.publishState("keys", founds);
    	instance.publishState("local", false);
    	instance.triggerEvent("queried");
    }
    
    // No storage
    else {
    	instance.publishState("local", null);
    }
}