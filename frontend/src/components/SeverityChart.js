import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SeverityChart = ({ violations }) => {
    // Count violations by severity
    const severityCounts = {
        critical: 0,
        serious: 0,
        moderate: 0,
        minor: 0
    };

    // Loop through violations and count each severity
    violations.forEach(violation => {
        const impact = violation.impact;
        if (severityCounts[impact] !== undefined) {
            severityCounts[impact]++;
        }
    });

    // Prepare data for Chart.js
    const chartData = {
        labels: ['Critical', 'Serious', 'Moderate', 'Minor'],
        datasets: [
            {
                label: 'Number of Issues',
                data: [
                    severityCounts.critical,
                    severityCounts.serious,
                    severityCounts.moderate,
                    severityCounts.minor
                ],
                backgroundColor: [
                    'rgba(220, 38, 38, 0.8)',   // Red for Critical
                    'rgba(234, 88, 12, 0.8)',   // Orange for Serious
                    'rgba(234, 179, 8, 0.8)',   // Yellow for Moderate
                    'rgba(59, 130, 246, 0.8)'   // Blue for Minor
                ],
                borderColor: [
                    'rgb(220, 38, 38)',
                    'rgb(234, 88, 12)',
                    'rgb(234, 179, 8)',
                    'rgb(59, 130, 246)'
                ],
                borderWidth: 2
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Issues by Severity',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default SeverityChart;