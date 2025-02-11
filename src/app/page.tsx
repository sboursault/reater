"use client"
import './ubiquity.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import TestTree from "./_components/test-tree";
import {getFromReportFile} from "@/services/report.service";
import TestDetail from './_components/test-detail';
import { useState } from 'react';

export default function Home() {
  const [activeTestName, setActiveTestName] = useState('');
  const [showTestDetail, setShowTestDetail] = useState(false);
  const onSelect: (name: string) => void = (name: string) => {
    if (name) setShowTestDetail(true)
    else setTimeout(                       // setTimeout avoids flickering
      () => setShowTestDetail(false), 200  // when the detail disapears
    )
    setActiveTestName(name);
  }
  const deActivate: () => void = () => onSelect('');
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
          <TestTree group={getFromReportFile()} onSelect={onSelect} activeTestName={activeTestName}></TestTree>
        </div>
        <div className={`column ${!showTestDetail ? 'is-hidden' : ''}`}>
          <TestDetail name={activeTestName} onClose={deActivate}></TestDetail>
        </div>
      </div>

    </div>
  );
}
