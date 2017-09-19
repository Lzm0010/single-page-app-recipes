(function(){
  'use strict';

  angular
    .module('app')
    .service('dataService', dataService);

  function dataService($http, $q) {

    const service = {
      addRecipe: addRecipe,
      deleteRecipe: deleteRecipe,
      getCategories: getCategories,
      getFoodItems: getFoodItems,
      getRecipe: getRecipe,
      getRecipes: getRecipes,
      getRecipesByCategory: getRecipesByCategory,
      updateRecipe: updateRecipe
    }

    return service;


    //===== DATA SERVICE FUNCTIONS ======//


    function addRecipe(recipe, cb){
      return $http.post('api/recipes', recipe)
        .then(cb)
        .catch(showError);
    };

    function deleteRecipe(id, cb){
      return $http.delete(`api/recipes/${id}`)
        .then(cb)
        .catch(showError);
    };

    function getCategories(cb){
      return $http.get('api/categories')
        .then(cb)
        .catch(showError);
    };

    function getFoodItems(cb){
      return $http.get('api/fooditems')
        .then(cb)
        .catch(showError);
    };

    function getRecipe(id, cb){
      return $http.get(`api/recipes/${id}`)
        .then(cb)
        .catch(showError);
    };

    function getRecipes(cb){
      return $http.get('api/recipes')
        .then(cb)
        .catch(showError);
    };

    function getRecipesByCategory(category, cb){
      return $http.get(`api/recipes?category=${category}`)
        .then(cb)
        .catch(showError);
    };

    function updateRecipe(id, recipe, cb){
      return $http.put(`api/recipes/${id}`, recipe)
        .then(cb)
        .catch(showError);
    };

    function showError(e){
      console.log(e);
      return $q.reject(e);
    };

  };


})();
