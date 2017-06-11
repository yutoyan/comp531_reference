/*******************************************
 * Test suite for status headline on main *
 *******************************************/
describe('Validate the status functionality of StatusCtrl', function () {
  var ctrl;

  beforeEach(module('riceBookApp'));
  
  beforeEach(inject(function($controller) {  
    ctrl = $controller('StatusCtrl');  
   
  }));

  it('Should have a status', function() {
    expect(ctrl.headline).toBeDefined();
  });    



});
