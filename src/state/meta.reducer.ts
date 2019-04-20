import * as UserActions from '../modules/shared/providers/user/user.actions';


// all actions are passing through the metareducers before being handed over to the feature reducers
export function metaReducer(reducer) {

	return function(state, action) {
		
		switch (action.type) {

			case UserActions.LOGOUT_SUCCESS:
				return {}

			default:
				return reducer(state, action)

		}
	}

}
