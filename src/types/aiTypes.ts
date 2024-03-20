
import { AIResponse } from './aiResponse';

export const FETCH_AI_DATA_REQUEST = 'FETCH_AI_DATA_REQUEST';
export const FETCH_AI_DATA_SUCCESS = 'FETCH_AI_DATA_SUCCESS';
export const FETCH_AI_DATA_FAILURE = 'FETCH_AI_DATA_FAILURE';

export interface AIState {
    data: AIResponse | null;
    loading: boolean;
    error: string | null;
}

interface FetchAIDataRequestAction {
    type: typeof FETCH_AI_DATA_REQUEST;
}

interface FetchAIDataSuccessAction {
    type: typeof FETCH_AI_DATA_SUCCESS;
    payload: AIResponse;
}

interface FetchAIDataFailureAction {
    type: typeof FETCH_AI_DATA_FAILURE;
    payload: string;
}

export type AIActionTypes =
    | FetchAIDataRequestAction
    | FetchAIDataSuccessAction
    | FetchAIDataFailureAction;

