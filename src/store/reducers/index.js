import {combineReducers} from 'redux';
import auth from './Auth';
import vibe from './Vibe';
import request from './Request';
// import categoryReducer from './CategoryReducer';
// import couponReducer from './CouponReducer';
// import subscriptionReducer from './SubscriptionReducer';
// import favoriteReducer from './FavoritesReducer';
// import userReducer from './userReducer';
const rootReducer = combineReducers({
  auth,
  vibe,
  request,
  //   userReducer,
});

export default rootReducer;
