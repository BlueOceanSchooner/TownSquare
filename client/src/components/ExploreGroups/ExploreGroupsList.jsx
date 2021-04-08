import React from 'react';
import {
  Jumbotron,
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
  ListGroupItemHeading,
  Card,
  CardColumns,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  FormFeedback,
  FormText,
  Input,
  Label, } from 'reactstrap';
  import { Link } from 'react-router-dom';

  const ExploreGroupsList = (props) => {

    return (
      <div className='group-list'>
          <CardColumns className='card-columns ' >
            {props.groups.map((group, i) => {
              group.category = group.category.slice(0, 1).toUpperCase() + group.category.slice(1);
              return (
                <div key={i} className='group-card-container'>
                  <Card className='group-card h-100' style={{ width: '28rem'}} >
                    <Link to={`/groups/${group.group_id}`} >
                      <CardImg className='card-img' top width="100%" src={group.image_url} alt="Image of group." />
                    </Link>
                    <CardBody className='group-card-body'>
                      <Link className='group-list-name' to={`/groups/${group.group_id}`} >
                        <CardTitle tag="h4">{group.group_name}</CardTitle>
                      </Link>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">{group.category}</CardSubtitle>
                      <CardText>{group.description}</CardText>
                    </CardBody>
                  </Card>
                </div>
              )
            })}
          </CardColumns>
      </div>
    )
  }

  export default ExploreGroupsList;