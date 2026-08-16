import React, { useEffect, useRef } from 'react';
import { useProctoring } from '../../context/ProctoringContext';
import { useFaceDetector } from './FaceDetector';
import { useSnapshotManager } from './SnapshotManager';

const CandidateFeed = () => {
    const { 
        mediaStream, 
        isProctoringActive, 
        setFaceStatus,
        videoRefForSnap,
        logViolation
    } = useProctoring();

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Bind global videoRef for SnapshotManager in context
    useEffect(() => {
        if (videoRef.current) {
            videoRefForSnap.current = videoRef.current;
        }
    }, [videoRefForSnap]);

    useEffect(() => {
        if (videoRef.current && mediaStream) {
            videoRef.current.srcObject = mediaStream;
        }
    }, [mediaStream]);

    const handleFaceResult = ({ faceCount, isLookingAway }) => {
        if (!isProctoringActive) return;

        if (faceCount === 0) {
            setFaceStatus('missing');
            logViolation('face_missing', 'Face not detected in frame. Please stay visible.', 'warning');
        } else if (faceCount > 1) {
            setFaceStatus('multiple');
            logViolation('face_multiple', `Multiple faces detected (${faceCount}). Ensure you are alone.`, 'critical');
        } else if (isLookingAway) {
            setFaceStatus('looking_away');
            logViolation('looking_away', 'You are looking away from the screen.', 'warning');
        } else {
            setFaceStatus('ok');
        }
    };

    const { detectionReady } = useFaceDetector(videoRef, canvasRef, {
        enabled: isProctoringActive,
        onResult: handleFaceResult
    });

    return (
        <div className="candidate-feed-container">
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="candidate-video"
            />
            {/* Hidden canvas for face detection fallback & analysis */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            
            <div className="candidate-feed-overlay">
                <span className={`cf-badge ${detectionReady ? 'ready' : 'init'}`}>
                    {detectionReady ? '👁 Tracking Active' : 'Initializing...'}
                </span>
            </div>
        </div>
    );
};

export default CandidateFeed;
