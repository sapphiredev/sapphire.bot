import {
	OAuth as _OAuth,
} from 'oauth';

const {
	consumer_key,
	consumer_secret,
} = process.env;

const oauth = new _OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	consumer_key,
	consumer_secret,
	'1.0A',
	null,
	'HMAC-SHA1',
);

class OAuth {
	static oauth_token;
	static oauth_token_secret;

	static getRequestToken() {
		let self = this;

		return new Promise((resolve, reject) => {
			oauth.getOAuthRequestToken((err, oauth_token, oauth_token_secret) => {
				if(err) {
					reject(err);
				}
				else {
					self.oauth_token = oauth_token;
					self.oauth_token_secret = oauth_token_secret;

					resolve({
						'oauth_token': oauth_token,
						'oauth_token_secret': oauth_token_secret,
					});
				}
			});
		});
	}

	static getAccessToken(token) {
		let self = this;

		const oauth_verifier = token.oauth_verifier;

		return new Promise((resolve, reject) => {
			oauth.getOAuthAccessToken(self.oauth_token, self.oauth_token_secret, oauth_verifier, (err, access_token, access_token_secret) => {
				if(err) {
					reject(err);
				}
				else {
					resolve({
						'access_token': access_token,
						'access_token_secret': access_token_secret,
					});
				}
			});
		});
	}
}

export default OAuth;
