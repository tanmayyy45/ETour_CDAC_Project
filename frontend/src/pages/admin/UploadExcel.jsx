import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Package, DollarSign, Upload,
    FileSpreadsheet, CheckCircle, AlertCircle, ArrowRight, X
} from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Tours', path: '/admin/tours', icon: Package },
    { name: 'Manage Costs', path: '/admin/costs', icon: DollarSign },
    { name: 'Upload Excel', path: '/admin/upload', icon: Upload },
];

export default function UploadExcel() {
    const [file, setFile] = useState(null);
    const [uploadType, setUploadType] = useState('tours');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (selectedFile) => {
        const allowedTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv',
        ];

        if (allowedTypes.includes(selectedFile.type) ||
            selectedFile.name.endsWith('.xlsx') ||
            selectedFile.name.endsWith('.xls') ||
            selectedFile.name.endsWith('.csv')) {
            setFile(selectedFile);
            setUploadResult(null);
        } else {
            alert('Please upload an Excel file (.xlsx, .xls) or CSV file');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setUploadResult(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', uploadType);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In a real app, you would call:
            // await fetch('http://localhost:8080/api/upload/tours', {
            //   method: 'POST',
            //   body: formData,
            // });

            setUploadResult({
                success: true,
                message: `Successfully uploaded ${file.name}`,
                details: {
                    recordsProcessed: Math.floor(Math.random() * 50) + 10,
                    recordsCreated: Math.floor(Math.random() * 30) + 5,
                    recordsUpdated: Math.floor(Math.random() * 20),
                    errors: 0,
                },
            });
            setFile(null);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadResult({
                success: false,
                message: 'Failed to upload file. Please try again.',
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 min-h-screen bg-gradient-dark text-white">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <span className="text-xl font-bold">E</span>
                            </div>
                            <div>
                                <h1 className="font-bold">ETour Admin</h1>
                                <p className="text-xs text-white/60">Management Panel</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.path === '/admin/upload'
                                            ? 'bg-white/20 text-white'
                                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-auto p-6 border-t border-white/10">
                        <Link to="/home" className="text-white/60 hover:text-white text-sm flex items-center gap-2">
                            <ArrowRight size={16} /> Back to Website
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Upload Excel</h1>
                        <p className="text-gray-600">Bulk upload tours, costs, and departure dates</p>
                    </div>

                    <div className="max-w-2xl">
                        {/* Upload Type Selection */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Upload Type</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { id: 'tours', label: 'Tours', icon: Package },
                                    { id: 'costs', label: 'Costs', icon: DollarSign },
                                    { id: 'departures', label: 'Departures', icon: Upload },
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setUploadType(type.id)}
                                        className={`p-4 rounded-xl border-2 transition-all ${uploadType === type.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <type.icon
                                            size={24}
                                            className={uploadType === type.id ? 'text-blue-600 mx-auto' : 'text-gray-400 mx-auto'}
                                        />
                                        <p className={`mt-2 font-medium ${uploadType === type.id ? 'text-blue-700' : 'text-gray-700'
                                            }`}>
                                            {type.label}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Upload File</h2>

                            <div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive
                                        ? 'border-blue-500 bg-blue-50'
                                        : file
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                {file ? (
                                    <div className="flex items-center justify-center gap-4">
                                        <FileSpreadsheet size={40} className="text-green-600" />
                                        <div className="text-left">
                                            <p className="font-medium text-gray-900">{file.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {(file.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setFile(null)}
                                            className="p-2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <FileSpreadsheet size={48} className="mx-auto text-gray-400 mb-4" />
                                        <p className="text-gray-700 font-medium mb-2">
                                            Drag & drop your Excel file here
                                        </p>
                                        <p className="text-gray-500 text-sm mb-4">or</p>
                                        <label className="btn-secondary inline-block cursor-pointer">
                                            Browse Files
                                            <input
                                                type="file"
                                                accept=".xlsx,.xls,.csv"
                                                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                                                className="hidden"
                                            />
                                        </label>
                                        <p className="text-gray-400 text-xs mt-4">
                                            Supported formats: .xlsx, .xls, .csv
                                        </p>
                                    </>
                                )}
                            </div>

                            {file && (
                                <button
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className="btn-primary w-full mt-4 py-4 gap-2"
                                >
                                    {isUploading ? (
                                        <>Uploading...</>
                                    ) : (
                                        <>
                                            <Upload size={18} /> Upload {uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Upload Result */}
                        {uploadResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`rounded-2xl p-6 ${uploadResult.success
                                        ? 'bg-green-50 border border-green-200'
                                        : 'bg-red-50 border border-red-200'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    {uploadResult.success ? (
                                        <CheckCircle size={24} className="text-green-600 shrink-0" />
                                    ) : (
                                        <AlertCircle size={24} className="text-red-600 shrink-0" />
                                    )}
                                    <div>
                                        <p className={`font-semibold ${uploadResult.success ? 'text-green-800' : 'text-red-800'
                                            }`}>
                                            {uploadResult.message}
                                        </p>
                                        {uploadResult.details && (
                                            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                                <div className="bg-white/50 rounded-lg p-3">
                                                    <p className="text-green-600 font-medium">{uploadResult.details.recordsProcessed}</p>
                                                    <p className="text-green-700">Records Processed</p>
                                                </div>
                                                <div className="bg-white/50 rounded-lg p-3">
                                                    <p className="text-green-600 font-medium">{uploadResult.details.recordsCreated}</p>
                                                    <p className="text-green-700">Records Created</p>
                                                </div>
                                                <div className="bg-white/50 rounded-lg p-3">
                                                    <p className="text-green-600 font-medium">{uploadResult.details.recordsUpdated}</p>
                                                    <p className="text-green-700">Records Updated</p>
                                                </div>
                                                <div className="bg-white/50 rounded-lg p-3">
                                                    <p className="text-green-600 font-medium">{uploadResult.details.errors}</p>
                                                    <p className="text-green-700">Errors</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Template Download */}
                        <div className="bg-blue-50 rounded-2xl p-6 mt-6 border border-blue-100">
                            <h3 className="font-semibold text-blue-900 mb-2">Need a template?</h3>
                            <p className="text-blue-700 text-sm mb-4">
                                Download our Excel templates to ensure your data is in the correct format.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button className="px-4 py-2 bg-white border border-blue-200 rounded-lg text-blue-700 text-sm font-medium hover:bg-blue-50">
                                    Tours Template
                                </button>
                                <button className="px-4 py-2 bg-white border border-blue-200 rounded-lg text-blue-700 text-sm font-medium hover:bg-blue-50">
                                    Costs Template
                                </button>
                                <button className="px-4 py-2 bg-white border border-blue-200 rounded-lg text-blue-700 text-sm font-medium hover:bg-blue-50">
                                    Departures Template
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
