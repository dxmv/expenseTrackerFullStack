class User {
	username: string;
	email: string;
	password: string;
	constructor(username: string, email: string, password: string) {
		this.username = this._verifyUsername(username);
		this.email = email;
		this.password = password;
	}
	_verifyUsername(username: string) {
		if (username.length < 4 || username.length > 25) {
			throw new Error("Username must be between 4 and 25 chars long");
		}
		return username;
	}
}
export default User;
