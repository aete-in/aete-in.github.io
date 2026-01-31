import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { handlePayment } from '../utils/payment';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';
import { uploadToCloudinary } from '../utils/cloudinaryService';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import { X } from 'lucide-react'; // For closing modal
import { sendMembershipEmail } from '../utils/emailService';

const MembershipApplication = () => {
    const { currentUser, userData, fetchUserData } = useAuth();
    const [membershipType, setMembershipType] = useState('student');
    const [professionalRole, setProfessionalRole] = useState('faculty'); // 'faculty' or 'industry'
    const [uploadError, setUploadError] = useState('');
    const [success, setSuccess] = useState('');
    const [status, setStatus] = useState(''); // General status for form feedback
    const [loading, setLoading] = useState(false); // Used for image processing/uploading

    // Cropper State
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null); // URL after instant upload
    const [isCropping, setIsCropping] = useState(false); // Restored state
    const [uploadingPhoto, setUploadingPhoto] = useState(false); // Loading state for photo only

    // Debug logs moved to top level
    const [logs, setLogs] = useState([]);

    // Form States
    const [formData, setFormData] = useState({
        // Student
        institution: '',
        branch: '',
        year: '1st Year',
        // Professional
        organization: '',
        designation: '',
        experience: '',
        expertise: '',
        location: '',
        bio: '',
        // Institutional
        instName: '',
        headName: '',
        address: '',
        website: ''
    });
    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImageSrc(reader.result);
                setIsCropping(true);
            });
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const showCroppedImage = async () => {
        try {
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
            const fileName = `cropped_${Date.now()}.jpg`;
            const file = new File([croppedImageBlob], fileName, { type: "image/jpeg" });

            // setCroppedFile(file); // Removed as we upload instantly
            // setIsCropping(false); // Moved inside uploadToCloudinary success block or handled there if we want to wait. 
            // actually strict logic: upload first then close.

            // Instant Upload
            const url = await uploadToCloudinary(file);
            setUploadedPhotoUrl(url);

            setUploadingPhoto(false);
            setIsCropping(false);
            setSuccess("Photo uploaded successfully!");
            setTimeout(() => setSuccess(''), 3000);
        } catch (e) {
            console.error(e);
            setError("Failed to crop image.");
        }
    };


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addLog = (msg) => {
        console.log(msg);
        setLogs(prev => [...prev, msg + ' (' + new Date().toLocaleTimeString() + ')']);
    };

    const handleApply = async () => {
        setLoading(true);
        setStatus('');
        addLog("handleApply started");

        try {
            // Validation
            if (membershipType === 'student') {
                if (!formData.institution || !formData.branch) {
                    setError('Please fill in all academic details.');
                    return;
                }
            } else if (membershipType === 'professional') {
                if (!formData.organization || !formData.designation) {
                    setError('Please fill in all professional details.');
                    return;
                }
            } else if (membershipType === 'institutional') {
                if (!formData.instName || !formData.headName || !formData.address) {
                    setError('Please fill in all institution details.');
                    return;
                }
            }
            addLog("Validation passed");

            const details = {};
            if (membershipType === 'student') {
                Object.assign(details, { institution: formData.institution, branch: formData.branch, year: formData.year });
            } else if (membershipType === 'professional') {
                const finalPhotoUrl = uploadedPhotoUrl || '';
                Object.assign(details, {
                    photoUrl: finalPhotoUrl,
                    name: userData?.name || currentUser.displayName || 'Member',
                    roleType: professionalRole,
                    organization: formData.organization,
                    designation: formData.designation,
                    experience: formData.experience,
                    expertise: formData.expertise,
                    location: formData.location,
                    bio: formData.bio
                });
            } else if (membershipType === 'institutional') {
                Object.assign(details, {
                    institutionName: formData.instName,
                    headOfInstitution: formData.headName,
                    address: formData.address,
                    website: formData.website
                });
            }

            // Determine Fee
            let fee = 0;
            switch (membershipType) {
                case 'student': fee = 1.5; break;
                case 'professional': fee = 10; break;
                case 'institutional': fee = 1000; break;
                default: fee = 1000;
            }

            addLog("Starting payment flow for " + membershipType + " with fee: " + fee);

            const paymentPromise = handlePayment(
                userData?.name || currentUser.email,
                currentUser.email,
                userData?.phone || "",
                fee,
                async (paymentId) => {
                    addLog("Payment Success Callback");
                    try {
                        await updateMembershipInDB(membershipType, 'active', paymentId, details);
                        setStatus(`${membershipType.charAt(0).toUpperCase() + membershipType.slice(1)} Membership Activated Successfully!`);
                        await fetchUserData(); // Refresh dashboard state
                    } catch (error) {
                        setStatus('Payment successful but DB update failed: ' + error.message);
                    }
                }
            );

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => {
                    addLog("Timeout triggered");
                    reject(new Error("Payment initialization timed out."));
                }, 15000)
            );

            addLog("Awaiting race");
            await Promise.race([paymentPromise, timeoutPromise]);
            addLog("Race completed");

        } catch (error) {
            addLog("Error caught: " + error.message);
            console.error("Application Error:", error);
            setStatus('Error: ' + error.message);
        } finally {
            addLog("Finally block");
            setLoading(false);
        }
    };

    // ... existing helper functions ...

    const setError = (msg) => {
        setStatus('Error: ' + msg);
        setLoading(false);
    }

    const updateMembershipInDB = async (type, status, paymentId, details) => {
        // ... (keep existing) ...
        const updates = {};
        updates['/users/' + currentUser.uid + '/membershipStatus'] = status;
        updates['/users/' + currentUser.uid + '/membershipType'] = type;
        if (type === 'professional' && details.roleType) {
            updates['/users/' + currentUser.uid + '/professionalRole'] = details.roleType;
        }
        // Save profile details to user node for directory visibility
        if (details) {
            Object.keys(details).forEach(key => {
                updates['/users/' + currentUser.uid + '/' + key] = details[key];
            });
        }

        updates['/memberships/' + currentUser.uid] = {
            type,
            status,
            paymentId,
            details,
            appliedAt: new Date().toISOString()
        };
        return update(ref(db), updates);
    };

    return (
        <div className="membership-app mt-4">
            <h3>Apply for Membership v2.0</h3>
            <div className="form-group mt-2">
                {/* ... form content ... */}

                <label className="mr-2">Select Category:</label>
                <select
                    value={membershipType}
                    onChange={(e) => setMembershipType(e.target.value)}
                    className="form-control"
                    style={{ maxWidth: '300px', display: 'inline-block' }}
                >
                    <option value="student">Student Learner (Launch Offer: ₹1.5)</option>
                    <option value="professional">Professional Network (Launch Offer: ₹10)</option>
                    <option value="institutional">Campus Partner (₹1,000)</option>
                </select>
            </div>

            <div className="info-box mt-3 mb-3">
                {membershipType === 'student' && (
                    <div className="details-form student-form">
                        <p className="mb-3 header-note">Enter your academic details.</p>
                        <div className="form-group">
                            <label>Institution / College Name</label>
                            <input type="text" name="institution" className="form-control" value={formData.institution} onChange={handleInputChange} placeholder="e.g. IIT Delhi" />
                        </div>
                        <div className="form-group">
                            <label>Branch / Department</label>
                            <input type="text" name="branch" className="form-control" value={formData.branch} onChange={handleInputChange} placeholder="e.g. Computer Science" />
                        </div>
                        <div className="form-group">
                            <label>Year of Study</label>
                            <select name="year" className="form-control" value={formData.year} onChange={handleInputChange}>
                                <option>1st Year</option>
                                <option>2nd Year</option>
                                <option>3rd Year</option>
                                <option>4th Year</option>
                                <option>Post Graduate</option>
                            </select>
                        </div>
                    </div>
                )}

                {membershipType === 'professional' && (
                    <div className="details-form professional-form">
                        <p className="mb-3 header-note">For Faculty & Industry Professionals.</p>

                        <div className="form-group role-selector">
                            <label>Professional Role:</label>
                            <div className="radio-group">
                                <label className={`radio-btn ${professionalRole === 'faculty' ? 'active' : ''}`}>
                                    <input type="radio" checked={professionalRole === 'faculty'} onChange={() => setProfessionalRole('faculty')} />
                                    Faculty / Academician
                                </label>
                                <label className={`radio-btn ${professionalRole === 'industry' ? 'active' : ''}`}>
                                    <input type="radio" checked={professionalRole === 'industry'} onChange={() => setProfessionalRole('industry')} />
                                    Industry Professional
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Organization / Company / Institution</label>
                            <input type="text" name="organization" className="form-control" value={formData.organization} onChange={handleInputChange} placeholder={professionalRole === 'faculty' ? "e.g. NIT Trichy" : "e.g. Google India"} />
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <input type="text" name="designation" className="form-control" value={formData.designation} onChange={handleInputChange} placeholder={professionalRole === 'faculty' ? "e.g. Assistant Professor" : "e.g. Senior Engineer"} />
                        </div>
                        <div className="form-group">
                            <label>Years of Experience</label>
                            <input type="number" name="experience" className="form-control" value={formData.experience} onChange={handleInputChange} placeholder="e.g. 5" />
                        </div>
                        <div className="form-group">
                            <label>Expertise / Skills (Comma separated)</label>
                            <input type="text" name="expertise" className="form-control" value={formData.expertise} onChange={handleInputChange} placeholder="e.g. AI, Robotics, Signal Processing" />
                        </div>
                        <div className="form-group">
                            <label>City / Location</label>
                            <input type="text" name="location" className="form-control" value={formData.location} onChange={handleInputChange} placeholder="e.g. Bangalore, India" />
                        </div>
                        <div className="form-group">
                            <label>Brief Bio (For Resource Page)</label>
                            <textarea name="bio" className="form-control" rows="3" value={formData.bio} onChange={handleInputChange} placeholder="Short professional summary..." />
                        </div>
                        <div className="form-group">
                            <label>Profile Photo</label>
                            <input type="file" className="form-control" onChange={onFileChange} accept="image/*" />
                            {uploadedPhotoUrl && <p className="text-success text-sm mt-1">Photo uploaded successfully!</p>}
                        </div>
                    </div>
                )}

                {/* Cropper Modal */}
                {isCropping && (
                    <div className="cropper-modal">
                        <div className="cropper-container">
                            <div className="cropper-header">
                                <h3>Crop Profile Photo</h3>
                                <button onClick={() => setIsCropping(false)} className="close-btn"><X size={20} /></button>
                            </div>
                            <div className="crop-area">
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            </div>
                            <div className="controls">
                                <label>Zoom</label>
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e) => setZoom(e.target.value)}
                                    className="zoom-range"
                                    disabled={uploadingPhoto}
                                />
                                <button className="btn btn-primary w-full mt-3" onClick={showCroppedImage} disabled={uploadingPhoto}>
                                    {uploadingPhoto ? 'Uploading...' : 'Save Photo'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <style jsx="true">{`
                    .text-sm { font-size: 0.85rem; }
                    .text-success { color: var(--color-secondary); }
                    .cropper-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0,0,0,0.8);
                        z-index: 2000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .cropper-container {
                        background: white;
                        width: 90%;
                        max-width: 500px;
                        border-radius: 12px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                         height: 80vh; /* Fixed height for simplicity */
                    }
                    .cropper-header {
                        padding: 1rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid #eee;
                    }
                    .close-btn { background: none; border: none; cursor: pointer; }
                    .crop-area {
                        position: relative;
                        flex: 1; /* Takes up remaining space */
                        background: #333;
                    }
                    .controls {
                        padding: 1rem;
                        background: white;
                    }
                    .zoom-range {
                        width: 100%;
                        margin-top: 0.5rem;
                    }
                `}</style>

                {membershipType === 'institutional' && (
                    <div className="details-form institutional-form">
                        <p className="mb-3 header-note">For Engineering Colleges & Universities.</p>
                        <div className="form-group">
                            <label>Name of Institution</label>
                            <input type="text" name="instName" className="form-control" value={formData.instName} onChange={handleInputChange} placeholder="e.g. College of Engineering, Pune" />
                        </div>
                        <div className="form-group">
                            <label>Name of Head of Institution (Principal/Dean)</label>
                            <input type="text" name="headName" className="form-control" value={formData.headName} onChange={handleInputChange} placeholder="e.g. Dr. A. K. Gupta" />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" name="address" className="form-control" value={formData.address} onChange={handleInputChange} placeholder="City, State" />
                        </div>
                        <div className="form-group">
                            <label>Website (Optional)</label>
                            <input type="text" name="website" className="form-control" value={formData.website} onChange={handleInputChange} placeholder="e.g. www.coep.org.in" />
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={handleApply}
                disabled={loading}
                className="btn btn-primary mt-2"
            >
                {loading ? 'Processing...' : (membershipType === 'student' ? 'Pay ₹1.5 & Apply' : `Pay ₹${membershipType === 'institutional' ? '1,000' : '10'} & Apply`)}
            </button>

            {status && <div className="alert mt-3" style={{ background: status.includes('Error') ? '#fed7d7' : '#e6fffa', color: status.includes('Error') ? '#c53030' : '#008080', padding: '1rem', borderRadius: '4px' }}>{status}</div>}

            <div id="debug-console" style={{ marginTop: '20px', padding: '10px', background: '#eee', border: '1px solid #999', fontSize: '12px', whiteSpace: 'pre-wrap' }}>
                Debug Console:
            </div>

            <style jsx="true">{`
                .details-form {
                    background: #f8fafc;
                    padding: 2rem;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    margin-top: 1.5rem;
                }
                .student-form { border-left: 5px solid var(--color-primary); }
                .professional-form { border-left: 5px solid var(--color-secondary); }
                .institutional-form { border-left: 5px solid #2b6cb0; }

                .header-note { font-weight: 500; color: #4a5568; }

                .form-group {
                    margin-bottom: 1.5rem;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #2d3748;
                }
                .form-control {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1px solid #cbd5e0;
                    border-radius: 6px;
                    font-size: 1rem;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .form-control:focus {
                    outline: none;
                    border-color: var(--color-secondary);
                    box-shadow: 0 0 0 3px rgba(0, 128, 128, 0.1);
                }
                
                .radio-group { display: flex; gap: 1rem; }
                .radio-btn {
                    padding: 0.5rem 1rem;
                    border: 1px solid #cbd5e0;
                    border-radius: 4px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: white;
                }
                .radio-btn.active {
                    border-color: var(--color-secondary);
                    background: #e6fffa;
                    color: var(--color-secondary);
                    font-weight: 600;
                }
                .radio-btn input { display: none; }

                select.form-control {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
                    background-position: right 0.5rem center;
                    background-repeat: no-repeat;
                    background-size: 1.5em 1.5em;
                    padding-right: 2.5rem;
                    appearance: none;
                }
                .btn-primary {
                    width: 100%;
                    padding: 1rem;
                    font-size: 1.1rem;
                    background-color: var(--color-primary);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    font-weight: 600;
                    margin-top: 1rem;
                }
                .btn-primary:hover {
                    background-color: #1a365d;
                }
                .btn-primary:disabled {
                    background-color: #cbd5e0;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default MembershipApplication;
