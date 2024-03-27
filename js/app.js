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
			})
			.state('jaratok', {
				url: '/jaratok',
				parent: 'root',
				templateUrl: './html/jaratok.html',
				params: {flight:null},
				controller: 'jaratokController'
			});
			
      $urlRouterProvider.otherwise('/');
    }
  ])

  // Application run
  .run([
    'trans',
    (trans) => {

      // Transaction events
			trans.events('jaratok');
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
			'http',
		function($scope, http) {
				
				// Http request
				http.request('./php/starting_point.php')
				.then(response => {
					
					// Set data
					$scope.data = response;
					$scope.$applyAsync();
				})
				.catch(error => alert(error));
			}
		])
	
		// Járatok controller
	  .controller('jaratokController', [
			'$stateParams',
		'$scope',
			'http',
		function($stateParams, $scope, http) {
	
				// Set actual flight from state parameters
				$scope.flight = $stateParams.flight;
				
				// Table header
				$scope.header = [
					"Távolság (km)",
					"Időtartam (perc)",
					"Ár (Ft)",
					"Indulás",
				];
	
				// Http request
				http.request({
					url: './php/jaratok.php',
					data: {id: $scope.flight.id}
				})
				.then(response => {
					
					// Set data
					$scope.data = response;
					$scope.$applyAsync();
				})
				.catch(error => alert(error));			
			}
		])
	

	// Test drive controller
  .controller('test_driveController', [
    '$scope',
		'$timeout',
		'http',
    function($scope, $timeout, http) {

			$scope.data = [
				{name: 'Hawker 400xp', img:'hawker.jpg'},
				{name: 'King air 250', img:'king_air.jpg'},
				{name: 'Citation Mustang', img:'citation_mustang.jpg'}
			];

			$scope.plane = null;
			$scope.$watch('model.selected', (newValue, oldValue) => {
				if (!angular.equals(newValue, oldValue)) {
					$scope.plane = newValue.img;	
					$scope.$applyAsync();

				}	
			});

			// Set methods
			let methods = {

				// Reset
				reset: (msg) => {

					// Reset model, and apply change
					Object.keys($scope.model).forEach(key => {
						if (key === 'country_code')
									$scope.model[key] = '36'
						else if (key === 'experience')
									$scope.model[key] = false
						else 	$scope.model[key] = null
					});
					$scope.$applyAsync();

					// Show message
					$timeout(() => { alert(msg); }, 50);
				}
			};

			// Apply for test drive
			$scope.applyFor = () => {

				// Http request
				http.request({
					method: 'POST',
					url		: './php/test_drive.php',
					data	: $scope.model
				})
				.then(response => methods.reset(response))
				.catch(error => methods.reset(error));
			}
		}
	])

	// Offer controller
  .controller('offerController', [
	'$scope',
	'$timeout',
	'http',
    function($scope, $timeout, http) {
			// Get data
			http.request('./data/opinions.json')
			.then(response => {

				// Set data, and apply change
				$scope.data = response;
				$scope.$applyAsync();
			})
			.catch(e => $timeout(() => { alert(e); }, 50));


			// Apply for test drive
			$scope.applyFor = () => {

				// Http request
				http.request({
					method: 'POST',
					url		: './php/opinions.php',
					data	: $scope.model
				})
				.then(response => methods.reset(response))
				.catch(error => methods.reset(error));
			}
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
		'$timeout',
		'http',
    function($scope, $timeout, http) {
			
			// Get data
			http.request('./data/about_usController.json')
			.then(response => {

				// Set data, and apply change
				$scope.data = response;
				$scope.$applyAsync();
			})
			.catch(e => $timeout(() => { alert(e); }, 50));
		}
	])

	// Opinions controller
  .controller('opinionsController', [
    '$scope',
		'$timeout',
		'http',
    function($scope, $timeout, http) {

			// Get data
			http.request('./data/opinions.json')
			.then(response => {

				// Set data, and apply change
				$scope.data = response;
				$scope.$applyAsync();
			})
			.catch(e => $timeout(() => { alert(e); }, 50));


			// Apply for test drive
			$scope.applyFor = () => {

				// Http request
				http.request({
					method: 'POST',
					url		: './php/opinions.php',
					data	: $scope.model
				})
				.then(response => methods.reset(response))
				.catch(error => methods.reset(error));
			}
		}
	])



	// Cart controller
  .controller('cartController', [
    '$scope',
		'$timeout',
		'http',
    function($scope, $timeout, http) {

			// Apply for test drive
			$scope.applyFor = () => {

				// Http request
				http.request({
					method: 'POST',
					url		: './php/cart.php',
					data	: $scope.model
				})
				.then(response => methods.reset(response))
				.catch(error => methods.reset(error));
			}
		}
	])

	// Footer controller
  .controller('footerController', [
    '$scope',
		'$timeout',
		'http',
    function($scope, $timeout, http) {

			// Set methods
			let methods = {

				// Reset
				reset: (msg) => {

					// Reset model, and apply change
					$scope.model.news_email = null;
					$scope.$applyAsync();

					// Show message
					$timeout(() => { alert(msg); }, 50);
				}
			};

			// Subscribe to the newsletter
			$scope.feliratkozas = () => {

				// Http request
				http.request({
					method: 'POST',
					url		: './php/newsletter.php',
					data	: {email: $scope.model.news_email}
				})
				.then(response => methods.reset(response))
				.catch(error => methods.reset(error));
			};
		}
	]);

})(window, angular);