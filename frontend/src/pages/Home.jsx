import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Career Path AI
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Descubra sua carreira ideal com nosso questionário vocacional alimentado por IA.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" size="large" onClick={() => navigate('/questionnaire')}>
          Iniciar Questionário
        </Button>
      </Box>
    </Container>
  );
};

export default Home;