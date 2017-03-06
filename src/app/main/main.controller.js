(function() {
  'use strict';

  angular
    .module('nutritionProject')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(toastr, nutritionixService, profilesService, pantryService) {

    var vm = this;

    init();

    /**
     *  Initialize controller
     */
    function init(){

      vm.results = {};

      // Initialize pantry with localStorage if exist or empty
      vm.pantry = pantryService.getData() || [];

      vm.loadingProgress = false;

      // Load profiles from service
      profilesService.getProfiles().then(function(d) {
        vm.profiles = d.profiles;
      });

      // Initialize activeProfile with localStorage if exist or with 'None'
      vm.activeProfile = profilesService.getActiveProfile() || 'None';

      // Initialize datatable options
      vm.table = {
        columns: ["Product Name", "Brand", "Calories", "Sodium", "Saturated Fat", "Actions"],
        dtOptions: {
          dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
          pagingType: 'simple',
          autoWidth: false,
          responsive: true,
          rowReorder: true,

          order: [[0, 'asc']]
        }
      };

    }

    // NUTRITIONIX METHOD \\

    /**
     * Get results of search from nutritionixService
     */
    vm.getMatches = function(){

      // Active the loading circle element
      vm.loadingProgress = true;

      //Check if its an advanced search or normal search
      if(vm.advancedSearch && vm.searchLimit){
        nutritionixService.getAdvancedProducts(vm.searchText, vm.searchLimit).then(function(d) {
          vm.results = d.hits;
          vm.loadingProgress = false;
        });
      }
      else
      {
        nutritionixService.getProducts(vm.searchText).then(function(d) {
          vm.results = d.hits;
          vm.loadingProgress = false;
        });
      }

    };

    // PROFILES METHODS \\

    /**
     * Return the limit of calories for active profile from profilesService
     *
     * @returns {Number} Max Calories
     */
    vm.maxCalories = function () {

      return profilesService.getMaxCalories();

    };

    /**
     * Save Profile in localStorage in profilesService
     */
    vm.saveProfile = function(){

      profilesService.setActiveProfile(vm.activeProfile);

    };

    // PANTRY METHODS \\

    /**
     * Get the number of Calories in the Pantry from pantryService
     *
     * @returns {Number} Calories in the Pantry
     */
    vm.pantryCalories = function() {

      var calories = pantryService.getPantryCalories();

      // Check if the Calories limit is reached
      vm.checkCaloriesLimit(calories);

      return calories;

    };

    /**
     * Get the number of Satured Fat in the Pantry from pantryService
     *
     * @returns {Number} Satured Fat in the Pantry
     */
    vm.pantrySaturedFat = function() {

      return pantryService.getPantrySaturedFat();

    };

    /**
     * Get the number of Sodium in the Pantry from pantryService
     *
     * @returns {Number} Sodium in the Pantry
     */
    vm.pantrySodium = function() {

      return pantryService.getPantrySodium();

    };

    /**
     * Check if the number Calories > limit defined by Profile
     *
     * @param calories
     */
    vm.checkCaloriesLimit = function (calories) {

       if(calories > vm.maxCalories() && vm.maxCalories()){

         // Call to toastr library to add a toast for this limit
         toastr.error('You have exceeded the maximum recommended calories limit per day !');

       }

    };

    /**
     * Add a product to pantry
     *
     * @param product
     */
    vm.addProductToPantry = function (product) {

      // Set product quantity to 1 by default
      product.quantity = 1;

      // Add product to pantry
      vm.pantry.push(product);

      // Save pantry in pantryService
      pantryService.setData(vm.pantry);

    };

    /**
     * Delete a product from pantry
     *
     * @param index
     */
    vm.deleteProductFromPantry = function (index) {

      // Delete a product from pantry
      vm.pantry.splice(index,1);

      // Save pantry in pantryService
      pantryService.setData(vm.pantry);

    };

  }
})();
