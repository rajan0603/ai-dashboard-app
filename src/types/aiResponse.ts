
export interface AIResponse {
    insight_summary: InsightSummary;
    category_distribution: CategoryDistribution;
    response_times: ResponseTimes;
    user_satisfaction: UserSatisfaction;
    usage_statistics: UsageStatistics;
}

export interface InsightSummary {
    total_queries: number;
    successful_queries: number;
    failed_queries: number;
    average_response_time: number;
}

export interface CategoryDistribution {
    small_talk: number;
    technical_support: number;
    sales_inquiries: number;
    customer_service: number;
}

export interface DayWiseResponseTime {
    date: string;
    average_time: number;
}

export interface WeekWiseResponseTime {
    week: string;
    average_time: number;
}

export interface ResponseTimes {
    day_wise: DayWiseResponseTime[];
    week_wise: WeekWiseResponseTime[];
}

export interface RatingCount {
    rating: number;
    count: number;
}

export interface UserSatisfaction {
    ratings: RatingCount[];
}

export interface UsageStatistics {
    by_platform: Record<string, number>;
    by_country: Record<string, number>;
}
