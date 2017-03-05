/**
 * Created by guillaume on 02/03/2017.
 */
/**
 * Created by guillaume on 01/03/2017.
 */
angular.module('nutritionProject')
  .factory('pantryService', function($localStorage) {
    return {
      setData: function(val) {
        $localStorage.pantry = val;
        return this;
      },
      getData: function() {
        return $localStorage.pantry;
      }
    };
  });
