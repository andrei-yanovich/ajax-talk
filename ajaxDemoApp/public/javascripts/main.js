(function(global) {
	var ajax = global.ajax;
	if (!ajax) {
		console.log('!!!!!! --- Error ajax module should be initialized --- !!!!!!!');
		return;
	}

	var apiPicker = document.getElementById('apiPicker');
	var sendButton = document.getElementById('send');
	
	var ajaxCallToRun = apiPicker.value;
	attachClickHandler(sendButton, ajax[ajaxCallToRun]);
	
	apiPicker.addEventListener('change', function(event) {
		removeClickHandler(sendButton, ajax[ajaxCallToRun]);
		ajaxCallToRun = event.target.value;
		attachClickHandler(sendButton, ajax[ajaxCallToRun]);
	});
	
	function attachClickHandler(element, handler) {
		element.addEventListener('click', handler);
	}
	function removeClickHandler(element, handler) {
		element.removeEventListener('click', handler);
	}
})(window);