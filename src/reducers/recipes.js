import {
  updateStateField,
  addStateField,
  removeStateField,
  moveStateField
} from '../utils/fieldUpdates';
import getRecipeValidState from '../utils/commonSelectors';

const recipes = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_RECIPES':
      return action.recipes;
    case 'ADD_RECIPE':
      return [...state, action.recipe];
    default:
      return state;
  }
};

export default recipes;

export const getVisibleRecipes = (recipeList, filters, searchTerm) => {
  const term = searchTerm.toUpperCase();
  const filterRecipes = (recipe) => {
    if (recipe.season !== '0' &&
        filters.season !== '0' &&
        filters.season !== recipe.season) { return false; }
    if (recipe.type !== '0' &&
        filters.type !== '0' &&
        filters.type !== recipe.type) { return false; }

    let found = false;
    if (filters.name &&
        recipe.name.toUpperCase().indexOf(term) !== -1) { found = true; }
    if (filters.desc &&
        recipe.desc.toUpperCase().indexOf(term) !== -1) { found = true; }
    if (filters.ingredients &&
        recipe.ingredients
          .filter(ing => ing.toUpperCase().indexOf(term) !== -1).length > 0) {
      found = true;
    }
    if (!filters.name && !filters.desc && !filters.ingredients) { found = true; }
    return found;
  };
  return recipeList.filter(filterRecipes);
};

export const getCurRecipeValidState = state => getRecipeValidState(state);
