import React, { Component } from 'react';
import '../../App.css'
import '../../bootstrap.min.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import ReactDOM from 'react-dom'


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        width: "90%"
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});





function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Question No 1';
        case 1:
            return 'Question No 2';
        case 2:
            return 'Question No 3';
        case 3:
            return 'Question No 4';
        case 4:
            return 'Question No 5';
        case 5:
            return 'Question No 6';
        case 6:
            return 'Question No 7';
        case 7:
            return 'Question No 8';
        case 8:
            return 'Question No 9';
        case 9:
            return 'Question No 10';
    }
}

class StartQuiz extends Component {
    constructor(props) {
        super(props)
        const { quizData, no } = this.props
        this.state = {
            title: quizData.title,
            questions: quizData.questions,
            noOfQuestion: no,
            answer: "",
            activeStep: 0,
            lessfive: 0,
            greaterFive: -1
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ noOfQuestion: nextProps.no })
    }

    getSteps = () => {
        const { questions } = this.state

        let arr = [];

        questions.map(item => {
            arr.push(item.name)
        })

        return arr;
    }


    handleNext = () => {
        const { greaterFive, activeStep, answer , questions} = this.state;
        const { nextQuestion ,res } = this.props

        if (activeStep <= 4) {
            this.setState({ lessfive: activeStep + 1 })
        } if (activeStep >= 4) {
            this.setState({ greaterFive: greaterFive + 1 })
        }
        if(activeStep !== questions.length-1){
            nextQuestion(answer)
            this.setState({
                activeStep: activeStep + 1,
            });
        }else{
            res()
        }
    };

    handleChange = event => {
        this.setState({ answer: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep, lessfive, greaterFive } = this.state;
        const { title, noOfQuestion, questions } = this.state
        const currentQ = questions[noOfQuestion]



        return (
            <div className="container mt-4" ref="comp">>
                <h3>{title}</h3>
                <h5 className="text-right mr-3 mt-2">Question No : {noOfQuestion + 1}</h5>
                <h5 className="mt-3"> Q : {currentQ.question}</h5>
                <div>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            aria-label="answers"
                            name="gender1"
                            className={classes.group}
                            value={this.state.answer}
                            onChange={this.handleChange}
                        >
                            {currentQ.answers.map(item => {
                                return <FormControlLabel key={item + "123444"} value={item} control={<Radio color="primary" />} label={item} />
                            })}
                        </RadioGroup>
                    </FormControl>
                </div>


                <div className='mt-3 container'>


                    <Stepper activeStep={lessfive} alternativeLabel>
                        {steps.map((label, index) => {
                            if (index < 5) {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            }
                        })}
                    </Stepper>

                    <Stepper activeStep={greaterFive} alternativeLabel>
                        {steps.map((label, index) => {
                            if (index >= 5) {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            }
                        })}
                    </Stepper>

                    <div className="float-right mr-3">
                        <Button variant="contained" color="primary" onClick={this.handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

StartQuiz.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(StartQuiz)