// src/components/Formulaire.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Formulaire from './Formulaire';

const mockNav = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNav,
}));
jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn() }, 
  post: jest.fn(),              
}));

async function fillAndSendForm() {
  await userEvent.type(screen.getByLabelText(/Votre nom/i), 'Marie');
  await userEvent.type(screen.getByLabelText(/Votre e-mail/i), 'marie@mail.com');
  await userEvent.type(screen.getByLabelText(/Motif/i), 'Hello');
  await userEvent.type(screen.getByLabelText(/Votre message/i), 'Coucou');
  await userEvent.click(screen.getByRole('button', { name: /Envoyer/i }));
}

test('redirige vers /success après envoi réussi', async () => {
  axios.post.mockResolvedValueOnce({ data: { ok: true } }); 
  render(<Formulaire />);
  await fillAndSendForm();
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(mockNav).toHaveBeenCalledWith('/success');
});

test("ne redirige pas si la réponse n'est pas OK", async () => {
  axios.post.mockResolvedValueOnce({ data: { ok: false } });
  render(<Formulaire />);
  await fillAndSendForm();
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(mockNav).not.toHaveBeenCalled();
});

test('vide les champs après un envoi réussi', async () => {
  axios.post.mockResolvedValueOnce({ data: 'success' }); // ancien format accepté

  render(<Formulaire />);

  const nameInput = screen.getByLabelText(/Votre nom/i);
  const emailInput = screen.getByLabelText(/Votre e-mail/i);
  const subjectInput = screen.getByLabelText(/Motif/i);
  const messageInput = screen.getByLabelText(/Votre message/i);

  await userEvent.type(nameInput, 'Marie');
  await userEvent.type(emailInput, 'marie@mail.com');
  await userEvent.type(subjectInput, 'Hello');
  await userEvent.type(messageInput, 'Coucou');

  await userEvent.click(screen.getByRole('button', { name: /Envoyer/i }));

  // Champs remis à vide par setState('')
  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
  expect(subjectInput).toHaveValue('');
  expect(messageInput).toHaveValue('');

  // Et redirection
  expect(mockNav).toHaveBeenCalledWith('/success');
});
