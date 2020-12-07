import React, {useState} from "react";
import { Search, Icon} from "semantic-ui-react";
import axios from "../../axios-kbu";
import classes from './SearchTools.module.css';


export default function SearchTool() {
  const [searchText, setSearchText] = useState();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [results, setResults] = useState([]);

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
      setLoading(false);
      setLoaded(false);
    }
  }

  let displayResults = '';
  if (loaded) {
    displayResults = results.map((item, index) => {
      let description = item.description;
      description = description.toString();
      let len = description.length;
      const sliceIndex = description.length < 100 ? description.length : 100;
      description = description.slice(0, sliceIndex);
      if (sliceIndex < len) {
          description = description + '...';
      }
      return {
        id: item.id,
        name: item.name,
        title: <a href={'/tools/' + item.id}>{item.name}</a>,
        description: <a href={'/tools/' + item.id}> {description} </a>,
      }
    });
  }

  function handleResultSelect(event, {result}) {
    setSearchText(result.name);
  }

  return (
    <div className={classes.searchBar}>
      <Search
        loading={loading}
        onSearchChange={onSearchInputChange}
        onResultSelect={handleResultSelect}
        value={searchText}
        icon={<Icon name='search' inverted circular link/>}
        placeholder='Search...'
        results={displayResults}
      />
    </div>
  )
}