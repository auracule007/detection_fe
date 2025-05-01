// import React, { useState, useEffect } from 'react';
// import StatsCard from './StatsCard';
// import FileUpload from './FileUpload';
// import RecentTransactions from './RecentTransactions';
// import FraudMap from './FraudMap';
// import { getFraudStats } from '../services/api';
// import { FraudStats } from '../types';

// const Dashboard: React.FC = () => {
//     const [stats, setStats] = useState<FraudStats>({
//         total_flagged: 0,
//         high_frequency: 0,
//         high_amount: 0,
//         rapid_location: 0
//     });
//     const [refreshKey, setRefreshKey] = useState(0);

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const data = await getFraudStats();
//                 setStats(data);
//             } catch (error) {
//                 console.error('Error fetching stats:', error);
//             }
//         };

//         fetchStats();
//     }, [refreshKey]);

//     const handleUploadSuccess = () => {
//         setRefreshKey(prev => prev + 1);
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <StatsCard stats={stats} />
//             <FileUpload onUploadSuccess={handleUploadSuccess} />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <RecentTransactions />
//                 <FraudMap />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import FileUpload from './FileUpload';
import RecentTransactions from './RecentTransactions';
import FraudMap from './FraudMap';
import { getFraudStats } from '../services/api';
import { FraudStats } from '../types';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<FraudStats>({
        total_flagged: 0,
        high_frequency: 0,
        high_amount: 0,
        rapid_location: 0
    });
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getFraudStats();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [refreshKey]);

    const handleUploadSuccess = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Fraud Detection Dashboard</h1>
            <StatsCard stats={stats} />
            <FileUpload onUploadSuccess={handleUploadSuccess} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <RecentTransactions />
                <FraudMap />
            </div>
        </div>
    );
};

export default Dashboard;