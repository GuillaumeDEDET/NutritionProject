
/**
 * Pantry Service
 *
 * @param $localStorage
 * @returns {PantryService}
 * @constructor
 */
angular.module('nutritionProject')
  .factory('pantryService', function($localStorage) {

      // Initialize pantry for service
      var pantry = $localStorage.pantry || [];

      return {

        /**
         *  Set new Value for Pantry
         *
         *  @param val The new Pantry Value
         *  @return {pantryService}
         */
        setData: function(val) {
          pantry = val;
          $localStorage.pantry = val;
          return this;
        },

        /**
         *  Get Pantry Value
         *
         *  @return {Collection} Pantry
         */
        getData: function() {
          return $localStorage.pantry;
        },

        /**
         *  Get Pantry Calories
         *
         *  @return {Number} Calories
         */
        getPantryCalories: function () {
          var calories = 0;
          pantry.forEach(function (product) {
            calories += product.fields.nf_calories * product.quantity;
          });
          return calories;
        },

        /**
         *  Get Pantry Sodium
         *
         *  @return {Number} Sodium
         */
        getPantrySodium: function () {
          var sodium = 0;
          pantry.forEach(function (product) {
            sodium += product.fields.nf_sodium * product.quantity;
          });
          return sodium;
        },

        /**
         *  Get Pantry Satured Fat
         *
         *  @return {Number} Calories
         */
        getPantrySaturedFat: function () {
          var saturedFat = 0;
          pantry.forEach(function (product) {
            saturedFat += product.fields.nf_saturated_fat * product.quantity;
          });
          return saturedFat;
        }

      };
  });
