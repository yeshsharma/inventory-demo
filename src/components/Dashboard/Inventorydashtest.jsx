// import React, { useState } from "react";

// const TestUploadApp = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileId, setFileId] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isDownloadReady, setIsDownloadReady] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const BASE_URL = "https://myspatest.zasyasolutions.com/api/tests";

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === "text/csv") {
//       setSelectedFile(file);
//       setError("");
//       setMessage("");
//       setIsDownloadReady(false);
//       setFileId(null);
//     } else {
//       setError("Please select a valid CSV file");
//       setSelectedFile(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a CSV file first");
//       return;
//     }

//     setIsUploading(true);
//     setError("");
//     setMessage("");

//     try {
//       // Step 1: Upload CSV file
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       const uploadResponse = await fetch(`${BASE_URL}/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       const uploadData = await uploadResponse.json();

//       if (uploadData.status === "success" && uploadData.fileId) {
//         setFileId(uploadData.fileId);
//         setIsUploading(false);
//         setMessage(
//           "Your CSV uploaded successfully! Please wait a while for results...",
//         );

//         // Step 2: Execute tests
//         setIsProcessing(true);
//         const executeResponse = await fetch(
//           `${BASE_URL}/execute/${uploadData.fileId}`,
//           {
//             method: "POST",
//           },
//         );

//         const executeData = await executeResponse.json();

//         if (executeData.status === "completed") {
//           setMessage("Processing complete! Your report is ready to download.");
//           setIsDownloadReady(true);
//         } else {
//           setError("Processing failed. Please try again.");
//         }
//       } else {
//         setError("Upload failed. Please try again.");
//       }
//     } catch (err) {
//       setError(`Error: ${err.message}`);
//     } finally {
//       setIsUploading(false);
//       setIsProcessing(false);
//     }
//   };

//   const handleDownload = async () => {
//     if (!fileId) return;

//     try {
//       const response = await fetch(`${BASE_URL}/download/${fileId}`, {
//         method: "GET",
//       });

//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `inventory_report_${fileId}.xlsx`;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//         setMessage("File downloaded successfully!");
//       } else {
//         setError("Download failed. Please try again.");
//       }
//     } catch (err) {
//       setError(`Download error: ${err.message}`);
//     }
//   };

//   const resetForm = () => {
//     setSelectedFile(null);
//     setFileId(null);
//     setIsDownloadReady(false);
//     setMessage("");
//     setError("");
//     // Reset the file input
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput) {
//       fileInput.value = "";
//     }
//   };

//   const downloadSampleCSV = () => {
//     const sampleData = `dimA,dimB,dimC
// 92,92,5
// 88,88,0
// 78,360,`;

//     const blob = new Blob([sampleData], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "sample_dimensions.csv";
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h1 style={styles.title}>
//           Verify Sku recommendation on My spa cover website
//         </h1>

//         <div style={styles.sampleSection}>
//           <p style={styles.sampleText}>Need a sample file?</p>
//           <button
//             onClick={downloadSampleCSV}
//             style={{ ...styles.button, ...styles.sampleButton }}
//           >
//             <svg
//               style={styles.buttonIcon}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//             Download Sample CSV
//           </button>
//         </div>

//         <div style={styles.divider}></div>

//         <div style={styles.uploadSection}>
//           <label style={styles.fileLabel}>
//             <input
//               type="file"
//               accept=".csv"
//               onChange={handleFileSelect}
//               style={styles.fileInput}
//               disabled={isUploading || isProcessing}
//             />
//             <span style={styles.fileLabelText}>
//               {selectedFile ? selectedFile.name : "Choose CSV File"}
//             </span>
//           </label>

//           {selectedFile && !isDownloadReady && (
//             <button
//               onClick={handleUpload}
//               disabled={isUploading || isProcessing}
//               style={{
//                 ...styles.button,
//                 ...styles.uploadButton,
//                 ...(isUploading || isProcessing ? styles.buttonDisabled : {}),
//               }}
//             >
//               {isUploading
//                 ? "Uploading..."
//                 : isProcessing
//                   ? "Processing..."
//                   : "Upload & Process"}
//             </button>
//           )}
//         </div>

//         {(isUploading || isProcessing) && (
//           <div style={styles.loader}>
//             <div style={styles.spinner}></div>
//             <p style={styles.loaderText}>
//               {isUploading ? "Uploading file..." : "Processing data..."}
//             </p>
//           </div>
//         )}

//         {message && (
//           <div style={styles.messageBox}>
//             <svg
//               style={styles.icon}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             {message}
//           </div>
//         )}

//         {error && (
//           <div style={styles.errorBox}>
//             <svg
//               style={styles.icon}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//             {error}
//           </div>
//         )}

//         {isDownloadReady && (
//           <div style={styles.downloadSection}>
//             <button
//               onClick={handleDownload}
//               style={{ ...styles.button, ...styles.downloadButton }}
//             >
//               <svg
//                 style={styles.buttonIcon}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                 />
//               </svg>
//               Download Report
//             </button>
//             <button
//               onClick={resetForm}
//               style={{ ...styles.button, ...styles.resetButton }}
//             >
//               Upload Another File
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     padding: "20px",
//     fontFamily:
//       '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
//   },
//   card: {
//     backgroundColor: "white",
//     borderRadius: "16px",
//     boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
//     padding: "40px",
//     maxWidth: "500px",
//     width: "100%",
//   },
//   title: {
//     fontSize: "28px",
//     fontWeight: "700",
//     color: "#1a202c",
//     marginBottom: "30px",
//     textAlign: "center",
//   },
//   uploadSection: {
//     marginBottom: "20px",
//   },
//   fileLabel: {
//     display: "block",
//     width: "100%",
//     marginBottom: "15px",
//     cursor: "pointer",
//   },
//   fileInput: {
//     display: "none",
//   },
//   fileLabelText: {
//     display: "block",
//     padding: "15px 20px",
//     backgroundColor: "#f7fafc",
//     border: "2px dashed #cbd5e0",
//     borderRadius: "8px",
//     textAlign: "center",
//     color: "#4a5568",
//     fontWeight: "500",
//     transition: "all 0.3s ease",
//   },
//   button: {
//     width: "100%",
//     padding: "14px 20px",
//     fontSize: "16px",
//     fontWeight: "600",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "8px",
//   },
//   uploadButton: {
//     backgroundColor: "#667eea",
//     color: "white",
//   },
//   buttonDisabled: {
//     backgroundColor: "#cbd5e0",
//     cursor: "not-allowed",
//     opacity: "0.6",
//   },
//   downloadButton: {
//     backgroundColor: "#48bb78",
//     color: "white",
//     marginBottom: "10px",
//   },
//   resetButton: {
//     backgroundColor: "#718096",
//     color: "white",
//   },
//   loader: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "30px 0",
//   },
//   spinner: {
//     width: "50px",
//     height: "50px",
//     border: "4px solid #e2e8f0",
//     borderTop: "4px solid #667eea",
//     borderRadius: "50%",
//     animation: "spin 1s linear infinite",
//   },
//   loaderText: {
//     marginTop: "15px",
//     color: "#4a5568",
//     fontSize: "14px",
//   },
//   messageBox: {
//     padding: "15px",
//     backgroundColor: "#c6f6d5",
//     border: "1px solid #9ae6b4",
//     borderRadius: "8px",
//     color: "#22543d",
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     marginBottom: "20px",
//   },
//   errorBox: {
//     padding: "15px",
//     backgroundColor: "#fed7d7",
//     border: "1px solid #fc8181",
//     borderRadius: "8px",
//     color: "#742a2a",
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     marginBottom: "20px",
//   },
//   icon: {
//     width: "20px",
//     height: "20px",
//     flexShrink: "0",
//   },
//   buttonIcon: {
//     width: "20px",
//     height: "20px",
//   },
//   downloadSection: {
//     marginTop: "20px",
//   },
//   sampleSection: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   sampleText: {
//     fontSize: "14px",
//     color: "#718096",
//     marginBottom: "10px",
//   },
//   sampleButton: {
//     backgroundColor: "#ed8936",
//     color: "white",
//   },
//   divider: {
//     height: "1px",
//     backgroundColor: "#e2e8f0",
//     margin: "25px 0",
//   },
// };

// // Add keyframe animation for spinner
// const styleSheet = document.createElement("style");
// styleSheet.textContent = `
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `;
// document.head.appendChild(styleSheet);

// export default TestUploadApp;

// import React, { useState } from "react";
// import {
//   Bell,
//   Briefcase,
//   Zap,
//   MapPin,
//   DollarSign,
//   Calendar,
//   User,
//   Phone,
//   Mail,
//   ChevronRight,
//   X,
//   Check,
// } from "lucide-react";

// const artisanCategories = [
//   { id: "electrician", name: "Electrician", icon: "⚡" },
//   { id: "plumber", name: "Plumber", icon: "🔧" },
//   { id: "carpenter", name: "Carpenter", icon: "🪚" },
//   { id: "painter", name: "Painter", icon: "🎨" },
//   { id: "mason", name: "Mason", icon: "🧱" },
//   { id: "mechanic", name: "Mechanic", icon: "⚙️" },
// ];

// const quickIssues = [
//   "Light point fixing",
//   "Water leakage",
//   "Door repair",
//   "Geyser repair",
//   "Tap fixing",
//   "Socket installation",
//   "Paint touch-up",
//   "Furniture assembly",
// ];

// // Home View
// const HomeView = ({ setActiveView }) => (
//   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
//     <div className="max-w-md mx-auto">
//       {/* Header */}
//       <div className="text-center mb-8 mt-6">
//         <div className="inline-block bg-indigo-600 text-white p-4 rounded-full mb-4">
//           <Briefcase size={32} />
//         </div>
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Artisans</h1>
//         <p className="text-gray-600">
//           Post jobs or send quick alerts to nearby professionals
//         </p>
//       </div>

//       {/* Main Action Cards */}
//       <div className="space-y-4">
//         {/* Post Job Card */}
//         <button
//           onClick={() => setActiveView("postJob")}
//           className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-98"
//         >
//           <div className="flex items-start justify-between">
//             <div className="flex-1 text-left">
//               <div className="flex items-center mb-2">
//                 <div className="bg-indigo-100 p-2 rounded-lg mr-3">
//                   <Briefcase className="text-indigo-600" size={24} />
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-800">Post a Job</h2>
//               </div>
//               <p className="text-gray-600 text-sm mb-3">
//                 Full project with budget, timeline & requirements
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 <span className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full">
//                   Detailed
//                 </span>
//                 <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">
//                   Budget-based
//                 </span>
//               </div>
//             </div>
//             <ChevronRight className="text-gray-400 mt-2" size={24} />
//           </div>
//         </button>

//         {/* Quick Alert Card */}
//         <button
//           onClick={() => setActiveView("quickAlert")}
//           className="w-full bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-98"
//         >
//           <div className="flex items-start justify-between">
//             <div className="flex-1 text-left">
//               <div className="flex items-center mb-2">
//                 <div className="bg-white/20 p-2 rounded-lg mr-3">
//                   <Zap className="text-white" size={24} />
//                 </div>
//                 <h2 className="text-xl font-bold text-white">Quick Alert</h2>
//               </div>
//               <p className="text-white/90 text-sm mb-3">
//                 Urgent help needed? Send instant alert to artisans
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
//                   Instant
//                 </span>
//                 <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
//                   Emergency
//                 </span>
//               </div>
//             </div>
//             <ChevronRight className="text-white/80 mt-2" size={24} />
//           </div>
//         </button>
//       </div>

//       {/* Info Section */}
//       <div className="mt-8 bg-white rounded-2xl p-6 shadow-md">
//         <h3 className="font-bold text-gray-800 mb-4 flex items-center">
//           <Bell className="mr-2 text-indigo-600" size={20} />
//           How it works
//         </h3>
//         <div className="space-y-3 text-sm text-gray-600">
//           <div className="flex items-start">
//             <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//               1
//             </div>
//             <p>Choose between detailed job posting or quick alert</p>
//           </div>
//           <div className="flex items-start">
//             <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//               2
//             </div>
//             <p>All relevant artisans get notified instantly</p>
//           </div>
//           <div className="flex items-start">
//             <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//               3
//             </div>
//             <p>Artisans respond and you choose the best fit</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Post Job View
// const PostJobView = ({
//   setActiveView,
//   formData,
//   handleInputChange,
//   handleSubmitJob,
// }) => (
//   <div className="min-h-screen bg-gray-50 pb-20">
//     <div className="max-w-md mx-auto">
//       {/* Header */}
//       <div className="bg-indigo-600 text-white p-4 sticky top-0 z-10">
//         <div className="flex items-center">
//           <button onClick={() => setActiveView("home")} className="mr-4">
//             <X size={24} />
//           </button>
//           <h2 className="text-xl font-bold">Post a Job</h2>
//         </div>
//       </div>

//       <form onSubmit={handleSubmitJob} className="p-4 space-y-4">
//         {/* Job Title */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Job Title *
//           </label>
//           <input
//             type="text"
//             required
//             value={formData.jobTitle}
//             onChange={(e) => handleInputChange("jobTitle", e.target.value)}
//             placeholder="e.g., Bathroom renovation"
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Category Selection */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <label className="block text-sm font-semibold text-gray-700 mb-3">
//             Artisan Category *
//           </label>
//           <div className="grid grid-cols-3 gap-2">
//             {artisanCategories.map((cat) => (
//               <button
//                 key={cat.id}
//                 type="button"
//                 onClick={() => handleInputChange("category", cat.id)}
//                 className={`p-3 rounded-lg border-2 transition-all ${
//                   formData.category === cat.id
//                     ? "border-indigo-500 bg-indigo-50"
//                     : "border-gray-200 bg-white"
//                 }`}
//               >
//                 <div className="text-2xl mb-1">{cat.icon}</div>
//                 <div className="text-xs font-medium text-gray-700">
//                   {cat.name}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Budget */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             <DollarSign className="inline mr-1" size={16} />
//             Budget Range *
//           </label>
//           <input
//             type="text"
//             required
//             value={formData.budget}
//             onChange={(e) => handleInputChange("budget", e.target.value)}
//             placeholder="e.g., ₹5,000 - ₹10,000"
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Timeline */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             <Calendar className="inline mr-1" size={16} />
//             Timeline *
//           </label>
//           <select
//             required
//             value={formData.timeline}
//             onChange={(e) => handleInputChange("timeline", e.target.value)}
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Select timeline</option>
//             <option value="immediate">Immediate (within 24 hours)</option>
//             <option value="this-week">This week</option>
//             <option value="this-month">This month</option>
//             <option value="flexible">Flexible</option>
//           </select>
//         </div>

//         {/* Location */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             <MapPin className="inline mr-1" size={16} />
//             Location *
//           </label>
//           <input
//             type="text"
//             required
//             value={formData.location}
//             onChange={(e) => handleInputChange("location", e.target.value)}
//             placeholder="Enter your location"
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Description */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Job Description *
//           </label>
//           <textarea
//             required
//             value={formData.description}
//             onChange={(e) => handleInputChange("description", e.target.value)}
//             placeholder="Describe the work needed in detail..."
//             rows="4"
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Contact Info */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <label className="block text-sm font-semibold text-gray-700 mb-3">
//             Your Contact Information
//           </label>
//           <div className="space-y-3">
//             <input
//               type="text"
//               required
//               value={formData.name}
//               onChange={(e) => handleInputChange("name", e.target.value)}
//               placeholder="Your name"
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <input
//               type="tel"
//               required
//               value={formData.phone}
//               onChange={(e) => handleInputChange("phone", e.target.value)}
//               placeholder="Phone number"
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => handleInputChange("email", e.target.value)}
//               placeholder="Email (optional)"
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-colors"
//         >
//           Post Job & Notify Artisans
//         </button>
//       </form>
//     </div>
//   </div>
// );

// // Quick Alert View
// const QuickAlertView = ({
//   setActiveView,
//   formData,
//   handleInputChange,
//   handleQuickAlert,
// }) => (
//   <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pb-20">
//     <div className="max-w-md mx-auto">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 sticky top-0 z-10">
//         <div className="flex items-center">
//           <button onClick={() => setActiveView("home")} className="mr-4">
//             <X size={24} />
//           </button>
//           <div>
//             <h2 className="text-xl font-bold">Quick Alert</h2>
//             <p className="text-sm text-white/80">Get instant help</p>
//           </div>
//         </div>
//       </div>

//       <form onSubmit={handleQuickAlert} className="p-4 space-y-4">
//         {/* Urgency Badge */}
//         <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-orange-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Zap className="text-orange-500 mr-2" size={20} />
//               <span className="font-semibold text-gray-700">Urgency Level</span>
//             </div>
//             <select
//               value={formData.urgency}
//               onChange={(e) => handleInputChange("urgency", e.target.value)}
//               className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
//             >
//               <option value="normal">Normal</option>
//               <option value="urgent">Urgent</option>
//               <option value="emergency">Emergency</option>
//             </select>
//           </div>
//         </div>

//         {/* Quick Issue Selection */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <label className="block text-sm font-semibold text-gray-700 mb-3">
//             What do you need?
//           </label>
//           <div className="grid grid-cols-2 gap-2">
//             {quickIssues.map((issue) => (
//               <button
//                 key={issue}
//                 type="button"
//                 onClick={() => handleInputChange("jobTitle", issue)}
//                 className={`p-3 rounded-lg border-2 text-sm transition-all ${
//                   formData.jobTitle === issue
//                     ? "border-orange-500 bg-orange-50 text-orange-700"
//                     : "border-gray-200 bg-white text-gray-700"
//                 }`}
//               >
//                 {issue}
//               </button>
//             ))}
//           </div>
//           <input
//             type="text"
//             value={formData.jobTitle}
//             onChange={(e) => handleInputChange("jobTitle", e.target.value)}
//             placeholder="Or type custom issue..."
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         {/* Artisan Type */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <label className="block text-sm font-semibold text-gray-700 mb-3">
//             Who do you need? *
//           </label>
//           <div className="grid grid-cols-3 gap-2">
//             {artisanCategories.map((cat) => (
//               <button
//                 key={cat.id}
//                 type="button"
//                 onClick={() => handleInputChange("category", cat.id)}
//                 className={`p-3 rounded-lg border-2 transition-all ${
//                   formData.category === cat.id
//                     ? "border-orange-500 bg-orange-50"
//                     : "border-gray-200 bg-white"
//                 }`}
//               >
//                 <div className="text-2xl mb-1">{cat.icon}</div>
//                 <div className="text-xs font-medium text-gray-700">
//                   {cat.name}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Location */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             <MapPin className="inline mr-1" size={16} />
//             Your Location *
//           </label>
//           <input
//             type="text"
//             required
//             value={formData.location}
//             onChange={(e) => handleInputChange("location", e.target.value)}
//             placeholder="Enter your location"
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         {/* Additional Details */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Additional Details
//           </label>
//           <textarea
//             value={formData.description}
//             onChange={(e) => handleInputChange("description", e.target.value)}
//             placeholder="Any specific details..."
//             rows="3"
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         {/* Contact */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <label className="block text-sm font-semibold text-gray-700 mb-3">
//             Contact Information *
//           </label>
//           <div className="space-y-3">
//             <input
//               type="text"
//               required
//               value={formData.name}
//               onChange={(e) => handleInputChange("name", e.target.value)}
//               placeholder="Your name"
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//             <input
//               type="tel"
//               required
//               value={formData.phone}
//               onChange={(e) => handleInputChange("phone", e.target.value)}
//               placeholder="Phone number"
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
//         >
//           <Zap className="inline mr-2" size={20} />
//           Send Alert to All{" "}
//           {formData.category
//             ? artisanCategories.find((c) => c.id === formData.category)?.name +
//               "s"
//             : "Artisans"}
//         </button>

//         <p className="text-center text-sm text-gray-600">
//           All registered{" "}
//           {formData.category
//             ? artisanCategories
//                 .find((c) => c.id === formData.category)
//                 ?.name.toLowerCase() + "s"
//             : "artisans"}{" "}
//           will be notified instantly
//         </p>
//       </form>
//     </div>
//   </div>
// );

// // Success Modal
// const SuccessModal = ({ activeView }) => (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center animate-scale-in">
//       <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//         <Check className="text-green-600" size={40} />
//       </div>
//       <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
//       <p className="text-gray-600 mb-4">
//         {activeView === "postJob"
//           ? "Your job has been posted and artisans have been notified!"
//           : "Alert sent to all relevant artisans!"}
//       </p>
//       <div className="flex items-center justify-center space-x-2 text-indigo-600">
//         <Bell className="animate-bounce" size={20} />
//         <span className="text-sm font-medium">
//           Artisans are being notified...
//         </span>
//       </div>
//     </div>
//   </div>
// );

// const JobPostingSystem = () => {
//   const [activeView, setActiveView] = useState("home");
//   const [formData, setFormData] = useState({
//     jobTitle: "",
//     category: "",
//     description: "",
//     budget: "",
//     timeline: "",
//     location: "",
//     name: "",
//     phone: "",
//     email: "",
//     urgency: "normal",
//   });
//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmitJob = (e) => {
//     e.preventDefault();
//     // Simulate API call
//     setTimeout(() => {
//       setShowSuccess(true);
//       setTimeout(() => {
//         setShowSuccess(false);
//         setActiveView("home");
//         setFormData({
//           jobTitle: "",
//           category: "",
//           description: "",
//           budget: "",
//           timeline: "",
//           location: "",
//           name: "",
//           phone: "",
//           email: "",
//           urgency: "normal",
//         });
//       }, 2000);
//     }, 500);
//   };

//   const handleQuickAlert = (e) => {
//     e.preventDefault();
//     // Simulate API call
//     setTimeout(() => {
//       setShowSuccess(true);
//       setTimeout(() => {
//         setShowSuccess(false);
//         setActiveView("home");
//         setFormData({
//           jobTitle: "",
//           category: "",
//           description: "",
//           budget: "",
//           timeline: "",
//           location: "",
//           name: "",
//           phone: "",
//           email: "",
//           urgency: "normal",
//         });
//       }, 2000);
//     }, 500);
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes scale-in {
//           from {
//             transform: scale(0.9);
//             opacity: 0;
//           }
//           to {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }
//         .animate-scale-in {
//           animation: scale-in 0.3s ease-out;
//         }
//         .active\\:scale-98:active {
//           transform: scale(0.98);
//         }
//       `}</style>

//       {activeView === "home" && <HomeView setActiveView={setActiveView} />}
//       {activeView === "postJob" && (
//         <PostJobView
//           setActiveView={setActiveView}
//           formData={formData}
//           handleInputChange={handleInputChange}
//           handleSubmitJob={handleSubmitJob}
//         />
//       )}
//       {activeView === "quickAlert" && (
//         <QuickAlertView
//           setActiveView={setActiveView}
//           formData={formData}
//           handleInputChange={handleInputChange}
//           handleQuickAlert={handleQuickAlert}
//         />
//       )}
//       {showSuccess && <SuccessModal activeView={activeView} />}
//     </>
//   );
// };

// export default JobPostingSystem;

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Package,
  Truck,
  CheckCircle,
  Clock,
  DollarSign,
  Navigation,
  Camera,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Phone,
  Mail,
  TrendingUp,
  Activity,
} from "lucide-react";

// Dummy API Data
const DUMMY_DRIVER = {
  id: "DRV001",
  name: "Rajesh Kumar",
  phone: "+91 98765 43210",
  email: "rajesh.kumar@logistics.com",
  vehicle: "TN 01 AB 1234",
  vehicleType: "Container Truck",
  rating: 4.8,
  totalTrips: 245,
};

const DUMMY_SHIPMENTS = [
  {
    id: "SHP001",
    type: "Pickup and Delivery",
    status: "upcoming",
    pickupLocation: "Warehouse A, Naraina Industrial Area, Delhi",
    deliveryLocation: "Distribution Center, Sector 63, Noida",
    pickupCoords: { lat: 28.6358, lng: 77.1345 },
    deliveryCoords: { lat: 28.6271, lng: 77.3752 },
    distance: 28.5,
    estimatedDistance: 28.5,
    price: 2500,
    priceType: "fixed",
    pricePerKm: 87.72,
    podRequired: true,
    scheduledDate: "2026-02-11",
    scheduledTime: "09:00 AM",
    containerNumber: "CONT12345",
    weight: "15 Tons",
    customerName: "ABC Enterprises",
    customerPhone: "+91 98888 88888",
    specialInstructions: "Handle with care - fragile items",
  },
  {
    id: "SHP002",
    type: "Trailer Drop-off",
    status: "upcoming",
    pickupLocation: "Port Authority, Nhava Sheva, Mumbai",
    deliveryLocation: "Amazon Warehouse, Bhiwandi",
    pickupCoords: { lat: 18.9564, lng: 72.9509 },
    deliveryCoords: { lat: 19.2965, lng: 73.1277 },
    distance: 45.2,
    estimatedDistance: 45.2,
    price: 4500,
    priceType: "fixed",
    pricePerKm: 99.56,
    podRequired: false,
    scheduledDate: "2026-02-11",
    scheduledTime: "02:00 PM",
    containerNumber: "TRLR78901",
    weight: "20 Tons",
    customerName: "Amazon Logistics",
    customerPhone: "+91 97777 77777",
    specialInstructions: "Drop trailer and pick empty trailer from Bay 5",
  },
  {
    id: "SHP003",
    type: "Linehaul",
    status: "upcoming",
    pickupLocation: "Delhi Hub, Mundka",
    deliveryLocation: "Bangalore Hub, Whitefield",
    pickupCoords: { lat: 28.6812, lng: 77.0331 },
    deliveryCoords: { lat: 12.9698, lng: 77.7499 },
    distance: 2145,
    estimatedDistance: 2145,
    price: 85000,
    priceType: "per_km",
    pricePerKm: 39.63,
    podRequired: false,
    scheduledDate: "2026-02-12",
    scheduledTime: "06:00 PM",
    containerNumber: "LNH45678",
    weight: "25 Tons",
    customerName: "Express Cargo Solutions",
    customerPhone: "+91 96666 66666",
    specialInstructions: "Night travel recommended, rest breaks mandatory",
  },
  {
    id: "SHP004",
    type: "Delivery",
    status: "upcoming",
    pickupLocation: "Local Hub, Andheri East, Mumbai",
    deliveryLocation: "Customer Address, Bandra West",
    pickupCoords: { lat: 19.1176, lng: 72.8685 },
    deliveryCoords: { lat: 19.0596, lng: 72.8295 },
    distance: 8.3,
    estimatedDistance: 8.3,
    price: 800,
    priceType: "fixed",
    pricePerKm: 96.39,
    podRequired: true,
    scheduledDate: "2026-02-10",
    scheduledTime: "05:00 PM",
    containerNumber: "PKG98765",
    weight: "150 Kg",
    customerName: "Amit Sharma",
    customerPhone: "+91 95555 55555",
    specialInstructions: "Call before delivery, apartment delivery",
  },
  {
    id: "SHP005",
    type: "Pickup and Delivery",
    status: "active",
    pickupLocation: "Factory, Gurgaon Sector 18",
    deliveryLocation: "Retail Store, Connaught Place, Delhi",
    pickupCoords: { lat: 28.4924, lng: 77.0812 },
    deliveryCoords: { lat: 28.6315, lng: 77.2167 },
    distance: 32.1,
    estimatedDistance: 32.1,
    actualDistance: 15.2,
    price: 2800,
    priceType: "fixed",
    pricePerKm: 87.23,
    podRequired: true,
    scheduledDate: "2026-02-10",
    scheduledTime: "01:00 PM",
    startTime: "01:15 PM",
    containerNumber: "CONT56789",
    weight: "12 Tons",
    customerName: "XYZ Retail Chain",
    customerPhone: "+91 94444 44444",
    specialInstructions: "Unload at rear entrance",
  },
  {
    id: "SHP006",
    type: "Delivery",
    status: "completed",
    pickupLocation: "Sorting Center, Pune",
    deliveryLocation: "Customer, Koregaon Park",
    pickupCoords: { lat: 18.5284, lng: 73.8742 },
    deliveryCoords: { lat: 18.5362, lng: 73.8977 },
    distance: 5.8,
    estimatedDistance: 5.8,
    actualDistance: 6.2,
    price: 600,
    priceType: "fixed",
    pricePerKm: 96.77,
    podRequired: true,
    scheduledDate: "2026-02-09",
    scheduledTime: "11:00 AM",
    startTime: "11:10 AM",
    completedTime: "11:45 AM",
    containerNumber: "PKG45612",
    weight: "80 Kg",
    customerName: "Priya Deshmukh",
    customerPhone: "+91 93333 33333",
    podImage:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QT0QgSW1hZ2U8L3RleHQ+PC9zdmc+",
    specialInstructions: "Signature required",
  },
  {
    id: "SHP007",
    type: "Trailer Drop-off",
    status: "completed",
    pickupLocation: "Container Depot, Jaipur",
    deliveryLocation: "Warehouse, Ajmer Road",
    pickupCoords: { lat: 26.9124, lng: 75.7873 },
    deliveryCoords: { lat: 26.9483, lng: 75.6589 },
    distance: 18.5,
    estimatedDistance: 18.5,
    actualDistance: 19.1,
    price: 2000,
    priceType: "fixed",
    pricePerKm: 104.71,
    podRequired: false,
    scheduledDate: "2026-02-08",
    scheduledTime: "08:00 AM",
    startTime: "08:20 AM",
    completedTime: "09:30 AM",
    containerNumber: "TRLR11223",
    weight: "18 Tons",
    customerName: "Rajasthan Logistics",
    customerPhone: "+91 92222 22222",
    specialInstructions: "Pick empty trailer from same location",
  },
];

// Main App Component
const DriverShipmentApp = () => {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [menuOpen, setMenuOpen] = useState(false);
  const [shipments, setShipments] = useState(DUMMY_SHIPMENTS);
  const [showPODModal, setShowPODModal] = useState(false);
  const [podImage, setPodImage] = useState(null);

  // Login Screen
  const LoginScreen = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const handleSendOTP = () => {
      if (phone.length === 10) {
        setOtpSent(true);
      }
    };

    const handleLogin = () => {
      if (otp === "1234") {
        setCurrentScreen("dashboard");
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Driver App
            </h1>
            <p className="text-gray-600">Shipment Management System</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10 digit mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                maxLength="10"
              />
            </div>

            {otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 4 digit OTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  maxLength="4"
                />
                <p className="text-xs text-gray-500 mt-2">Demo OTP: 1234</p>
              </div>
            )}

            {!otpSent ? (
              <button
                onClick={handleSendOTP}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Send OTP
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Header Component
  const Header = ({ title, showBack = false, onBack }) => (
    <div className="bg-blue-600 text-white px-4 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button onClick={onBack} className="p-1">
              <ChevronRight className="w-6 h-6 transform rotate-180" />
            </button>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );

  // Side Menu
  const SideMenu = () => (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="bg-blue-600 text-white p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{DUMMY_DRIVER.name}</h2>
            <p className="text-blue-100 text-sm">{DUMMY_DRIVER.vehicle}</p>
          </div>
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= Math.floor(DUMMY_DRIVER.rating)
                    ? "text-yellow-300"
                    : "text-gray-400"
                }
              >
                ★
              </span>
            ))}
          </div>
          <span>{DUMMY_DRIVER.rating}</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3 text-gray-700">
          <Phone className="w-5 h-5" />
          <span>{DUMMY_DRIVER.phone}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-700">
          <Mail className="w-5 h-5" />
          <span className="text-sm">{DUMMY_DRIVER.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-700">
          <Activity className="w-5 h-5" />
          <span>Total Trips: {DUMMY_DRIVER.totalTrips}</span>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-6">
        <button
          onClick={() => {
            setCurrentScreen("login");
            setMenuOpen(false);
          }}
          className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  // Dashboard Screen
  const DashboardScreen = () => {
    const activeShipments = shipments.filter((s) => s.status === "active");
    const upcomingShipments = shipments.filter((s) => s.status === "upcoming");
    const completedShipments = shipments.filter(
      (s) => s.status === "completed",
    );

    const totalEarnings = completedShipments.reduce(
      (sum, s) => sum + s.price,
      0,
    );
    const todayEarnings = completedShipments
      .filter((s) => s.scheduledDate === "2026-02-10")
      .reduce((sum, s) => sum + s.price, 0);

    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Dashboard" />
        <SideMenu />

        {/* Stats Cards */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-8 h-8 opacity-80" />
                <span className="text-3xl font-bold">
                  {activeShipments.length}
                </span>
              </div>
              <p className="text-sm opacity-90">Active Trips</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 opacity-80" />
                <span className="text-3xl font-bold">
                  {upcomingShipments.length}
                </span>
              </div>
              <p className="text-sm opacity-90">Upcoming</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 opacity-80" />
                <span className="text-3xl font-bold">
                  {completedShipments.length}
                </span>
              </div>
              <p className="text-sm opacity-90">Completed</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 opacity-80" />
                <span className="text-2xl font-bold">₹{todayEarnings}</span>
              </div>
              <p className="text-sm opacity-90">Today's Earnings</p>
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Earnings Summary
              </h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Earnings</span>
                <span className="text-xl font-bold text-gray-800">
                  ₹{totalEarnings.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed Trips</span>
                <span className="text-lg font-semibold text-blue-600">
                  {completedShipments.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg per Trip</span>
                <span className="text-lg font-semibold text-green-600">
                  ₹
                  {completedShipments.length > 0
                    ? Math.round(
                        totalEarnings / completedShipments.length,
                      ).toLocaleString()
                    : 0}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => {
                setActiveTab("active");
                setCurrentScreen("shipments");
              }}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700 text-center">
                Active Trips
              </p>
            </button>

            <button
              onClick={() => {
                setActiveTab("upcoming");
                setCurrentScreen("shipments");
              }}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700 text-center">
                Upcoming
              </p>
            </button>

            <button
              onClick={() => {
                setActiveTab("completed");
                setCurrentScreen("shipments");
              }}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700 text-center">
                History
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Shipments List Screen
  const ShipmentsScreen = () => {
    const filteredShipments = shipments.filter((s) => s.status === activeTab);

    const getTypeColor = (type) => {
      const colors = {
        "Pickup and Delivery": "bg-blue-100 text-blue-700",
        "Trailer Drop-off": "bg-green-100 text-green-700",
        Linehaul: "bg-purple-100 text-purple-700",
        Delivery: "bg-orange-100 text-orange-700",
      };
      return colors[type] || "bg-gray-100 text-gray-700";
    };

    const getTypeIcon = (type) => {
      const icons = {
        "Pickup and Delivery": <Package className="w-4 h-4" />,
        "Trailer Drop-off": <Truck className="w-4 h-4" />,
        Linehaul: <Navigation className="w-4 h-4" />,
        Delivery: <MapPin className="w-4 h-4" />,
      };
      return icons[type] || <Package className="w-4 h-4" />;
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          title="My Shipments"
          showBack
          onBack={() => setCurrentScreen("dashboard")}
        />
        <SideMenu />

        {/* Tabs */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="flex">
            <button
              onClick={() => setActiveTab("active")}
              className={`flex-1 py-4 text-sm font-semibold ${activeTab === "active" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500"}`}
            >
              Active ({shipments.filter((s) => s.status === "active").length})
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex-1 py-4 text-sm font-semibold ${activeTab === "upcoming" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            >
              Upcoming (
              {shipments.filter((s) => s.status === "upcoming").length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`flex-1 py-4 text-sm font-semibold ${activeTab === "completed" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"}`}
            >
              Completed (
              {shipments.filter((s) => s.status === "completed").length})
            </button>
          </div>
        </div>

        {/* Shipments List */}
        <div className="p-4 space-y-4">
          {filteredShipments.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">
                No {activeTab} shipments
              </p>
            </div>
          ) : (
            filteredShipments.map((shipment) => (
              <div
                key={shipment.id}
                onClick={() => {
                  setSelectedShipment(shipment);
                  setCurrentScreen("shipmentDetail");
                }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getTypeColor(shipment.type)}`}
                        >
                          {getTypeIcon(shipment.type)}
                          <span>{shipment.type}</span>
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-semibold mb-1">
                        #{shipment.id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">
                        ₹{shipment.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {shipment.priceType === "fixed" ? "Fixed" : "Per KM"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Pickup */}
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg mt-1">
                        <MapPin className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold mb-1">
                          PICKUP
                        </p>
                        <p className="text-sm text-gray-800 font-medium leading-tight">
                          {shipment.pickupLocation}
                        </p>
                      </div>
                    </div>

                    {/* Delivery */}
                    <div className="flex items-start space-x-3">
                      <div className="bg-red-100 p-2 rounded-lg mt-1">
                        <MapPin className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold mb-1">
                          DELIVERY
                        </p>
                        <p className="text-sm text-gray-800 font-medium leading-tight">
                          {shipment.deliveryLocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Distance</p>
                      <p className="text-sm font-bold text-gray-800">
                        {shipment.distance} km
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Scheduled</p>
                      <p className="text-sm font-bold text-gray-800">
                        {new Date(shipment.scheduledDate).toLocaleDateString(
                          "en-IN",
                          { month: "short", day: "numeric" },
                        )}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Time</p>
                      <p className="text-sm font-bold text-gray-800">
                        {shipment.scheduledTime}
                      </p>
                    </div>
                  </div>
                </div>

                {activeTab === "active" && (
                  <div className="bg-green-50 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-green-700">
                        Trip In Progress
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // Shipment Detail Screen
  const ShipmentDetailScreen = () => {
    if (!selectedShipment) return null;

    const handleAcceptShipment = () => {
      const updatedShipments = shipments.map((s) =>
        s.id === selectedShipment.id ? { ...s, status: "accepted" } : s,
      );
      setShipments(updatedShipments);
      alert("Shipment accepted successfully!");
    };

    const handleStartTrip = () => {
      const now = new Date();
      const updatedShipments = shipments.map((s) =>
        s.id === selectedShipment.id
          ? {
              ...s,
              status: "active",
              startTime: now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : s,
      );
      setShipments(updatedShipments);
      setSelectedShipment({ ...selectedShipment, status: "active" });
      setCurrentScreen("tripTracking");
    };

    const handleCompleteDelivery = () => {
      if (selectedShipment.podRequired) {
        setShowPODModal(true);
      } else {
        completeTrip();
      }
    };

    const completeTrip = () => {
      const now = new Date();
      const updatedShipments = shipments.map((s) =>
        s.id === selectedShipment.id
          ? {
              ...s,
              status: "completed",
              completedTime: now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              actualDistance: selectedShipment.distance,
              podImage: podImage,
            }
          : s,
      );
      setShipments(updatedShipments);
      setShowPODModal(false);
      setPodImage(null);
      setCurrentScreen("shipments");
      setActiveTab("completed");
    };

    const getTypeColor = (type) => {
      const colors = {
        "Pickup and Delivery": "from-blue-500 to-blue-600",
        "Trailer Drop-off": "from-green-500 to-green-600",
        Linehaul: "from-purple-500 to-purple-600",
        Delivery: "from-orange-500 to-orange-600",
      };
      return colors[type] || "from-gray-500 to-gray-600";
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          title="Shipment Details"
          showBack
          onBack={() => setCurrentScreen("shipments")}
        />
        <SideMenu />

        <div className="p-4 space-y-4 pb-32">
          {/* Header Card */}
          <div
            className={`bg-gradient-to-br ${getTypeColor(selectedShipment.type)} rounded-2xl p-5 text-white shadow-lg`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {selectedShipment.type}
                </h2>
                <p className="text-sm opacity-90">#{selectedShipment.id}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">
                  ₹{selectedShipment.price.toLocaleString()}
                </p>
                <p className="text-xs opacity-90">
                  {selectedShipment.priceType === "fixed"
                    ? "Fixed Price"
                    : `₹${selectedShipment.pricePerKm}/km`}
                </p>
              </div>
            </div>
            {selectedShipment.status === "active" && (
              <div className="bg-white bg-opacity-20 rounded-lg p-3 flex items-center space-x-2">
                <Activity className="w-5 h-5 animate-pulse" />
                <span className="font-semibold">Trip in progress...</span>
              </div>
            )}
          </div>

          {/* Route Card */}
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-blue-600" />
              Route Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 text-white rounded-full p-2 mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    PICKUP LOCATION
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedShipment.pickupLocation}
                  </p>
                </div>
              </div>

              <div className="ml-5 border-l-2 border-dashed border-gray-300 h-8"></div>

              <div className="flex items-start space-x-3">
                <div className="bg-red-500 text-white rounded-full p-2 mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    DELIVERY LOCATION
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedShipment.deliveryLocation}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div>
                <p className="text-xs text-gray-500 mb-1">Estimated Distance</p>
                <p className="text-lg font-bold text-gray-800">
                  {selectedShipment.estimatedDistance} km
                </p>
              </div>
              {selectedShipment.actualDistance && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Actual Distance</p>
                  <p className="text-lg font-bold text-green-600">
                    {selectedShipment.actualDistance} km
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Shipment Details */}
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Shipment Details
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Container Number</span>
                <span className="text-sm font-semibold text-gray-800">
                  {selectedShipment.containerNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Weight</span>
                <span className="text-sm font-semibold text-gray-800">
                  {selectedShipment.weight}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Scheduled Date</span>
                <span className="text-sm font-semibold text-gray-800">
                  {new Date(selectedShipment.scheduledDate).toLocaleDateString(
                    "en-IN",
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Scheduled Time</span>
                <span className="text-sm font-semibold text-gray-800">
                  {selectedShipment.scheduledTime}
                </span>
              </div>
              {selectedShipment.startTime && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Started At</span>
                  <span className="text-sm font-semibold text-green-600">
                    {selectedShipment.startTime}
                  </span>
                </div>
              )}
              {selectedShipment.completedTime && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Completed At</span>
                  <span className="text-sm font-semibold text-green-600">
                    {selectedShipment.completedTime}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">POD Required</span>
                <span
                  className={`text-sm font-semibold ${selectedShipment.podRequired ? "text-red-600" : "text-gray-400"}`}
                >
                  {selectedShipment.podRequired ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Customer Details
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Name</span>
                <span className="text-sm font-semibold text-gray-800">
                  {selectedShipment.customerName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Phone</span>
                <a
                  href={`tel:${selectedShipment.customerPhone}`}
                  className="text-sm font-semibold text-blue-600 flex items-center space-x-1"
                >
                  <Phone className="w-4 h-4" />
                  <span>{selectedShipment.customerPhone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          {selectedShipment.specialInstructions && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-4">
              <div className="flex items-start space-x-2">
                <div className="bg-yellow-400 text-white rounded-full p-1 mt-0.5">
                  <span className="text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-yellow-800 mb-1">
                    SPECIAL INSTRUCTIONS
                  </p>
                  <p className="text-sm text-yellow-900">
                    {selectedShipment.specialInstructions}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* POD Image */}
          {selectedShipment.podImage &&
            selectedShipment.status === "completed" && (
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-blue-600" />
                  Proof of Delivery
                </h3>
                <img
                  src={selectedShipment.podImage}
                  alt="POD"
                  className="w-full rounded-lg border-2 border-gray-200"
                />
              </div>
            )}
        </div>

        {/* Fixed Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t p-4 space-y-3">
          {selectedShipment.status === "upcoming" && (
            <>
              <button
                onClick={handleAcceptShipment}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
              >
                Accept Shipment
              </button>
              <button
                onClick={handleStartTrip}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center space-x-2"
              >
                <Navigation className="w-6 h-6" />
                <span>Start Trip</span>
              </button>
            </>
          )}

          {selectedShipment.status === "active" && (
            <>
              <button
                onClick={() => setCurrentScreen("tripTracking")}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center space-x-2"
              >
                <Navigation className="w-6 h-6" />
                <span>View Live Tracking</span>
              </button>
              <button
                onClick={handleCompleteDelivery}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-6 h-6" />
                <span>Complete Delivery</span>
              </button>
            </>
          )}
        </div>

        {/* POD Modal */}
        {showPODModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Proof of Delivery
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload POD Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setPodImage(reader.result);
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                        id="podUpload"
                      />
                      <label
                        htmlFor="podUpload"
                        className="cursor-pointer text-blue-600 font-semibold"
                      >
                        Tap to capture/upload
                      </label>
                      {podImage && (
                        <img
                          src={podImage}
                          alt="POD Preview"
                          className="mt-4 rounded-lg max-h-48 mx-auto"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Customer Signature
                    </label>
                    <div className="border-2 border-gray-300 rounded-xl p-4 bg-gray-50 h-32 flex items-center justify-center">
                      <p className="text-gray-500 text-sm">
                        Signature pad (Demo)
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setShowPODModal(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={completeTrip}
                      className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                    >
                      Submit POD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Trip Tracking Screen
  const TripTrackingScreen = () => {
    if (!selectedShipment) return null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentDistance, setCurrentDistance] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [estimatedTime] = useState("45 mins");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentDistance((prev) => {
          const newDist = prev + 0.5;
          return newDist >= selectedShipment.distance
            ? selectedShipment.distance
            : newDist;
        });
      }, 1000);
      return () => clearInterval(interval);
    }, [selectedShipment.distance]);

    const progress = (currentDistance / selectedShipment.distance) * 100;

    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          title="Live Tracking"
          showBack
          onBack={() => setCurrentScreen("shipmentDetail")}
        />
        <SideMenu />

        <div className="space-y-4">
          {/* Map Placeholder */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-96 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Navigation className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
                <p className="text-blue-800 font-semibold">
                  Google Maps Integration
                </p>
                <p className="text-blue-600 text-sm">
                  Route from pickup to delivery
                </p>
              </div>
            </div>
            {/* Progress indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-white bg-opacity-50">
              <div
                className="h-full bg-green-500 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="p-4 space-y-4 pb-32">
            {/* Trip Info Card */}
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-bold text-gray-800">
                    Trip In Progress
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {estimatedTime} remaining
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Covered</p>
                  <p className="text-xl font-bold text-green-600">
                    {currentDistance.toFixed(1)} km
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Remaining</p>
                  <p className="text-xl font-bold text-orange-600">
                    {(selectedShipment.distance - currentDistance).toFixed(1)}{" "}
                    km
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="text-xl font-bold text-gray-800">
                    {selectedShipment.distance} km
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Earnings Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Estimated Earnings</span>
                <DollarSign className="w-6 h-6" />
              </div>
              <p className="text-4xl font-bold mb-1">
                ₹{selectedShipment.price.toLocaleString()}
              </p>
              {selectedShipment.priceType === "per_km" && (
                <p className="text-sm opacity-90">
                  ₹{selectedShipment.pricePerKm}/km ×{" "}
                  {currentDistance.toFixed(1)} km = ₹
                  {(selectedShipment.pricePerKm * currentDistance).toFixed(0)}
                </p>
              )}
            </div>

            {/* Route Points */}
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <h3 className="font-bold text-gray-800 mb-4">Route Details</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full p-2 mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 mb-1">
                      PICKUP
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedShipment.pickupLocation}
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>

                <div className="ml-5 border-l-2 border-dashed border-gray-300 h-8"></div>

                <div className="flex items-start space-x-3">
                  <div className="bg-red-500 text-white rounded-full p-2 mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 mb-1">
                      DELIVERY
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedShipment.deliveryLocation}
                    </p>
                  </div>
                  <div className="w-5 h-5"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Bottom Action Buttons */}
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t p-4 space-y-3">
            <button
              onClick={() =>
                window.open(`tel:${selectedShipment.customerPhone}`)
              }
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center space-x-2"
            >
              <Phone className="w-6 h-6" />
              <span>Call Customer</span>
            </button>

            <button
              onClick={() => {
                if (selectedShipment.podRequired) {
                  setShowPODModal(true);
                } else {
                  const now = new Date();
                  const updatedShipments = shipments.map((s) =>
                    s.id === selectedShipment.id
                      ? {
                          ...s,
                          status: "completed",
                          completedTime: now.toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }),
                          actualDistance: selectedShipment.distance,
                        }
                      : s,
                  );
                  setShipments(updatedShipments);
                  setCurrentScreen("shipments");
                  setActiveTab("completed");
                }
              }}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-6 h-6" />
              <span>Mark as Delivered</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {currentScreen === "login" && <LoginScreen />}
      {currentScreen === "dashboard" && <DashboardScreen />}
      {currentScreen === "shipments" && <ShipmentsScreen />}
      {currentScreen === "shipmentDetail" && <ShipmentDetailScreen />}
      {currentScreen === "tripTracking" && <TripTrackingScreen />}
    </div>
  );
};

export default DriverShipmentApp;
