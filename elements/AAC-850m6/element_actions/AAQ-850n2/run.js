function(instance, properties, context) {
    
    // Ingest
    instance.publishState("keys", []);
    instance.publishState("values", []);
    instance.publishState("context", properties.context);
    
    // Local storage
    if (properties.local) {
    	localStorage.clear();
        instance.publishState("localkeys", []);
        instance.publishState("local", true);
    	instance.triggerEvent("queried");
    }
    
    // Session storage
    else if (properties.local != null) {
    	sessionStorage.clear();
        instance.publishState("sessionkeys", []);
        instance.publishState("local", false);
    	instance.triggerEvent("queried");
    }
    
    // No storage
    else {
    	instance.publishState("local", null);
    }
}