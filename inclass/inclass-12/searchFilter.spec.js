/************************************
 * Test suite for filtering on main *
 ************************************/
describe('Validate the filtering functionality of MainPageCtrl', function () {
  var ctrl;

  beforeEach(module('riceBookApp'));
  
  beforeEach(inject(function($controller) {  
    ctrl = $controller('MainPageCtrl');  
   
  }));

  it('there are initially 5 cards', function() {
    expect(ctrl.cards.length).toBe(5);
  });    

  it('user input is undefined', function() {
    expect(ctrl.searchKeyword).not.toBeDefined();
  }); 

  it('search for Eric should return 1 card', inject(function (selectiveFilterFilter) {
    expect(selectiveFilterFilter(ctrl.cards,"Eric").length).toBe(1);
  }
  ));

it('search for "Jan 01 2015", which is included in the time of one post and the body of another post, should return 1 card', inject(function (selectiveFilterFilter) {
    expect(selectiveFilterFilter(ctrl.cards,"Jan 01 2015").length).toBe(1);
  }
  ));

it('search for "Feu 12 2015",which is included in the time of one post, should return 0 card', inject(function (selectiveFilterFilter) {
    expect(selectiveFilterFilter(ctrl.cards,"Feu 12 2015").length).toBe(0);
  }
  ));


});
