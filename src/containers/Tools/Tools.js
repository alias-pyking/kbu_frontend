import React, {Component} from "react";
import axios from '../../axios-kbu';
import {Container, Divider, Grid, Input} from "semantic-ui-react";
import CardTool from '../../components/CardTool/CardTool';
import Loader from '../../components/Loader/Loader';

class Tools extends Component {
  state = {
    tools: [],
    loading: true,
    searchText: '',
    error: false,
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/tools/');
      this.setState(previousState => {
        return {
          ...previousState,
          tools: res.data.results,
          loading: false,
        }
      });
    } catch (err) {
      this.setState({...this.state, error: 'Something went wrong unable to fetch Items'});
    }
  }

  async searchByLocation(event) {
    ;
    try {
      this.setState({...this.state, searchText: event.target.value})
      const res = await axios.get('/tools/?l=' + event.target.value);
      this.setState(previousState => {
        return {
          ...previousState,
          tools: res.data.results,
          loading: false,
        }
      });
    } catch (err) {
      this.setState({...this.state, error: 'Something went wrong unable to fetch Items'});
    }
  }

  render() {
    const {loading} = this.state;
    let tools = null;
    if (loading) {
      tools = <Loader/>;
    } else {
      tools = this.state.tools.map((tool, index) => (
        <Grid.Column key={index}>
          <CardTool
            id={tool.id}
            cost={tool.cost_per_hour}
            name={tool.name}
            timestamp={tool.timestamp}
            thumb={tool.images[0]}
            state={tool.state}
            city={tool.city}
            town={tool.town}
            description={tool.description}
            rating={tool.rating}
          />

        </Grid.Column>
      ))
    }

    return (
      <Container>
        <Input
          fluid
          size={'huge'}
          placeholder={'Find Tools in your area, start typing your location'}
          value={this.state.searchText}
          onChange={(event) => this.searchByLocation(event)}
        />
        <Divider horizontal/>
        <Grid relaxed columns={4}>
          {tools}
        </Grid>
      </Container>
    )
  }
}

export default Tools;