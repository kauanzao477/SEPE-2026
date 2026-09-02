import React from 'react';
import { 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  Target, 
  Lightbulb, 
  Brain,
  Zap,
  ShieldAlert,
  Info
} from 'lucide-react';

export default function FinalFeedback({ resultData, onReset }) {
  if (!resultData) return null;

  const { studentAverage, studentName } = resultData;

  const getProfile = (score) => {
    if (score >= 3.8) {
      return {
        key: 'alto',
        levelTitle: '🚨 Nível Alto: ALERTA DE DEPENDÊNCIA ELEVADA',
        statusTag: '⚠️ ULTRAPASSOU O LIMITE',
        colorClass: 'level-danger',
        isExceeded: true,
        summary: 'Suas respostas indicam que você passou do limite recomendado para o uso saudável de IA nos estudos.',
        specificComments: [
          'Você tende a recorrer à IA diretamente antes de tentar resolver os problemas por conta própria.',
          'Há um alto risco de aceitar respostas prontas sem fazer a checagem das informações.',
          'Delegar tarefas analíticas com tanta frequência pode prejudicar seu raciocínio crítico em provas e avaliações presenciais.'
        ],
        actionMessage: 'Recomendação: Inicie um plano de estudo autônomo, reduzindo o uso de IA e resolvendo questões no papel antes de pesquisar.'
      };
    } else if (score >= 2.8) {
      return {
        key: 'medio',
        levelTitle: 'Nível Médio: Uso Frequente em Observação',
        statusTag: '⚡ NÍVEL MODERADO',
        colorClass: 'level-warning',
        isExceeded: false,
        summary: 'Você utiliza a IA regularmente como apoio aos estudos, apresentando bom equilíbrio, mas com pontos de atenção.',
        specificComments: [
          'Você usa a IA com boa frequência, conseguindo otimizar o tempo nas tarefas diárias.',
          'Existe um risco moderado de acomodação se você deixar de praticar a escrita e o raciocínio individual.',
          'Mantenha o hábito de verificar as fontes e não dependa exclusivamente de resumos gerados por IA.'
        ],
        actionMessage: 'Dica: Separe ao menos 15 a 20 minutos para tentar resolver os exercícios sozinho antes de pedir ajuda à IA.'
      };
    } else {
      return {
        key: 'baixo',
        levelTitle: 'Nível Baixo: Uso Autônomo & Consciente',
        statusTag: '✅ PERFIL AUTÔNOMO',
        colorClass: 'level-success',
        isExceeded: false,
        summary: 'Parabéns! Suas respostas mostram alta autonomia e uso muito consciente de ferramentas tecnológicas.',
        specificComments: [
          'Você prioriza o raciocínio independente e a busca direta em fontes de estudo confiáveis.',
          'A IA é utilizada como um copiloto pontual para tirar dúvidas específicas ou acelerar tarefas.',
          'Sua capacidade de retenção de conhecimento e pensamento crítico se mantém preservada.'
        ],
        actionMessage: 'Continue assim: Use a tecnologia como alavanca de produtividade sem abrir mão do aprendizado ativo!'
      };
    }
  };

  const profile = getProfile(studentAverage);

  return (
    <div className="feedback-flow-wrapper">
      {/* Barra de Ações Rápidas (Botão de Refazer) */}
      <div className="reset-bar-top">
        <span className="reset-bar-info">
          <Info size={16} /> Você pode refazer o teste ou consultar suas recomendações abaixo.
        </span>
        {onReset && (
          <button type="button" className="btn-redo-quiz" onClick={onReset}>
            <RotateCcw size={16} /> Refazer Formulário
          </button>
        )}
      </div>

      {/* Alerta Chamativo caso passe do limite */}
      {profile.isExceeded && (
        <div className="exceeded-limit-alert-banner">
          <div className="alert-pulse-icon">
            <ShieldAlert size={28} />
          </div>
          <div className="alert-banner-text">
            <h4>⚠️ ALERTA EXTREMO: VOCÊ ULTRAPASSOU O LIMITE SAUDÁVEL!</h4>
            <p>
              Sua pontuação média calculada foi de <strong>{studentAverage} / 5.0</strong>. O uso excessivo e sem checagem de Inteligência Artificial pode prejudicar severamente a retenção de aprendizado e o pensamento crítico.
            </p>
          </div>
        </div>
      )}

      {/* Diagnóstico em Destaque */}
      <div className={`diagnosis-hero-card ${profile.colorClass}`}>
        <div className="diagnosis-hero-content">
          <div className="diagnosis-tag-row">
            <span className="badge-tag">{profile.statusTag}</span>
            <span className="student-tag">Aluno: <strong>{studentName}</strong></span>
          </div>

          <h3 className="diagnosis-hero-title">{profile.levelTitle}</h3>
          <p className="diagnosis-hero-desc">{profile.summary}</p>

          <div className="diagnosis-score-indicator">
            <div className="indicator-label-row">
              <span>Pontuação Calculada do Formulário</span>
              <strong>{studentAverage} / 5.0</strong>
            </div>
            <div className="indicator-track">
              <div className="indicator-fill" style={{ width: `${(studentAverage / 5) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Comentários Específicos por Nível (Baixo, Médio, Alto) */}
      <div className="reflection-card-box specific-level-box">
        <div className="card-box-header">
          <div className={`header-icon-badge ${profile.key === 'alto' ? 'red' : profile.key === 'medio' ? 'amber' : 'green'}`}>
            <Zap size={20} />
          </div>
          <div>
            <h4 className="box-title">Comentários Específicos para o seu Nível ({profile.key.toUpperCase()})</h4>
            <p className="box-subtitle">Análise detalhada baseada nas suas escolhas no questionário:</p>
          </div>
        </div>

        <div className="specific-comments-list">
          {profile.specificComments.map((comment, index) => (
            <div key={index} className={`comment-bullet-item ${profile.key}`}>
              <CheckCircle2 size={18} className="bullet-icon" />
              <span>{comment}</span>
            </div>
          ))}
        </div>

        <div className="action-advice-callout">
          <strong>💡 Recomendação Direta:</strong> {profile.actionMessage}
        </div>
      </div>

      {/* Cenários Futuros do Estudante */}
      <div className="reflection-card-box">
        <div className="card-box-header">
          <div className="header-icon-badge blue">
            <Brain size={20} />
          </div>
          <div>
            <h4 className="box-title">O que acontece quando você terceiriza o aprendizado?</h4>
            <p className="box-subtitle">O impacto do uso da IA em diferentes fases da sua jornada:</p>
          </div>
        </div>

        <div className="future-steps-grid">
          <div className="future-step-card">
            <div className="step-badge-icon">
              <GraduationCap size={20} className="text-blue" />
              <span>Na Escola / Faculdade</span>
            </div>
            <h5>A Ilusão de Competência</h5>
            <p>
              Entregar trabalhos perfeitos gerados por IA dá a falsa sensação de domínio, mas o aprendizado real só ocorre com esforço ativo.
            </p>
          </div>

          <div className="future-step-card">
            <div className="step-badge-icon">
              <Target size={20} className="text-amber" />
              <span>Em Provas & Vestibulares</span>
            </div>
            <h5>Exposição sem Apoio</h5>
            <p>
              Em exames presenciais, ENEM e vestibulares sem acesso a celular ou IA, a falta de prática analítica individual faz falta.
            </p>
          </div>

          <div className="future-step-card highlight">
            <div className="step-badge-icon">
              <Briefcase size={20} className="text-purple" />
              <span>No Mercado Profissional</span>
            </div>
            <h5>Diferencial Humano</h5>
            <p>
              Quem apenas copia respostas de IA é facilmente substituído. O mercado busca quem sabe <strong>pensar, validar e tomar decisões</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Botão Inferior de Refazer */}
      {onReset && (
        <div className="bottom-reset-action">
          <button type="button" className="btn-primary-glow btn-redo-large" onClick={onReset}>
            <RotateCcw size={18} /> Refazer Formulário Agora
          </button>
        </div>
      )}
    </div>
  );
}
