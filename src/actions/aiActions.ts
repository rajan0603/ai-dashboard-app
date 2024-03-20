// aiActions.ts
import { Dispatch } from 'redux';
import { AIResponse } from '../types/aiResponse';
import * as types from '../types/aiTypes';
import { fetchAIData } from '../services/aiService';

export const fetchAIDataRequest = () => ({
    type: types.FETCH_AI_DATA_REQUEST,
});

export const fetchAIDataSuccess = (data: AIResponse) => ({
    type: types.FETCH_AI_DATA_SUCCESS,
    payload: data,
});

export const fetchAIDataFailure = (error: string) => ({
    type: types.FETCH_AI_DATA_FAILURE,
    payload: error,
});

export const fetchAI = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAIDataRequest());
        try {
            const data = await fetchAIData();
            dispatch(fetchAIDataSuccess(data));
        } catch (error) {
            dispatch(fetchAIDataFailure("failed"));
        }
    };
};
