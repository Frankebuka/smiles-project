const initialState = {
  amount: 0,
  id: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AMOUNT":
      return { amount: action.payload };
      break;
    case "ID":
      return { id: action.payload };
      break;
    default:
      return state;
  }
};

export default Reducer;
