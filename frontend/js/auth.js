/*const API_URL = 'http://localhost:3001';

//verifica se o usuario esta logado
const token = localStorage.getItem('gl_token');
const isPublic = ['index.html', '/', ''].includes(window.location.pathname.split('/').pop());

if (!isPublic && !token) window.location.replace('index.html');
if (isPublic && token) window.location.replace('jogos.html');

//logout
function logout() {
  localStorage.clear();
  window.location.replace('index.html');
}

//mostra nome do usurio no nav
window.onload = () => {
  const user = JSON.parse(localStorage.getItem('gl_user') || '{}');
  const navUser = document.getElementById('nav-username');
  if (navUser) navUser.textContent = user.name || '—';
};

//LOGIN
async function fazerLogin() {

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) return alert(data.message || 'Usuário ou senha incorretos.');

    //salva os dados e entra
    localStorage.setItem('gl_token', data.token);
    localStorage.setItem('gl_user', JSON.stringify(data.user));
    window.location.replace('jogos.html');
  } catch {
    alert('Erro de conexão. Verifique se o servidor Node está rodando.');
  }
}

//CADASTRO
async function fazerCadastro() {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;

  if (password !== confirm) return alert('As senhas não coincidem!');

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) return alert(data.message || 'Erro ao criar conta.');

    //salva os dados e entra automaticamente
    localStorage.setItem('gl_token', data.token);
    localStorage.setItem('gl_user', JSON.stringify(data.user));
    window.location.replace('jogos.html');
  } catch {
    alert('Erro de conexão. Verifique se o servidor Node está rodando.');
  }
}

//fetch da api com token
async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('gl_token');
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (res.status === 401) { //se o token expirou ou for inválido
    logout();
  }
  return res;
}*/