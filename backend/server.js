try { require('dotenv').config(); } catch (_) {}
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com PostgreSQL (Neon.tech ou qualquer Postgres)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

const questions = [
  {
    id: 1,
    title: '1. Frequência de Uso',
    text: 'Com que frequência você utiliza ferramentas de Inteligência Artificial (como ChatGPT, Gemini, Copilot, etc.) para auxiliar nos estudos?',
    options: [
      'Nunca',
      'Raramente',
      'Às vezes',
      'Frequentemente',
      'Sempre'
    ],
    minLabel: 'Nunca',
    maxLabel: 'Sempre',
    category: 'usage'
  },
  {
    id: 2,
    title: '2. Finalidade das Atividades',
    text: 'Para quais atividades você costuma utilizar Inteligência Artificial nos estudos?',
    options: [
      'Explicar conteúdos e tirar dúvidas',
      'Resolver exercícios e atividades',
      'Fazer resumos e trabalhos',
      'Estudar para provas, vestibular ou ENEM',
      'Outras atividades / Não utilizo IA'
    ],
    minLabel: 'Explicar conteúdos',
    maxLabel: 'Outras / Não utilizo',
    category: 'activities'
  },
  {
    id: 3,
    title: '3. Impacto na Aprendizagem',
    text: 'Como você avalia o impacto do uso da Inteligência Artificial na sua aprendizagem e no seu rendimento escolar?',
    options: [
      'Melhorou muito minha aprendizagem e meu rendimento',
      'Melhorou um pouco',
      'Não percebi mudanças',
      'Prejudicou um pouco',
      'Prejudicou muito'
    ],
    minLabel: 'Melhorou muito',
    maxLabel: 'Prejudicou muito',
    category: 'impact'
  },
  {
    id: 4,
    title: '4. Verificação de Respostas',
    text: 'Quando utiliza Inteligência Artificial para estudar, como você lida com as respostas fornecidas pela ferramenta?',
    options: [
      'Copio a resposta sem verificar',
      'Leio rapidamente e utilizo',
      'Verifico algumas informações',
      'Pesquiso em outras fontes e procuro compreender o conteúdo',
      'Utilizo a IA apenas como apoio para desenvolver minha própria resposta'
    ],
    minLabel: 'Copio sem verificar',
    maxLabel: 'Apenas como apoio',
    category: 'critical_thinking'
  },
  {
    id: 5,
    title: '5. Percepção na Educação',
    text: 'Na sua opinião, qual é o principal impacto da Inteligência Artificial na educação?',
    options: [
      'Facilita a compreensão e o aprendizado',
      'Aumenta a autonomia e ajuda nos estudos',
      'Pode causar dependência e diminuir o esforço do estudante',
      'Pode prejudicar o pensamento crítico quando utilizada em excesso',
      'Traz benefícios e riscos, dependendo da forma como é utilizada'
    ],
    minLabel: 'Facilita a compreensão',
    maxLabel: 'Benefícios e riscos',
    category: 'perception'
  }
];

