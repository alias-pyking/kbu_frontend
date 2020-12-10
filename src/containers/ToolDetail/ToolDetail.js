import React, {Component} from "react";
import axios from '../../axios-kbu';
import Loader from '../../components/Loader/Loader';
import {Button, Container, Label, LabelGroup} from "semantic-ui-react";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import styles from './ToolDetail.module.css';
import {Link} from "react-router-dom";
import Reviews from "../Reviews/Reviews";

class ToolDetail extends Component {

  state = {
    id: null,
    user: '',
    name: '',
    images: null,
    description: '',
    quantity: null,
    cost_per_hour: null,
    status: '',
    reviews: '',
    timestamp: null,
    loading: true,
  }

  async componentDidMount() {
    const {toolId} = this.props.match.params;
    const path = `tools/${toolId}`;
    try {
      const res = await axios.get(path);
      const {data} = res;
      console.log(data);
      this.setState(previousState => {
        return {
          ...previousState,
          id: data.id,
          user: data.user,
          name: data.name,
          images: data.images,
          description: data.description,
          quantity: data.quantity,
          cost_per_hour: data.cost_per_hour,
          status: data.status,
          timestamp: data.timestamp,
          reviews: data.reviews,
          loading: false,
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  

  render() {
    let tool = null;
    const {loading} = this.state;
    const state = {...this.state};
    if (loading) {
      tool = <Loader/>;
    } else {
      tool = (
        <>
          <Container fluid>
            <div className={styles.stickHeader}>
              <h2>{state.name}</h2>
            </div>
            <div>
              <ImageSlider images={state.images}/>
            </div>
          </Container>
          <Container>
            <div>
              <h3>By <Link to={`/profile/${state.user}`}> {state.user}</Link></h3>
              <h2>Item Description</h2>
              <p>{state.description}</p>
            </div>
            <div>
              <LabelGroup tag className={styles.toolMeta}>
                <Label color={state.status === 'available' ? 'green' : "red"}>
                  {state.status === 'available' ? 'Available' : 'Not Available'}
                </Label>
              </LabelGroup>
              <LabelGroup tag className={styles.toolMeta}>
                <Label color='blue'>Quantity {state.quantity}</Label>
              </LabelGroup>
              <LabelGroup tag className={styles.toolMeta}>
                <Label as='a' color={"yellow"}>
                  Cost per day <i className='rupee sign icon'/>{state.cost_per_hour}
                </Label>
              </LabelGroup>
              <Button fluid size={'huge'} color={'teal'} as={Link} to={`/tools/${state.id}/rent`} disabled={!this.state.quantity}>Rent</Button>
            </div>
          </Container>
          <br></br>
          <br></br>
          <Container>
            <div className={styles.stickHeader}>
              <h2>Reviews</h2>
              <Reviews {...this.props} reviewsUrl={state.reviews}/>
            </div>
          </Container>
        </>

      )
    }

    return (
      <div>
        {tool}
      </div>
    )
  }
}

export default ToolDetail;