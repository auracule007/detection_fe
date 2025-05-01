// import React, { useState } from 'react';
// import { uploadTransactions } from '../services/api';

// const FileUpload: React.FC<{ onUploadSuccess: () => void }> = ({ onUploadSuccess }) => {
//     const [file, setFile] = useState<File | null>(null);
//     const [isUploading, setIsUploading] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [error, setError] = useState<string | null>(null);

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             setFile(e.target.files[0]);
//             setError(null);
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) {
//             setError('Please select a file first');
//             return;
//         }

//         setIsUploading(true);
//         setUploadProgress(0);
//         setError(null);

//         try {
//             const interval = setInterval(() => {
//                 setUploadProgress(prev => {
//                     if (prev >= 90) {
//                         clearInterval(interval);
//                         return prev;
//                     }
//                     return prev + 10;
//                 });
//             }, 200);

//             await uploadTransactions(file);

//             clearInterval(interval);
//             setUploadProgress(100);
//             onUploadSuccess();
//         } catch (err) {
//             setError(err instanceof Error ? err.message : 'Failed to upload file');
//         } finally {
//             setIsUploading(false);
//         }
//     };

//     return (
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <h2 className="text-xl font-bold mb-4">Upload Transactions</h2>
//             <div className="flex items-center mb-4">
//                 <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
//                     Select File
//                     <input
//                         type="file"
//                         className="hidden"
//                         // accept=".csv,.json"
//                         accept=".csv,.json,*/*"
//                         onChange={handleFileChange}
//                     />
//                 </label>
//                 <span className="ml-4">
//                     {file ? file.name : 'No file selected'}
//                 </span>
//             </div>
            
//             {file && (
//                 <button
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
//                     onClick={handleUpload}
//                     disabled={isUploading}
//                 >
//                     Upload
//                 </button>
//             )}
            
//             {isUploading && (
//                 <div className="mt-4">
//                     <div className="w-full bg-gray-200 rounded-full h-2.5">
//                         <div 
//                             className="bg-blue-600 h-2.5 rounded-full" 
//                             style={{ width: `${uploadProgress}%` }}
//                         ></div>
//                     </div>
//                     <p className="mt-1 text-sm text-gray-500">
//                         Uploading... {uploadProgress}%
//                     </p>
//                 </div>
//             )}
            
//             {error && (
//                 <p className="mt-2 text-red-500">
//                     {error}
//                 </p>
//             )}
//         </div>
//     );
// };

// export default FileUpload;


import React, { useState } from 'react';
import { uploadTransactions } from '../services/api';

const FileUpload: React.FC<{ onUploadSuccess: () => void }> = ({ onUploadSuccess }) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setError(null);
            setSuccess(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);
        setError(null);
        setSuccess(null);

        try {
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 200);

            const result = await uploadTransactions(file);
            clearInterval(interval);
            setUploadProgress(100);
            
            setSuccess(`Processed ${result.processed_count} transactions, flagged ${result.flagged_count}`);
            onUploadSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to upload file');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Upload Transactions</h2>
            <div className="flex items-center mb-4">
                <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                    Select File
                    <input
                        type="file"
                        className="hidden"
                        accept=".csv,.json,.txt"
                        onChange={handleFileChange}
                    />
                </label>
                <span className="ml-4">
                    {file ? file.name : 'No file selected'}
                </span>
            </div>
            
            {file && (
                <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={handleUpload}
                    disabled={isUploading}
                >
                    {isUploading ? 'Uploading...' : 'Upload'}
                </button>
            )}
            
            {isUploading && (
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        Uploading... {uploadProgress}%
                    </p>
                </div>
            )}
            
            {error && (
                <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="mt-2 p-2 bg-green-100 text-green-700 rounded">
                    {success}
                </div>
            )}
        </div>
    );
};

export default FileUpload;