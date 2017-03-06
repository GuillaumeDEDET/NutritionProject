/**
 *  Declare libraries use in application
 */
!function(){"use strict";angular.module("nutritionProject",["ngAnimate","ngCookies","ngStorage","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ngMaterial","toastr","datatables"])}(),angular.module("nutritionProject").factory("profilesService",["$http","$localStorage",function(t,a){return{getProfiles:function(){return t.get("app/components/profilesService/data/profiles.json").then(function(t){return t.data})},getActiveProfile:function(){return a.profile},setActiveProfile:function(t){return a.profile=t,this},getMaxCalories:function(){return a.profile?a.profile.caloriesMax:!1}}}]),angular.module("nutritionProject").factory("pantryService",["$localStorage",function(t){var a=t.pantry||[];return{setData:function(e){return a=e,t.pantry=e,this},getData:function(){return t.pantry},getPantryCalories:function(){var t=0;return a.forEach(function(a){t+=a.fields.nf_calories*a.quantity}),t},getPantrySodium:function(){var t=0;return a.forEach(function(a){t+=a.fields.nf_sodium*a.quantity}),t},getPantrySaturedFat:function(){var t=0;return a.forEach(function(a){t+=a.fields.nf_saturated_fat*a.quantity}),t}}}]),angular.module("nutritionProject").factory("nutritionixService",["$http","apiKey","appId",function(t,a,e){return{getProducts:function(n){return t.get("https://api.nutritionix.com/v1_1/search/"+n+"?results=0%3A50&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_saturated_fat%2Cnf_sodium%2Cnf_calories%2Citem_id%2Cbrand_id&appId="+e+"&appKey="+a).then(function(t){return t.data})},getAdvancedProducts:function(n,i){return t.get("https://api.nutritionix.com/v1_1/search/"+n+"?results=0%3A50&cal_min=0&cal_max="+i+"&fields=item_name%2Cbrand_name%2Cnf_saturated_fat%2Cnf_sodium%2Cnf_calories%2Citem_id%2Cbrand_id&appId="+e+"&appKey="+a).then(function(t){return t.data})}}}]),function(){"use strict";function t(t,a,e,n){function i(){r.results={},r.pantry=n.getData()||[],r.loadingProgress=!1,e.getProfiles().then(function(t){r.profiles=t.profiles}),r.activeProfile=e.getActiveProfile()||"None",r.table={columns:["Product Name","Brand","Calories","Sodium","Saturated Fat","Actions"],dtOptions:{dom:'<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',pagingType:"simple",autoWidth:!1,responsive:!0,rowReorder:!0,order:[[0,"asc"]]}}}var r=this;i(),r.getMatches=function(){r.loadingProgress=!0,r.advancedSearch&&r.searchLimit?a.getAdvancedProducts(r.searchText,r.searchLimit).then(function(t){r.results=t.hits,r.loadingProgress=!1}):a.getProducts(r.searchText).then(function(t){r.results=t.hits,r.loadingProgress=!1})},r.maxCalories=function(){return e.getMaxCalories()},r.saveProfile=function(){e.setActiveProfile(r.activeProfile)},r.pantryCalories=function(){var t=n.getPantryCalories();return r.checkCaloriesLimit(t),t},r.pantrySaturedFat=function(){return n.getPantrySaturedFat()},r.pantrySodium=function(){return n.getPantrySodium()},r.checkCaloriesLimit=function(a){a>r.maxCalories()&&r.maxCalories()&&t.error("You have exceeded the maximum recommended calories limit per day !")},r.addProductToPantry=function(t){t.quantity=1,r.pantry.push(t),n.setData(r.pantry)},r.deleteProductFromPantry=function(t){r.pantry.splice(t,1),n.setData(r.pantry)}}t.$inject=["toastr","nutritionixService","profilesService","pantryService"],angular.module("nutritionProject").controller("MainController",t)}(),function(){"use strict";function t(){}angular.module("nutritionProject").run(t)}(),function(){"use strict";function t(t,a){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"vm"}),a.otherwise("/")}t.$inject=["$stateProvider","$urlRouterProvider"],angular.module("nutritionProject").config(t)}(),function(){"use strict";angular.module("nutritionProject").constant("apiKey","a76fdac72565c061ac54edd796d9e986").constant("appId","26f173c5")}(),function(){"use strict";function t(t,a){t.debugEnabled(!0),a.allowHtml=!0,a.timeOut=3e3,a.positionClass="toast-top-right",a.preventDuplicates=!0,a.progressBar=!0}t.$inject=["$logProvider","toastrConfig"],angular.module("nutritionProject").config(t)}(),angular.module("nutritionProject").run(["$templateCache",function(t){t.put("app/main/main.html",'<div layout=column layout-fill><md-content><!-- Header Section --><section class=jumbotron><h1>Welcome to Nutrition App</h1><p class=lead><img src=assets/images/cutlery-logo.png alt="Logo Couverts"><br></p></section><!--  / Header Section --><!-- Search input and profile Select --><div layout=row layout-align="space-around center"><div layout=row layout-align=center><div layout=column><md-input-container><label>Search</label><input ng-model=vm.searchText></md-input-container><md-checkbox ng-model=vm.advancedSearch aria-label="Advanced Search">Advanced Search</md-checkbox></div><md-input-container ng-show=vm.advancedSearch ng-style="{\'margin-left\': \'10px\', \'margin-right\': \'10px\' }"><label>Maximum Calories (kcal)</label><input type=number ng-model=vm.searchLimit></md-input-container><md-button class="md-raised searchButton" ng-click=vm.getMatches()>Search</md-button></div><div><md-input-container ng-style="{width: \'200px\', \'padding-bottom\': \'55px\'}"><label>Your Profile</label><md-select ng-change=vm.saveProfile() ng-model=vm.activeProfile ng-model-options="{trackBy: \'$value.id\'}"><md-option><em>None</em></md-option><md-option ng-repeat="profile in vm.profiles" ng-value=profile>{{profile.label}}</md-option></md-select></md-input-container></div></div><!-- / Search input and profile Select --><!-- Datatable of results and Pantry --><div class=layout-margin layout=row layout-align="space-between start" ng-style="{\'margin-top\': \'20px\'}"><!-- Datatable of results --><div flex=50><div layout=row ng-show=vm.loadingProgress layout-align=space-around><md-progress-circular md-mode=indeterminate></md-progress-circular></div><table class="dataTable row-border hover" ng-hide=vm.loadingProgress datatable=ng dt-options=vm.table.dtOptions><thead><tr><th class=secondary-text><div class=table-header><span class=column-title>Product Name</span></div></th><th class=secondary-text><div class=table-header><span class=column-title>Brand</span></div></th><th class=secondary-text><div class=table-header><span class=column-title>Calories (kcal)</span></div></th><th class=secondary-text><div class=table-header><span class=column-title>Sodium (mg)</span></div></th><th class=secondary-text><div class=table-header><span class=column-title>Saturated Fat (g)</span></div></th><th class=secondary-text><div class=table-header><span class=column-title>Actions</span></div></th></tr></thead><tbody><tr ng-repeat="result in vm.results"><td><span>{{result.fields.item_name}}</span></td><td><span>{{result.fields.brand_name}}</span></td><td><span>{{result.fields.nf_calories}}</span></td><td><span>{{result.fields.nf_sodium}}</span></td><td><span>{{result.fields.nf_saturated_fat}}</span></td><td><span><md-button class="md-fab md-mini addButton" ng-click=vm.addProductToPantry(result) aria-label="Add to pantry"><i class=material-icons ng-style="{color: \'white\', \'font-size\':\'25px\', \'padding-top\':\'7px\'}">add</i><md-tooltip><span>Add to pantry</span></md-tooltip></md-button></span></td></tr></tbody></table></div><!-- / Datatable of results --><!-- Pantry --><div layout=column flex><md-toolbar><div layout=column layout-align=start class=md-toolbar-tools><span class=md-display-1>Pantry </span><span class=md-subhead ng-show="vm.maxCalories() && (vm.maxCalories()-vm.pantryCalories()>=0)">( Calories remaining before reaching your limit : {{vm.maxCalories()-vm.pantryCalories() | number : 2}} kcal )</span></div><div class=md-toolbar-tools layout=row layout-align="space-between center"><div layout=column><span ng-class="(vm.pantryCalories() > vm.maxCalories() && vm.maxCalories()) ? \'warning\' : \'\'">Calories: {{vm.pantryCalories() | number : 2}} kcal</span></div><span ng-class="vm.pantrySodium() > 5000 ? \'warning\' : \'\'">Sodium: {{vm.pantrySodium() | number : 2}} mg</span> <span>Satured Fat: {{vm.pantrySaturedFat() | number : 2}} g</span></div></md-toolbar><md-content class="pantry md-whiteframe-2dp" flex><md-list layout-padding layout-align="center center"><md-list-item class=md-3-line ng-repeat="product in vm.pantry track by $index"><div layout=row layout-align="space-between center" class=md-list-item-text><div layout=column flex=70><div layout=row layout-align="space-between center"><span>{{product.fields.item_name}} From {{product.fields.brand_name}}</span></div><div layout=row layout-align="space-between center"><div layout=column><span>Calories :</span> <span>{{product.fields.nf_calories * product.quantity | number : 2}} kcal</span></div><div layout=column><span>Sodium :</span> <span>{{product.fields.nf_sodium * product.quantity | number : 2}} mg</span></div><div layout=column><span>Satured Fat :</span> <span>{{product.fields.nf_saturated_fat * product.quantity | number : 2}} g</span></div></div></div><div layout=row layout-align="end center" flex=30><div layout=column><span>Quantity :</span> <span><input type=number ng-model=product.quantity ng-style="{width: \'60px\'}"></span></div><div layout=column><md-button class="md-fab md-mini deleteButton" ng-click=vm.deleteProductFromPantry($index) aria-label="Delete from pantry"><i class=material-icons ng-style="{color: \'white\', \'font-size\':\'25px\', \'padding-top\':\'7px\'}">delete</i><md-tooltip><span>Delete from pantry</span></md-tooltip></md-button></div></div></div><md-divider></md-divider></md-list-item></md-list></md-content></div><!-- / Pantry --></div><!-- / Datatable of results and Pantry --></md-content></div>')}]);
//# sourceMappingURL=../maps/scripts/app-3f5f6adf6e.js.map
