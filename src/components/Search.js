import React, {useState} from 'react';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import { Button } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import * as favActions from '../store/action/favourite';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

const Search = () => {
const dispatch = useDispatch()
const favImg = useSelector(state => state.favourite.favList)

   const [search,setSearch] =useState({
       searchText: '',
       amount: 30,
       apiUrl: 'https://pixbay.com/api',
       apiKey: '23507082-819165fe9b3f01c1794c0e1eb',
       images: []
    })

    const [click,setClick] =useState('false')

    const onTextChange = (s) => {
        setSearch({...search,[s.target.name] : s.target.value})
        setClick(false)
    };
    
    const onClickHandler = () => {
        setClick(true)
        axios.get(`https://pixabay.com/api/?key=23507082-819165fe9b3f01c1794c0e1eb&q=${search.searchText}&image_type=photo&per_page=${search.amount}&safesearch=true`,
        )
        .then(res => {
            setSearch({images: res.data.hits})
         })
        .catch(err => console.log(err));
    }
    
    const onFavClickHandler = (img) => {
        dispatch(favActions.addFav(img))
    }

    const onClickAmountHandler = (e,index,value) => {
        setSearch({...search,amount : value})
        setClick(false)

    }

    const imageSize = (num) => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
         }
         if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
         }
         if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
         }
         if (num < 1000) {
            return num;
         }
         return num;
    }

    return (
        <div align="center" >
            <div>
            <h1 style={{backgroundColor: "lightpink", marginTop: 10}} >Search New Images </h1>
            <Button
               style={{ marginBottom:20, backgroundColor: "lightpink", color: "black"}}
               component={Link} 
               to="/Home"
               color="secondary"
               >
                   <strong>Back to Favorite Images</strong>
           </Button>
            </div>
           <div style={{ alignItems: 'center', flexDirection: 'row'}}>
                <TextField
                    style={{ color: "black", height:40, margin: 5}}
                    name="searchText"
                    value={search.searchText}
                    onChange={onTextChange}
                    placeholder="Search For Images"
                    textcolor= "white"
                />

                <Button
                style={{ backgroundColor: "lightpink", color: "black", height:40, margin: 5}}
                onClick={onClickHandler}
                >
                    Search
                </Button> 
                <div style={{ }}>
                <SelectField
                    name="amount"
                    value={search.amount}
                    floatingLabelText="Amount"
                    floatingLabelStyle={{ }}
                    style={{ color: "black", height:40, margin: 10, width:100}}
                    onChange={onClickAmountHandler}
                >
                    <MenuItem value={30} primaryText={30}/>
                    <MenuItem value={50} primaryText={50}/>
                    <MenuItem value={100} primaryText={100}/>

                </SelectField> 
             </div>
            </div> 
                
             {(click && search.images) ?
              <GridList  padding={20} cols={3} style={{width:800, height: 800, marginTop:20}}>
                {search.images.map( img => ( 
                     
                    <GridTile 
                        title={img.tags}
                        key={img.id}
                        subtitle={
                            <span>
                                by <strong>{img.user}</strong>
                                <br />
                                size <strong>{imageSize(img.imageSize)}</strong>
                          
                            </span>
                        }
                    >
                     <IconButton 
                        onClick={()=>{onFavClickHandler(img)}}
                        color="secondary"
                        style={{marginBottom: 90}}
                        >
                   { favImg.find(im => im.id ===img.id) ? <FavoriteIcon/> :  <FavoriteBorderIcon/>}
                    </IconButton>
                    <img  style={{width:150, height: 99}} src={img.previewURL}/>
                    </GridTile>
                ))}
                </GridList>        
            :
            <div>
            </div>
             }   
        </div>
    )
}

export default Search;


