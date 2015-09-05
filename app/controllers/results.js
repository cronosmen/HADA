var args = arguments[0] || {};

function transformFunction(model) {
	console.log(model.toJSON());
    // Need to convert the model to a JSON object
    var transform = model.toJSON();
    // Example of creating a custom attribute, reference in the view using {custom}
    return transform;
}

/**
 * Closes the Window
 */
function closeWindow(){
	$.results.close();
}


// Trigger the synchronization
var results = Alloy.Collections.results;
results.fetch();