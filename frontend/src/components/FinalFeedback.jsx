import React from 'react';
import { 
  RotateCcw, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  Target, 
  Lightbulb, 
  Brain,
  Zap,
  ShieldAlert,
  Info,
  BookOpen,
  Sparkles,
  Compass,
  Award,
  TrendingUp,
  Flame,
  Check
} from 'lucide-react';

export default function FinalFeedback({ resultData, onReset }) {
  if (!resultData) return null;

  const { studentAverage, studentName } = resultData;

  const getProfile = (score) => {
    if (score >= 3.8) {
      return {
        key: 'alto',
        levelTitle: 'Atenção aos Hábitos: Hora de Retomar o Controle do seu Aprendizado',
        statusTag: '⚠️ NÍVEL ALTO - DEPENDÊNCIA ELEVADA',
        colorClass: 'level-danger-hero',
        badgeColor: 'badge-danger-glow',
        isExceeded: true,
        summary: 'Suas respostas indicam que você recorre a ferramentas automáticas na maioria das suas tarefas escolares. Delegar grande parte da construção de respostas pode comprometer sua retenção de conteúdo e raciocínio próprio em exames presenciais.',
        specificComments: [
          'Você tende a consultar a IA antes de tentar resolver os problemas por conta própria.',
          'Há uma tendência a aceitar respostas prontas sem conferir a veracidade em livros ou materiais oficiais.',
          'Sua prática de escrita e resolução individual precisa ser fortalecida no dia a dia.'
        ],
        recommendations: [
          {
            icon: Target,
            theme: 'rec-blue',
            badgeText: 'Ação Recomendada 1',
            title: '1. Rascunho sem Tela (15 Minutos)',
            desc: 'Antes de abrir qualquer IA ou celular, tente rascunhar o problema ou escrever no caderno por pelo menos 15 minutos.'
          },
          {
            icon: BookOpen,
            theme: 'rec-purple',
            badgeText: 'Ação Recomendada 2',
            title: '2. Estudo em Livros e Leitura Direta',
            desc: 'Separe 2 dias na semana para estudar tópicos complexos apenas por apostilas, artigos ou livros impressos.'
          },
          {
            icon: Brain,
            theme: 'rec-rose',
            badgeText: 'Ação Recomendada 3',
            title: '3. Mude a Pergunta para a IA',
            desc: 'Em vez de pedir "Faça esse trabalho para mim", peça: "Explique o passo a passo de como EU posso resolver esse tipo de questão".'
          },
          {
            icon: Compass,
            theme: 'rec-amber',
            badgeText: 'Ação Recomendada 4',
            title: '4. Resolução de Provas Anteriores',
            desc: 'Treine a resolução de questões de vestibulares ou exames totalmente sem celular ao lado para medir seu desempenho real.'
          }
        ]
      };
    } else if (score >= 2.8) {
      return {
        key: 'medio',
        levelTitle: 'Uso Frequente: Bom Equilíbrio com Pontos de Atenção',
        statusTag: '⚡ NÍVEL MÉDIO - EM OBSERVAÇÃO',
        colorClass: 'level-warning-hero',
        badgeColor: 'badge-warning-glow',
        isExceeded: false,
        summary: 'Você usa a tecnologia de forma constante e prática. Para que ela continue sendo uma aliada nos estudos, garanta que a conveniência não substitua seu hábito de pesquisar e pensar por si mesmo.',
        specificComments: [
          'Você utiliza a IA com frequência e tem agilidade na entrega de tarefas.',
          'Existe um risco moderado de acomodação se a escrita e a conferência de dados forem deixadas de lado.',
          'Mantenha a atenção para não aceitar resumos gerados por IA sem questionar o embasamento.'
        ],
        recommendations: [
          {
            icon: Lightbulb,
            theme: 'rec-amber',
            badgeText: 'Hábito Prático 1',
            title: '1. Checagem Ativa de Fontes',
            desc: 'A cada 3 respostas fornecidas pela IA, escolha ao menos 1 para verificar a exatidão em livros ou materiais recomendados pelo professor.'
          },
          {
            icon: Sparkles,
            theme: 'rec-blue',
            badgeText: 'Hábito Prático 2',
            title: '2. Reescrita com seu Estudo Pessoal',
            desc: 'Use a IA apenas para colher ideias e estrutura. Escreva o texto final do zero com o seu próprio vocabulário e estilo.'
          },
          {
            icon: Brain,
            theme: 'rec-purple',
            badgeText: 'Hábito Prático 3',
            title: '3. Explique para um Colega',
            desc: 'Tente explicar o assunto estudado para um amigo em voz alta sem ler a tela. Se conseguir explicar bem, o aprendizado foi fixado.'
          },
          {
            icon: Target,
            theme: 'rec-emerald',
            badgeText: 'Hábito Prático 4',
            title: '4. IA como Banca Examinadora',
            desc: 'Peça para a IA elaborar 5 perguntas sobre a matéria que você estudou e responda-as sem consultar a ferramenta.'
          }
        ]
      };
    } else {
      return {
        key: 'baixo',
        levelTitle: 'Excelente! Você é o Protagonista do seu Aprendizado',
        statusTag: '🌱 NÍVEL BAIXO - APRENDIZADO AUTÔNOMO',
        colorClass: 'level-success-hero',
        badgeColor: 'badge-success-glow',
        isExceeded: false,
        summary: 'Parabéns! Suas respostas refletem alta autonomia acadêmica. Você mantém o raciocínio crítico em primeiro lugar e utiliza a tecnologia apenas como um apoio pontual.',
        specificComments: [
          'Você prefere tentar resolver as questões sozinho antes de procurar ajuda tecnológica.',
          'Seu hábito de checar informações preserva sua capacidade analítica e de síntese.',
          'Você utiliza a IA como um copiloto para aceleração de pesquisas, e não como muleta.'
        ],
        recommendations: [
          {
            icon: Sparkles,
            theme: 'rec-emerald',
            badgeText: 'Estratégia Avançada 1',
            title: '1. Aprofundamento Conceitual',
            desc: 'Use a IA para pedir bibliografias avançadas, artigos acadêmicos ou contra-argumentos para exercitar ainda mais seu raciocínio.'
          },
          {
            icon: Brain,
            theme: 'rec-blue',
            badgeText: 'Estratégia Avançada 2',
            title: '2. Técnica Feynman de Ensino',
            desc: 'Crie mapas mentais ou resumos sintetizados à mão. Ensinar ou resumir com suas palavras é o padrão ouro da aprendizagem.'
          },
          {
            icon: Compass,
            theme: 'rec-purple',
            badgeText: 'Estratégia Avançada 3',
            title: '3. Otimização de Produtividade',
            desc: 'Aproveite a IA para organizar cronogramas de estudo, listas de prioridades e cartões de memória (flashcards).'
          },
          {
            icon: GraduationCap,
            theme: 'rec-amber',
            badgeText: 'Estratégia Avançada 4',
            title: '4. Compartilhe suas Práticas',
            desc: 'Mostre a colegas como usar ferramentas de busca e IA de maneira ética e construtiva, promovendo o aprendizado ativo.'
          }
        ]
      };
    }
  };

  const profile = getProfile(studentAverage);

  return (
    <div className="feedback-flow-wrapper">
      {/* Barra de Ações Rápidas */}
      <div className="reset-bar-top">
        <span className="reset-bar-info">
          <Info size={16} /> Você pode refazer a pesquisa ou guardar seu diagnóstico acadêmico.
        </span>
        {onReset && (
          <button type="button" className="btn-redo-quiz" onClick={onReset}>
            <RotateCcw size={16} /> Refazer Formulário
          </button>
        )}
      </div>

      {/* Banner de Aviso de Limite (Apenas se exceder) */}
      {profile.isExceeded && (
        <div className="exceeded-limit-alert-banner">
          <div className="alert-pulse-icon">
            <ShieldAlert size={32} />
          </div>
          <div className="alert-banner-text">
            <h4>⚠️ ATENÇÃO: DEPENDÊNCIA ELEVADA DETECTADA!</h4>
            <p>
              Sua pontuação no questionário foi de <strong>{studentAverage} / 5.0</strong>. Quando a tecnologia substitui o raciocínio individual, a retenção de aprendizado cai drasticamente. Confira as orientações de estudo abaixo para ajustar seus hábitos!
            </p>
          </div>
        </div>
      )}

      {/* DIAGNÓSTICO DO SEU NÍVEL (SUPER CHAMATIVO) */}
      <div className={`diagnosis-hero-card ${profile.colorClass}`}>
        <div className="hero-card-glow-overlay" />
        
        <div className="diagnosis-hero-header">
          <div className="hero-left-info">
            <div className="diagnosis-tag-row">
              <span className={`badge-tag-glow ${profile.badgeColor}`}>
                {profile.statusTag}
              </span>
              <span className="student-tag-hero">
                Participante: <strong>{studentName}</strong>
              </span>
            </div>

            <h3 className="diagnosis-hero-title">{profile.levelTitle}</h3>
            <p className="diagnosis-hero-desc">{profile.summary}</p>
          </div>

          <div className="hero-score-badge-box">
            <span className="score-box-label">SEU NÍVEL</span>
            <div className="score-number-hero">
              {studentAverage} <span className="score-total-denom">/5.0</span>
            </div>
            <div className="score-bar-hero-track">
              <div className="score-bar-hero-fill" style={{ width: `${(studentAverage / 5) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ANÁLISE DOS HÁBITOS ACADÊMICOS */}
      <div className="reflection-card-box specific-level-box">
        <div className="card-box-header">
          <div className={`header-icon-badge ${profile.key === 'alto' ? 'red' : profile.key === 'medio' ? 'amber' : 'green'}`}>
            <Zap size={22} />
          </div>
          <div>
            <h4 className="box-title">Análise dos Seus Hábitos de Estudo</h4>
            <p className="box-subtitle">Observações baseadas nas suas escolhas no questionário:</p>
          </div>
        </div>

        <div className="specific-comments-list">
          {profile.specificComments.map((comment, index) => (
            <div key={index} className={`comment-bullet-item ${profile.key}`}>
              <div className="bullet-check-badge">
                <Check size={14} />
              </div>
              <span>{comment}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PLANO DE AÇÃO & RECOMENDAÇÕES PRÁTICAS (DESIGN SUPER CHAMATIVO) */}
      <div className="reflection-card-box recommendations-section-hero">
        <div className="card-box-header">
          <div className="header-icon-badge vibrant-blue">
            <Sparkles size={24} />
          </div>
          <div>
            <h4 className="box-title highlight-title">🚀 Seu Plano de Ação Personalizado</h4>
            <p className="box-subtitle">4 estratégias práticas recomendadas para o seu nível de autonomia:</p>
          </div>
        </div>

        <div className="level-recommendations-grid">
          {profile.recommendations.map((rec, index) => {
            const IconComponent = rec.icon;
            return (
              <div key={index} className={`recommendation-card-item ${rec.theme}`}>
                <div className="rec-card-top">
                  <div className="rec-icon-wrapper">
                    <IconComponent size={22} />
                  </div>
                  <span className="rec-tag-pill">{rec.badgeText}</span>
                </div>
                <div className="rec-card-body">
                  <h5>{rec.title}</h5>
                  <p>{rec.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* IMPACTO NO FUTURO ACADÊMICO */}
      <div className="reflection-card-box">
        <div className="card-box-header">
          <div className="header-icon-badge amber">
            <Brain size={22} />
          </div>
          <div>
            <h4 className="box-title">O Impacto da Autonomia na Sua Trajetória</h4>
            <p className="box-subtitle">Por que cultivar o pensamento autônomo faz diferença em cada etapa:</p>
          </div>
        </div>

        <div className="future-steps-grid">
          <div className="future-step-card">
            <div className="step-badge-icon">
              <GraduationCap size={20} className="text-blue" />
              <span>Na Sala de Aula</span>
            </div>
            <h5>Aprendizado Real vs. Superficial</h5>
            <p>
              Entregar tarefas prontas traz notas imediatas, mas apenas quem estuda e raciocina ativamente desenvolve conhecimento duradouro.
            </p>
          </div>

          <div className="future-step-card">
            <div className="step-badge-icon">
              <Target size={20} className="text-amber" />
              <span>Em Provas & Concursos</span>
            </div>
            <h5>Segurança em Exames Presenciais</h5>
            <p>
              Sem celular ou IA por perto nas provas do ENEM, vestibulares e exames, a sua prática prévia de raciocínio é o seu maior trunfo.
            </p>
          </div>

          <div className="future-step-card highlight">
            <div className="step-badge-icon">
              <Briefcase size={20} className="text-purple" />
              <span>No Mercado de Trabalho</span>
            </div>
            <h5>Habilidades Valorizadas</h5>
            <p>
              O mercado busca profissionais capazes de <strong>resolver problemas inéditos, ter pensamento crítico e liderar</strong>, e não apenas copiar respostas.
            </p>
          </div>
        </div>
      </div>

      {/* Botão Inferior de Refazer */}
      {onReset && (
        <div className="bottom-reset-action">
          <button type="button" className="btn-primary-glow btn-redo-large" onClick={onReset}>
            <RotateCcw size={18} /> Refazer Pesquisa Agora
          </button>
        </div>
      )}
    </div>
  );
}
