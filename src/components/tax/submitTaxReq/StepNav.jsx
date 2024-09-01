import React, { useState } from 'react'
import Home from '../../pages/home/Home';
import { ProgressBar, Step, StepLabel } from 'react-step-progress-bar';
import { Accordion, Button, Card, Col, Row, Tab, Tabs } from 'react-bootstrap';

const StepNav = () => {

    var steps = [
        {
            stepName: "About",
            stepIcon: "tim-icons icon-single-02",
            component: Home
        },
        {
            stepName: "Account",
            stepIcon: "tim-icons icon-settings-gear-63",
            component: Home
        },
        {
            stepName: "Address",
            stepIcon: "tim-icons icon-delivery-fast",
            component: Home,
            stepProps: {
                prop1: true,
                prop2: "A string"
            }
        }
    ];

    const [activeTab, setActiveTab] = useState(1);

    const handleSelect = (key) => {
        setActiveTab(key);
    };

    const handleNext = () => {
        if (activeTab < 3) {
            setActiveTab(activeTab + 1);
        }
    };

    const handlePrevious = () => {
        if (activeTab > 1) {
            setActiveTab(activeTab - 1);
        }
    };
    return (
        <>
            <div className="wizard-container">
                <ProgressBar percent={50}>
                    <Step>
                        {({ accomplished }) => (
                            <StepLabel className={accomplished ? 'step-accomplished' : ''}>
                                مرحله اول
                            </StepLabel>
                        )}
                    </Step>
                    <Step>
                        {({ accomplished }) => (
                            <StepLabel className={accomplished ? 'step-accomplished' : ''}>
                                مرحله دوم
                            </StepLabel>
                        )}
                    </Step>
                    <Step>
                        {({ accomplished }) => (
                            <StepLabel className={accomplished ? 'step-accomplished' : ''}>
                                مرحله سوم
                            </StepLabel>
                        )}
                    </Step>
                </ProgressBar>
            </div>
        </>
    )
}

export default StepNav;