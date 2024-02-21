import React, { useEffect, useState } from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { debounce } from 'lodash';
import { Search } from '@mui/icons-material';

interface Props {
    onSearch: (searchTerm: string) => void
}

const CardSearch: React.FC<Props> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const delayedSearch = debounce(onSearch, 500);   
        delayedSearch(searchTerm);

        return () => {
          delayedSearch.cancel();
        };
      }, [searchTerm]);
    
    return (
        <Box sx={{marginBottom: '12px'}}>
            <Typography component='h5' variant='h5'>
                Card Search
            </Typography>
            <TextField 
                type='text'
                value={searchTerm}
                variant='outlined'
                InputProps={{
                    startAdornment: <InputAdornment position='start'><Search /></InputAdornment>
                }}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }}
                size='small'
            />
        </Box>
    );
}

export default CardSearch;