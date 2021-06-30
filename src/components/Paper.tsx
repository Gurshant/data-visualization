import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {IState as IProps} from '../App';
import GroupedBarChart from './GroupedBarChart';
import CheckBoxes from './CheckBoxes';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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
  }),
);

interface Props{
  rawData: IProps["ethnicityData"];
  
  handleChange: IProps["handlePropStateChanges"];

  ageGroups: IProps["ageGroups"];

}

const Paper:React.FC<Props> = ({rawData, handleChange, ageGroups}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

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
      </Drawer>
    </div>
  );
}

export default Paper;

