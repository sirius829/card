import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Input, Typography } from '@mui/material';
import { debounce } from 'lodash';

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
        <Box>
            <Typography variant='h2'>
                Card Search
            </Typography>
            <Input
                type='text'
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }}
            />
        </Box>
    );
}

export default CardSearch;