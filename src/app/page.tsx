"use client"
import 'bulma/bulma.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import TestTree from "./_components/test-tree";
import getReport from "@/services/test-report";
import TestDetail from './_components/test-detail';
import { useState } from 'react';

export default function Home() {
  const [activeTestName, setActiveTestName] = useState('');
  const onSelect: (name:string) => void = (name:string) => setActiveTestName(name)
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-body">
          <p className="title">Simple commerce</p>
          <p className="subtitle">Test documentation</p>
        </div>
      </section>

      <TestTree group={getReport()} onSelect={onSelect}></TestTree>
      <TestDetail name={activeTestName}></TestDetail>
    </div>
  );
}
