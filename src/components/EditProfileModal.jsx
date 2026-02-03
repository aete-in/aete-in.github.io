import { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';
import { uploadToCloudinary } from '../utils/cloudinaryService';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import LoadingOverlay from './LoadingOverlay';
import { useAuth } from '../context/AuthContext';

const EditProfileModal = ({ currentUser, userData, onClose, onUpdateSuccess }) => {
    const { deleteAccount } = useAuth(); // Destructure
    const [formData, setFormData] = useState({
        name: userData?.name || '',
        phone: userData?.phone || '',
        organization: userData?.organization || '',
        designation: userData?.designation || '',
        experience: userData?.experience || '',
        expertise: userData?.expertise || '',
        location: userData?.location || '',
        bio: userData?.bio || ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newResourceRoles, setNewResourceRoles] = useState(userData?.resourceRoles || []); // Resource Roles State

    // Photo Upload State
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [newPhotoUrl, setNewPhotoUrl] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoading(true);
        setError('');
        try {
            // Phone Validation
            const phoneRegex = /^\+?[0-9]{10,15}$/;
            if (formData.phone && !phoneRegex.test(formData.phone)) {
                return setError("Please enter a valid phone number (10-15 digits).");
            }

            const updates = {};
            // Update fields in /users/{uid}
            Object.keys(formData).forEach(key => {
                updates[`/users/${currentUser.uid}/${key}`] = formData[key];
            });

            // Save Resource Roles
            updates[`/users/${currentUser.uid}/resourceRoles`] = newResourceRoles;

            // If new photo uploaded, update that too
            if (newPhotoUrl) {
                updates[`/users/${currentUser.uid}/photoUrl`] = newPhotoUrl;
            }

            await update(ref(db), updates);

            if (onUpdateSuccess) onUpdateSuccess();
            onClose();
        } catch (err) {
            console.error("Update failed:", err);
            setError("Failed to update profile: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    // --- Photo Logic ---
    const onFileChange = (e) => {
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

    const handleCropSave = async () => {
        try {
            setUploadingPhoto(true);
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
            const fileName = `profile_${currentUser.uid}_${Date.now()}.jpg`;
            const file = new File([croppedImageBlob], fileName, { type: "image/jpeg" });

            const url = await uploadToCloudinary(file);
            setNewPhotoUrl(url);
            setIsCropping(false);
        } catch (e) {
            console.error(e);
            setError("Failed to crop/upload image.");
        } finally {
            setUploadingPhoto(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to DELETE your account? This action is permanent and cannot be undone.")) {
            if (window.confirm("FINAL WARNING: All your data will be lost. Proceed?")) {
                try {
                    await deleteAccount();
                    // AuthContext handles cleanup and logout, user will be redirected by Dashboard/App router
                } catch (error) {
                    alert("Failed to delete account: " + error.message);
                }
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit Profile</h2>
                    <button onClick={onClose} className="close-btn"><X size={24} /></button>
                </div>

                <div className="modal-body">
                    {error && <div className="alert-error">{error}</div>}

                    {/* Photo Section */}
                    <div className="photo-section">
                        <div className="current-photo">
                            <img
                                src={newPhotoUrl || userData?.photoUrl || "https://via.placeholder.com/150"}
                                alt="Profile"
                            />
                            <label className="photo-edit-btn">
                                <Camera size={16} />
                                <input type="file" onChange={onFileChange} accept="image/*" hidden />
                            </label>
                        </div>
                        <p className="photo-hint">Click camera to update photo</p>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Name</label>
                            <input name="name" value={formData.name} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    // Allow only digits and optional leading +
                                    if (/^\+?[\d]*$/.test(val)) {
                                        setFormData({ ...formData, phone: val });
                                    }
                                }}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Organization</label>
                            <input name="organization" value={formData.organization} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <input name="designation" value={formData.designation} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input name="location" value={formData.location} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Years of Exp.</label>
                            <input name="experience" value={formData.experience} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group full-width">
                            <label>Expertise</label>
                            <input name="expertise" value={formData.expertise} onChange={handleInputChange} className="form-control" placeholder="Comma separated..." />
                        </div>
                        <div className="form-group full-width">
                            <label>Bio</label>
                            <textarea name="bio" value={formData.bio} onChange={handleInputChange} className="form-control" rows="3" />
                        </div>

                        {/* Resource Roles Selection */}
                        <div className="form-group full-width mt-4 p-4 bg-gray-50 rounded border border-gray-200">
                            <label className="block mb-2 font-semibold text-gray-700">
                                Resource Person Roles
                            </label>
                            <div className="flex flex-wrap gap-2 role-chips-container">
                                {[
                                    "Hackathon Judge", "Conference Chair", "Journal Paper Reviewer", "Technical Keynote Speaker",
                                    "Startup Mentor", "Innovation Consultant", "Curriculum Advisor", "Project Evaluator",
                                    "Research Collaborator", "Guest Lecturer", "Panelist", "Internship Mentor",
                                    "Patent Consultant", "Grant Proposal Reviewer", "Syllabus Framer", "Career Counselor",
                                    "Professional Trainer", "Advisory Board Member", "BoS Member"
                                ].map(role => (
                                    <div
                                        key={role}
                                        onClick={() => {
                                            setNewResourceRoles(prev =>
                                                prev.includes(role)
                                                    ? prev.filter(r => r !== role)
                                                    : [...prev, role]
                                            );
                                        }}
                                        className={`role-chip ${newResourceRoles.includes(role) ? 'selected' : ''}`}
                                    >
                                        {role}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="modal-footer">
                    <div className="btn-group">
                        <button onClick={onClose} className="btn btn-secondary">Cancel</button>
                        <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>


            </div>

            {isCropping && (
                <div className="cropper-modal">
                    <div className="cropper-container">
                        <div className="cropper-header">
                            <h3>Adjust Photo</h3>
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
                                min={1}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={(e) => setZoom(e.target.value)}
                                className="zoom-range"
                            />
                            <button onClick={handleCropSave} className="btn btn-primary w-full mt-3" disabled={uploadingPhoto}>
                                {uploadingPhoto ? 'Uploading...' : 'Done'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx="true">{`
                 .modal-overlay {
                     position: fixed; inset: 0; background: rgba(0,0,0,0.6);
                     display: flex; align-items: center; justify-content: center; z-index: 1000;
                 }
                 .modal-content {
                     background: white; border-radius: 12px; width: 90%; max-width: 600px;
                     max-height: 90vh; display: flex; flex-direction: column;
                     box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
                 }
                 .modal-header {
                     padding: 1.5rem; border-bottom: 1px solid #e5e7eb;
                     display: flex; justify-content: space-between; align-items: center;
                 }
                 .modal-body {
                     padding: 1.5rem; overflow-y: auto;
                 }
                 .modal-footer {
                     padding: 1rem 1.5rem; border-top: 1px solid #e5e7eb;
                     display: flex; justify-content: flex-end; /* Align right */
                 }
                 .btn-group {
                     display: flex; gap: 1rem;
                 }
                 
                 .photo-section {
                     display: flex; flex-direction: column; align-items: center; margin-bottom: 2rem;
                 }
                 .current-photo {
                     position: relative; width: 100px; height: 100px;
                 }
                 .current-photo img {
                     width: 100%; height: 100%; border-radius: 50%; object-fit: cover;
                     border: 3px solid #e2e8f0;
                 }
                 .photo-edit-btn {
                     position: absolute; bottom: 0; right: 0;
                     background: var(--color-secondary); color: white;
                     width: 32px; height: 32px; border-radius: 50%;
                     display: flex; align-items: center; justify-content: center;
                     cursor: pointer; border: 2px solid white;
                 }
                 .photo-hint { font-size: 0.8rem; color: #718096; margin-top: 0.5rem; }
 
                 .form-grid {
                     display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
                 }
                 .full-width { grid-column: 1 / -1; }
                 
                 .form-group label {
                     display: block; font-size: 0.9rem; font-weight: 500; color: #4a5568; margin-bottom: 0.3rem;
                 }
                 .form-control {
                     width: 100%; padding: 0.6rem; border: 1px solid #cbd5e0; border-radius: 6px;
                 }
                 
                 .btn { padding: 0.5rem 1rem; border-radius: 6px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; border: none; }
                 .btn-secondary { background: #e2e8f0; color: #4a5568; }
                 .btn-primary { background: var(--color-primary); color: white; }
                 .close-btn { background: none; border: none; cursor: pointer; color: #718096; }

                 .role-chips-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                .role-chip {
                    padding: 0.3rem 0.8rem;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    cursor: pointer;
                    border: 1px solid #cbd5e0;
                    background-color: #f7fafc;
                    color: #4a5568;
                    transition: all 0.2s;
                    user-select: none;
                }
                .role-chip:hover {
                    background-color: #edf2f7;
                    border-color: #a0aec0;
                }
                .role-chip.selected {
                    background-color: var(--color-primary);
                    color: white;
                    border-color: var(--color-primary);
                }
 
                 /* Cropper Styles reused */
                 .cropper-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center; }
                 .cropper-container { background: white; width: 90%; max-width: 500px; height: 80vh; border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; }
                 .cropper-header { padding: 1rem; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
                 .crop-area { position: relative; flex: 1; background: #333; }
                 .controls { padding: 1rem; background: white; }
             `}</style>

            {uploadingPhoto && <LoadingOverlay message="Uploading photo..." />}
        </div>
    );
};

export default EditProfileModal;
