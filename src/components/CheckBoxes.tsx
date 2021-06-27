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
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length >= 4;

  return (
    <div className={classes.root}>
      <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Pick up to 4 Groups to display the data for</FormLabel>
        <FormGroup>
          {rawData.map((group, i)=> <FormControlLabel
            control={<Checkbox checked={group.show} onChange={()=>{handleChange(group.ethnicity )}} name={group.ethnicity} disabled={i === 0 ? true: false}/>}
            label={group.ethnicity} key={i}
          />
          )}
          
        </FormGroup>
        <FormHelperText>Note: Cannot select more than 4</FormHelperText>
      </FormControl>
    </div>
  );
}

export default CheckBoxes;