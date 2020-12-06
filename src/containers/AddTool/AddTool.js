import React, {useState} from "react";
import {Button, Input, Form, Grid, Header, Segment, Select} from 'semantic-ui-react';
import {useAuth} from "../../contexts/AuthContext";
import Error from "../../components/Error/Error";
import axios from '../../axios-kbu';

function AddTool(props) {
  const [error, setError] = useState('');
  const {token} = useAuth();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [cost, setCost] = useState('');
  const [costError, setCostError] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [quantityError, setQuantityError] = useState(false);
  const [status, setStatus] = useState('available');
  const [submitting, setSubmitting] = useState(false);

  function onNameChange(event) {
    setName(event.target.value);
    if (name !== '') {
      setNameError(false);
    }
  }

  function onCostChange(event) {
    setCost(event.target.value);
    if (cost !== '') {
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

  function onStatusChange(event) {
    setStatus(event.target.value);
  }

  function onImagesChange(event) {
    console.log(event.target.files[0]);
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
    if (cost === '') {
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
    formData.append('cost', cost);
    formData.append('quantity', quantity);
    formData.append('status', status);

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
              placeholder={'Price'}
              type={'number'}
              onChange={onCostChange}
            />
            <Form.Field>
              <select onChange={onStatusChange}>
                <option value='available'> Available</option>
                <option value='not_available'>Not available</option>
              </select>
            </Form.Field>
            {imagesError ? <Error error={imagesError}/>:''}
            <Form.Input
              size={'huge'}
              fluid
              type={'file'}
              required={true}
              multiple
              onChange={onImagesChange}
            />
            <Button loading={submitting} disabled={submitting} color={'teal'} size={'huge'} type={'submit'} onClick={onSubmit}> Submit</Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default AddTool;