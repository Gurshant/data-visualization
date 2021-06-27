import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {IState as IProps} from '../App';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
    formControl: {
      margin: theme.spacing(3),
    },
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
      <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Pick up to 5 population groups to display the data for</FormLabel>
        <FormGroup>
          {rawData.map((group, i)=> <FormControlLabel
            control={<Checkbox checked={group.show} onChange={()=>{handleChange(group.ethnicity )}} name={group.ethnicity} disabled={i === 0 || (error && !group.show) ? true: false}/>}
            label={group.ethnicity} key={i}
          />
          )}
          
        </FormGroup>
        <FormHelperText>Note: Cannot select more than 5</FormHelperText>
      </FormControl>
    </div>
  );
}

export default CheckBoxes;