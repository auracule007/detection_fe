// import axios from 'axios';
// import { FlaggedTransaction } from '../types';

// const API_BASE_URL = 'http://localhost:8000/api';

// export const uploadTransactions = async (file: File) => {
//     const formData = new FormData();
//     formData.append('file', file);
    
//     const response = await axios.post(`${API_BASE_URL}/transactions/upload/`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     });
//     return response.data;
// };

// export const getFlaggedTransactions = async (userId?: string) => {
//     const url = userId 
//         ? `${API_BASE_URL}/flagged/?user_id=${userId}`
//         : `${API_BASE_URL}/flagged/`;
//     const response = await axios.get(url);
//     return response.data;
// };

// export const getFraudStats = async () => {
//     const [flaggedResponse, countResponse] = await Promise.all([
//         axios.get(`${API_BASE_URL}/flagged/`),
//         axios.get(`${API_BASE_URL}/flagged/count/`)
//     ]);
    
//     const flaggedTransactions: FlaggedTransaction[] = flaggedResponse.data;
    
//     const stats = {
//         total_flagged: countResponse.data.count,
//         high_frequency: flaggedTransactions.filter(t => t.fraud_type.includes('High frequency')).length,
//         high_amount: flaggedTransactions.filter(t => t.fraud_type.includes('High amount')).length,
//         rapid_location: flaggedTransactions.filter(t => t.fraud_type.includes('Rapid location')).length
//     };
    
//     return stats;
// };
import axios from 'axios';
import { FlaggedTransaction, FraudStats } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

export const uploadTransactions = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`${API_BASE_URL}/transactions/upload/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const getFlaggedTransactions = async (userId?: string): Promise<FlaggedTransaction[]> => {
    const url = userId 
        ? `${API_BASE_URL}/flagged/?user_id=${userId}`
        : `${API_BASE_URL}/flagged/`;
    const response = await axios.get(url);
    return response.data;
};

export const getFraudStats = async (): Promise<FraudStats> => {
    const response = await axios.get(`${API_BASE_URL}/stats/`);
    return response.data;
};