import React from 'react';
import {
  Jumbotron,
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
  ListGroupItemHeading,
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
                    return (
                      <ListGroupItem className='group-list-item' key={i}>
                      <Link className='group-list-name' to={`/groups/${group.group_id}`} >
                        <ListGroupItemHeading >{group.group_name}</ListGroupItemHeading>
                      </Link>
                      <ListGroupItemText>{group.description}</ListGroupItemText>
                      </ListGroupItem>
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
