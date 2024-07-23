import axios from "axios";
import { useDispatch } from "react-redux";
import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Table,
    Alert, Card
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./calculator.css";
import ReactDOM from 'react-dom'

const ReturnProfitCalculator = () => {
    const [poleNumber, setPoleNumber] = useState(1);
    const [accessCost, setAccessCost] = useState(100);
    const [electricianCost, setElectricianCost] = useState(100);
    const [maintenanceCycle, setMaintenanceCycle] = useState(1);

    const [totalEstimatedCost, setTotalEstimatedCost] = useState(0);
    const [totalInstallCostMinetech, setTotalInstallCostMinetech] = useState(0);
    const [maintenanceCostAfterMinetech, setMaintenanceCostAfterMinetech] = useState(0);
    const [totalOnetimeSaving, setTotalOnetimeSaving] = useState(0);
    const [totalSaving, setTotalSaving] = useState(0);

    const [totalSpend, setTotalSpend] = useState(0);
    const [totalSpendAfter, setTotalSpendAfter] = useState(0);


    const changePoleNumber = (e) => {
        setPoleNumber(e.target.value);

        // calculate();
    };
    const changeAccessCost = (e) => {
        setAccessCost(e.target.value);

        // calculate();
    };
    const changeLabourCost = (e) => {
        setElectricianCost(e.target.value);

        // calculate();
    };
    const changeMaintenanceCycle = (e) => {
        setMaintenanceCycle(e.target.value);

        // calculate();
    };

    useEffect(() => {
        setTotalEstimatedCost((Number(electricianCost) + Number(accessCost)) * Number(poleNumber));
        setTotalInstallCostMinetech((246 + Number(electricianCost)) * Number(poleNumber))
        setMaintenanceCostAfterMinetech((Number(electricianCost) / 2) * Number(poleNumber))
        setTotalOnetimeSaving(((Number(electricianCost) + Number(accessCost)) * Number(poleNumber)) - ((246 + Number(electricianCost)) * Number(poleNumber)));
        setTotalSaving(((((Number(accessCost) / Number(maintenanceCycle)) + (Number(electricianCost) / Number(maintenanceCycle))) * Number(poleNumber)) * 25) - (((((Number(electricianCost) / 2) * (25 - Number(maintenanceCycle)) / Number(maintenanceCycle)) * Number(poleNumber))) + ((246 + Number(electricianCost)) * Number(poleNumber))))
        setTotalSpend((((Number(accessCost) / Number(maintenanceCycle)) + (Number(electricianCost) / Number(maintenanceCycle))) * Number(poleNumber)) * 25)
        setTotalSpendAfter(((((Number(electricianCost) / 2) * (25 - Number(maintenanceCycle)) / Number(maintenanceCycle)) * Number(poleNumber))) + ((246 + Number(electricianCost)) * Number(poleNumber)))

    }, [poleNumber, accessCost, electricianCost, maintenanceCycle])


    // console.log("out", poleNumber, accessCost, electricianCost, maintenanceCycle);

    function BarGroup(props) {
        let barPadding = 1
        let barColour = '#fd9431'
        let widthScale = d => d * 10


        let width = widthScale(props.d.value)
        let yMid = props.barHeight * 0.5

        if (props.index === 0) {
            barColour = '#aaa5a5'
        }

        return <g className="bar-group">
            <text className="name-label" x="65" y={yMid + 10} alignmentBaseline="middle" >{props.d.name}</text>
            <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
            {
                props.index === 0 ? (
                    <text className="value-label" x="45" y={yMid - 15} alignmentBaseline="middle" >{props.totalSpend?.toLocaleString('en-US', {
                        style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
                    })}</text>
                ) : (
                    <text className="value-label" x="45" y={yMid - 15} alignmentBaseline="middle" >{props.totalSpendAfter?.toLocaleString('en-US', {
                        style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
                    })}</text>
                )
            }

        </g>
    }

    class BarChart extends React.Component {

        state = {
            data: [
                { name: 'Current cost', value: 4000 },
                { name: 'With Minetech', value: 1300 },

            ]
        }
        render() {
            let barHeight = 50
            const totalValue = Number(totalSpend);
            this.state.data[0].value = Math.log2(Number(totalSpend)) * 1.3;
            this.state.data[1].value = Math.log2(Number(totalSpendAfter)) * 0.3;

            // console.log(totalSpend, totalSpendAfter);
            // console.log(this.state.data[0].value, this.state.data[1].value);

            let barGroups = this.state.data.map((d, i) => <g transform={`translate(0, ${i * barHeight * 2.3})`}>
                <BarGroup d={d} barHeight={barHeight} index={i} totalSpend={totalSpend} totalSpendAfter={totalSpendAfter} />
            </g>)


            return <svg width="800" height="300" >
                <g className="container">
                    <g className="chart" transform="translate(70,50)">
                        {barGroups}
                    </g>
                </g>
            </svg>
        }
    }

    return (
        <Row className="calculator_blocks_row content-container ">
            <h2 style={{ textAlign: "center" }}>MineTech Lightpole Investment Calculator</h2>

            <Col lg={4} className="calculator_blocks_col d-flex" >
                <Card className="calculator_blocks_card">
                    <Card.Title className="card_title">Project Data</Card.Title>
                    <Card.Body className="calculator_blocks_card_body">
                        <Form.Label>Estimated number of poles: </Form.Label>
                        <Form.Control name="number_poles" className="input_controller" max={5000} min={1} step={1} defaultValue={1} type="number" onChange={changePoleNumber}></Form.Control><br />
                        <Form.Label>Estimated cost of Access: </Form.Label>
                        <Form.Control name="access_cost" className="input_controller" step={1} min={1} defaultValue={100} type="number" onChange={changeAccessCost}></Form.Control>
                        <Form.Label>Per non-lowering pole( scaffold,EWP,etc )</Form.Label><br /><br />
                        <Form.Label>Electrician cost per Hour ( Approx: 2 X 0.5h ):</Form.Label>
                        <Form.Control name="labour_cost" className="input_controller" step={1} min={1} max={1000} defaultValue={100} type="number" onChange={changeLabourCost}></Form.Control><br />
                        <Form.Label>Current maintenance cycle:</Form.Label>
                        <Form.Control name="maintenance_cycle" className="input_controller" max={25} min={1} step={1} defaultValue={1} type="number" onChange={changeMaintenanceCycle}></Form.Control>

                    </Card.Body>
                </Card>
            </Col>
            <Col lg={4} className="calculator_blocks_col d-flex" >
                <Card className="calculator_blocks_card">
                    <Card.Title className="card_title_1">Maintenance Over <br />25 years</Card.Title>
                    <Card.Body className="calculator_blocks_card_body_chart">
                        <div style={{ rotate: "-90deg", overflow: "hidden", width: "180%", marginTop: "40%", marginLeft: "-30%" }}>
                            <BarChart />
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            <Col lg={4} className="calculator_blocks_col d-flex" >
                <Card className="calculator_blocks_card">

                    <Card.Title className="card_title">Results</Card.Title>
                    <Card.Body className="calculator_blocks_card_body">
                        <Form.Group className="label_group">
                            <Form.Label className="label_controller">  {totalEstimatedCost.toLocaleString('en-US', {
                                style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
                            })} / {maintenanceCycle} yrs</Form.Label><br />
                            <Form.Label> Total estimated cost of current maintenance-per cycle</Form.Label><br />
                        </Form.Group >
                        <Form.Group className="label_group">
                            <Form.Label className="label_controller"> {totalInstallCostMinetech.toLocaleString('en-US', {
                                style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
                            })} </Form.Label><br />
                            <Form.Label> Total estimated cost to install the MineTech</Form.Label><br />
                        </Form.Group>
                        <Form.Group className="label_group">
                            <Form.Label className="label_controller">  {maintenanceCostAfterMinetech.toLocaleString('en-US', {
                                style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
                            })} / {maintenanceCycle} yrs</Form.Label><br />
                            <Form.Label> Estimated ongoing cost of maintenance after installation of the MineTech (per cycle)</Form.Label><br />
                        </Form.Group>
                        <Form.Group className="label_group">
                            <Form.Label className="label_controller"> {totalOnetimeSaving.toLocaleString('en-US', {
                                style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
                            })} </Form.Label><br />
                            <Form.Label> Total estimated one time saving from installing the MineTech</Form.Label><br />
                        </Form.Group>
                        <Form.Group className="label_group">
                            <Form.Label className="label_controller"> {totalSaving.toLocaleString('en-US', {
                                style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
                            })} </Form.Label><br />
                            <Form.Label> Total estimated savings over 25 year asset lifecycle from installing the MineTech</Form.Label>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Col>




        </Row >
    );
};

export default ReturnProfitCalculator;