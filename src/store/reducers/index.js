import Auth from './Auth';

// export default {
//   auth: Auth,
// };

import {combineReducers} from 'redux';
import auth from './Auth';
// import categoryReducer from './CategoryReducer';
// import couponReducer from './CouponReducer';
// import subscriptionReducer from './SubscriptionReducer';
// import favoriteReducer from './FavoritesReducer';
// import userReducer from './userReducer';
const rootReducer = combineReducers({
  auth,
  //   userReducer,
});

export default rootReducer;
