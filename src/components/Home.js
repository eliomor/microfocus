import React from 'react';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';
import { Button } from '@mui/material';
import * as favActions from '../store/action/favourite';
import { useDispatch } from 'react-redux';

import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

const Home = () => {
    const dispatch = useDispatch();
    const favImg = useSelector(state => state.favourite.favList)

    const onFavClickHandler = (img) => {
        dispatch(favActions.deleteFav(img))
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
                  <h1 style={{backgroundColor: "lightpink", marginTop: 10}} >My Favorite Images</h1>

                <GridList  padding={20} cols={3} style={{width:800, height: 800}}>
                <GridTile >
                    <Button
                        style={{ marginTop:50, backgroundColor: "lightpink", color: "black" }}
                        component={Link} 
                        to="/Search"
                        color="secondary"
                    >
                    <strong> Click Here
                        to
                       Add Images</strong>                 
                    </Button>
                    </GridTile>
                {favImg.map( img => (  
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
                     <FavoriteIcon/>
                    </IconButton>
                    <img style={{width:150, height: 99}} src={img.previewURL}/>
                    </GridTile>
                ))}
                </GridList>               
        </div>
    )
}

export default Home;