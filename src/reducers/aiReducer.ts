// aiReducer.ts
import { Reducer } from 'redux';
import * as types from '../types/aiTypes';
import { AIState } from '../types/aiTypes';

const initialState: AIState = {
    data: null,
    loading: false,
    error: null,
};

const aiReducer: Reducer<AIState> = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_AI_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case types.FETCH_AI_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case types.FETCH_AI_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default aiReducer;
