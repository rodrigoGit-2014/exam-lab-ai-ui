import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | 'warning' } | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) {
            setMessage({ text: 'Please select a file first.', type: 'warning' });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                'https://exam-lab-ai-production.up.railway.app/api/laboratory/upload',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (response.status === 200 || response.status === 201) {
                setMessage({ text: 'File uploaded successfully!', type: 'success' });
            } else {
                setMessage({ text: 'Something went wrong.', type: 'error' });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    setMessage({ text: 'File duplicated.', type: 'error' });
                } else {
                    setMessage({ text: error.response?.data.message || 'File upload failed!', type: 'error' });
                }
            } else if (error instanceof Error) {
                setMessage({ text: error.message, type: 'error' });
            } else {
                setMessage({ text: 'An unknown error occurred.', type: 'error' });
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Upload Exam File</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Select PDF File:
                    </label>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                    Upload
                </button>
            </form>
            {message && (
                <p className={`mt-4 text-sm text-center ${message.type === 'success' ? 'text-green-600' : message.type === 'error' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {message.text}
                </p>
            )}
        </div>
    );
};

export default FileUploadComponent;
