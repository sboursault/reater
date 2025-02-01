
import 'bulma/bulma.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import TestTree from "./_components/test-tree";
import getReport from "@/services/test-report";


export default function Home() {
  return (
    <div className="container">
      <TestTree group={getReport()}></TestTree>
    </div>

  );
}
