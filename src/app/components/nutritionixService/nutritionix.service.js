/**
 * Created by guillaume on 01/03/2017.
 */
angular.module('nutritionProject')
  .factory('nutritionixService', function($http, apiKey, appId) {
        var nutritionixService = {
          getProducts: function(searchText) {

              console.log(searchText);
              var promise = $http.get('https://api.nutritionix.com/v1_1/search/'+searchText+'?results=0%3A50&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_saturated_fat%2Cnf_sodium%2Cnf_calories%2Citem_id%2Cbrand_id&appId='+appId+'&appKey='+apiKey).then(function (response) {

                console.log(response);

                return response.data;
              });


            return promise;
          },
          getAdvancedProducts: function(searchText, limit) {
            console.log(limit);
            console.log(searchText);
            var promise = $http.get('https://api.nutritionix.com/v1_1/search/'+searchText+'?results=0%3A50&cal_min=0&cal_max='+limit+'&fields=item_name%2Cbrand_name%2Cnf_saturated_fat%2Cnf_sodium%2Cnf_calories%2Citem_id%2Cbrand_id&appId='+appId+'&appKey='+apiKey).then(function (response) {

              console.log(response);

              return response.data;
            });


            return promise;
          }
        };
        return nutritionixService;
});
