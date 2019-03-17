import util from '../../units/index';

//定义actionType
const VM_GETList_STARTED = 'VM/GETList_STARTED';
const VM_GETList_SUCCESS = 'VM/GETList_SUCCESS';
const VM_GETList_FAILURE = 'VM/GETList_FAILURE';


//定义action
export function getList(req, pagination) {
  let params = "";
  const beginNum = (pagination.current - 1) * pagination.pageSize;
  params += '?vm.beginNum=' + beginNum;
  params += '&vm.pageSize=' + pagination.pageSize;
  for (let key in req) {
    //似乎不能使用nodeName
    if ("nodeName2" == key) {
      key = "nodeName";
      req[key] = req["nodeName2"];
    }
    params += "&" + "vm." + key + "=" + req[key];
  }
  return (dispatch) => {
    //定义url
    var getMtVmListURL = 'http://localhost:3000/vm/getMtVmList.do' + params;
    dispatch(getListStarted());
    util.get(getMtVmListURL, resp => {
      resp.aaData.map(obj => {
        obj.key = obj.innerCode;
      });
      dispatch(getListSuccess(resp, pagination));
    }, err => {
      dispatch(getListFailure(err));
    })
  }
}

export function getListStarted() {
  return {
    type: VM_GETList_STARTED
  }
}

export function getListSuccess(data, pagination) {
  return {
    type: VM_GETList_SUCCESS,
    data: data,
    pagination: { ...pagination }
  }
}

export function getListFailure(err) {
  return {
    type: VM_GETList_FAILURE,
    err: err
  }
}
const initialState = {}; //The initial state of this reducer (will be combined with the states of other reducers as your app grows)

export default function reducer(state = initialState, action) { // a function that has two parameters, state (which is initialized as our initialState obj), and action, which we'll cover soon.
  switch (action.type) {
    case VM_GETList_STARTED:
      return { ...state, loading: true };
    case VM_GETList_SUCCESS:
      return { ...state, data: action.data, pagination: action.pagination, loading: false };
    case VM_GETList_FAILURE:
      return { ...state, err: action.err, loading: false };
    default:
      return state;
  }
}