import React from 'react';
import { 
  RotateCcw, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  Target, 
  Lightbulb, 
  Brain,
  BookOpen,
  Info,
  Check,
  Compass,
  FileText,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export default function FinalFeedback({ resultData, onReset }) {
  if (!resultData) return null;

  const { studentAverage, studentName } = resultData;

  const getProfile = (score) => {
    if (score >= 3.8) {
      return {
        key: 'alto',
        title: 'Atenção aos Hábitos: Risco de Dependência Excessiva',
        statusTag: 'Nível Alto de Dependência',
        heroTheme: 'hero-theme-rose',
        badgeTheme: 'badge-theme-rose',
        isExceeded: true,
        summary: 'Suas respostas indicam um recurso constante a ferramentas automáticas para resolver tarefas escolares. Delegar a criação de respostas pode afetar sua capacidade de síntese, escrita e raciocínio em exames presenciais.',
        observations: [
          'Tendência a consultar a IA antes de tentar rascunhar o problema sozinho.',
          'Risco de aceitar respostas geradas sem conferir em fontes confiáveis ou livros.',
          'Necessidade de reforçar a prática de escrita e resolução individual de exercícios.'
        ],
        recommendations: [
          {
            icon: Target,
            theme: 'rec-theme-blue',
            badgeText: 'Dica Prática 1',
            title: '1. Regra do Rascunho (15 Minutos)',
            desc: 'Antes de consultar qualquer ferramenta, dedique ao menos 15 minutos tentando estruturar a resposta sozinho no caderno.'
          },
          {
            icon: BookOpen,
            theme: 'rec-theme-purple',
            badgeText: 'Dica Prática 2',
            title: '2. Consulta Direta a Materiais Físicos',
            desc: 'Reserve dias da semana para estudar tópicos importantes utilizando exclusivamente livros, apostilas e anotações da aula.'
          },
          {
            icon: Brain,
            theme: 'rec-theme-amber',
            badgeText: 'Dica Prática 3',
            title: '3. Pergunte "Como Resolver", Não a Resposta',
            desc: 'Ao usar a IA, peça orientações sobre o passo a passo da solução em vez de pedir o texto ou exercício pronto.'
          },
          {
            icon: FileText,
            theme: 'rec-theme-emerald',
            badgeText: 'Dica Prática 4',
            title: '4. Prática para Exames Presenciais',
            desc: 'Resolva listas de exercícios de vestibulares ou provas anteriores totalmente sem auxílio digital para avaliar seu aprendizado real.'
          }
        ]
      };
    } else if (score >= 2.8) {
      return {
        key: 'medio',
        title: 'Uso Frequente: Bom Equilíbrio com Pontos de Atenção',
        statusTag: 'Nível Moderado',
        heroTheme: 'hero-theme-amber',
        badgeTheme: 'badge-theme-amber',
        isExceeded: false,
        summary: 'Você utiliza a tecnologia como apoio prático no dia a dia. Para manter esse recurso como um aliado saudável, certifique-se de que a praticidade não substitua o hábito de pesquisar e refletir por conta própria.',
        observations: [
          'Boa agilidade na realização das tarefas acadêmicas.',
          'Atenção necessária para não aceitar resumos prontos sem questionar o embasamento.',
          'Importância de manter a prática contínua de escrita autônoma.'
        ],
        recommendations: [
          {
            icon: Lightbulb,
            theme: 'rec-theme-amber',
            badgeText: 'Estratégia 1',
            title: '1. Checagem Ativa de Fontes',
            desc: 'Ao receber informações da IA, selecione pontos principais para validar em livros didáticos ou sites acadêmicos.'
          },
          {
            icon: FileText,
            theme: 'rec-theme-blue',
            badgeText: 'Estratégia 2',
            title: '2. Reescrita com Vocabulário Próprio',
            desc: 'Utilize a ferramenta apenas para gerar ideias e tópicos. Redija a versão final do trabalho com suas próprias palavras.'
          },
          {
            icon: Brain,
            theme: 'rec-theme-purple',
            badgeText: 'Estratégia 3',
            title: '3. Explique o Conteúdo em Voz Alta',
            desc: 'Tente explicar a matéria para um colega sem olhar para as telas. Explicar com clareza é o melhor sinal de aprendizado.'
          },
          {
            icon: Target,
            theme: 'rec-theme-emerald',
            badgeText: 'Estratégia 4',
            title: '4. Autoavaliação com Questões',
            desc: 'Solicite à IA perguntas de fixação sobre o tema estudado e responda-as de forma autônoma sem consultar o material.'
          }
        ]
      };
    } else {
      return {
        key: 'baixo',
        title: 'Perfil Autônomo: Foco no Raciocínio Independente',
        statusTag: 'Nível Autônomo',
        heroTheme: 'hero-theme-emerald',
        badgeTheme: 'badge-theme-emerald',
        isExceeded: false,
        summary: 'Suas respostas demonstram alta autonomia nos estudos. Você prioriza o raciocínio próprio e recorre à tecnologia apenas para consultas pontuais ou apoio de produtividade.',
        observations: [
          'Preferência por resolver problemas individualmente antes de buscar auxílio externo.',
          'Preservação da capacidade crítica e de checagem de informações.',
          'Uso consciente da tecnologia como ferramenta complementar de pesquisa.'
        ],
        recommendations: [
          {
            icon: BookOpen,
            theme: 'rec-theme-emerald',
            badgeText: 'Ação Recomendada 1',
            title: '1. Aprofundamento de Bibliografia',
            desc: 'Utilize buscadores e ferramentas digitais para localizar artigos acadêmicos e referências mais aprofundadas.'
          },
          {
            icon: Brain,
            theme: 'rec-theme-blue',
            badgeText: 'Ação Recomendada 2',
            title: '2. Síntese e Mapas Conceituais',
            desc: 'Mantenha o hábito de construir mapas mentais e resumos feitos à mão para consolidar a retenção de longo prazo.'
          },
          {
            icon: Compass,
            theme: 'rec-theme-purple',
            badgeText: 'Ação Recomendada 3',
            title: '3. Organização do Fluxo de Estudos',
            desc: 'Aplique a tecnologia na montagem de cronogramas, cartões de revisão e gestão de tempo para os exames.'
          },
          {
            icon: GraduationCap,
            theme: 'rec-theme-amber',
            badgeText: 'Ação Recomendada 4',
            title: '4. Troca de Experiências com Colegas',
            desc: 'Compartilhe suas técnicas de estudo autônomo com colegas, incentivando grupos de discussão e pesquisa ativa.'
          }
        ]
      };
    }
  };

  const profile = getProfile(studentAverage);

  return (
    <div className="vibrant-feedback-wrapper">
      {/* Topo Limpo com Ação de Refazer */}
      <div className="vibrant-top-bar">
        <div className="vibrant-top-info">
          <Info size={16} />
          <span>Relatório consolidado com base no seu preenchimento.</span>
        </div>
        {onReset && (
          <button type="button" className="btn-redo-vibrant" onClick={onReset}>
            <RotateCcw size={14} /> Refazer Pesquisa
          </button>
        )}
      </div>

      {/* Alerta Destacado se Ultrapassou o Limite */}
      {profile.isExceeded && (
        <div className="vibrant-alert-banner">
          <div className="vibrant-alert-icon">
            <ShieldAlert size={28} />
          </div>
          <div className="vibrant-alert-content">
            <h4>Atenção ao Nível de Dependência ({studentAverage} / 5.0)</h4>
            <p>Seu resultado indica uso elevado de soluções automáticas. Adote as estratégias recomendadas abaixo para fortalecer seu aprendizado autônomo.</p>
          </div>
        </div>
      )}

      {/* CARD HERO COLORIDO E IMPACTANTE DO PERFIL */}
      <div className={`vibrant-hero-card ${profile.heroTheme}`}>
        <div className="vibrant-hero-header">
          <div className="vibrant-hero-info">
            <div className="vibrant-badge-row">
              <span className={`vibrant-badge-pill ${profile.badgeTheme}`}>
                {profile.statusTag}
              </span>
              <span className="vibrant-student-name">
                Participante: <strong>{studentName}</strong>
              </span>
            </div>

            <h3 className="vibrant-hero-title">{profile.title}</h3>
            <p className="vibrant-hero-desc">{profile.summary}</p>
          </div>

          <div className="vibrant-score-box">
            <span className="vibrant-score-lbl">MÉDIA GERAL</span>
            <div className="vibrant-score-num">
              {studentAverage} <span className="vibrant-score-denom">/ 5.0</span>
            </div>
            <div className="vibrant-score-bar-track">
              <div className="vibrant-score-bar-fill" style={{ width: `${(studentAverage / 5) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* HÁBITOS DE ESTUDO */}
      <div className="vibrant-section-card">
        <div className="vibrant-section-header">
          <div className="vibrant-header-badge blue-badge">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h4 className="vibrant-section-title">Análise de Hábitos Acadêmicos</h4>
            <p className="vibrant-section-sub">Observações sobre o seu perfil de estudo:</p>
          </div>
        </div>

        <div className="vibrant-obs-grid">
          {profile.observations.map((obs, idx) => (
            <div key={idx} className="vibrant-obs-item">
              <div className="vibrant-obs-icon">
                <Check size={15} />
              </div>
              <span>{obs}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PLANO DE RECOMENDAÇÕES PRÁTICAS COLORIDO */}
      <div className="vibrant-section-card">
        <div className="vibrant-section-header">
          <div className="vibrant-header-badge purple-badge">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="vibrant-section-title">Recomendações Práticas para seus Estudos</h4>
            <p className="vibrant-section-sub">Estratégias recomendadas para potencializar seus resultados:</p>
          </div>
        </div>

        <div className="vibrant-recs-grid">
          {profile.recommendations.map((rec, idx) => {
            const IconComponent = rec.icon;
            return (
              <div key={idx} className={`vibrant-rec-card ${rec.theme}`}>
                <div className="vibrant-rec-top">
                  <div className="vibrant-rec-icon-box">
                    <IconComponent size={20} />
                  </div>
                  <span className="vibrant-rec-tag">{rec.badgeText}</span>
                </div>
                <div className="vibrant-rec-body">
                  <h5>{rec.title}</h5>
                  <p>{rec.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEÇÃO DA TRAJETÓRIA ACADÊMICA */}
      <div className="vibrant-section-card">
        <div className="vibrant-section-header">
          <div className="vibrant-header-badge amber-badge">
            <Brain size={20} />
          </div>
          <div>
            <h4 className="vibrant-section-title">O Impacto da Autonomia na Sua Trajetória</h4>
            <p className="vibrant-section-sub">Por que desenvolver o raciocínio independente faz diferença:</p>
          </div>
        </div>

        <div className="vibrant-steps-grid">
          <div className="vibrant-step-card step-blue">
            <div className="vibrant-step-icon">
              <GraduationCap size={22} />
            </div>
            <h6>Na Sala de Aula</h6>
            <p>Desenvolve capacidade crítica e compreensão profunda das disciplinas.</p>
          </div>

          <div className="vibrant-step-card step-amber">
            <div className="vibrant-step-icon">
              <Target size={22} />
            </div>
            <h6>Em Exames & ENEM</h6>
            <p>Garante segurança e agilidade em provas presenciais sem apoio de telas.</p>
          </div>

          <div className="vibrant-step-card step-emerald">
            <div className="vibrant-step-icon">
              <Briefcase size={22} />
            </div>
            <h6>No Mercado Futuro</h6>
            <p>Fortalece o poder de decisão, liderança e resolução de desafios complexos.</p>
          </div>
        </div>
      </div>

      {/* Botão de Refazer */}
      {onReset && (
        <div className="vibrant-bottom-action">
          <button type="button" className="btn-primary-glow btn-redo-large" onClick={onReset}>
            <RotateCcw size={16} /> Refazer a Pesquisa
          </button>
        </div>
      )}
    </div>
  );
}
