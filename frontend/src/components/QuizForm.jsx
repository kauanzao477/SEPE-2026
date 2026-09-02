import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  BookOpen,
  Zap,
  Smartphone,
  ShieldCheck
} from 'lucide-react';

const SCALE_LABELS = [
  { val: 1, text: 'Muito Baixo / Nunca' },
  { val: 2, text: 'Baixo / Raramente' },
  { val: 3, text: 'Médio / Moderado' },
  { val: 4, text: 'Alto / Frequente' },
  { val: 5, text: 'Extremo / Total' }
];

export default function QuizForm({ questions, onSubmit, loading }) {
  const [studentName, setStudentName] = useState('');
  const [studentCourse, setStudentCourse] = useState('');
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const totalSteps = questions.length;

  const handleSelectOption = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [`q${questionId}`]: value
    }));
    setErrorMessage('');
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
      return;
    }

    const currentQ = questions[currentStep - 1];
    if (!answers[`q${currentQ.id}`]) {
      setErrorMessage('Por favor, selecione uma nota de 1 a 5 para prosseguir.');
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      setErrorMessage('');
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setErrorMessage('');
    }
  };

  const handleSubmit = () => {
    for (let q of questions) {
      if (!answers[`q${q.id}`]) {
        setErrorMessage(`Por favor, responda a questão ${q.id}.`);
        return;
      }
    }

    const trimmedName = studentName.trim();
    let finalDisplayName = 'Participante';

    if (trimmedName && studentCourse) {
      finalDisplayName = `${trimmedName} (${studentCourse})`;
    } else if (trimmedName) {
      finalDisplayName = trimmedName;
    } else if (studentCourse) {
      finalDisplayName = `Aluno - ${studentCourse}`;
    }

    onSubmit({
      studentName: finalDisplayName,
      ...answers
    });
  };

  const progressPercent = currentStep === 0 ? 0 : Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="premium-quiz-wrapper">
      {/* Indicador de Progresso Visual */}
      <div className="quiz-header-bar">
        <div className="quiz-meta-row">
          <span className="quiz-step-tag">
            {currentStep === 0 ? 'Apresentação' : `Questão ${currentStep} de ${totalSteps}`}
          </span>
          <span className="quiz-percent-tag">{progressPercent}% preenchido</span>
        </div>

        <div className="quiz-progress-track">
          <div 
            className="quiz-progress-fill" 
            style={{ width: `${currentStep === 0 ? 6 : progressPercent}%` }}
          />
        </div>

        {/* Círculos de Etapas */}
        <div className="quiz-step-bubbles">
          {[1, 2, 3, 4, 5].map((step) => {
            const isCompleted = answers[`q${step}`];
            const isCurrent = currentStep === step;
            return (
              <div 
                key={step} 
                className={`step-bubble ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              >
                {isCompleted ? <Check size={14} /> : step}
              </div>
            );
          })}
        </div>
      </div>

      {/* Passo 0: Abertura */}
      {currentStep === 0 && (
        <div className="quiz-body-pane welcome-pane">
          <div className="welcome-tag-badge">
            <BookOpen size={16} />
            <span>Pesquisa Acadêmica & Estatística</span>
          </div>

          <h2 className="welcome-main-title">
            O Impacto da Inteligência Artificial nos Hábitos de Estudo
          </h2>

          <p className="welcome-lead-text">
            Este questionário analisa o seu nível de autonomia no uso de Inteligência Artificial nos estudos. 
            Ao final, veja <strong>gráficos comparando suas respostas com a média da turma</strong> em tempo real!
          </p>

          <div className="welcome-features-grid">
            <div className="feature-item">
              <Zap size={18} className="feat-icon blue" />
              <div>
                <strong>Rápido & Objetivo</strong>
                <span>Apenas 5 perguntas (1 minuto)</span>
              </div>
            </div>

            <div className="feature-item">
              <Smartphone size={18} className="feat-icon green" />
              <div>
                <strong>Fácil Acesso</strong>
                <span>Responda direto pelo celular</span>
              </div>
            </div>

            <div className="feature-item">
              <ShieldCheck size={18} className="feat-icon purple" />
              <div>
                <strong>100% Anônimo</strong>
                <span>Dados estatísticos e confidenciais</span>
              </div>
            </div>
          </div>

          <div className="input-field-wrapper">
            <label htmlFor="studentName" className="input-clean-label">
              Seu Nome (Opcional):
            </label>
            <input
              id="studentName"
              type="text"
              className="premium-input"
              placeholder="Ex: Amanda Santos"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleNext(); }}
              maxLength={50}
            />
          </div>

          <div className="input-field-wrapper">
            <label htmlFor="studentCourse" className="input-clean-label">
              Selecione seu Curso:
            </label>
            <select
              id="studentCourse"
              className="premium-input premium-select"
              value={studentCourse}
              onChange={(e) => setStudentCourse(e.target.value)}
            >
              <option value="">-- Selecione seu curso --</option>
              <option value="Informática">Técnico em Informática</option>
              <option value="Agropecuária">Técnico em Agropecuária</option>
              <option value="Eletrotécnica">Técnico em Eletrotécnica</option>
              <option value="Meio Ambiente">Técnico em Meio Ambiente</option>
              <option value="Administração">Técnico em Administração</option>
              <option value="Química">Técnico em Química</option>
              <option value="Ensino Superior">Ensino Superior / Graduação</option>
              <option value="Outro">Outro Curso</option>
            </select>
          </div>

          <button 
            type="button" 
            className="btn-primary-glow"
            onClick={handleNext}
          >
            <span>Iniciar Perguntas</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* Passos das Perguntas (1 a 5) */}
      {currentStep > 0 && currentStep <= totalSteps && (
        <div className="quiz-body-pane" key={currentStep}>
          {(() => {
            const q = questions[currentStep - 1];
            const selectedVal = answers[`q${q.id}`];

            return (
              <>
                <div className="question-category-pill">
                  {q.title}
                </div>

                <h3 className="question-headline">
                  {q.text}
                </h3>

                {/* Opções em Cards Horizontais com Design Premium */}
                <div className="scale-cards-list">
                  {((q.options && q.options.length === 5)
                    ? q.options.map((optText, index) => ({ val: index + 1, text: optText }))
                    : SCALE_LABELS
                  ).map((item) => {
                    const isSelected = selectedVal === item.val;
                    return (
                      <div
                        key={item.val}
                        role="button"
                        tabIndex={0}
                        className={`scale-row-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectOption(q.id, item.val)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectOption(q.id, item.val); }}
                      >
                        <div className="scale-num-pill">
                          {item.val}
                        </div>
                        <div className="scale-text-block">
                          <strong>{item.text}</strong>
                          <span className="scale-context-desc">
                            {item.val === 1 ? (q.minLabel || 'Opção 1') : item.val === 5 ? (q.maxLabel || 'Opção 5') : `Opção ${item.val}`}
                          </span>
                        </div>
                        <div className="scale-check-indicator">
                          {isSelected && <Check size={18} />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {errorMessage && (
                  <div className="alert-error-bar">
                    {errorMessage}
                  </div>
                )}

                <div className="quiz-nav-row">
                  <button 
                    type="button" 
                    className="btn-secondary-clean" 
                    onClick={handlePrev}
                    disabled={loading}
                  >
                    <ArrowLeft size={16} /> Voltar
                  </button>

                  <button 
                    type="button" 
                    className="btn-primary-glow" 
                    onClick={handleNext}
                    disabled={loading}
                  >
                    <span>{loading ? 'Salvando...' : (currentStep === totalSteps ? 'Finalizar e Ver Resultados' : 'Próxima Pergunta')}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
