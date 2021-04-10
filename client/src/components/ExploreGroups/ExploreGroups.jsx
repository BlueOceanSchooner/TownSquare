import React from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import axios from 'axios';
import GroupsListGrid from './GroupsListGrid.jsx';
import GroupsList from './GroupsList.jsx';

class ExploreGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: null,
      selectVal: '',
      options: ['all', 'outdoors', 'music', 'cooking', 'animals', 'hobbies', 'religious'],
      listView: 'grid'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    // axios.get('/api/groups')
    //   .then((results) => {
    //     this.setState({
    //       groups: results.data
    //     })
    //   })
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      axios.post('/api/groups/local', {
        latitude: lat,
        longitude: long
      }).then((results) => {
        this.setState({
          groups: results.data
        });
      })
    }, (error) => {
      console.log(error);
    });
    // axios.post('/api/groups', {
      // lat
    // })
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
    if (e.target.name === 'view-select') {
      this.setState({
        listView: e.target.value
      })
    } else {
      this.setState({
        selectVal: e.target.value
      }, () => {
        this.handleFilter(this.state.selectVal)
      })
    }
  }

  render() {
    if (!this.state.groups) {
      return <div></div>
    } else {
      return (
        <div className='groups-page'>
          <div className='groups-header rounded-pill'>
              <h3 className='g-header'>Groups In Your Area</h3>
          </div>
          <div className='group-select-form'>
            <div className='group-select'>
              <Form className="form-inline">
                <FormGroup>
                  <Label className='filter-label' for='category-filter'>Browse by</Label>
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
            <div className='group-view'>
              <Form className="form-inline">
                <FormGroup>
                  <Label className='filter-label' for='category-filter'>View as</Label>
                      <Input
                      onChange={this.handleChange}
                      type='select'
                      name='view-select'
                      value={this.state.listView}
                      className='select-box'
                      style={{width: '110px'}}
                      >
                        <option className='select-box-option' value={'grid'}>grid</option>
                        <option className='select-box-option' value={'list'}>list</option>
                      </Input>
                  </FormGroup>
              </Form>
            </div>
          </div>
          <div className='group-list-container'>
            {this.state.listView === 'grid' ? <GroupsListGrid groups={this.state.groups} /> : <GroupsList groups={this.state.groups} />}
          </div>
        </div>
      )

    }

  }
};

export default ExploreGroups;
