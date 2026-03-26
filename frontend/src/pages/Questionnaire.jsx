import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/questions');
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const answersArray = Object.keys(answers).map(questionId => ({
        questionId: parseInt(questionId),
        answer: answers[questionId],
      }));
      const response = await axios.post('http://localhost:3000/api/results/generate', { answers: answersArray });
      navigate('/results', { state: { recommendation: response.data.recommendation } });
    } catch (error) {
      console.error('Error submitting answers:', error);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Carregando perguntas...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Questionário Vocacional
      </Typography>
      {questions.map((question) => (
        <Box key={question.id} sx={{ mb: 4 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{question.question}</FormLabel>
            {question.type === 'text' ? (
              <TextField
                fullWidth
                variant="outlined"
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                sx={{ mt: 1 }}
              />
            ) : (
              <RadioGroup
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              >
                {/* Assuming multiple choice options are predefined or from question data */}
                <FormControlLabel value="option1" control={<Radio />} label="Opção 1" />
                <FormControlLabel value="option2" control={<Radio />} label="Opção 2" />
                <FormControlLabel value="option3" control={<Radio />} label="Opção 3" />
              </RadioGroup>
            )}
          </FormControl>
        </Box>
      ))}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" size="large" onClick={handleSubmit} disabled={submitting}>
          {submitting ? <CircularProgress size={24} /> : 'Enviar Respostas'}
        </Button>
      </Box>
    </Container>
  );
};

export default Questionnaire;