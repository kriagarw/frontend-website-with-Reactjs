import React, { Component } from 'react';
import Menu from './Menu';
import DishDetail from './DishDetail';
import { DISHES } from '../Data/dishes';
import { COMMENTS } from '../Data/comments';
import { LEADERS } from '../Data/leader';
import { PROMOTIONS } from '../Data/promotions';
import Header from './Header';
import Footer from './Footer';
import HomeComp from './HomeComp';
import { Switch, Route, Redirect } from 'react-router-dom'
import Contact from './Contact';
import About from './AboutComponent';

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS
            // selectedDish: null
        }
    }

    // onDishSelect(dishId) {
    //     this.setState({ selectedDish: dishId });
    // }

    render() {

        const HomePage = () => {
            return (
                <HomeComp
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            )
        }

        const DishwithId = ({match}) => {
            return(
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                        comments = {this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
            )
        }

        const Aboutus = () => {
            return(
                <About leader ={this.state.leaders} /> 
            )
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/aboutus" component={Aboutus} />
                    <Route exact path="/menu" component={() => <Menu Dishes={this.state.dishes} />} />
                    <Route path="/menu/:dishId" component={DishwithId} />
                    <Route exact path="/contactus" component={Contact} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;

// <Menu Dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
// <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
