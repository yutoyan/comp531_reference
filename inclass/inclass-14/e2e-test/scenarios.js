describe('In class End to End Exercise', function() {
	'use strict'

	beforeEach(function() {
		browser.get('e2e/index.html');
	});

	it('should work and have header text', function() {		
		expect(element.all(by.css('h1')).first().getText()).toMatch("Dummy Server Example");	
	});

	function login() {
		// grab the current "message" and validate it is "You are Not Logged In"
		// log in by sending username and password for your test account
		// click the login button
		expect(element.all(by.css('.message')).first().getText()).toMatch("You are Not Logged In");
		element(by.css('[placeholder="username"]')).sendKeys('sz32');
		element(by.css('[placeholder="password"]')).sendKeys('morning-prevent-slow');
		element(by.css('[value="Login"]')).click();
			}


	function logout() {
		// click the logout button
		// grab the current "message" and validate it is "You are Not Logged In"
		element(by.css('[value="logout"]')).click();
		expect(element.all(by.css('.message')).first().getText()).toMatch("You are Not Logged In");

	}

	it('should log in as my test user and validate my status message', function() {		
		login();		
		// validate your username and status message
		expect(element.all(by.css('#username')).first().getText()).toMatch("sz32");
		expect(element.all(by.css('#status')).first().getText()).toMatch("Becoming a Web Developer!");
		logout();
	});

	function setStatus(value) {
		// find the new status input
		// type in the new "value"
		// click the update button
		element(by.model('vm.newStatus')).sendKeys(value);
		element(by.css('[value="Update Status"]')).click();
	}

	it('should update the status and then set it back', function() {
		login();

		// validate the current status message in the <span>
		expect(element.all(by.css('#status')).first().getText()).toMatch("Becoming a Web Developer!");

		var newStatus = "A new status message";
		setStatus(newStatus);
		// validate the new status message in the <span>
		expect(element.all(by.css('#status')).first().getText()).toMatch("A new status message");

		// revert back to the old status message
		var revertedStatus = "Becoming a Web Developer!";
		// setStatus(status)
		setStatus(revertedStatus);
		// validate it is correctly reverted in the <span>
		expect(element.all(by.css('#status')).first().getText()).toMatch("Becoming a Web Developer!");

		logout();
	});

});
