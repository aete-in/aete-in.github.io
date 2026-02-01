import { useRef } from 'react';
import { ShieldCheck } from 'lucide-react';

const CertificateGenerator = ({ userData, onClose }) => {
    const certificateRef = useRef();

    const handlePrint = () => {
        const printContent = certificateRef.current;
        const windowUrl = 'about:blank';
        const uniqueName = new Date();
        const windowName = 'Print' + uniqueName.getTime();
        const printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');

        if (!printWindow) {
            alert("Please allow popups to print the certificate");
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Certificate - ${userData.name}</title>
                    <style>
                        @page { size: landscape; margin: 0; }
                        body { margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; }
                        .certificate-container {
                            width: 100%;
                            height: 100vh;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: white;
                            padding: 20px;
                            box-sizing: border-box;
                        }
                        .certificate-border {
                            width: 95%;
                            height: 90%;
                            border: 2px solid #1a365d;
                            padding: 10px;
                            position: relative;
                            box-sizing: border-box;
                        }
                        .certificate-inner-border {
                            width: 100%;
                            height: 100%;
                            border: 3px double #1a365d;
                            position: relative;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                            background: #fff;
                        }
                        .watermark {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            opacity: 0.05;
                            width: 500px;
                            height: 500px;
                            pointer-events: none;
                        }
                        
                        /* Decorative Corners */
                        .corner {
                            width: 40px;
                            height: 40px;
                            border: 4px solid #b91c1c;
                            position: absolute;
                        }
                        .tl { top: 10px; left: 10px; border-right: none; border-bottom: none; }
                        .tr { top: 10px; right: 10px; border-left: none; border-bottom: none; }
                        .bl { bottom: 10px; left: 10px; border-right: none; border-top: none; }
                        .br { bottom: 10px; right: 10px; border-left: none; border-top: none; }

                        h1 {
                            font-family: 'Inter', system-ui, sans-serif;
                            font-size: 38px;
                            color: #1a365d;
                            margin: 20px 0 5px 0;
                            line-height: 1.2;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            font-weight: 800;
                        }
                        h2 {
                            font-size: 16px;
                            color: #4a5568;
                            margin: 0 0 40px 0;
                            font-weight: 600;
                            letter-spacing: 2px;
                            text-transform: uppercase;
                        }
                        
                        .content-text {
                            font-size: 18px;
                            margin: 10px 0;
                            color: #334155;
                            font-weight: 500;
                        }

                        .member-name {
                            font-size: 42px;
                            font-weight: 800;
                            color: #1a365d;
                            margin: 20px 0 10px;
                            border-bottom: 2px solid #e2e8f0;
                            padding: 0 40px 10px;
                            display: inline-block;
                        }

                        .membership-type {
                            font-size: 28px;
                            font-weight: 800;
                            color: #b91c1c;
                            text-transform: uppercase;
                            margin: 20px 0 10px;
                            letter-spacing: 1px;
                        }

                        .id-box {
                            position: absolute;
                            bottom: 30px;
                            left: 30px;
                            font-family: sans-serif;
                            font-weight: bold;
                            font-size: 14px;
                            color: #64748b;
                        }

                        .logo-box {
                            margin-top: 40px;
                            margin-bottom: 20px;
                        }
                        .logo-img {
                            height: 80px;
                            width: auto;
                        }

                        .sign-box {
                            text-align: center;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            position: absolute;
                            bottom: 30px;
                            right: 30px;
                        }
                        .sign-img {
                            height: 60px;
                            width: auto;
                            margin-bottom: -15px;
                            z-index: 10;
                            mix-blend-mode: multiply; /* Makes white background transparent */
                            position: relative;
                        }
                        .sign-line {
                            width: 250px;
                            border-top: 1px solid #1a365d;
                            margin-top: 10px;
                            padding-top: 5px;
                            font-size: 14px;
                            font-weight: bold;
                            text-transform: uppercase;
                            color: #1a365d;
                        }



                        .seal-gold {
                           width: 120px;
                           height: 120px;
                           border: 2px dashed #b45309;
                           border-radius: 50%;
                           display: flex;
                           align-items: center;
                           justify-content: center;
                           color: #b45309;
                           font-weight: bold;
                           text-transform: uppercase;
                           font-size: 12px;
                           text-align: center;
                           transform: rotate(-5deg);
                           box-shadow: 0 0 0 4px #fff, 0 0 0 6px #b45309;
                           background: #fffbeb;
                        }

                    </style>
                </head>
                <body>
                    <div class="certificate-container">
                        <div class="certificate-border">
                            <div class="certificate-inner-border">
                                <div class="corner tl"></div>
                                <div class="corner tr"></div>
                                <div class="corner bl"></div>
                                <div class="corner br"></div>

                                <div class="id-box">
                                    Membership ID: ${userData.membershipId || 'PENDING'}
                                </div>

                                <div class="logo-box">
                                   <!-- Use absolute path from origin -->
                                   <img src="${window.location.origin}/aete_logo_cert.png" class="logo-img" alt="AETE Logo" />
                                </div>

                                <h1>The Association of Engineers<br/>for Technology and Education</h1>
                                <h2>Founded 2024</h2>

                                <p class="content-text">By approval of the Executive Council, has admitted</p>
                                
                                <div class="member-name">${userData.name || 'Member Name'}</div>

                                <p class="content-text">as a</p>

                                <div class="membership-type">${userData.membershipType || 'Member'}</div>

                                <p class="content-text" style="max-width: 600px; line-height: 1.6;">
                                    of the society, an organisation for promoting<br/>the quality and standards in technical education
                                </p>

                                    <img src="${window.location.origin}/signature_cert.png" class="sign-img" alt="Signature" />
                                    <div class="sign-line">Executive Secretary</div>
                                </div>

                                <div style="position: absolute; bottom: 10px; width: 100%; text-align: center; color: #1a365d; font-size: 14px; font-weight: 600; letter-spacing: 1px;">
                                    www.aete.in
                                </div>
                            </div>
                        </div>
                    </div>
                    <script>
                        window.onload = function() { window.print(); window.close(); }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
    };

    return (
        <div className="certificate-modal-overlay">
            <div className="certificate-modal">
                <div className="modal-header">
                    <h3>Membership Certificate</h3>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>
                <div className="modal-body">
                    <p>Your official AETE Membership Certificate is ready.</p>
                    <div className="cert-preview">
                        <ShieldCheck size={48} className="text-secondary" />
                        <h4>{userData.membershipType}</h4>
                        <p>ID: {userData.membershipId}</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} className="btn btn-text">Close</button>
                    <button onClick={handlePrint} className="btn btn-primary">Download / Print PDF</button>
                </div>
            </div>

            <style jsx="true">{`
                .certificate-modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    animation: fadeIn 0.2s;
                }
                .certificate-modal {
                    background: white;
                    width: 90%;
                    max-width: 400px;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                }
                .modal-header {
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                }
                .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; }
                .modal-body {
                    padding: 2rem 1.5rem;
                    text-align: center;
                }
                .cert-preview {
                    background: #f8fafc;
                    padding: 1.5rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                    border: 2px dashed #cbd5e1;
                }
                .cert-preview h4 { margin: 0.5rem 0; color: #1e293b; text-transform: capitalize; }
                .text-secondary { color: var(--color-secondary); }
                
                .modal-footer {
                    padding: 1rem 1.5rem;
                    background: #f8fafc;
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.5rem;
                }
                .btn { padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; border: none; font-weight: 500;}
                .btn-primary { background: var(--color-primary); color: white; }
                .btn-text { background: none; color: #64748b; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
};

export default CertificateGenerator;
