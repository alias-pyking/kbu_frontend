import React, {useState} from "react";
import {Card, Icon, Input, List} from "semantic-ui-react";
import axios from "../../axios-kbu";
import classes from './SearchTools.module.css';
import {Link} from "react-router-dom";

export default function SearchTool(props) {

  const [searchText, setSearchText] = useState();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');


  async function onSearchInputChange(event) {
    setSearchText(event.target.value);
    if (event.target.value.length < 2) {
      setLoaded(false);
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`/tools/?query=${event.target.value}`);
      setLoading(false);
      setResults(res.data.results);
      setLoaded(true);
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
      setLoaded(false);
    }
  }
  let displayResults = '';
  if(loaded){
    displayResults = results.map((item, index) => {
      return (
        <List.Item>
          <List.Content>
            <List.Header as={Link} to={`/tools/${item.id}`}>{item.name}</List.Header>
          </List.Content>
        </List.Item>
      )
    });
  }
  return (
    <div className={classes.searchBar}>
    <Input
      loading={loading}
      onChange={onSearchInputChange}
      icon={<Icon name='search' inverted circular link/>}
      placeholder='Search...'
    />
    <Card className={classes.searchResults}>
      {loaded? displayResults:''}
    </Card>
    </div>
  )
}