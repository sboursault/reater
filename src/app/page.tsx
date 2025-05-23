'use client';
import './ubiquity.scss';
import 'bulma-switch';
import './switch.scss';
import 'bulma-tooltip';
import '@fortawesome/fontawesome-free/css/all.min.css';
import TestTree from './_components/test-tree';
import { getReport } from '@/services/report.service';
import TestDetail from './_components/test-detail';
import { useState } from 'react';
import { Report, Test } from '@/types/report';

export default function Home() {
  return <HomeMain report={getReport()}></HomeMain>;
}

function HomeMain({ report }: { report: Report }) {
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [showTestDetail, setShowTestDetail] = useState(false);
  const selectTest = (test: Test) => {
    setShowTestDetail(true);
    setActiveTest(test);
  };
  const deactivateTest: () => void = () => {
    setTimeout(
      // setTimeout avoids flickering
      () => setShowTestDetail(false),
      200 // when the detail disapears
    );
    setActiveTest(null);
  };

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-body">
          <p className="title">Simple commerce</p>
          <p className="subtitle">Test documentation</p>
        </div>
      </section>

      <div className="columns">
        <div className="column">
          <TestTree report={report} onSelectTest={selectTest} activeTest={activeTest} />
        </div>
        <div className={`column is-half ${!showTestDetail ? 'is-hidden' : ''}`}>
          {activeTest && (
            <TestDetail
              key={activeTest.uuid}
              data={activeTest}
              deactivateTest={deactivateTest}
            ></TestDetail>
          )}
        </div>
      </div>
    </div>
  );
}
