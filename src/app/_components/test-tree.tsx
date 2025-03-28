'use client';
import { ReactNode, useState } from 'react';
import { Suite, Report, Test, Status } from '../../types/report';
import { TestTreeNavLink } from './test-tree-nav-link';
import { TestTreeNavStatusSwitch } from './test-tree-nav-status-switch';

type TestFilter = {
  status: Status[];
  text: string;
};

export default function TestTree({
  report,
  onSelectTest,
  activeTest,
}: {
  report: Report;
  onSelectTest: (test: Test) => void;
  activeTest: Test | null;
}) {
  const [filter, setFilter] = useState<TestFilter>({
    status: [Status.passed, Status.failed, Status.skipped],
    text: '',
  });
  const [expandedSuites, setExpandedSuites] = useState<string[]>([report.tests.uuid]);

  const expandCollapaseSuite = (suite: Suite) => {
    if (expandedSuites.indexOf(suite.uuid) == -1)
      setExpandedSuites(expandedSuites.concat(suite.uuid));
    else setExpandedSuites(expandedSuites.filter((each) => each !== suite.uuid));
  };
  const setFilters = (status: Status[]) => {
    setFilter({
      status,
      text: filter.text,
    });
  };

  const setTextFilter = (text: string) => {
    setFilter({
      status: filter.status,
      text,
    });
    expandAll();
  };

  const toggleFilters = (status: Status) => {
    if (filter.status.indexOf(status) == -1) {
      setFilters(filter.status.concat([status]));
    } else {
      setFilters(filter.status.filter((obj) => obj !== status));
    }
    expandAll();
  };

  const collapseAll = () => {
    setExpandedSuites([report.tests.uuid]);
  };

  const expandAll = () => {
    const suiteUuids: string[] = [];
    function gatherUuids(suite: Suite) {
      suite.subSuites.forEach((each) => {
        //if ('uuid' in each) {
        suiteUuids.push(each.uuid);
        suite.tests.forEach((test) => suiteUuids.push(test.uuid));
        gatherUuids(each);
        //}
      });
    }
    gatherUuids(report.tests);
    setExpandedSuites(suiteUuids.concat([report.tests.uuid]));
  };

  return (
    <>
      <div className="mb-2 checkboxes is-align-items-center">
        <div className="ml-1">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input is-expanded"
              type="text"
              placeholder="Search..."
              style={{ width: '17em' }}
              value={filter.text}
              onChange={(e) => setTextFilter(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </p>
        </div>

        <TestTreeNavStatusSwitch
          status={Status.passed}
          filters={filter.status}
          className="ml-2"
          toggleFilters={toggleFilters}
        />
        <TestTreeNavStatusSwitch
          status={Status.failed}
          filters={filter.status}
          toggleFilters={toggleFilters}
        />
        <TestTreeNavStatusSwitch
          status={Status.skipped}
          filters={filter.status}
          toggleFilters={toggleFilters}
        />

        <div className="is-flex">
          <TestTreeNavLink
            icon="fa-solid fa-compress"
            onClick={collapseAll}
            tooltipText="Collapse All"
          />
          <TestTreeNavLink
            icon="fa-solid fa-expand"
            className="ml-1"
            onClick={expandAll}
            tooltipText="Expand All"
          />
        </div>
      </div>

      <section className="menu">
        <SuiteLeaves
          data={report.tests}
          expandedSuites={expandedSuites}
          onSelectTest={onSelectTest}
          expandCollapaseSuite={expandCollapaseSuite}
          activeTest={activeTest}
          filter={filter}
        />
      </section>
    </>
  );
}

function SuiteLeaves({
  data,
  expandedSuites,
  onSelectTest,
  expandCollapaseSuite,
  activeTest,
  filter,
}: {
  data: Suite;
  expandedSuites: string[];
  onSelectTest: (test: Test) => void;
  expandCollapaseSuite: (suite: Suite) => void;
  activeTest: Test | null;
  filter: TestFilter;
}): ReactNode {
  const isVisibleTest = (test: Test) => {
    return (
      ((filter.status.indexOf(Status.passed) >= 0 && test.stats.passedCount > 0) ||
        (filter.status.indexOf(Status.failed) >= 0 && test.stats.failedCount > 0) ||
        (filter.status.indexOf(Status.skipped) >= 0 && test.stats.skippedCount > 0)) &&
      (filter.text.length == 0 || test.name.toLowerCase().indexOf(filter.text.toLowerCase()) != -1)
    );
  };

  const isVisibleSuite = (suite: Suite) => {
    for (let i = 0; i < suite.tests.length; i++) {
      if (isVisibleTest(suite.tests[i])) return true;
    }
    for (let i = 0; i < suite.subSuites.length; i++) {
      if (isVisibleSuite(suite.subSuites[i])) return true;
    }
    return false;
  };

  const isCollapsed = expandedSuites.indexOf(data.uuid) === -1;

  return (
    <>
      {(data.tests || data.subSuites) && (
        <ul className={`menu-list ${isCollapsed ? 'is-hidden' : ''}`}>
          {data.tests.map((each, index) => {
            return (
              <TestRow
                key={index}
                data={each}
                onSelectTest={onSelectTest}
                isActive={activeTest?.name === data.name}
                isVisible={isVisibleTest(each)}
              />
            );
          })}
          {data.subSuites.map((each, index) => {
            return (
              <SuiteTree
                key={index}
                expandedSuites={expandedSuites}
                data={each}
                onSelectTest={onSelectTest}
                expandCollapaseSuite={expandCollapaseSuite}
                activeTest={activeTest}
                filter={filter}
                isVisible={isVisibleSuite(each)}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}

function SuiteTree({
  data,
  expandedSuites,
  onSelectTest,
  expandCollapaseSuite,
  activeTest,
  filter,
  isVisible,
}: {
  data: Suite;
  expandedSuites: string[];
  onSelectTest: (test: Test) => void;
  expandCollapaseSuite: (suite: Suite) => void;
  activeTest: Test | null;
  filter: TestFilter;
  isVisible: boolean;
}) {
  const isCollapsed = expandedSuites.indexOf(data.uuid) === -1;

  return (
    <li className={isVisible ? '' : 'is-hidden'}>
      <a onClick={() => expandCollapaseSuite(data)}>
        {data.subSuites && (
          <span className="icon">
            <i
              className={`${
                isCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-down'
              }`}
            ></i>
          </span>
        )}
        <span className="ml-1">{data.name}</span>
      </a>
      <SuiteLeaves
        data={data}
        expandedSuites={expandedSuites}
        onSelectTest={onSelectTest}
        expandCollapaseSuite={expandCollapaseSuite}
        activeTest={activeTest}
        filter={filter}
      />
    </li>
  );
}

function TestRow({
  data,
  onSelectTest,
  isActive,
  isVisible,
}: {
  data: Test;
  onSelectTest: (test: Test) => void;
  isActive: boolean;
  isVisible: boolean;
}) {
  const tags = data.executions.map((execution, index) => {
    const status =
      execution.status == Status.passed
        ? 'has-text-success-soft-invert has-background-success-soft'
        : execution.status == Status.failed
        ? 'has-text-danger-soft-invert has-background-danger-soft'
        : 'is-dark';
    return (
      <span key={index} className={`tag ${status} light-color`}>
        {execution.name}
      </span>
    );
  });

  return (
    <li className={isVisible ? '' : 'is-hidden'}>
      <a className={` ${isActive ? 'is-active' : ''}`} onClick={() => onSelectTest(data)}>
        <div className="is-flex is-align-items-center">
          <span>{data.name}</span>
          <div className="tags ml-3">{tags}</div>
        </div>
      </a>
    </li>
  );
}
