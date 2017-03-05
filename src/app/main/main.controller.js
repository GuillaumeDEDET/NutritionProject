(function() {
  'use strict';

  angular
    .module('nutritionProject')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, nutritionixService, apiKey, appId, $scope, pantryService) {
    var vm = this;

    $scope.results = {};
    $scope.pantry = pantryService.getData() || [];
    console.log($scope.pantry);
    /*if($scope.pantry === undefined)
    {
      $scope.pantry = [];
    }*/
    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1487176899634;
    vm.showToastr = showToastr;
    //vm.getMatches = getMatches;

    $scope.table = {
      columns: ["Product Name", "Brand", "Calories", "Sodium", "Saturated Fat", "Actions"],
      dtOptions: {
        dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
        pagingType: 'simple',
        autoWidth: false,
        responsive: true,
        rowReorder: true,
        //language: {url: 'app/i18n/fr/datatable.json'},
        order: [[0, 'asc']]
      },
    };

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    $scope.pantryCalories = function() {
      var calories = 0;
      $scope.pantry.forEach(function (product) {
        calories += product.fields.nf_calories * product.quantity;
      });
      //$scope.checkCaloriesLimit(calories);
      return calories;
    };

    $scope.pantrySaturedFat = function() {
      var saturedFat = 0;
      $scope.pantry.forEach(function (product) {
        saturedFat += product.fields.nf_saturated_fat * product.quantity;
      });
      return saturedFat;
    };

    $scope.pantrySodium = function() {
      var sodium = 0;
      $scope.pantry.forEach(function (product) {
        sodium += product.fields.nf_sodium * product.quantity;
      });
      $scope.checkSodiumLimit(sodium);
      return sodium;
    };

    $scope.checkCaloriesLimit = function (calories) {
       if(calories > profile.getMaxCalories()){
       toastr.error('You have exceeded the maximum recommended calories limit per day !'); // Add error message
       }
    };

    $scope.checkSodiumLimit = function(sodium) {
      if(sodium > 5000){
        toastr.error('You have exceeded the maximum recommended  sodium limit per day (5g) !'); // Add error message
      }
    };

    $scope.getMatches = function(){
      if($scope.advancedSearch && $scope.searchLimit){
        nutritionixService.getAdvancedProducts($scope.searchText, $scope.searchLimit).then(function(d) {
          $scope.results = d.hits;
          console.log($scope.results);
        });
      }
      else
      {
        nutritionixService.getProducts($scope.searchText).then(function(d) {
          $scope.results = d.hits;
          console.log($scope.results);
        });
      }
    };

    $scope.addProductToPantry = function (product) {
      product.quantity = 1;
      $scope.pantry.push(product);
      console.log($scope.pantry);
      pantryService.setData($scope.pantry);
    };

    $scope.deleteProductFromPantry = function (index) {
      $scope.pantry.splice(index,1);
      pantryService.setData($scope.pantry);
    };

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
