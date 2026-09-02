import React, { useState, useEffect } from 'react';
import { fetchQuestions, submitQuizAnswers, fetchGeneralStats } from './api';
import QuizForm from './components/QuizForm';
import ResultChart from './components/ResultChart';
import FinalFeedback from './components/FinalFeedback';
import { BarChart3, CheckCircle2, UserCheck, RefreshCw, Eye } from 'lucide-react';
import './App.css';

const STORAGE_KEY = 'quiz_user_submission_v1';

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [resultData, setResultData] = useState(null);
  const [viewMode, setViewMode] = useState('quiz'); // 'quiz', 'result', 'generalStats'
  const [generalStats, setGeneralStats] = useState(null);
  const [hasSubmittedLocally, setHasSubmittedLocally] = useState(false);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    try {
      setLoading(true);
      setError('');

      // Carregar perguntas
      const qData = await fetchQuestions();
      setQuestions(qData);

      // Verificar se o usuário já respondeu anteriormente neste dispositivo
      const savedSubmission = localStorage.getItem(STORAGE_KEY);
      if (savedSubmission) {
        try {
          const parsedData = JSON.parse(savedSubmission);
          setHasSubmittedLocally(true);

          // Atualizar estatísticas mais recentes da turma mantendo a resposta do aluno
          const stats = await fetchGeneralStats();
          setGeneralStats(stats);

          const syncedResultData = {
            ...parsedData,
            averages: stats.averages,
            totalParticipants: stats.total,
            questions: qData
          };

          setResultData(syncedResultData);
          setViewMode('result');
        } catch (e) {
          console.error('Erro ao ler submissão salva:', e);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Servidor indisponível no momento. Certifique-se de que a API local está ativa.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError('');
      const response = await submitQuizAnswers(formData);

      // Gravar no localStorage para permitir apenas 1 resposta por usuário
      localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
      setHasSubmittedLocally(true);

      setResultData(response);
      setViewMode('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro ao registrar respostas.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewGeneralStats = async () => {
    try {
      setLoading(true);
      const stats = await fetchGeneralStats();
      setGeneralStats(stats);
      setViewMode('generalStats');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar estatísticas gerais.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMyResult = () => {
    if (resultData) {
      setViewMode('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setViewMode('quiz');
    }
  };

  const handleResetQuiz = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSubmittedLocally(false);
    setResultData(null);
    setViewMode('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="site-wrapper">
      {/* Barra de Navegação Limpa */}
      <header className="site-navbar">
        <div className="navbar-container">
          <div className="brand-link" onClick={handleViewMyResult}>
            <span className="brand-dot"></span>
            <span className="brand-text">Pesquisa IA & Educação</span>
          </div>

          <nav className="navbar-links">
            {hasSubmittedLocally ? (
              <>
                <button 
                  type="button" 
                  className={`nav-link-btn ${viewMode === 'result' ? 'active' : ''}`}
                  onClick={handleViewMyResult}
                >
                  <Eye size={15} /> Meu Resultado
                </button>
                <button 
                  type="button" 
                  className="nav-link-btn btn-reset-nav"
                  onClick={handleResetQuiz}
                >
                  <RefreshCw size={14} /> Refazer Teste
                </button>
              </>
            ) : (
              viewMode !== 'quiz' && (
                <button 
                  type="button" 
                  className="nav-link-btn"
                  onClick={() => setViewMode('quiz')}
                >
                  Responder Pesquisa
                </button>
              )
            )}

            <button 
              type="button" 
              className={`nav-link-btn ${viewMode === 'generalStats' ? 'active' : ''}`}
              onClick={handleViewGeneralStats}
            >
              <BarChart3 size={15} /> Painel Geral
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal Full-Width Otimizado */}
      <main className="site-main">
        {error && (
          <div className="error-banner-clean">
            <span>{error}</span>
            <button type="button" onClick={initApp} className="btn-retry-clean">
              <RefreshCw size={13} /> Tentar novamente
            </button>
          </div>
        )}

        {loading ? (
          <div className="loading-clean">
            <div className="clean-spinner"></div>
            <p>Carregando pesquisa...</p>
          </div>
        ) : (
          <>
            {/* Aviso de que o usuário já respondeu */}
            {hasSubmittedLocally && viewMode === 'result' && (
              <div className="already-submitted-banner">
                <CheckCircle2 size={18} className="text-success" />
                <span style={{ flex: 1 }}>Você já respondeu a esta pesquisa! Seus dados estão salvos e o comparativo é atualizado em tempo real.</span>
                <button type="button" className="btn-redo-inline" onClick={handleResetQuiz}>
                  <RefreshCw size={14} /> Refazer Formulário
                </button>
              </div>
            )}

            {/* 1. Formulário (Apenas se ainda não respondeu) */}
            {viewMode === 'quiz' && !hasSubmittedLocally && (
              <QuizForm 
                questions={questions} 
                onSubmit={handleQuizSubmit} 
                loading={submitting} 
              />
            )}

            {/* Se o usuário tentar acessar o formulário mas já tiver respondido */}
            {viewMode === 'quiz' && hasSubmittedLocally && (
              <div className="already-voted-card">
                <UserCheck size={36} className="voted-icon" />
                <h2>Resposta Registrada</h2>
                <p>Você já respondeu ao questionário. Deseja visualizar seu relatório ou refazer o formulário?</p>
                <div className="voted-actions">
                  <button type="button" className="btn-primary-glow" onClick={handleViewMyResult}>
                    Ver Meus Gráficos
                  </button>
                  <button type="button" className="btn-secondary-clean" onClick={handleResetQuiz}>
                    <RefreshCw size={15} /> Refazer Formulário
                  </button>
                </div>
              </div>
            )}

            {/* 2. Resultados Individuais + Feedback */}
            {viewMode === 'result' && resultData && (
              <div className="results-container-clean">
                <ResultChart resultData={resultData} />
                <FinalFeedback resultData={resultData} onReset={handleResetQuiz} />
              </div>
            )}

            {/* 3. Painel Geral */}
            {viewMode === 'generalStats' && generalStats && (
              <div className="results-container-clean">
                <div className="general-stats-header">
                  <h2>Painel Consolidado de Respostas</h2>
                  <p>Média geral calculada a partir de todas as respostas submetidas via formulário.</p>
                </div>

                {generalStats.total === 0 ? (
                  <div className="empty-state-clean">
                    <h3>Nenhuma resposta recebida ainda</h3>
                    <p>Assim que os alunos responderem pelo celular ou computador, as médias e gráficos serão gerados automaticamente.</p>
                  </div>
                ) : (
                  <ResultChart 
                    resultData={{
                      yourAnswers: {
                        q1: generalStats.averages.a1,
                        q2: generalStats.averages.a2,
                        q3: generalStats.averages.a3,
                        q4: generalStats.averages.a4,
                        q5: generalStats.averages.a5
                      },
                      averages: generalStats.averages,
                      studentName: 'Média Geral da Turma',
                      totalParticipants: generalStats.total,
                      questions: generalStats.questions,
                      studentAverage: (
                        (generalStats.averages.a1 + 
                         generalStats.averages.a2 + 
                         generalStats.averages.a3 + 
                         generalStats.averages.a4 + 
                         generalStats.averages.a5) / 5
                      ).toFixed(2)
                    }} 
                  />
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Rodapé */}
      <footer className="site-footer">
        <div className="footer-content">
          <span>Pesquisa Acadêmica sobre Inteligência Artificial e Aprendizado</span>
          <span className="footer-sub">Limite: 1 resposta por participante</span>
        </div>
      </footer>
    </div>
  );
}
