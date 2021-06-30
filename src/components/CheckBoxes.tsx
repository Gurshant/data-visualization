import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {IState as IProps} from '../App';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
    form:{
      display: 'flex',
      justifyContent: 'flex-start',
      padding: 20,
    },
    helperText:{
      color: 'red'
    }
  }),
);

interface Props{
  rawData: IProps["ethnicityData"];
  handleChange: IProps["handlePropStateChanges"]

}

const CheckBoxes:React.FC<Props> = ({rawData, handleChange}) => { 
  const classes = useStyles();

  const error = rawData.filter((v) => v.show).length >= 5;
  return (
    <div className={classes.root}>
      <FormControl required  component="fieldset" >
          <Typography variant="h6" noWrap>
           Filters
          </Typography>

        <FormGroup>
          {rawData.map((group, i)=> <FormControlLabel
            control={<Checkbox checked={group.show} onChange={()=>{handleChange(group.ethnicity )}} name={group.ethnicity} disabled={i === 0 || (error && !group.show) ? true: false} className={classes.form} color={'primary'}/>}
            label={group.ethnicity} key={i}
          />
          )}
        </FormGroup>
        {error ? <FormHelperText className={classes.form+' '+classes.helperText}>Note: Cannot select more than 5 filters</FormHelperText> : null}
      </FormControl>
    </div>
  );
}

export default CheckBoxes;