!function(){"use strict";angular.module("nutritionProject",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ngMaterial","toastr"])}(),function(){"use strict";function t(t){function e(e,n,o,r){var a,i=t(n[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});n.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(t){i.type(t).pause()["delete"]()}),a=e.$watch("vm.contributors",function(){angular.forEach(r.contributors,function(t){i.type(t.login).pause()["delete"]()})}),e.$on("$destroy",function(){a()})}function n(t,e){function n(){return o().then(function(){t.info("Activated Contributors View")})}function o(){return e.getContributors(10).then(function(t){return r.contributors=t,r.contributors})}var r=this;r.contributors=[],n()}n.$inject=["$log","githubContributor"];var o={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:e,controller:n,controllerAs:"vm"};return o}t.$inject=["malarkey"],angular.module("nutritionProject").directive("acmeMalarkey",t)}(),function(){"use strict";function t(){function t(){return e}var e=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"}];this.getTec=t}angular.module("nutritionProject").service("webDevTec",t)}(),function(){"use strict";function t(){function t(t){var e=this;e.relativeDate=t(e.creationDate).fromNow()}t.$inject=["moment"];var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return e}angular.module("nutritionProject").directive("acmeNavbar",t)}(),function(){"use strict";function t(t,e){function n(n){function r(t){return t.data}function a(e){t.error("XHR Failed for getContributors.\n"+angular.toJson(e.data,!0))}return n||(n=30),e.get(o+"/contributors?per_page="+n).then(r)["catch"](a)}var o="https://api.github.com/repos/Swiip/generator-gulp-angular",r={apiHost:o,getContributors:n};return r}t.$inject=["$log","$http"],angular.module("nutritionProject").factory("githubContributor",t)}(),function(){"use strict";function t(t,e,n){function o(){a(),t(function(){i.classAnimation="rubberBand"},4e3)}function r(){n.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),i.classAnimation=""}function a(){i.awesomeThings=e.getTec(),angular.forEach(i.awesomeThings,function(t){t.rank=Math.random()})}var i=this;i.awesomeThings=[],i.classAnimation="",i.creationDate=1487176899634,i.showToastr=r,o()}t.$inject=["$timeout","webDevTec","toastr"],angular.module("nutritionProject").controller("MainController",t)}(),function(){"use strict";function t(t){t.debug("runBlock end")}t.$inject=["$log"],angular.module("nutritionProject").run(t)}(),function(){"use strict";function t(t,e){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),e.otherwise("/")}t.$inject=["$stateProvider","$urlRouterProvider"],angular.module("nutritionProject").config(t)}(),function(){"use strict";angular.module("nutritionProject").constant("malarkey",malarkey).constant("moment",moment)}(),function(){"use strict";function t(t,e){t.debugEnabled(!0),e.allowHtml=!0,e.timeOut=3e3,e.positionClass="toast-top-right",e.preventDuplicates=!0,e.progressBar=!0}t.$inject=["$logProvider","toastrConfig"],angular.module("nutritionProject").config(t)}(),angular.module("nutritionProject").run(["$templateCache",function(t){t.put("app/main/main.html",'<div layout=column layout-fill><md-content><header><acme-navbar creation-date=main.creationDate></acme-navbar></header><section class=jumbotron><h1>Bienvenue sur l\'application de Nutrition</h1><p class=lead><img src=assets/images/cutlery-logo.png alt="Logo Couverts"><br></p></section><div class=techs layout-align=center flex=100><md-autocomplete md-selected-item=selectedItem md-search-text=searchText md-items="item in getMatches(searchText)" md-item-text=item.display><md-item-template><span md-highlight-text=searchText>{{item.display}}</span></md-item-template><md-not-found>No matches found.</md-not-found></md-autocomplete></div></md-content></div>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout=row layout-align="center center"><section flex layout=row layout-align="left center"><md-button href=# class=md-raised>Home</md-button><md-button href=# class=md-raised>About</md-button><md-button href=# class=md-raised>Contact</md-button></section></md-toolbar>')}]);
//# sourceMappingURL=../maps/scripts/app-f7929b5859.js.map