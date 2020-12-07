import React, {useEffect, useState} from "react";
import axios from '../../axios-kbu';
import Loader from '../../components/Loader/Loader';
import Review from '../../components/Review/Review';
import {useAuth} from "../../contexts/AuthContext";
import Error from "../../components/Error/Error";
import {Button, Card, Form, Rating, Segment} from "semantic-ui-react";


function Reviews(props) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [text, setText] = useState('');
  const [textError, setTextError] = useState(false);
  const [stars, setStars] = useState(1);
  const [postingReview, setPostingReview] = useState(false);

  function onTitleChange(event) {
    setTitle(event.target.value);
    if (title !== '') {
      setTitleError(false);
    }
  }

  function onTextChange(event) {
    setText(event.target.value);
    if (text !== '') {
      setTextError(false);
    }
  }

  function onStarsChange(event, {rating}) {
    setStars(rating);
  }

  function performValidation() {
    let flag = true;
    if (title === '') {
      setTitleError(true);
      flag = false;
    }
    if (text === '') {
      setTextError(true);
      flag = false;
    }
    return flag;
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    if (!performValidation()) {
      return;
    }
    setPostingReview(true);
    const {toolId} = props.match.params;
    try {
      const data = {
        title,
        text,
        stars
      }
      const configs = {
        headers: {
          Authorization: `Token ${token}`
        }
      }
      const res = await axios.post(`/tools/${toolId}/reviews/`, data, configs);
      console.log(res);
      setReviews([...reviews, res.data])
      setPostingReview(false);
      setTitle('');
      setStars(1);
      setText('');
    } catch (err) {
      setError('Something went wrong unable to post review');
      setPostingReview(false);
    }
  }

  useEffect(() => {
    (async function fetchReviews() {
      let {reviewsUrl} = props;
      if (reviewsUrl === undefined) {
        const {toolId} = props.match.params;
        reviewsUrl = `/tools/${toolId}/reviews`;
      }
      try {
        const res = await axios.get(reviewsUrl);
        const {data} = res;
        setLoading(false);
        setReviews(data.results);
      } catch (err) {
        console.log(err);
      }
    })();

  }, [])

  const {isAuth} = useAuth();
  let displayReviews = null;
  if (loading) {
    displayReviews = <Loader/>;
  } else {
    displayReviews = reviews.map((review, key) => {
      return (
        <Review
          key={key}
          title={review.title}
          text={review.text}
          rating={review.stars}
          timestamp={review.timestamp}
        />
      )
    });
    if (reviews.length === 0) {
      displayReviews = <h3>No Reviews for this item are added yet.</h3>
    }
  }
  return (
    <div>
      {displayReviews}
      {isAuth ?
        <Segment raised>
          {error ? <Error error={error}/> : ''}
          <Card.Header as='h1'>
            Add Your review
          </Card.Header>
          <Form onSubmit={handleOnSubmit}>

            <Form.Input
              fluid
              error={titleError}
              size='huge'
              value={title}
              placeholder={'Best?, Good?, Bad?, Worst?'}
              onChange={onTitleChange}
            />
            <Rating
              icon={'star'}
              size={'massive'}
              maxRating={5}
              rating={stars}
              onRate={onStarsChange}
            />
            <Form.TextArea
              error={textError}
              size='huge'
              value={text}
              placeholder={'Explain your review in detail'}
              onChange={onTextChange}
            />

            <Button loading={postingReview} size={'huge'} color={"teal"} onClick={handleOnSubmit}
                    type={'submit'}>Post</Button>
          </Form>
        </Segment> : ''
      }
    </div>
  );
}

export default Reviews;