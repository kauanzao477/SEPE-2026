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
  FileText
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
        badgeStyle: 'badge-danger-clean',
        cardStyle: 'card-danger-clean',
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
            title: '1. Regra do Rascunho (15 Minutos)',
            desc: 'Antes de consultar qualquer ferramenta, dedique ao menos 15 minutos tentando estruturar a resposta sozinho no papel.'
          },
          {
            icon: BookOpen,
            title: '2. Consulta Direta a Materiais Físicos',
            desc: 'Reserve dias da semana para estudar tópicos importantes utilizando exclusivamente livros, apostilas e anotações da aula.'
          },
          {
            icon: Brain,
            title: '3. Pergunte "Como Resolver", Não a Resposta',
            desc: 'Ao usar a IA, peça orientações sobre o passo a passo da solução em vez de pedir o texto ou exercício pronto.'
          },
          {
            icon: FileText,
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
        badgeStyle: 'badge-warning-clean',
        cardStyle: 'card-warning-clean',
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
            title: '1. Checagem Ativa de Fontes',
            desc: 'Ao receber informações da IA, selecione pontos principais para validar em livros didáticos ou sites acadêmicos.'
          },
          {
            icon: FileText,
            title: '2. Reescrita com Vocabulário Próprio',
            desc: 'Utilize a ferramenta apenas para gerar ideias e tópicos. Redija a versão final do trabalho com suas próprias palavras.'
          },
          {
            icon: Brain,
            title: '3. Explique o Conteúdo em Voz Alta',
            desc: 'Tente explicar a matéria para um colega sem olhar para as telas. Explicar com clareza é o melhor sinal de aprendizado.'
          },
          {
            icon: Target,
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
        badgeStyle: 'badge-success-clean',
        cardStyle: 'card-success-clean',
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
            title: '1. Aprofundamento de Bibliografia',
            desc: 'Utilize buscadores e ferramentas digitais para localizar artigos acadêmicos e referências mais aprofundadas.'
          },
          {
            icon: Brain,
            title: '2. Síntese e Mapas Conceituais',
            desc: 'Mantenha o hábito de construir mapas mentais e resumos feitos à mão para consolidar a retenção de longo prazo.'
          },
          {
            icon: Compass,
            title: '3. Organização do Fluxo de Estudos',
            desc: 'Aplique a tecnologia na montagem de cronogramas, cartões de revisão e gestão de tempo para os exames.'
          },
          {
            icon: GraduationCap,
            title: '4. Troca de Experiências com Colegas',
            desc: 'Compartilhe suas técnicas de estudo autônomo com colegas, incentivando grupos de discussão e pesquisa ativa.'
          }
        ]
      };
    }
  };

  const profile = getProfile(studentAverage);

  return (
    <div className="feedback-container-human">
      {/* Topo Limpo com Ação de Refazer */}
      <div className="human-top-bar">
        <div className="human-top-info">
          <Info size={16} className="text-muted" />
          <span>Relatório gerado com base no seu preenchimento.</span>
        </div>
        {onReset && (
          <button type="button" className="btn-human-outline" onClick={onReset}>
            <RotateCcw size={14} /> Refazer Pesquisa
          </button>
        )}
      </div>

      {/* Aviso Claro se Ultrapassou o Limite */}
      {profile.isExceeded && (
        <div className="human-alert-box">
          <div className="human-alert-icon">⚠️</div>
          <div>
            <strong>Atenção ao Nível de Dependência ({studentAverage} / 5.0)</strong>
            <p>Seu resultado indica uso elevado de soluções automáticas. É recomendado adotar estratégias de estudo autônomo para garantir boa retenção de conteúdo.</p>
          </div>
        </div>
      )}

      {/* Card Principal do Perfil de Estudo */}
      <div className={`human-profile-card ${profile.cardStyle}`}>
        <div className="human-card-header">
          <div>
            <span className={`human-badge ${profile.badgeStyle}`}>{profile.statusTag}</span>
            <h3 className="human-card-title">{profile.title}</h3>
          </div>
          <div className="human-score-box">
            <span className="human-score-label">Média</span>
            <span className="human-score-value">{studentAverage}</span>
            <span className="human-score-max">/ 5.0</span>
          </div>
        </div>
        <p className="human-card-desc">{profile.summary}</p>
      </div>

      {/* Seção de Observações sobre Hábitos */}
      <div className="human-section-box">
        <h4 className="human-section-title">Análise de Hábitos Acadêmicos</h4>
        <ul className="human-obs-list">
          {profile.observations.map((obs, idx) => (
            <li key={idx} className="human-obs-item">
              <Check size={16} className="obs-check-icon" />
              <span>{obs}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Seção de Recomendações Práticas de Estudo */}
      <div className="human-section-box">
        <div className="human-section-header">
          <h4 className="human-section-title">Recomendações Práticas para seus Estudos</h4>
          <p className="human-section-sub">Ações simples para fortalecer sua autonomia e rendimento:</p>
        </div>

        <div className="human-recs-grid">
          {profile.recommendations.map((rec, idx) => {
            const IconComponent = rec.icon;
            return (
              <div key={idx} className="human-rec-card">
                <div className="human-rec-header">
                  <div className="human-rec-icon">
                    <IconComponent size={18} />
                  </div>
                  <h5>{rec.title}</h5>
                </div>
                <p>{rec.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seção Sobre a Trajetória Acadêmica */}
      <div className="human-section-box">
        <h4 className="human-section-title">Por que a Autonomia é Importante?</h4>
        <div className="human-steps-row">
          <div className="human-step-item">
            <GraduationCap size={20} className="step-icon-subtle" />
            <h6>Na Vida Escolar</h6>
            <p>Desenvolve raciocínio lógico duradouro e capacidade real de interpretação.</p>
          </div>
          <div className="human-step-item">
            <Target size={20} className="step-icon-subtle" />
            <h6>Em Exames e ENEM</h6>
            <p>Garante segurança em provas presenciais sem auxílio de consultas digitais.</p>
          </div>
          <div className="human-step-item">
            <Briefcase size={20} className="step-icon-subtle" />
            <h6>No Mercado Futuro</h6>
            <p>Fortalece o pensamento crítico, a tomada de decisão e a resolução de problemas.</p>
          </div>
        </div>
      </div>

      {/* Ação de Refazer no Rodapé */}
      {onReset && (
        <div className="human-bottom-action">
          <button type="button" className="btn-primary-glow" onClick={onReset}>
            <RotateCcw size={16} /> Refazer a Pesquisa
          </button>
        </div>
      )}
    </div>
  );
}
