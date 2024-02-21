import React from 'react';
import './styles/App.css';
import CardList from './components/CardList';
import { Box, Container, Tab, Tabs } from '@mui/material';
import DeckBuilder from './components/DeckBuilder';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Search Cards" {...a11yProps(0)} />
            <Tab label="Deck" {...a11yProps(1)} />
          </Tabs>
        </Container>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CardList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DeckBuilder />
      </CustomTabPanel>
    </Box>
  );
}

export default App;
