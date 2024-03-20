// src/components/UsageStatisticsChart.tsx

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchAI } from '../actions/aiActions';
import Chart, { ChartOptions } from 'chart.js/auto';
import styles from './UsageStatisticsChart.module.scss';

const UsageStatisticsChart: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.ai.data?.usage_statistics);
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        dispatch(fetchAI());
    }, [dispatch]);

    useEffect(() => {
        if (chartRef.current && data) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const platforms = Object.keys(data.by_platform);
            const platformData = Object.values(data.by_platform);

            const countries = Object.keys(data.by_country);
            const countryData = Object.values(data.by_country);

            const chartData = {
                labels: platforms,
                datasets: [
                    {
                        label: 'Usage by Platform',
                        data: platformData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                    },
                    {
                        label: 'Usage by Country',
                        data: countryData,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            };

            const chartOptions: ChartOptions = {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Usage Statistics', // Add a title for the chart
                        font: {
                            size: 16,
                        },
                    },
                },
            };

            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
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

export default UsageStatisticsChart;




