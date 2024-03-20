// App.tsx

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAI } from './actions/aiActions';
import CategoryDistributionChart from './components/CategoryDistributionChart';
import ResponseTimesChart from './components/ResponseTimesChart';
import UserSatisfactionChart from './components/UserSatisfactionChart';
import UsageStatisticsChart from './components/UsageStatisticsChart';
import styles from './App.module.scss'; // Import the styles

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAI());
    }, [dispatch]);

    return (
        <div>
            <h1>AI Analytics Dashboard</h1>
            <div className={styles.container}> {/* Apply container class */}
                <CategoryDistributionChart />
                <ResponseTimesChart />
                <UserSatisfactionChart />
                <UsageStatisticsChart />
            </div>
        </div>
        
    );
};

export default App;



