//code for handling html
var app=angular.module('handlingApp',['ui.router']);

app.config(function($stateProvider,$urlRouterProvider)
		{
	$urlRouterProvider.otherwise('home');
	$stateProvider
	.state('home',{
		name: 'home',
		url:'/index',
		templateUrl:'/assets/html/home.html'
	}).state('about',{
			name: 'about',
			url:'/about',
			templateUrl:'/assets/html/about1.html'
		}).state('contact',{
			name: 'contact',
			url:'/contact',
			templateUrl:'/assets/html/contact1.html'
		}).state('login',{
			name: 'login',
			url:'/login',
			templateUrl:'/assets/html/login.html'
		}).state('signup',{
			name: 'signup',
			url:'/signup',
			templateUrl:'/assets/html/signup.html'
		});
});
app.controller('handlingCrtl',function($scope,$http){
	$scope.count=0;
	$scope.success=false;
	$scope.error=false;
	/*$scope.renderButton=function(){
		gapi.signin2.render('my-signin2', {
			'scope': 'profile email',
			'width': 240,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
			'onsuccess': Onsuccess,
			'onfailure': Onfailure
			}).Onsuccess(function(googleUser) {
				console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
				alert("Logged in as: "+ googleUser.getBasicProfile().getName());
				window.location.href="frstup.php";
				}).Onfailure(function(error) {
					console.log(error);
				});
	}*/
	$scope.login=function(user,pass){
		
		$scope.username=user;
		$scope.password=pass;
		if(user!=null||pass!=null){
		$http({
			method:'POST',
			url:'/api/login',
			data:{'user':user,'password':pass}
		}).success(function(response){
//			$cookie.put('username',user);
//			$cookie.put('password',pass);
			alert(response);
			 window.location = "/frstup";
		}).error(function(response){
			$scope.count=$scope.count+1;
			//alert($cookie.get('username'));
			alert(response);
		});
		}else
			{
			alert("UserName Or Password Can't Be Empty!!");
			}
	}
	$scope.signup=function(){
		$scope.error=false;
		if($scope.password==$scope.cpassword)
		{
		$http({
			method:'POST',
			url:'/api/signup',
			data:{"username":$scope.username,"email_id":$scope.emailId,"password":$scope.password}
		}).success(function(response){
			
			 setTimeout(function(){
				 $scope.success=false;
				 window.location = "/login";
			 },3000);
			 $scope.success=true;
			}).error(function(response){
				$scope.error=true;
			});
		
		}else
			{
				$scope.error=true;
				 setTimeout(function(){
					 $scope.error=false;
					
				 },3000);
			}
	}
});
