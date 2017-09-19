(function(){
  'use strict';

  angular
    .module('app')
    .controller('RecipeDetailController', RecipeDetailController);

  function RecipeDetailController (dataService, $location, $routeParams){
    let vm = this;
    vm.addIngredient = addIngredient;
    vm.addStep = addStep;
    vm.categories = [];
    vm.deleteIngredient = deleteIngredient;
    vm.deleteStep = deleteStep;
    vm.fooditems = [];
    vm.recipe = {
      ingredients: [],
      steps: []
    };
    vm.redirectHome = redirectHome;
    vm.saveRecipe = saveRecipe;

    activate();

    function activate() {
      return getCategories()
        .then(getFoodItems)
        .then(function(){
          if($location.url() !== '/add'){
            getRecipe($routeParams.id)
              .then(function(){
                console.log('recipe loaded');
              });
          }//end if statement

        });//end callback function
        
    };//end activate


    //========= RECIPE DETAIL CTRL FUNCTIONS =====//


    function addIngredient(){
      vm.recipe.ingredients.push({});
    };//end addIngredient function


    function addStep(){
      vm.recipe.steps.push({});
    };//end addIngredient function


    function deleteIngredient(i){
      vm.recipe.ingredients.splice(i, 1);
    };//end addIngredient function


    function deleteStep(i){
      vm.recipe.steps.splice(i, 1);
    };//end addIngredient function


    function getCategories() {
      return dataService.getCategories(function(response){
          vm.categories = response.data;
          return vm.categories;
      });
    };//end getCategories function


    function getFoodItems() {
      return dataService.getFoodItems(function(response){
        vm.fooditems = response.data;
        return vm.fooditems;
      });
    };// end getFoodItems function


    function getRecipe(id){
      return dataService.getRecipe(id, function(response){
        vm.recipe = response.data;
        return vm.recipe;
      });
    };//end getRecipe function


    function redirectHome() {
      return $location.path('/');
    };//end redirectHome


    function saveRecipe(recipe) {
      if ($location.url() === '/add'){
        return dataService.addRecipe(recipe, function(){
          $location.path('/');
        });
      } else {
        return dataService.updateRecipe($routeParams.id, recipe, function(){
          $location.path('/');
        });
      }//end else
    };//end saveRecipe function


  }//end controller

})();
