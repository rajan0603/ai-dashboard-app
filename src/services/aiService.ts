import { AIResponse } from '../types/aiResponse';

export const fetchAIData = async (): Promise<AIResponse> => {
    try {
        const response = await fetch('/ai-data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch AI data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching AI data:', error);
        throw error;
    }
};

