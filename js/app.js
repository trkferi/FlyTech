;(function(window, angular) {

  'use strict';

  // Application module
  angular.module('app', [
    'ui.router',
		'app.common'
  ])

  // Application config
  .config([
    '$stateProvider', 
    '$urlRouterProvider', 
    ($stateProvider, $urlRouterProvider) => {

      $stateProvider
      .state('root', {
				abstract: true,
				views: {
					'@': {
						templateUrl: './html/root.html'
					},
					'header@root': {
						templateUrl: './html/header.html'
					},
					'footer@root': {
						templateUrl: './html/footer.html',
						controller: 'footerController'
					}
				}
      })
			.state('home', {
				url: '/',
				parent: 'root',
				templateUrl: './html/home.html',
				controller: 'homeController'
			})
			.state('flights', {
				url: '/flights',
				parent: 'root',
				templateUrl: './html/flights.html',
				controller: 'flightsController'
			})
			.state('test_drive', {
				url: '/test_drive',
				parent: 'root',
				templateUrl: './html/test_drive.html',
				controller: 'test_driveController'
			})
			.state('offer', {
				url: '/offer',
				parent: 'root',
				templateUrl: './html/offer.html',
				controller: 'offerController'
			})
			.state('relationship', {
				url: '/relationship',
				parent: 'root',
				templateUrl: './html/relationship.html',
				controller: 'relationshipController'
			})
			.state('about_us', {
				url: '/about_us',
				parent: 'root',
				templateUrl: './html/about_us.html',
				controller: 'about_usController'
			})
			.state('opinions', {
				url: '/opinions',
				parent: 'root',
				templateUrl: './html/opinions.html',
				controller: 'opinionsController'
			})
			.state('cart', {
				url: '/cart',
				parent: 'root',
				templateUrl: './html/cart.html',
				controller: 'cartController'
			});
			
      $urlRouterProvider.otherwise('/');
    }
  ])

  // Application run
  .run([
    'trans',
    (trans) => {

      // Transaction events
			trans.events();
    }
  ])

	// Home controller
  .controller('homeController', [
    '$scope',
    function($scope) {

			// Set data
			$scope.data = [
				{img:'clock', 					text:'Rugalmasság'},
				{img:'pig', 						text:'Kedvező árak'},
				{img:'foglalas', 				text:'Gyors foglalás'},
				{img:'convenient-_2_', 	text:'Kényelem'},
				{img:'family', 					text:'Családi kedvezmények'},
				{img:'pet-care', 				text:'Házi kedvenceket szívesen fogadunk'}
			];
		}
	])

	// Flights controller
  .controller('flightsController', [
    '$scope',
    function($scope) {
			
			// Set data
			$scope.data = [
				{img:'dunakeszi',	city:'Dunakeszi'},
				{img:'heviz', 		city:'Hévíz'},
				{img:'szeged', 		city:'Szeged'},
				{img:'debrecen', 	city:'Debrecen'}
			];
		}
	])

	// Test drive controller
  .controller('test_driveController', [
    '$scope',
    function($scope) {
			console.log('Test drive controller...');
		}
	])

	// Offer controller
  .controller('offerController', [
    '$scope',
    function($scope) {
			console.log('Offer controller...');
		}
	])

	// Relationship controller
  .controller('relationshipController', [
    '$scope',
    function($scope) {
			
			// Set data
			$scope.data = [
				'https://www.booking.com/index.hu.html',
				'https://www.aquaworldresort.hu/hu/aquaworld',
				'https://szallas.hu',
				'https://hps.hu',
				'https://mercurehoteltokaj.hu',
				'https://eventrend.hu',
				'https://csodalatosbalaton.hu',
				'https://tflotta.eu',
				'https://budapestbrand.hu',
				'https://www.falutur.hu',
				'https://zoobudapest.com',
				'https://www.danubiushotels.com/hu',
			];
		}
	])

	// About us controller
  .controller('about_usController', [
    '$scope',
    function($scope) {
			
			// Set data
			$scope.data = [
				{
					img: 'Feri.jpg',	
					name: 'Török Ferenc', 
					phone: '+36 30 125 5578', 
					profession: 'Igazgató'
				},
				{
					img: 'én1.jpeg', 	
					name: 'Vörös Alexandra', 
					phone: '+36 30 291 5095', 
					profession: 'Igazgató'
				},
				{
					img: 'manager.jpg', 	
					name: 'Kovács István', 
					phone: '+36 70 544 2548', 
					profession: 'Manager'
				},
				{
					img: 'KoszoCsaba.jpg', 	
					name: 'Koszó Csaba', 
					phone: '+36 70 584 255', 
					profession: 'Pilóta'
				},
				{
					img: 'laura1.jpg', 	
					name: 'Balog-Vigh Laura', 
					phone: '+36 30 256 8995', 
					profession: 'Pilóta'
				},
				{
					img: 'SzaboLajos.jpg', 	
					name: 'Szabó Lajos', 
					phone: '+36 70 458 7447', 
					profession: 'Pilóta'
				},
				{
					img: 'NagyMiklos.webp', 	
					name: 'Nagy Miklós', 
					phone: '+36 70 859 9696', 
					profession: 'Légiforgalmi irányító'
				},
				{
					img: 'PeterfyGyorgy.webp', 	
					name: 'Péterfy György', 
					phone: '+36 30 236 4115', 
					profession: 'Légiforgalmi irányító'
				},
				{
					img: 'cica.jpg', 	
					name: 'Maszat', 
					phone: '', 
					profession: 'Ügyfélszolgálati munkatárs'
				},
				{
					img: 'linda.jpg', 	
					name: 'Kovács Linda', 
					phone: '+36 70 854 0233', 
					profession: 'Légiforgalmi irányító'
				},
				{
					img: 'viki.jpg', 	
					name: 'Illyés Viktória', 
					phone: '+36 30 874 2666', 
					profession: 'Légiforgalmi irányító'
				},
				{
					img: 'edit.jpg', 	
					name: 'Hajdú Edit', 
					phone: '+36 70 854 2511', 
					profession: 'Pilóta'
				},
				{
					img: 'erik.jpg', 	
					name: 'Börcsök Erik', 
					phone: '+36 70 994 7856', 
					profession: 'Pilóta'
				},
				{
					img: 'szerelo.jpg', 	
					name: 'Pap Gergő', 
					phone: '+36 30 369 5584', 
					profession: 'Repülési üzemeltető'
				},
				{
					img: 'szerelo2.jpg', 	
					name: 'Tóth Márk', 
					phone: '+36 70 656 2881', 
					profession: 'Repülési üzemeltető'
				}
			];
		}
	])

	// Opinions controller
  .controller('opinionsController', [
    '$scope',
    function($scope) {
			console.log('Opinions controller...');
		}
	])

	// Cart controller
  .controller('cartController', [
    '$scope',
    function($scope) {
			console.log('Cart controller...');
		}
	])

	// Footer controller
  .controller('footerController', [
    '$scope',
    function($scope) {

			$scope.feliratkozas = () => {
    		let email = document.getElementById('email');
				if (email) {
					if(email.value)
								alert("Sikeresen feliratkozott a hírlevelünkre!");
					else	alert("Kérem adja meg az e-mail címét!");
					email.value = null;
				}
			};
		}
	]);

})(window, angular);