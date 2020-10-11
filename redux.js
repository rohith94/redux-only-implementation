// Sample usage of redux independently, just add cdn of redux and below example of policy claim model works

console.clear();

//people dropping off a form (Action Creator)
const createPolicy = (name, amount) => {
  return {
    //Action (a form in our analogy)
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amountOfMoneyToCollect: amount,
    },
  };
};

const deletePolicy = (name) => {
  return {
    //Action (a delete policy in our analogy)
    type: "DELETE_POLICY",
    payload: {
      name: name,
    },
  };
};

//people Creating off a Claim (Action Creator)
const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    //Action (a form in our analogy)
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect,
    },
  };
};

// Reducers (Department in anaolgy)
const claimHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    return [...oldListOfClaims, action.payload];
  }

  //else dont care just return as-is
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type == "CREATE_POLICY") {
    return bagOfMoney + action.payload.amountOfMoneyToCollect;
  }

  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter((name) => {
      return name !== action.payload.name;
    });
  }

  return listOfPolicies;
};

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  policies: policies,
  accounting: accounting,
  claimHistory: claimHistory,
});

const store = createStore(ourDepartments);

const action = createPolicy("Rohith", 20);
const action1 = createPolicy("bob", 50);
const action2 = createClaim("bob", 100);

store.dispatch(action);
store.dispatch(action1);
store.dispatch(action2);
store.dispatch(deletePolicy("bob"));

console.log(store.getState());

console.log(store.getState().claimHistory);
