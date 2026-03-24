import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';
import {weekSalePurchases} from '../../store/action/weeksalePurchaseAction';
import {yearlyTopProduct} from '../../store/action/yearlyTopProductAction';
import {
    formatCurrency,
    getCurrencySymbol,
    parseNumber,
    placeholderText
} from "../../shared/sharedMethod";

const LineChart = (props) => {
    const {weekSalePurchase, frontSetting, allConfigData} = props

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const currency = getCurrencySymbol(frontSetting);
    const valueFormatter = (tooltipItems) => {
        const value = parseNumber(tooltipItems.dataset.data[tooltipItems.dataIndex], 0)
        const label = tooltipItems.dataset.label
        return label + ' : ' + formatCurrency(allConfigData, currency, value)
    };

    const yFormatter = (yValue) => {
        const value = parseNumber(yValue, 0);
        return formatCurrency(allConfigData, currency, value)
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItems, data) => valueFormatter(tooltipItems)
                }
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: (value, index, values) => yFormatter(value)
                },
                title: {
                    display: true,
                    text: placeholderText("expense.input.amount.label"),
                    align: 'center'
                }
            }
        },
    };

    const labels = weekSalePurchase ? weekSalePurchase.dates : '';

    const data = {
        labels,
        datasets: [
            {
                label: placeholderText("sales.title"),
                data: weekSalePurchase ? weekSalePurchase.sales : '',
                borderColor: '#6571FF',
                backgroundColor: '#A3AAFF',
            },
            {
                label: placeholderText("purchases.title"),
                data: weekSalePurchase ? weekSalePurchase.purchases : '',
                borderColor: '#38c074',
                backgroundColor: '#6CD9AC',
            },
        ],
    };
    return <Line options={options} data={data} height={100}/>
}

const mapStateToProps = (state) => {
    const {weekSalePurchase, yearTopProduct, allConfigData} = state;
    return {weekSalePurchase, yearTopProduct, allConfigData}
};

export default connect(mapStateToProps, {weekSalePurchases, yearlyTopProduct})(LineChart);
