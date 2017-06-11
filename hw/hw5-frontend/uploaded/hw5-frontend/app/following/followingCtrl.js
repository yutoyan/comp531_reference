;(function () {
    angular.module('riceBookApp').controller('FollowingCtrl', function () {
            var vm = this;
            vm.followings = [
                {
                    'name': 'Normand Edmund Winship',
                    'imgSrc': 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png',
                    'status': "WARNING!! I know karate …..and some other words!!!"
                },
                {
                    'name': 'Sevan Voski',
                    'imgSrc': 'http://cf.ltkcdn.net/socialnetworking/images/std/168796-281x281-girl-swear-icon.png',
                    'status': "In victory, you deserve Champagne. In defeat you need it."
                },
                {
                    'name': 'Cayley Rosemarie Parrish',
                    'imgSrc': 'http://megaicons.net/static/img/icons_sizes/189/462/256/comics-mask-icon.png',
                    'status': "Who care’s ?????………..I’m awesome"
                },
                {
                    'name': 'Christopher Sachie Akerman',
                    'imgSrc': 'http://findicons.com/files/icons/175/halloween_avatar/256/mike.png',
                    'status': "Read books instead of reading my status!"
                }
            ];
        }
    )
})();
