// import React from 'react';
// import { FraudStats } from '../types';

// const StatsCard: React.FC<{ stats: FraudStats }> = ({ stats }) => {
//     return (
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <h2 className="text-xl font-bold mb-4">Fraud Statistics</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="bg-gray-50 p-4 rounded border border-gray-200">
//                     <p className="text-gray-500">Total Flagged</p>
//                     <p className="text-2xl font-bold">{stats.total_flagged}</p>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded border border-gray-200">
//                     <p className="text-gray-500">High Frequency</p>
//                     <p className="text-2xl font-bold">{stats.high_frequency}</p>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded border border-gray-200">
//                     <p className="text-gray-500">High Amount</p>
//                     <p className="text-2xl font-bold">{stats.high_amount}</p>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded border border-gray-200">
//                     <p className="text-gray-500">Rapid Location</p>
//                     <p className="text-2xl font-bold">{stats.rapid_location}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StatsCard;

import React from 'react';
import { FraudStats } from '../types';

const StatsCard: React.FC<{ stats: FraudStats }> = ({ stats }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Fraud Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                    <p className="text-blue-500">Total Flagged</p>
                    <p className="text-2xl font-bold text-blue-700">{stats.total_flagged}</p>
                </div>
                <div className="bg-red-50 p-4 rounded border border-red-200">
                    <p className="text-red-500">High Frequency</p>
                    <p className="text-2xl font-bold text-red-700">{stats.high_frequency}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                    <p className="text-yellow-500">High Amount</p>
                    <p className="text-2xl font-bold text-yellow-700">{stats.high_amount}</p>
                </div>
                <div className="bg-green-50 p-4 rounded border border-green-200">
                    <p className="text-green-500">Rapid Location</p>
                    <p className="text-2xl font-bold text-green-700">{stats.rapid_location}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;