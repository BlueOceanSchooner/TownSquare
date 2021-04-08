import React from 'react';
import {
  Jumbotron,
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
  ListGroupItemHeading,
  Card,
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
import Header from '../Header/Header.jsx'
import axios from 'axios';
import { Link } from 'react-router-dom';

class ExploreGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: null,
      selectVal: '',
      options: ['all', 'outdoors', 'music', 'cooking', 'animals', 'hobbies', 'religious']
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    axios.get('/api/groups')
      .then((results) => {
        this.setState({
          groups: results.data
        })
      })
  }

  handleFilter(val) {
    if (val === 'all') {
      axios.get('/api/groups')
      .then((results) => {
        this.setState({
          groups: results.data
        })
      })
    } else {
      axios.get(`/api/groups/category/${val}`)
        .then((results) => {
          this.setState({
            groups: results.data
          })
        })
    }
  }

  handleChange(e) {
    this.setState({
      selectVal: e.target.value
    }, () => {
      this.handleFilter(this.state.selectVal)
    })
  }

  render() {
    if (!this.state.groups) {
      return <div>loading...</div>
    } else {
      return (
        <div className='groups-page'>
          <div className='groups-header'>
              <h3 className='g-header'>Groups In Your Area</h3>
          </div>
            <div className='group-select'>
              <Form className="form-inline">
                <FormGroup>
                  <Label className='filter-label' for='category-filter'>Browse by category</Label>
                      <Input
                      onChange={this.handleChange}
                      type='select'
                      name='category-filter'
                      value={this.state.selectVal}
                      className='select-box'
                      >
                        {this.state.options.map((option, i) => {
                          return <option className='select-box-option' value={option} key={i}>{option}</option>
                        })}
                      </Input>
                  </FormGroup>
              </Form>
            </div>
          <div className='group-list-container'>
            <div className='group-list'>
                <ListGroup >
                  {this.state.groups.map((group, i) => {
                    group.category = group.category.slice(0, 1).toUpperCase() + group.category.slice(1);
                    return (
                      <div key={i} className='group-card-container'>
                        <Card style={{ width: '40rem'}} >
                          <Link to={`/groups/${group.group_id}`} >
                            <CardImg className='card-img' top width="100%" src={group.image_url} alt="Image of group." />
                          </Link>
                          <CardBody>
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
                </ListGroup>
              </div>
          </div>
        </div>
      )

    }

  }
};

export default ExploreGroups;
