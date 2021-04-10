import React from 'react';
import {
  ListGroup,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
  import { Link } from 'react-router-dom';

  const GroupsListGrid = (props) => {

    return (
      <div className='group-list'>
          <div className={props.groups.length < 3 ? 'list-group flex-md-row': 'card-columns'} >
            {props.groups.map((group, i) => {
              group.category = group.category.slice(0, 1).toUpperCase() + group.category.slice(1);
              return (
                <div key={i} className='group-card-container'>
                  <Card className='group-card h-100' style={{ width: '22rem'}} >
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
          </div>
      </div>
    )
  }

  export default GroupsListGrid;