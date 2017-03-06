
/**
 * Profiles Service
 *
 * @param $http
 * @param $localStorage
 * @returns {ProfilesService}
 * @constructor
 */
angular.module('nutritionProject')
  .factory('profilesService', function($http, $localStorage) {

      return {

        /**
         *  Make an http call to get profiles from json file
         *
         *  @return {Promise}
         */
        getProfiles: function () {
          return $http.get("app/components/profilesService/data/profiles.json").then(function (response) {

            return response.data;
          });
        },

        /**
         *  Get Profile from localStorage
         *
         *  @return {{id: number, label: string, caloriesMax: number}} Profile
         */
        getActiveProfile: function () {
          return $localStorage.profile;
        },

        /**
         *  Set new Value for Profile
         *
         *  @param val The new Profile Value
         *  @return {profilesService}
         */
        setActiveProfile: function (val) {
          $localStorage.profile = val;
          return this;
        },

        /**
         *  Get Calories Max Value
         *
         *  @return {*}
         */
        getMaxCalories: function () {
          if (!$localStorage.profile) {
            return false;
          }
          return $localStorage.profile.caloriesMax;
        }
      };
  });