async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS answers (
        id SERIAL PRIMARY KEY,
        student_name TEXT,
        client_ip TEXT,
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        q1 INTEGER,
        q2 INTEGER,
        q3 INTEGER,
        q4 INTEGER,
        q5 INTEGER
      );
    `);
    console.log('✅ Tabela de respostas pronta no PostgreSQL (Neon.tech).');
  } catch (err) {
    console.error('❌ Erro ao inicializar tabela:', err.message);
  }
}

// Inicializar banco ao subir o servidor
initDatabase();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: 'postgresql', timestamp: new Date().toISOString() });
});

// Perguntas
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

// Estatísticas gerais
app.get('/api/stats', async (req, res) => {
  try {
    const result = await pool.query('SELECT q1, q2, q3, q4, q5 FROM answers');
    const rows = result.rows;
    const total = rows.length;

    if (total === 0) {
      return res.json({
        total: 0,
        averages: { a1: 0, a2: 0, a3: 0, a4: 0, a5: 0 },
        distributions: {
          q1: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          q2: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          q3: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          q4: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          q5: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        },
        questions
      });
    }

    const sums = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 };
    const distributions = {
      q1: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      q2: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      q3: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      q4: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      q5: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };

    rows.forEach(r => {
      for (let i = 1; i <= 5; i++) {
        const val = r[`q${i}`];
        if (val) {
          sums[`q${i}`] += val;
          if (distributions[`q${i}`][val] !== undefined) {
            distributions[`q${i}`][val]++;
          }
        }
      }
    });

    res.json({
      total,
      averages: {
        a1: Number((sums.q1 / total).toFixed(2)),
        a2: Number((sums.q2 / total).toFixed(2)),
        a3: Number((sums.q3 / total).toFixed(2)),
        a4: Number((sums.q4 / total).toFixed(2)),
        a5: Number((sums.q5 / total).toFixed(2))
      },
      distributions,
      questions
    });
  } catch (err) {
    console.error('❌ Erro ao buscar estatísticas:', err.message);
    res.status(500).json({ error: 'Erro ao buscar estatísticas.' });
  }
});

// Enviar resposta
app.post('/api/answers', async (req, res) => {
  const { studentName, q1, q2, q3, q4, q5 } = req.body;

  const val1 = parseInt(q1, 10);
  const val2 = parseInt(q2, 10);
  const val3 = parseInt(q3, 10);
  const val4 = parseInt(q4, 10);
  const val5 = parseInt(q5, 10);

  if (!val1 || !val2 || !val3 || !val4 || !val5) {
    return res.status(400).json({ error: 'Todas as perguntas devem ser respondidas de 1 a 5.' });
  }

  const name = studentName && studentName.trim() ? studentName.trim() : 'Aluno';
  const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1').split(',')[0].trim();

  try {
    const insertResult = await pool.query(
      'INSERT INTO answers (student_name, client_ip, q1, q2, q3, q4, q5) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [name, clientIp, val1, val2, val3, val4, val5]
    );

    const insertedId = insertResult.rows[0].id;
    console.log(`📝 Nova resposta salva: ID ${insertedId} - ${name}`);

    // Calcular estatísticas atualizadas
    const statsResult = await pool.query('SELECT q1, q2, q3, q4, q5 FROM answers');
    const rows = statsResult.rows;
    const total = rows.length;

    const sums = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 };
    const distributions = {
      q1: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      q2: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      q3: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      q4: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      q5: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };

    rows.forEach(r => {
      for (let i = 1; i <= 5; i++) {
        const val = r[`q${i}`];
        if (val) {
          sums[`q${i}`] += val;
          if (distributions[`q${i}`][val] !== undefined) {
            distributions[`q${i}`][val]++;
          }
        }
      }
    });

    const studentScore = (val1 + val2 + val3 + val4 + val5) / 5;

    res.json({
      id: insertedId,
      studentName: name,
      totalParticipants: total,
      yourAnswers: { q1: val1, q2: val2, q3: val3, q4: val4, q5: val5 },
      studentAverage: Number(studentScore.toFixed(2)),
      averages: {
        a1: Number((sums.q1 / total).toFixed(2)),
        a2: Number((sums.q2 / total).toFixed(2)),
        a3: Number((sums.q3 / total).toFixed(2)),
        a4: Number((sums.q4 / total).toFixed(2)),
        a5: Number((sums.q5 / total).toFixed(2))
      },
      distributions,
      questions
    });
  } catch (err) {
    console.error('❌ Erro ao salvar resposta:', err.message);
    res.status(500).json({ error: 'Falha ao salvar as respostas. Tente novamente.' });
  }
});

// Servir frontend compilado
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDist));

app.get('*', (req, res) => {
  const indexPath = path.join(frontendDist, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('API backend rodando.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando na porta ${PORT}`);
});
