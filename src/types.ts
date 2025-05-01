// export interface FlaggedTransaction {
//     id: number;
//     transaction_id: string;
//     user_id: string;
//     amount: number;
//     timestamp: string;
//     merchant: string;
//     location: string;
//     is_flagged: boolean;
//     fraud_type: string;
// }

// export interface FraudStats {
//     total_flagged: number;
//     high_frequency: number;
//     high_amount: number;
//     rapid_location: number;
// }
export interface FlaggedTransaction {
    id: number;
    transaction_id: string;
    user_id: string;
    fraud_type: string;
    timestamp: string;
    amount: number;
    location: string;
}

export interface FraudStats {
    total_flagged: number;
    high_frequency: number;
    high_amount: number;
    rapid_location: number;
}