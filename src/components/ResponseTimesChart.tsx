// src/components/ResponseTimesChart.tsx

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchAI } from '../actions/aiActions';
import Chart, { ChartOptions } from 'chart.js/auto';
import styles from './ResponseTimesChart.module.scss';

const ResponseTimesChart: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.ai.data?.response_times?.day_wise);
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

            const dates = data.map((entry: any) => entry.date);
            const responseTimes = data.map((entry: any) => entry.average_time);

            const chartData = {
                labels: dates,
                datasets: [
                    {
                        label: 'Response Times (Daily)',
                        data: responseTimes,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
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
                            text: 'Average Response Time (ms)', // Y-axis label
                            font: {
                                size: 14,
                            },
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date', // X-axis label
                            font: {
                                size: 14,
                            },
                        },
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Response Times (Daily)', // Chart title
                        font: {
                            size: 16,
                        },
                    },
                },
            };

            chartInstance.current = new Chart(chartRef.current, {
                type: 'line',
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

export default ResponseTimesChart;
