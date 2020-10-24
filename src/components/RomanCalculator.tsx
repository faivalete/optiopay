import React, {SyntheticEvent, useState} from 'react';
import { Button, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import styles from './RomanCalculator.module.scss';
import RomanNumerals, {isValidRoman} from '../utils/RomanNumerals';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

type Props = {
}

export interface VALIDATION_ERROR {
    [key: string]: string
}
const requiredIntegerError  = (): VALIDATION_ERROR => ({required: 'Please enter a valid integer number (0 - 3999)'});
const requiredRomanError  = (): VALIDATION_ERROR => ({required: 'Please enter a valid Roman number'});

const RomanCalculator = (props: Props) => {

    const classes = useStyles();
    const [integerNumber, setIntegerNumber] = useState<number>(0);
    const [romanNumber, setRomanNumber] = useState<string>('');


    const [validatingInteger, setValidatingInteger] = useState(false);
    const [validatingRoman, setValidatingRoman] = useState(false);

    const defaultErrors: VALIDATION_ERROR = {};
    const [errorsInteger, setErrorsInteger] = useState(defaultErrors);
    const [errorsRoman, setErrorsRoman] = useState(defaultErrors);

    function handleIntegerNumberChange(evt: React.ChangeEvent<HTMLInputElement>) {

        const value = evt.target.valueAsNumber;

        setIntegerNumber(value);
        
        if (!validatingInteger) {
            return;
        }

        setRomanNumber('')

        const validInteger = validateInteger(value);
        if (validInteger > 0) {
            const intToRoman = RomanNumerals.toRoman(validInteger);
            setRomanNumber(intToRoman);
        }
    }

    function handleRomanNumberChange(evt: React.ChangeEvent<HTMLInputElement>) {
        setRomanNumber(evt.target.value);
        if (!validatingRoman) {
            return;
        }

        setIntegerNumber(0);
       
        const validRoman = validateRoman(evt.target.value);
        if (validRoman) {
            const romanToInt = RomanNumerals.fromRoman(validRoman);
            setIntegerNumber(romanToInt); 
        }
    }

    function validateInteger(value: number): number {

        if (value > 0 && value < 3999) {
            setErrorsInteger({});
            return value;
        }

        setErrorsInteger({...requiredIntegerError()}); 
        return 0;
    }


    function validateRoman(value: string): string {

        if (value && value !== '' && isValidRoman(value)) {
            setErrorsRoman({});
            return value;
        }

        setErrorsRoman({...requiredRomanError()}); 
        return '';
    }



    function handleFocusInteger () {
        setValidatingInteger(true);
        setValidatingRoman(false);
    }


    function handleFocusRoman () {
        setValidatingRoman(true);
        setValidatingInteger(false);
    }


    function submit(evt: SyntheticEvent) {


        evt.preventDefault();

        if (validateInteger(integerNumber)) {
            //TODO convert number. 
        }
    }

    return <>
    <form onSubmit={submit} className={classes.root}>

        <Typography variant="h6">
            Roman Numerals Calculator
        </Typography>

        <FormControl className={classes.formControl}>
            <TextField
                id="integerNumber"
                value={integerNumber}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleIntegerNumberChange}
                onFocus={handleFocusInteger}
                placeholder={`e.g. 1 or 33 or 99999, etc.`} />
            <FormHelperText>Integer number to Roman Number</FormHelperText>
        </FormControl>
        
        {
            errorsInteger.required?
            (
            <div>
                <p className={styles.error}>{errorsInteger.required}</p>
                <a href='https://en.wikipedia.org/wiki/Integer' target='_blank' rel="noopener noreferrer"> More info on Integer Numbers format</a>
            </div>
            )
            : null
        }
    </form>


    <form onSubmit={submit} className={classes.root}>

        <FormControl className={classes.formControl}>
            <TextField
                id="romanNumber"
                value={romanNumber}
                type="text"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleRomanNumberChange}
                onFocus={handleFocusRoman}
                placeholder={`e.g. I or II or IIIVX, etc.`} />
            <FormHelperText>Roman Number to Integer Number</FormHelperText>
        </FormControl>
        
        {
            errorsRoman.required?
            <div>
                <p className={styles.error}>{errorsRoman.required} </p>
                <a href='https://en.wikipedia.org/wiki/Roman_numerals#Sources' target='_blank' rel="noopener noreferrer">More info on Roman Numerals format</a>
            </div>
            : null
        }
    </form>

</>
} 

export default RomanCalculator;