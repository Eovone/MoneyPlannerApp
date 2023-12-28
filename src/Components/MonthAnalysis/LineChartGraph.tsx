import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartData } from '../../Models/ChartData';

interface LineChartGraphProps {
    chartData: ChartData[];
    strokeColor: string;
}

const LineChartGraph: FC<LineChartGraphProps> = (props) => {   
    return(
          <>
            <Row className='mt-3'>
                <Col className='text-center d-flex justify-content-center'>
                    <LineChart width={1000}
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
                        <Tooltip labelFormatter={(label: string) => `Datum: ${label}`} />
                        <Line type="monotone" dataKey="Summa" stroke={props.strokeColor} strokeWidth={3} r={0}/>                                                            
                    </LineChart>
                </Col>
            </Row>
          </>
    )    
}
  
export default LineChartGraph;