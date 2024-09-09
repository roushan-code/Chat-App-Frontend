import React from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale,
  Title, LineController, LineElement, PointElement, LinearScale as LinearScale$1, Title as Title$1, Tooltip as Tooltip$1, Legend as Legend$1, CategoryScale as CategoryScale$1, LineController as LineController$1, LineElement as LineElement$1, PointElement as PointElement$1, 
  plugins} from 'chart.js'
import { getLast7Days } from '../../lib/features'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, LineController, LineElement, PointElement, LinearScale$1, Title$1, Tooltip$1, Legend$1, CategoryScale$1, LineController$1, LineElement$1, PointElement$1)

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins:{
    legend:{
      display: false,
    },
    title: {
      display: false,
    }
  },
  scales: {
    x: {
      grid:{
        display:false,
      }
    },
    y: {
      beginAtZero: true,
      grid:{
        display:false,
      }
    }
  }
}

const LineCharts = ({value=[1,2,1,3]}) => {
  return (
    
      <Line
      width={{
        xs: '100%',
        sm: '50%',
      }}
      
        data={{
          labels: labels,
          datasets: [
            {
              label: 'Messages',
              data: value,
              borderColor: ['#464d72'],
              backgroundColor: ['#2f334c'],
              pointBackgroundColor: '#2f334c',
              pointBorderColor: '#2f334c',
              
            },
            
          ],
        }}
        
        options={lineChartOptions}
      />
    
  )
}

const doughnutChatOptions = {
  responsive: true,
  plugins:{
    legend:{
      display: false,
    },
  },
  cutout: 110,
}


const DoughnutChart = ({value=[],labels=[] }) => {
  const data = {
    labels: labels,
          datasets: [
            {
              
              data: value,
              fill: true,
              borderColor: ['#464d72','#664e74'],
              backgroundColor: ['#2f334c','#403149'],
              offset: 10,
            },
          ]
  }
  return (
    <Doughnut data={data} style={{zIndex: 10}}  options={doughnutChatOptions}/>
  )
}

export  {LineCharts, DoughnutChart}