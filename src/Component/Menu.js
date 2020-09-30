import React from 'react'
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Loading } from './LoadingComp'
import { baseUrl } from '../Data/baseUrl'

function RenderMenu({ Dish, onClick }) {
    return (
        <Card>
            <Link to={`/menu/${Dish.id}`} >
                <CardImg src={baseUrl + Dish.image} alt={Dish.name} />
                <CardImgOverlay>
                    <CardTitle>{Dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    )
}

const Menu = (props) => {

    const menu = props.dishes.dishes.map(
        (dish) => {
            return (
                <div key={dish.id} className="col-md-4 m-4 px-0">
                    <RenderMenu Dish={dish} />
                </div>
            )
        }
    );

    if (props.dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.dishes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.dishes.errMess}</h4>
                </div>
            </div>
        )
    }
    else
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>

            </div>
        )
}



export default Menu
