import util from '../../units/index';

//定义actionType
const ORG_POPUP_CHANGEVISIBLE = 'ORG_POPUP/CHANGEVISIBLE';


//定义action
//改变可见状态
export function changeVisible(visible) {
  return {
    type: ORG_POPUP_CHANGEVISIBLE,
    data: visible
  }
}

export default function reducer(state = {}, action) { // a function that has two parameters, state (which is initialized as our initialState obj), and action, which we'll cover soon.
  switch (action.type) {
    case ORG_POPUP_CHANGEVISIBLE:
      return { ...state, visible: action.data };
    default:
      return state;
  }
}