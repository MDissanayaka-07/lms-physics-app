import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const data = [
  { exam: "Jan", marks: 60 },
  { exam: "Feb", marks: 72 },
  { exam: "Mar", marks: 80 },
  { exam: "Apr", marks: 65 },
  { exam: "May", marks: 90 }
];

export default function Marks() {
  const avg = data.reduce((sum, item) => sum + item.marks, 0) / data.length;
  const highest = Math.max(...data.map((d) => d.marks));
  const lowest = Math.min(...data.map((d) => d.marks));

  return (
    <MainLayout>
      <section className="stats-grid">
        <Card className="metric-card" tone="primary">
          <p className="metric-label">Average</p>
          <h3 className="metric-value">{avg.toFixed(1)}</h3>
          <p className="metric-note">Steady month-by-month improvement</p>
        </Card>

        <Card className="metric-card" tone="success">
          <p className="metric-label">Highest</p>
          <h3 className="metric-value">{highest}</h3>
          <p className="metric-note">Best paper result this term</p>
        </Card>

        <Card className="metric-card" tone="warning">
          <p className="metric-label">Lowest</p>
          <h3 className="metric-value">{lowest}</h3>
          <p className="metric-note">Good target for focused revision</p>
        </Card>
      </section>

      <section className="dashboard-grid">
        <Card
          className="dashboard-panel dashboard-panel-wide"
          eyebrow="Curve chart"
          title="Performance over time"
          action={<span className="section-badge">Updated monthly</span>}
        >
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(8, 32, 50, 0.12)" />
                <XAxis dataKey="exam" stroke="#44606d" />
                <YAxis stroke="#44606d" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="marks"
                  stroke="#176b87"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#f4d35e" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="dashboard-panel" eyebrow="Insights" title="Focus areas">
          <ul className="activity-list">
            <li>Your score trend is positive over the last five exams.</li>
            <li>April dropped slightly, so review time pressure mistakes.</li>
            <li>May shows strong recovery with better structured answers.</li>
          </ul>
        </Card>
      </section>
    </MainLayout>
  );
}
