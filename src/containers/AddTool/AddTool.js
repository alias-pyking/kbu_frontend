import React, {useState} from "react";
import {Button, Input, Form, Grid, Header, Segment, Select, Label} from 'semantic-ui-react';
import {useAuth} from "../../contexts/AuthContext";
import Error from "../../components/Error/Error";
import axios from '../../axios-kbu';

function AddTool(props) {
  const [error, setError] = useState('');
  const {token} = useAuth();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [costPerDay, setCostPerDay] = useState('');
  const [costError, setCostError] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [quantityError, setQuantityError] = useState(false);
  const [status, setStatus] = useState('available');
  const [submitting, setSubmitting] = useState(false);
  const [state, setState] = useState('');
  const [stateError, setStateError] = useState(false);
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState(false);
  const [town, setTown] = useState('');
  const [townError, setTownError] = useState(false);

  function onNameChange(event) {
    setName(event.target.value);
    if (name !== '') {
      setNameError(false);
    }
  }

  function onCostChange(event) {
    setCostPerDay(event.target.value);
    if (costPerDay !== '') {
      setCostError(false);
    }
  }

  function onDescriptionChange(event) {
    setDescription(event.target.value);
    if (description !== '') {
      setDescriptionError(false);
    }
  }

  function onQuantityChange(event) {
    setQuantity(event.target.value);
    console.log(event.target);
    if (quantity !== '') {
      setQuantityError(false)
    }
  }

  function onStateChange(event) {
    setState(event.target.value);
    if (state !== '') {
      setStateError(false)
    }
  }

  function onCityChange(event) {
    setCity(event.target.value);
    if (city !== '') {
      setCityError(false)
    }
  }
  function onTownChange(event) {
    setTown(event.target.value);
    if (quantity !== '') {
      setTownError(false);
    }
  }


  function onStatusChange(event) {
    setStatus(event.target.value);
  }

  function onImagesChange(event) {
    const files = event.target.files;
    const allowedTypes = ['image/jpeg','image/gif','image/png','image/jpg','image/x-png'];

    for(let i = 0; i < files.length; i++){
      if(!allowedTypes.includes(files[i].type)){
        setImagesError(`File type ${files[i].type} is not allowed.`);
        return;
      }
    }
    setImagesError('');
    setImages([...images, ...event.target.files]);
  }

  function performValidation() {
    let flag = false;
    if (name === '') {
      setNameError(true);
      flag = true;
    }
    if (costPerDay === '') {
      setCostError(true);
      flag = true;
    }
    if (description === '') {
      console.log('here');
      setDescriptionError(true);
      flag = true;
    }
    if (quantity === '') {
      setQuantityError(true);
      flag = true;
    }
    if(images.length === 0){
      setImagesError('Please add atleast one image');
      flag = true;
    }
    if (state === ''){
      setStateError(true);
      flag = true;
    }
    if(city === ''){
      setCityError(true);
      flag = true;
    }
    if(town === ''){
      setTownError(true);
    }
    return flag;
  }

  async function onSubmit(event) {
    event.preventDefault();
    if(performValidation()){
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('cost_per_hour', costPerDay);
    formData.append('quantity', quantity);
    formData.append('status', status);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('town', town);

    for(let i = 0; i < images.length; i++){
      formData.append('images', images[i]);
    }
    
    const configs = {
      headers: {
        Authorization: `token ${token}`,
        'content-type':'multipart/form-data'
      }
    };
    setSubmitting(true);
    try {
      const res = await axios.post('/tools/', formData, configs);
      props.history.push('/tools/'+res.data.id);
      setSubmitting(false);
    } catch (err) {
      setError('Something went wrong unable to add Item.');
      setSubmitting(false);
    }

  }

  return (
    <Grid textAlign='center'>
      <Grid.Column style={{maxWidth: 600}}>
        {error?<Error error={error} />:''}
        <Header as={'h1'} color='teal'>
          Add your item to make money.
        </Header>
        <Form size='large' onSubmit={onSubmit}>
          <Segment raised>
            <Form.Input
              error={nameError}
              size={'huge'}
              fluid
              placeholder={'Name'}
              onChange={onNameChange}
            />
            <Form.TextArea
              error={descriptionError}
              size={'huge'}
              placeholder={'Description'}
              onChange={onDescriptionChange}
            />
            <Form.Input
              error={quantityError}
              size={'huge'}
              fluid
              placeholder={'Quantity'}
              type={'number'}
              onChange={onQuantityChange}
            />
            <Form.Input
              error={costError}
              size={'huge'}
              fluid
              placeholder={'Price per day in INR'}
              type={'number'}
              onChange={onCostChange}
            />
            <Form.Field>
              <Label>Status</Label>
              <select onChange={onStatusChange}>
                <option value='available'> Available</option>
                <option value='not_available'>Not available</option>
              </select>
            </Form.Field>
            {imagesError ? <Error error={imagesError}/>:''}
            <Form.Input
              label={'Tool Images'}
              size={'huge'}
              fluid
              type={'file'}
              required={true}
              multiple
              onChange={onImagesChange}
            />
            <Label>Address</Label>
            <Form.Input
              error={stateError}
              size={'huge'}
              fluid
              placeholder={'State'}
              type={'text'}
              onChange={onStateChange}
            />
            <Form.Input
              error={cityError}
              size={'huge'}
              fluid
              placeholder={'City'}
              type={'text'}
              onChange={onCityChange}
            />
            <Form.Input
              error={townError}
              size={'huge'}
              fluid
              placeholder={'Locality/town/village'}
              type={'text'}
              onChange={onTownChange}
            />
            <Button loading={submitting} disabled={submitting} color={'teal'} size={'huge'} type={'submit'} onClick={onSubmit}> Submit</Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default AddTool;