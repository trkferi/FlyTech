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
		'$rootScope',
    'trans',
    ($rootScope, trans) => {

			// Set global cart
			$rootScope.cart = [];
			$rootScope.sum  = 0;

      // Transaction events
			trans.events('jaratok,cart');
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
		'$state',
		'$stateParams',
		'$rootScope',
		'$scope',
		'http',
		'util',
		function($state, $stateParams, $rootScope, $scope, http, util) {
	
				// Check state parameters not exist
				if (!$stateParams.flight) {

					// Check ignored states
          if ($rootScope.ignoredStates.includes($rootScope.state.prev))
					      $state.go('home');
          else  $rootScope.goToPreviousState();
				}

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
					
					// Set flights data, and names 
					$scope.data = response.flights;
					$scope.names = response.names;
					$scope.$applyAsync();
				})
				.catch(error => alert(error));
				
				// Confirm
				$scope.confirm = (event) => {
					let element 			= event.currentTarget,
							id 						= parseInt(element.dataset.id),
							index   			= util.indexByKeyValue($scope.data, 'flights_id', id),
							modalElement	= document.querySelector('#confirmModal');
					if (index !== -1 && modalElement) {
						$scope.model = {quantity: 1};
						$scope.item = {
							"Helyiség": $scope.flight.city,
							"Járat": $scope.data[index].name,
							"Járatszám": $scope.data[index].flights_id,
							"Irány": $scope.data[index].direction,
							"Távolság (km)": $scope.data[index].distance,
							"Időtartam (perc)": $scope.data[index].period,
							"Dátum": $scope.data[index].start.substr(0, 10),
							"Indulás": $scope.data[index].start.slice(-5),
							"Egységár (Ft)": util.mumberToStringThousandSeparator($scope.data[index].price),
							"Hely (db)": 1,
							"Össesen (Ft)": $scope.data[index].price
						}
						$scope.$applyAsync();
						let modal = new bootstrap.Modal(modalElement); 
						modal.show();
					}
				}

				// Flight to cart
				$scope.flightToCart = () => {
					let price = parseInt($scope.item["Egységár (Ft)"].replace(/\s/g,'')),
							total = $scope.model.quantity * price,
							item 	= {
												city: $scope.item["Helyiség"],
												flights_id: $scope.item["Járatszám"],
												name: $scope.item["Járat"],
												start: $scope.item["Dátum"] + " " + $scope.item["Indulás"],
												quantity: $scope.model.quantity,
												price: price,
												total: total 
											};
					
					let index = util.indexByKeyValue($rootScope.cart, 'flights_id', item.flights_id);
					if (index !== -1) {
									$rootScope.cart[index].quantity += item.quantity;
									$rootScope.cart[index].total += item.total;
					} else 	$rootScope.cart.push(item);
					$rootScope.sum += total;
					$rootScope.$applyAsync();
				}
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


			// Set methods
			let methods = {

				// Reset
				reset: (msg) => {

					// Reset model, and apply change
					Object.keys($scope.model).forEach(key => {
						if (key === 'country_code')
									$scope.model[key] = '36'

					});
					$scope.$applyAsync();

					// Show message
					$timeout(() => { alert(msg); }, 50);
				}
			};

			// Apply for test drive
			$scope.applyFor = () => {


				 let depature = new Date($scope.model.depature);
				 let arrive = new Date($scope.model.arrive);
				  
				 // Calculating the time difference
				 // of two dates
				 let Difference_In_Time =
				 arrive.getTime() - depature.getTime();
				  
				 // Calculating the no. of days between
				 // two dates
				 let days =
					 Math.round
						 (Difference_In_Time / (1000 * 3600 * 24));
				  
				 
				var price =days * 1300000;
				



				let args = {
					name: "Magán repülő: " + days + " nap",
					depature: moment($scope.model.depature).format('YYYY-MM-DD'),
					arrive: moment($scope.model.arrive).format('YYYY-MM-DD'),
					u_name: $scope.model.u_name,
					country_code: $scope.model.country_code,
					phone: $scope.model.phone,
					email: $scope.model.email,
					address: $scope.model.address,
					comment: $scope.model.comment,
					price: price,

				};

				// Http request
				http.request({
					method: 'POST',
					url		: './php/offer.php',
					data	: args
				})
				.then(response => methods.reset(response))
				.catch(error => methods.reset(error));


				// Http request
				http.request({
					url: './php/get_offer.php',
					data: {id: $scope.offer.id}
				})
				.then(response => {
					
					// Set offer
					$scope.data = response.offer;
					$scope.$applyAsync();
				})
				.catch(error => alert(error));


				$scope.toCart = (event) => {
					let element = event.currentTarget,
							id 			= parseInt(element.dataset.id),
							index   = util.indexByKeyValue($scope.data, 'id', id);
					if (index !== -1) {
						let item = util.cloneVariable($scope.data[index]);
						item.db  = 1;

						let uzenet = "Kosárba szeretnéd tenni?";
						

						if (confirm(uzenet)) {
							$rootScope.cart.push(item);
						}
					}
				}


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
			http.request('./php/get_optons.php')
			.then(response => {

				// Set data, and apply change
				$scope.data = response;
				$scope.$applyAsync();
			})
			.catch(e => $timeout(() => { alert(e); }, 50));

			// Set methods
			let methods = {

				// Reset
				reset: (msg) => {

					// Reset model, and apply change
					Object.keys($scope.model).forEach(key => {

						$scope.model[key] = null
					});
					$scope.$applyAsync();

					// Show message
					$timeout(() => { alert(msg); }, 50);
				}
			};

			// Apply for test drive
			$scope.applyFor = () => {

				let rating = 0;
				for(let i = 1; i <= 5; i++) {
					if ($scope.model[`star${i}`]) {
						rating = parseInt($scope.model[`star${i}`]);
						break;
					}
				}

				let args = {
					name: $scope.model.name,
					rating: rating,
					review: $scope.model.review
				};

				// Http request
				http.request({
					method: 'POST',
					url		: './php/opinions.php',
					data	: args
				})
				.then(response => {
					methods.reset(response);
					$scope.data.push(args);
					$scope.$applyAsync();
				})
				.catch(error => methods.reset(error));
			}
		}
	])



	// Cart controller
  .controller('cartController', [
		'$state',
		'$rootScope',
    '$scope',
		'$timeout',
		'http',
		'util',
    function($state, $rootScope, $scope, $timeout, http, util) {

			// Table header
			$scope.header = {
				city: "Helyiség",
				flights_id: "Járatszám",
				name: "Járat",
				start: "Indulás",
				price: "Egységár (Ft)",
				quantity: "Hely (db)",
				total: "Össesen (Ft)"
			};

			// Get current date, year, month
      let currentDate 	= new Date(),	
					currentYear 	= currentDate.getFullYear(),
					currentMonth	= currentDate.getMonth() + 1;

			// Set years
      $scope.years	= Array.from({length: 11}, (_, i) => currentYear + i);

			// Set months
      $scope.months = Array.from({length: 12}, (_, i) => (i+1).toString().padStart(2,'0'));

			// Set methods
			let methods = {

				// Reset
				reset: (msg) => {

					// Reset model, and apply change
					Object.keys($scope.model).forEach(key => {
						if (key === 'country_code')
									$scope.model[key] = '36'
						else 	$scope.model[key] = null
					});
					$scope.$applyAsync();

					// Set global cart
					$rootScope.cart = [];
					$rootScope.sum  = 0;
					$rootScope.$applyAsync();

					// Check ignored states
          if ($rootScope.ignoredStates.includes($rootScope.state.prev))
					      $state.go('home');
          else  $rootScope.goToPreviousState();

					// Show message
					$timeout(() => { alert(msg); }, 50);
				}
			};

			// Apply for test drive
			$scope.applyFor = () => {
				
				// Check credit card expiration
				if ($scope.model.year === currentYear &&
						parseInt($scope.model.month) < currentMonth) {
					alert('A hitelkártya lejárt!');
					return;
				}

				// Get neccesary input properties
				let args = util.objFilterByKeys($scope.model, [
					'year',
					'month',
				], false);

				// Set card expiration
				args.expiration = $scope.model.year + '/' + $scope.model.month;

				// Get neccesary cart properties
				let cart = util.arrayObjFilterByKeys($rootScope.cart, [
					'flights_id',
					'price',
					'quantity',
					'total'
				]);

				// Http request
				http.request({
					method: 'POST',
					url		: './php/cart.php',
					data	: {
						data: args,
						cart: cart
					}
				})
				.then(response => methods.reset(response))
				.catch(error => {
					$timeout(() => { alert(error); }, 50);
				});
			}

			// Delete cart item
			$scope.deleteCartItem = (event) => {
				if (!confirm('Biztos eltávolítja a kosárból?')) return;
				let element = event.currentTarget,
						index   = parseInt(element.closest('tr').dataset.index);
				$rootScope.sum -= parseInt($rootScope.cart[index].total);
				$rootScope.cart.splice(index, 1);
				$rootScope.$applyAsync();
			};
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