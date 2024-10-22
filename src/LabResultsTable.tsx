import { useState, useEffect } from 'react';
import axios from 'axios';
type Glicemia = {
    result: number;
    unit: string;
}
type NitrogenoUreico = {
    reference_range: string;
}
type LabResult = {
    id: string;
    rut: string;
    examDate: string;
    glicemia: Glicemia;
    nitrogenoUreico: NitrogenoUreico;
    urea: string;
    creatinina: string;
    vfg: string;
    acidoUrico: string;
    colesterol: string;
    hdlColesterol: string;
    ldlColesterol: string;
    trigliceridos: string;
    indiceRiesgo: string;
    bilirrubinaTotal: string;
    bilirrubinaDirecta: string;
    bilirrubinaIndirecta: string;
    got: string;
    gpt: string;
    sodio: string;
    potasio: string;
    cloro: string;
    hemoglobinaGlicosilada: string;
    hematocrito: string;
    hemoglobina: string;
    eritrocitos: string;
    vcm: string;
    chcm: string;
    hcm: string;
    leucocitos: string;
    plaquetas: string;
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
        <div className="max-w-4xl mx-auto mt-10">
            <table className="min-w">
    <thead>
        <tr>
            <th>ID</th>
            <th>RUT</th>
            <th>Exam Date</th>
            <th>Glicemia</th>
            <th>Nitrogeno Ureico</th>
            <th>Urea</th>
            <th>Creatinina</th>
            <th>VFG</th>
            <th>Acido Urico</th>
            <th>Colesterol</th>
            <th>HDL Colesterol</th>
            <th>LDL Colesterol</th>
            <th>Trigliceridos</th>
            <th>Indice Riesgo</th>
            <th>Bilirrubina Total</th>
            <th>Bilirrubina Directa</th>
            <th>Bilirrubina Indirecta</th>
            <th>GOT</th>
            <th>GPT</th>
            <th>Sodio</th>
            <th>Potasio</th>
            <th>Cloro</th>
            <th>Hemoglobina Glicosilada</th>
            <th>Hematocrito</th>
            <th>Hemoglobina</th>
            <th>Eritrocitos</th>
            <th>VCM</th>
            <th>CHCM</th>
            <th>HCM</th>
            <th>Leucocitos</th>
            <th>Plaquetas</th>
        </tr>
    </thead>
    <tbody>
        {labResults.map((result) => (
            <tr key={result.id}>
                <td>{result.id}</td>
                <td>{result.rut}</td>
                <td>{result.examDate}</td>
                <td>{result.glicemia.result} {result.glicemia.unit}</td>
                <td>{result.nitrogenoUreico.reference_range}</td>
                <td>{result.urea}</td>
                <td>{result.creatinina}</td>
                <td>{result.vfg}</td>
                <td>{result.acidoUrico}</td>
                <td>{result.colesterol}</td>
                <td>{result.hdlColesterol}</td>
                <td>{result.ldlColesterol}</td>
                <td>{result.trigliceridos}</td>
                <td>{result.indiceRiesgo}</td>
                <td>{result.bilirrubinaTotal}</td>
                <td>{result.bilirrubinaDirecta}</td>
                <td>{result.bilirrubinaIndirecta}</td>
                <td>{result.got}</td>
                <td>{result.gpt}</td>
                <td>{result.sodio}</td>
                <td>{result.potasio}</td>
                <td>{result.cloro}</td>
                <td>{result.hemoglobinaGlicosilada}</td>
                <td>{result.hematocrito}</td>
                <td>{result.hemoglobina}</td>
                <td>{result.eritrocitos}</td>
                <td>{result.vcm}</td>
                <td>{result.chcm}</td>
                <td>{result.hcm}</td>
                <td>{result.leucocitos}</td>
                <td>{result.plaquetas}</td>
            </tr>
        ))}
    </tbody>
</table>-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">RUT</th>
                    <th className="py-2 px-4 border-b">Exam Date</th>
                    <th className="py-2 px-4 border-b">Glicemia</th>
                    <th className="py-2 px-4 border-b">Nitrogeno Ureico</th>
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};