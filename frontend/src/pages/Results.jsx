import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendation } = location.state || {};

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sua Recomendação de Carreira
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">
          {recommendation || 'Nenhuma recomendação disponível. Tente novamente.'}
        </Typography>
      </Paper>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" size="large" onClick={() => navigate('/questionnaire')}>
          Refazer Questionário
        </Button>
      </Box>
    </Container>
  );
};

export default Results;