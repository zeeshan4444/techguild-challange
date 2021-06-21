import React, { Component,state, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import photoAPI from './api/photoApi';

let loadData = async () => { 
  let foundData = await photoAPI.getData();
  return foundData.data.data;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  }, 
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function  TitlebarGridList() {
  const classes = useStyles();
  const [photoList, setPhotoList]= useState([]);
  
  useEffect( async ()=>{
    let getValue = await loadData();
    setPhotoList(getValue);
  },[])

  return (
    <div className={classes.root}>
      <GridList cellHeight={300}  spacing={30} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        { photoList.map((tile) => (
          <GridListTile key={tile.image_url}>
            <img src={tile.image_url} alt={tile.image_url} />
            <GridListTileBar
              title={tile.name}
              actionIcon={
                <IconButton aria-label={`info about ${tile.name}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        )) }
      </GridList>
    </div>
  );
}