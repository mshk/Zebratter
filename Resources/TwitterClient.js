Ti.include('oauth_adapter.js');

var TwitterClient = function(secret, key)
{
    var oAuthAdapter = new OAuthAdapter(secret, key, 'HMAC-SHA1');

    // load the access token for the service (if previously saved)
    oAuthAdapter.loadAccessToken('twitter');

    this.hello = function() {
	alert("hello");
    };

    this.postEntry = function(tweet) {

	oAuthAdapter.send('https://api.twitter.com/1/statuses/update.json', 
			       [['status', tweet]], 'Twitter', 'Published.', 'Not published.');

	this.checkIfAuthorized();

    };

    this.checkIfAuthorized = function() {
	// if the client is not authorized, ask for authorization. the previous tweet will be sent automatically after authorization
	if (oAuthAdapter.isAuthorized() == false)
	    {
		// this function will be called as soon as the application is authorized
		var receivePin = function() {
		    // get the access token with the provided pin/oauth_verifier
		    oAuthAdapter.getAccessToken('https://api.twitter.com/oauth/access_token');
		    // save the access token
		    oAuthAdapter.saveAccessToken('twitter');
		};

		// show the authorization UI and call back the receive PIN function
		oAuthAdapter.showAuthorizeUI('https://api.twitter.com/oauth/authorize?' + oAuthAdapter.getRequestToken('https://api.twitter.com/oauth/request_token'), receivePin);
	    }

    };

};