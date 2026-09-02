import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { BarChart3, Compass, TrendingUp, Users, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ResultChart({ resultData }) {
  const [chartView, setChartView] = useState('bar');

  if (!resultData) return null;

  const { yourAnswers, averages, studentName, totalParticipants, questions, studentAverage } = resultData;

  const labels = questions ? questions.map(q => q.title) : [
    'Frequência',
    'Autonomia',
    'Validação',
    'Impacto',
    'Dependência'
  ];

  const studentValues = [
    yourAnswers.q1,
    yourAnswers.q2,
    yourAnswers.q3,
    yourAnswers.q4,
    yourAnswers.q5
  ];

  const averageValues = [
    averages.a1,
    averages.a2,
    averages.a3,
    averages.a4,
    averages.a5
  ];

  const classMean = Number((averageValues.reduce((a, b) => a + b, 0) / 5).toFixed(2));
  const userScore = studentAverage || Number((studentValues.reduce((a, b) => a + b, 0) / 5).toFixed(2));
  const diff = Number((userScore - classMean).toFixed(2));

  // Gráfico de Barras
  const barData = {
    labels,
    datasets: [
      {
        label: `Sua Resposta (${studentName})`,
        data: studentValues,
        backgroundColor: '#2563eb',
        hoverBackgroundColor: '#1d4ed8',
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.75
      },
      {
        label: `Média Geral da Turma (${totalParticipants} participantes)`,
        data: averageValues,
        backgroundColor: '#f59e0b',
        hoverBackgroundColor: '#d97706',
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.75
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          font: { family: "'Inter', sans-serif", size: 12, weight: '600' },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          color: '#1e293b'
        }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          font: { size: 12, weight: '600' },
          color: '#64748b'
        },
        grid: {
          color: '#e2e8f0'
        }
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 12, weight: '600' },
          color: '#1e293b'
        }
      }
    }
  };

  // Gráfico Radar
  const radarData = {
    labels,
    datasets: [
      {
        label: `Você (${studentName})`,
        data: studentValues,
        backgroundColor: 'rgba(37, 99, 235, 0.25)',
        borderColor: '#2563eb',
        borderWidth: 2.5,
        pointBackgroundColor: '#2563eb',
        pointRadius: 4
      },
      {
        label: `Média da Turma`,
        data: averageValues,
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderColor: '#f59e0b',
        borderWidth: 2.5,
        pointBackgroundColor: '#f59e0b',
        pointRadius: 4
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: { display: false, stepSize: 1 },
        pointLabels: {
          font: { size: 12, weight: '700' },
          color: '#1e293b'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { size: 12, weight: '600' } }
      }
    }
  };

  return (
    <div className="dashboard-results-pane">
      {/* Top Banner de Métricas */}
      <div className="kpi-metrics-grid">
        <div className="kpi-box blue-accent">
          <span className="kpi-tag">Seu Score Médio</span>
          <div className="kpi-main-val">
            {Number(userScore).toFixed(1)} <span className="kpi-max-lbl">/ 5.0</span>
          </div>
          <p className="kpi-summary-text">
            {userScore <= 2.5 ? 'Uso Consciente & Autônomo' : userScore <= 3.7 ? 'Uso Moderado' : 'Dependência Elevada'}
          </p>
        </div>

        <div className="kpi-box amber-accent">
          <span className="kpi-tag">Média Geral da Turma</span>
          <div className="kpi-main-val">
            {classMean} <span className="kpi-max-lbl">/ 5.0</span>
          </div>
          <p className="kpi-summary-text">
            Consolidado de {totalParticipants} participantes
          </p>
        </div>

        <div className={`kpi-box ${diff > 0 ? 'red-accent' : 'green-accent'}`}>
          <span className="kpi-tag">Comparativo Relativo</span>
          <div className="kpi-main-val">
            {diff > 0 ? `+${diff}` : diff} <span className="kpi-max-lbl">pts</span>
          </div>
          <p className="kpi-summary-text">
            {diff > 0 ? 'Acima da média de uso da turma' : diff < 0 ? 'Mais autônomo que a média' : 'Exatamente na média da turma'}
          </p>
        </div>
      </div>

      {/* Header do Gráfico */}
      <div className="chart-control-header">
        <div>
          <h3 className="chart-heading-title">Comparação Direta por Pergunta</h3>
          <p className="chart-sub-desc">
            Visualize onde estão suas maiores divergências em relação ao grupo.
          </p>
        </div>

        <div className="chart-view-toggle">
          <button 
            type="button"
            className={`toggle-tab-btn ${chartView === 'bar' ? 'active' : ''}`}
            onClick={() => setChartView('bar')}
          >
            <BarChart3 size={15} /> Gráfico de Barras
          </button>
          <button 
            type="button"
            className={`toggle-tab-btn ${chartView === 'radar' ? 'active' : ''}`}
            onClick={() => setChartView('radar')}
          >
            <Compass size={15} /> Gráfico Radar
          </button>
        </div>
      </div>

      {/* Gráfico Canvas */}
      <div className="chart-visual-box">
        {chartView === 'bar' ? (
          <Bar data={barData} options={barOptions} />
        ) : (
          <Radar data={radarData} options={radarOptions} />
        )}
      </div>

      {/* Detalhamento por Questão com Barras Comparativas */}
      <div className="questions-detail-grid">
        {questions && questions.map((q, idx) => {
          const userVal = studentValues[idx];
          const avgVal = averageValues[idx];
          const itemDiff = Number((userVal - avgVal).toFixed(1));

          return (
            <div key={q.id} className="question-metric-card">
              <div className="card-top-row">
                <span className="q-card-title">{q.title}</span>
                <span className={`pill-variance ${itemDiff > 0.3 ? 'var-high' : itemDiff < -0.3 ? 'var-low' : 'var-mid'}`}>
                  {itemDiff > 0 ? `+${itemDiff}` : itemDiff} vs. média
                </span>
              </div>

              <div className="card-bars-stack">
                <div className="bar-unit">
                  <div className="unit-label-row">
                    <span className="lbl-user">Você: {studentName}</span>
                    <strong>{userVal} / 5</strong>
                  </div>
                  <div className="track-bar">
                    <div className="fill-bar user" style={{ width: `${(userVal / 5) * 100}%` }} />
                  </div>
                </div>

                <div className="bar-unit">
                  <div className="unit-label-row">
                    <span className="lbl-avg">Média da Turma</span>
                    <strong>{avgVal} / 5</strong>
                  </div>
                  <div className="track-bar">
                    <div className="fill-bar avg" style={{ width: `${(avgVal / 5) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
