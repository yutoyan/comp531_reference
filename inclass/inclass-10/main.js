var elClear = document.getElementById("clearPost");
var elUpdateHeadline = document.getElementById("updateHeadline");

//Clear user's input for a new post
elClear.onclick = function () {
	var elInputField = document.getElementById("postInputField");
	elInputField.value = "";
};

//Angular part for cards data
angular.module('helloNg',[])
.controller('CardsCtrl', CardsCtrl);

CardsCtrl.$inject = ['$scope'];
function CardsCtrl($scope){
	$scope.cards = [
	{'poster': 'Joe', 'time': (new Date(1430012345678 + Math.random()*130e8)).toDateString(), 'body':'Aenean eget tortor et ipsum convallis convallis non sit amet massa. Donec nec vestibulum sem. Sed et est molestie, congue magna vitae, aliquet lacus. Ut in scelerisque ante. Curabitur ultricies est id consectetur suscipit. In ut lectus congue, dapibus lectus nec, hendrerit augue. Nullam dignissim pretium dictum. Fusce maximus condimentum orci at aliquet. Donec dictum eget leo non vehicula. Morbi consectetur dictum eros in rutrum. Sed quis rhoncus risus', 'imageSrc':"http://infosthetics.com/archives/chillmaster.jpg"},
	{'poster': 'Max', 'time': (new Date(1430012345678 + Math.random()*130e8)).toDateString(), 'body':'Curabitur quis malesuada neque. Nulla quis mi congue, auctor ante id, cursus nunc. Vivamus dui nisl,pharetra quis risus eu, mattis congue mi. In pellentesque hendrerit eros eget porta. Pra esent utmetussuscipit, aliquam arcu a, euismod mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Duisrhoncus, dui sed porttitor placerat, felis mauris hendrerit tortor, non a liquet metus mi non ligula.Nuncvelit purus, hendrerit ac pellentesque at, scelerisque non justo. Fusce ligula ex, sagittis sit ametjustoac, scelerisque facilisis lectus. Ut in efficitur tu rpis. Mauris scelerisque dapibus ligula, velmolestierisus viverra a. Donec in ultrices mauris. Nunc vestibulum quam mauris, sed sollicitudin uameleifendfermentum.', 'imageSrc':"http://barnabasartshouse.co.uk/wp-content/uploads/2012/08/THE-BEACONS-GROUPING-4002.jpg"},
	{'poster': 'Scott', 'time': (new Date(1430012345678 + Math.random()*130e8)).toDateString(), 'body':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tristique vitae nulla sit amet vehicula. Vestibulum placerat nec magna et rhoncus. Sed in sapien tempus, dictum arcu eu, efficitur nunc. Suspendisse molestie sed ligula vel accumsan. Suspendisse potenti. Nullam lectus mi, bibendum vitae gravida at, commodo eget tortor. Maecenas posuere auctor turpis, et egestas urna sollicitudin quis. Sed tortor turpis, blandit vel convallis at, mattis nec dolor. Phasellus vitae imperdiet magna. Sed gravida nisl nec fringilla posuere. Cras aliquam, lacus nec ultricies malesuada, lorem mauris maximus orci, eget auctor metus mauris semper elit. Suspendisse potenti. Vestibulum imperdiet sollicitudin tellus, bibendum egestas risus ornare vitae.', 'imageSrc':"http://www.jackslawn.com/PIX/landscape_04.jpg"},
	{'poster': 'Rachel', 'time': (new Date(1430012345678 + Math.random()*130e8)).toDateString(), 'body':'Sed vitae congue urna, vel vestibulum enim. Maecenas congue leo et velit hendrerit viverra. Vivamus mollis neque eu elit aliquam suscipit. Quisque mollis elementum nunc congue maximus. Fusce gravida eu elit in rutrum. Curabitur tellus tellus, sodales dapibus consequat at, tempor vel eros. Nulla vitae metus eu est tempus elementum a et velit. Phasellus in odio nibh. Curabitur sit amet tortor id turpis mollis ullamcorper at at erat. Nam at faucibus justo, sit amet fringilla nisi. Suspendisse rutrum augue at porta molestie.', 'imageSrc':"http://www.allsaintschurch.org.uk/wp-content/uploads/daffs-landscape-400x200.jpg"},
	{'poster': 'Eric', 'time': (new Date(1430012345678 + Math.random()*130e8)).toDateString(), 'body':'Vivamus tristique urna a convallis vulputate. Sed vitae aliquam nunc. Phasellus laoreet tellus a ex laoreet ornare. Aliquam sem augue, efficitur sit amet lobortis sed, dignissim ac neque. Morbi congue eleifend lorem, fringilla dignissim sem pharetra vel. Fusce tempus non arcu id dignissim. Donec rhoncus nisl ante, ac iaculis augue porta nec. Aenean interdum orci at arcu dictum, ac suscipit nulla facilisis. Proin augue nisi, fermentum et cursus ut, auctor nec purus. Sed tempus mi ex, ac accumsan elit rhoncus vel. Integer rhoncus eget elit id auctor. Donec condimentum fringilla ligula sed scelerisque. Donec euismod feugiat leo, nec consequat nisl ultricies placerat. Quisque tincidunt pharetra laoreet. In ac diam ut lacus pulvinar placerat id non lectus.', 'imageSrc':"https://images.blogthings.com/thecutemonstertest/button.png"},

	];
}

