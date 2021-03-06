const DEFAULT = {
  shown: false,
  msg: "",
  type: "success",
  id: ""
};

const notification = (state = DEFAULT, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        shown: true,
        msg: action.msg,
        id: action.id,
        type: action.notifType
      };
    case "HIDE_NOTIFICATION":
      if (state.id === action.id) {
        return { shown: false };
      }
      return state;
    default:
      return state;
  }
};

export default notification;
