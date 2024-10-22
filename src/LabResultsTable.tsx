import { useState, useEffect } from 'react';
import axios from 'axios';

type Glicemia = {
    result: number;
    unit: string;
}

type NitrogenoUreico = {
    reference_range: string;
}

type Urea = {
     result: number;
     unit: string;
}

type Creatinina = {
    result: number;
    unit: string;
}

type Vfg = {
    result: number;
    unit: string;
}

type AcidoUrico = {
    result: number;
    unit: string;
}
type LabResult = {
    id: string;
    rut: string;
    examDate: string;
    glicemia: Glicemia;
    nitrogenoUreico: NitrogenoUreico;
    urea: Urea;
    creatinina: Creatinina;
    vfg: Vfg;
    acidoUrico: AcidoUrico
};

type Props = {
    rut: string;
}

const LabResultsTable = ({ rut }: Props) => {
    const [labResults, setLabResults] = useState<LabResult[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://exam-lab-ai-production.up.railway.app/api/laboratory/find?rut=${rut}`);
                setLabResults(response.data.listOfExams);
            } catch (error) {
                console.error('Error fetching the lab results', error);
            }
        };
        fetchData();
    }, [rut]);

    return (
        <div className="max-w-4xl mx-auto mt-10" style={{ overflowX: "auto", maxHeight: "400px" }>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">RUT</th>
                    <th className="py-2 px-4 border-b">Exam Date</th>
                    <th className="py-2 px-4 border-b">Glicemia</th>
                    <th className="py-2 px-4 border-b">Nitrogeno Ureico</th>
                    <th className="py-2 px-4 border-b">Urea</th>
                    <th className="py-2 px-4 border-b">Creatinina</th>
                    <th className="py-2 px-4 border-b">VFG Estimada (MDRD4-IDMS)</th>
                    <th className="py-2 px-4 border-b">Acido Urico</th>
                </tr>
                </thead>
                <tbody>
                {labResults.map((result) => (
                    <tr key={result.id}>
                        <td className="py-2 px-4 border-b text-center">{result.id}</td>
                        <td className="py-2 px-4 border-b text-center">{result.rut}</td>
                        <td className="py-2 px-4 border-b text-center">{result.examDate}</td>
                        <td className="py-2 px-4 border-b text-center">
                            {result.glicemia ? (
                                <span className="text-green-500">&#10003;</span>
                            ) : (
                                "-"
                            )}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                            {result.nitrogenoUreico ? (
                                <span className="text-green-500">&#10003;</span>
                            ) : (
                                "-"
                            )}
                        </td>

                         <td className="py-2 px-4 border-b text-center">
                              {result.urea ? (
                                  <span className="text-green-500">&#10003;</span>
                              ) : (
                                  "-"
                               )}
                        </td>

                         <td className="py-2 px-4 border-b text-center">
                               {result.creatinina ? (
                                   <span className="text-green-500">&#10003;</span>
                               ) : (
                                   "-"
                                )}
                         </td>
                          <td className="py-2 px-4 border-b text-center">
                               {result.vfg ? (
                                   <span className="text-green-500">&#10003;</span>
                               ) : (
                                   "-"
                                )}
                          </td>

                           <td className="py-2 px-4 border-b text-center">
                               {result.acidoUrico ? (
                                   <span className="text-green-500">&#10003;</span>
                               ) : (
                                   "-"
                                )}
                            </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LabResultsTable;
