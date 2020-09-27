import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, FormGroup, Input, Label, Col, Button, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            telnum: '',
            email: '',
            agree: '',
            contactType: 'Tel.',
            message: '',
            validation: {
                firstName: false,
                lastName: false,
                telnum: false,
                email: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        console.log("current state is: " + JSON.stringify(this.state))
        alert("current state is: " + JSON.stringify(this.state))
        event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            validation: { ...this.state.validation, [field]: true }
        })
    }

    validate(firstName, lastName, telnum, email) {
        const errors = {
            firstName: '',
            lastName: '',
            telnum: '',
            email: ''
        }

        if (this.state.validation.firstName && firstName.length < 3)
            errors.firstName = 'Should contain min 3 characters.';
        else if (this.state.validation.firstName && firstName.length > 15)
            errors.firstName = 'Should have max 15 characters.';

        if (this.state.validation.lastName && lastName.length < 3)
            errors.lastName = 'Should contain min 8 characters.';
        else if (this.state.validation.lastName && lastName.length > 15)
            errors.lastName = 'Should have max 15 characters.';

        const reg = /^\d+$/;
        if (this.state.validation.telnum && !reg.test(telnum))
            errors.telnum = 'Should contain only numbers.';

        if (this.state.validation.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Invalid Email.';

        return errors;
    }

    render() {

        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.telnum, this.state.email)

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>


                <div className="row row-content">
                
                    <div className="col-12 mb-4">
                        <h3>Send Us Your Feedback</h3>
                    </div>

                    <div className="col-12 col-md-9">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={6}>
                                    <Input type="text" id="firstName" name="firstName" placeholder="First Name"
                                        value={this.state.firstName} 
                                        valid={errors.firstName === ''} 
                                        invalid={errors.firstName !== ''} 
                                        onBlur={this.handleBlur('firstName')} 
                                        onChange={this.handleInputChange} 
                                    />
                                    <FormFeedback>
                                        {errors.firstName}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={6}>
                                    <Input type="text" id="lastName" name="lastName" placeholder="Last Name"
                                        value={this.state.lastName}
                                        valid={errors.lastName === ''} 
                                        invalid={errors.lastName !== ''} 
                                        onBlur={this.handleBlur('lastName')} 
                                        onChange={this.handleInputChange} 
                                    />
                                    <FormFeedback>
                                        {errors.lastName}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={6}>
                                    <Input type="tel" id="telnum" name="telnum" placeholder="Tel. Number"
                                        value={this.state.telnum} 
                                        valid={errors.telnum === ''} 
                                        invalid={errors.telnum !== ''} 
                                        onBlur={this.handleBlur('telnum')}  
                                        onChange={this.handleInputChange} 
                                    />
                                    <FormFeedback>
                                        {errors.telnum}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={6}>
                                    <Input type="email" id="email" name="email" placeholder="Email"
                                        value={this.state.email}  
                                        valid={errors.email === ''} 
                                        invalid={errors.email !== ''} 
                                        onBlur={this.handleBlur('email')}  
                                        onChange={this.handleInputChange} 
                                    />
                                    <FormFeedback>
                                        {errors.email}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 4, offset: 2 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" checked={this.state.agree}
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we Contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 2, offset: 1 }} className="m-0">
                                    <Input type="select" name="contactType"
                                        value={this.state.contactType} 
                                        onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={6}>
                                    <Input type="textarea" id="message" name="message" placeholder="Your Feedback" rows="6"
                                        value={this.state.message} onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 2, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}

export default Contact
