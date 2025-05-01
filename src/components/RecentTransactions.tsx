// import React, { useEffect, useState } from 'react';
// import { getFlaggedTransactions } from '../services/api';
// import { FlaggedTransaction } from '../types';

// const RecentTransactions: React.FC = () => {
//     const [transactions, setTransactions] = useState<FlaggedTransaction[]>([]);
//     const [filterUserId, setFilterUserId] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 setLoading(true);
//                 const data = await getFlaggedTransactions(filterUserId || undefined);
//                 setTransactions(data);
//             } catch (error) {
//                 console.error('Error fetching transactions:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTransactions();
//     }, [filterUserId]);

//     return (
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <h2 className="text-xl font-bold mb-4">Flagged Transactions</h2>
//             <input
//                 type="text"
//                 placeholder="Filter by User ID"
//                 className="border border-gray-300 rounded px-3 py-2 mb-4 w-full max-w-md"
//                 value={filterUserId}
//                 onChange={(e) => setFilterUserId(e.target.value)}
//             />
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fraud Type</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {loading ? (
//                             <tr>
//                                 <td colSpan={4} className="px-6 py-4 text-center">
//                                     Loading...
//                                 </td>
//                             </tr>
//                         ) : transactions.length === 0 ? (
//                             <tr>
//                                 <td colSpan={4} className="px-6 py-4 text-center">
//                                     No flagged transactions found
//                                 </td>
//                             </tr>
//                         ) : (
//                             transactions.map((tx) => (
//                                 <tr key={tx.id}>
//                                     <td className="px-6 py-4 whitespace-nowrap">{tx.transaction_id}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{tx.user_id}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{tx.fraud_type}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{new Date(tx.timestamp).toLocaleString()}</td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default RecentTransactions;

import React, { useEffect, useState } from 'react';
import { getFlaggedTransactions } from '../services/api';
import { FlaggedTransaction } from '../types';

const RecentTransactions: React.FC = () => {
    const [transactions, setTransactions] = useState<FlaggedTransaction[]>([]);
    const [filterUserId, setFilterUserId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const data = await getFlaggedTransactions(filterUserId || undefined);
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [filterUserId]);

    return (
        <div className="bg-white rounded-lg shadow p-6 h-full">
            <h2 className="text-xl font-bold mb-4">Flagged Transactions</h2>
            <input
                type="text"
                placeholder="Filter by User ID"
                className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                value={filterUserId}
                onChange={(e) => setFilterUserId(e.target.value)}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fraud Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : transactions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center">
                                    No flagged transactions found
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.transaction_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.user_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.fraud_type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(tx.timestamp).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentTransactions;