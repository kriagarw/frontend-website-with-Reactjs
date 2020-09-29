import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Row, Label, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComp';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

function RendorDish({ dish }) {
    return (
        <Card className="col-md-4 px-0 mr-5">
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}


function RendorComments({ comments, addComment, dishId }) {
    if (comments != null) {
        return (
            <div className="col-md-4 px-0 m-4">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment} </p>
                                <p>-- {comment.author} ,
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        )
                    })
                    }
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RendorDish dish={props.dish} />
                    <RendorComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                </div>
            </div>
        )
    else
        return (
            <div></div>
        )
}

class CommentForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>

                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-md "> </span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
                    <ModalBody className="col-12">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                            <Row className="form-group">
                                <Label htmlFor="rating" className="pl-3">Rating</Label>
                                <Col md={12} className="m-0">
                                    <Control.select model=".Rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" className="pl-3">Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author"
                                        id="author"
                                        name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />

                                    <Errors className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required. ',
                                            minLength: 'Should Contain min 3 characters. ',
                                            maxLength: 'Should contain 15 characters or Less. '
                                        }}>
                                    </Errors>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" className="pl-3">Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment"
                                        id="comment"
                                        name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>

                        </LocalForm>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}

export default DishDetail
