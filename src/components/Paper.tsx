import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@material-ui/core';
import {IState as IProps} from '../App';
import GroupedBarChart from './GroupedBarChart';
import CheckBoxes from './CheckBoxes';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    filter:{
      display: 'flex',
      justifyContent: 'flex-start',
      padding: 20
    }
  }),
);

interface Props{
  rawData: IProps["ethnicityData"];
  
  handleChange: IProps["handlePropStateChanges"];

  ageGroups: IProps["ageGroups"];

}

const Paper:React.FC<Props> = ({rawData, handleChange, ageGroups}) => {
  const classes = useStyles();
  const error = rawData.filter((v) => v.show).length >= 5;


  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <GroupedBarChart rawData={rawData} ageGroups = {ageGroups}/>
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <CheckBoxes rawData={rawData} handleChange={handleChange} />
        <Divider />
      </Drawer>
    </div>
  );
}

export default Paper;

