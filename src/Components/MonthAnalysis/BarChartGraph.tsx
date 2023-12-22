import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Bar, BarChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartData } from '../../Models/ChartData';

interface BarChartGraphProps {
    chartData: ChartData[];
}

const BarChartGraph: FC<BarChartGraphProps> = (props) => {   
    return(
          <>
            <Row className='mt-3'>
                <Col className='text-center d-flex justify-content-center'>
                    <BarChart width={1000}
                                height={400}
                                data={props.chartData}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                                }}
                                className='bg-dark rounded-1'
                                >
                        <XAxis dataKey="date" stroke='white' />
                        <YAxis stroke='white'/>
                        <Tooltip labelFormatter={(label: string) => `Datum: ${label}`}/>
                        <Legend />
                        <Bar dataKey="Inkomst" fill='green' />
                        <Bar dataKey="Utgift" fill='red' />                    
                    </BarChart>
                </Col>
            </Row>
          </>
    )    
}
  
  export default BarChartGraph;