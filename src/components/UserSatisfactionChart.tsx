// // src/components/UserSatisfactionChart.tsx

// import React, { useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { fetchAI } from '../actions/aiActions';
// import Chart, { ChartOptions } from 'chart.js/auto';
// import styles from './UserSatisfactionChart.module.scss';

// const UserSatisfactionChart: React.FC = () => {
//     const dispatch = useDispatch();
//     const data = useSelector((state: RootState) => state.ai.data?.user_satisfaction?.ratings);
//     const chartRef = useRef<HTMLCanvasElement>(null);
//     const chartInstance = useRef<Chart | null>(null);

//     useEffect(() => {
//         dispatch(fetchAI());
//     }, [dispatch]);

//     useEffect(() => {
//         if (chartRef.current && data) {
//             if (chartInstance.current) {
//                 chartInstance.current.destroy();
//             }

//             const ratings = data.map((entry: any) => entry.rating);
//             const counts = data.map((entry: any) => entry.count);

//             const chartData = {
//                 labels: ratings,
//                 datasets: [
//                     {
//                         label: 'User Satisfaction',
//                         data: counts,
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.2)',
//                             'rgba(54, 162, 235, 0.2)',
//                             'rgba(255, 206, 86, 0.2)',
//                             'rgba(75, 192, 192, 0.2)',
//                             'rgba(153, 102, 255, 0.2)',
//                         ],
//                         borderColor: [
//                             'rgba(255, 99, 132, 1)',
//                             'rgba(54, 162, 235, 1)',
//                             'rgba(255, 206, 86, 1)',
//                             'rgba(75, 192, 192, 1)',
//                             'rgba(153, 102, 255, 1)',
//                         ],
//                         borderWidth: 1,
//                     },
//                 ],
//             };

//             const chartOptions: ChartOptions = {
//                 responsive: true,
//                 maintainAspectRatio: false,
//             };

//             chartInstance.current = new Chart(chartRef.current, {
//                 type: 'pie',
//                 data: chartData,
//                 options: chartOptions,
//             });
//         }

//         // Cleanup function to destroy the chart instance when component unmounts
//         return () => {
//             if (chartInstance.current) {
//                 chartInstance.current.destroy();
//             }
//         };
//     }, [data]);

//     return (
//         <div className={styles.chartContainer}>
//             <canvas ref={chartRef}></canvas>
//         </div>
//     );
// };

// export default UserSatisfactionChart;

// src/components/UserSatisfactionChart.tsx

// src/components/UserSatisfactionChart.tsx

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchAI } from '../actions/aiActions';
import Chart, { ChartOptions, ChartTypeRegistry, registerables } from 'chart.js/auto'; // Import ChartTypeRegistry and registerables
import styles from './UserSatisfactionChart.module.scss';

const UserSatisfactionChart: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.ai.data?.user_satisfaction?.ratings);
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart<keyof ChartTypeRegistry, any[], any> | null>(null); // Adjust the type

    useEffect(() => {
        dispatch(fetchAI());
    }, [dispatch]);

    useEffect(() => {
        if (chartRef.current && data) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ratings = data.map((entry: any) => entry.rating);
            const counts = data.map((entry: any) => entry.count);

            const chartData = {
                labels: ratings,
                datasets: [
                    {
                        label: 'User Satisfaction',
                        data: counts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            };

            const chartOptions: ChartOptions = {
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'User Satisfaction Ratings',
                    },
                },
            };

            chartInstance.current = new Chart(chartRef.current, {
                type: 'pie',
                data: chartData,
                options: chartOptions,
            });
        }

        // Cleanup function to destroy the chart instance when component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className={styles.chartContainer}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default UserSatisfactionChart;








