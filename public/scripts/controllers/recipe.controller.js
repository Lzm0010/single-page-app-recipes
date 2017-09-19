(function(){
  'use strict';

  angular
    .module('app')
    .controller('RecipesController', RecipesController);

  function RecipesController(dataService, $location){
    let vm = this;
    vm.categories = [];
    vm.deleteRecipe = deleteRecipe;
    vm.getRecipesByCategory = getRecipesByCategory;
    vm.goToAdd = goToAdd;
    vm.recipes = [];

    activate();

    function activate() {
      return getCategories()
        .then(getRecipes)
        .then(function(){
          console.log("recipes loaded");
        });
    };


    //========== RECIPE CONTROLLER FUNCTIONS ===========//


    function deleteRecipe(id, index) {
      if (confirm('Are you sure you want to delete this recipe?')){
        return dataService.deleteRecipe(id, function(){
          vm.recipes.splice(index, 1);
        });
      }
    }


    function getCategories() {
      return dataService.getCategories(function(response){
        vm.categories = response.data;
        return vm.categories;
      });
    };


    function getRecipes() {
      return dataService.getRecipes(function(response){
        vm.recipes = response.data;
        return vm.recipes;
      });
    };


    function getRecipesByCategory(category) {
      return dataService.getRecipesByCategory(category, function(response){
        vm.recipes = response.data;
        return vm.recipes;
      });
    };


    function goToAdd() {
      return $location.path('/add');
    };

  };

})();
