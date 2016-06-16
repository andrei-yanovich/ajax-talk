(function (ajax) {
    var rootUrl = 'http://ajaxepam.azurewebsites.net/';

    ajax.makeAjaxGet = function makeAjaxGet () {
        var req = getXhr();

        attachReadyState(req);
        
        req.open("GET", rootUrl + 'echo?testingMethod=Get', true);
        req.send(null);
    };

    ajax.makeJSONP = function makeJSONP() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = rootUrl + 'jsonp?cb=callbackForJSONP';
        window.callbackForJSONP = function(response) {
            var responseContainer = document.querySelector(".response");
            responseContainer.innerText = JSON.stringify(response);
            document.body.removeChild(script);
        };
        document.body.appendChild(script);
    };

    ajax.makeAjaxPost = function makeAjaxPost() {
        var req = getXhr();
        attachReadyState(req);
        
        req.open("POST", rootUrl + 'echo', true);
        req.setRequestHeader('Content-type', 'application/json');
        req.send(JSON.stringify({
                name: 'Object',
                title: 'ajaxPost'
            }));
    };
    
    ajax.makeJqueryGet = function makeJqueryGet() {
        $.ajax({
            type: 'GET',
            url: rootUrl + 'echo',
            data: { testingMethod: 'jqueryGet' },
            success: function(resp) {
                var responseContainer = document.querySelector(".response");
                responseContainer.innerText = JSON.stringify(resp);
            }
        });
    };
    
    ajax.makeJqueryJSONP = function makeJqueryJSONP() {
        $.ajax({
            type: 'GET',
            url: rootUrl + 'jsonp',
            jsonp: 'cb',
            dataType: 'jsonp',
            data: { testingMethod: 'jqueryJSONP' },
            success: function (resp) {
                var responseContainer = document.querySelector(".response");
                responseContainer.innerText = JSON.stringify(resp);
            }
        });
    };

    function getXhr() {
        // XDomainRequest for IE8, IE9
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        return new XHR();
    }

    function attachReadyState (req) {
        req.onreadystatechange = function () {
            if (req.readyState != 4 || req.status != 200) {
                return;
            }
            var responseContainer = document.querySelector(".response");
            responseContainer.innerText = req.responseText;
        };
    }

})(typeof exports === 'undefined' ? this['ajax']={}: exports);
// this allows us to use file in browser and node.js
// in node.js we have exports in parent scope to write modules
// in browser we don't have exports and we will expose module in window obj. `this` is pointing to window.  
// Prob. not a best practice to follow, but for ours app it's ok.