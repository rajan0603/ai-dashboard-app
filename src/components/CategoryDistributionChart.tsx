// src/components/CategoryDistributionChart.tsx

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchAI } from '../actions/aiActions';
import Chart, { ChartOptions } from 'chart.js/auto';
import styles from './CategoryDistributionChart.module.scss';

const CategoryDistributionChart: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.ai.data?.category_distribution);
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

            const chartData = {
                labels: Object.keys(data),
                datasets: [
                    {
                        label: 'Number of Queries',
                        data: Object.values(data),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            };

            const chartOptions: ChartOptions = {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Queries', // Y-axis label
                            font: {
                                size: 14,
                            },
                        },
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Category Distribution', // Chart title
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

export default CategoryDistributionChart;

