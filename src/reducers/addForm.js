import {
  updateStateField,
  addStateField,
  removeStateField,
  moveStateField
} from '../utils/fieldUpdates';
import getRecipeValidState from '../utils/commonSelectors';

const DEFAULT = {
  name: '',
  desc: '',
  ingredients: [''],
  steps: [''],
  prepTime: '20',
  cookingTime: '20',
  price: '1',
  type: '2',
  season: '0',
  servings: '2',
  note: '',
  img: false
};

const addForm = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'UPDATE_ADDPAGE_INPUT':
      return updateStateField(state, action);
    case 'ADD_ADDPAGE_INPUT':
      return addStateField(state, action);
    case 'REMOVE_ADDPAGE_INPUT':
      return removeStateField(state, action);
    case 'MOVE_ADDPAGE_INPUT':
      return moveStateField(state, action);
    case 'ADD_RECIPE':
      // ADD_RECIPE should reset all fields to default
      return DEFAULT;
    default:
      return state;
  }
};

export default addForm;

export const getAddFormValidState = state => getRecipeValidState(state);
// export const getAddFormValidState = (state) => {
//   const ingredients = state.ingredients
//     .filter(ing => ing.length === 0)
//     .length === 0;
//   const steps = state.steps
//     .filter(step => step.length === 0)
//     .length === 0;
//   const isNum = /^\d+$/;
//   const validState = {
//     name: state.name.length > 0,
//     ingredients,
//     steps,
//     prepTime: isNum.test(state.prepTime),
//     cookingTime: isNum.test(state.cookingTime),
//     price: isNum.test(state.price),
//     type: isNum.test(state.type),
//     season: isNum.test(state.season),
//     servings: isNum.test(state.servings)
//   };
//   const isValidState = Object.keys(validState)
//     .map(key => validState[key])
//     .filter(fieldState => !fieldState).length === 0;
//   return Object.assign({}, validState, { isValidState });
// };
