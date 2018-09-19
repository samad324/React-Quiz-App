import React, { Component } from 'react';
import '../../App.css'
import '../../bootstrap.min.css'

class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mark: this.props.data.mark,
            total: this.props.data.quizLength
        }
    }

    componentWillMount(nextprops, nextState) {
        const { mark, total } = this.state;
        console.log(mark , total)
        let t = (mark / total) * 100;
        t >= 60 ? this.setState({ status: "Pass", mark: t }) : this.setState({ status: "Fail", mark: t })
    }


    render() {
        const { mark, status } = this.state
        return (
            <div className="container mt-5">
                <h3 className="my-4 ml-5">Results:</h3>
                <div className="ml-5 border border-primary rounded d-flex align-items-center flex-column">
                    {status == "Pass" ? <h2 className="text-success mt-5">Congratulations!! </h2> : <h2 className="text-danger mt-5">Sorry!! You Are Fail!!</h2>}
                    <h5 className="mt-2 mb-5">Your Score: {mark}%</h5>
                </div>
            </div>
        )
    }
}


export default Result