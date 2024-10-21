import './App.css'
import FileUploadComponent from "./FileUploadComponent.tsx";
import LabResultsTable from "./LabResultsTable.tsx";

function App() {
  return (
    <>
      <FileUploadComponent />
      <LabResultsTable rut="5344119K" />
    </>
  )
}

export default App
