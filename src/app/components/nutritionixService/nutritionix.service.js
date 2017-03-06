
/**
 * Nutritionix Service
 *
 * @param $http
 * @param apiKey
 * @param appId
 * @returns {NutritionixService}
 * @constructor
 */
angular.module('nutritionProject')
  .factory('nutritionixService', function($http, apiKey, appId) {

      return {

        /**
         *  Make an http call to get products matching searchText
         *
         *  @param searchText SearchText Value
         *  @return {Promise}
         */
        getProducts: function (searchText) {

          return $http.get('https://api.nutritionix.com/v1_1/search/' + searchText + '?results=0%3A50&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_saturated_fat%2Cnf_sodium%2Cnf_calories%2Citem_id%2Cbrand_id&appId=' + appId + '&appKey=' + apiKey).then(function (response) {

            return response.data;
          });
        },

        /**
         *  Make an http call to get products matching searchText and Calories limit
         *
         *  @param searchText SearchText Value
         *  @param limit Calories Limit Value
         *  @return {Promise}
         */
        getAdvancedProducts: function (searchText, limit) {

          return $http.get('https://api.nutritionix.com/v1_1/search/' + searchText + '?results=0%3A50&cal_min=0&cal_max=' + limit + '&fields=item_name%2Cbrand_name%2Cnf_saturated_fat%2Cnf_sodium%2Cnf_calories%2Citem_id%2Cbrand_id&appId=' + appId + '&appKey=' + apiKey).then(function (response) {

            return response.data;
          });
        }
      };
  });
