/**
 * FaceDetector.js
 * Browser-native face detection using the MediaPipe / Shape Detection API
 * with a canvas-based fallback using pixel analysis for environments
 * where the API is not available.
 *
 * Returns { faceCount, isLookingAway, detectionReady } via a polling interval.
 */

import { useEffect, useRef, useState, useCallback } from 'react';

const DETECTION_INTERVAL_MS = 2000; // check every 2 seconds

export const useFaceDetector = (videoRef, canvasRef, { enabled = false, onResult } = {}) => {
    const [detectionReady, setDetectionReady] = useState(false);
    const [faceCount, setFaceCount]           = useState(0);
    const [isLookingAway, setIsLookingAway]   = useState(false);
    const detectorRef   = useRef(null);
    const intervalRef   = useRef(null);
    const enabledRef    = useRef(enabled);

    useEffect(() => { enabledRef.current = enabled; }, [enabled]);

    // ── Try to initialize FaceDetector API ────────────────────────────────────
    useEffect(() => {
        const init = async () => {
            try {
                if ('FaceDetector' in window) {
                    detectorRef.current = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 5 });
                    setDetectionReady(true);
                } else {
                    // Fallback: simulate detection with canvas analysis
                    setDetectionReady(true);
                }
            } catch {
                setDetectionReady(true); // degraded mode
            }
        };
        init();
    }, []);

    // ── Canvas-based brightness analysis (fallback) ───────────────────────────
    const analyzeCanvas = useCallback(() => {
        const video = videoRef?.current;
        const canvas = canvasRef?.current;
        if (!video || !canvas || video.readyState < 2) return null;

        const ctx = canvas.getContext('2d');
        canvas.width = 160;
        canvas.height = 120;
        ctx.drawImage(video, 0, 0, 160, 120);

        const imageData = ctx.getImageData(0, 0, 160, 120);
        const data = imageData.data;

        let brightness = 0;
        let centerActivity = 0;

        for (let i = 0; i < data.length; i += 4) {
            const pixel_brightness = (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114);
            brightness += pixel_brightness;
        }

        const avgBrightness = brightness / (data.length / 4);
        const pixelCount = data.length / 4;

        // Check the center region (face zone) for skin-tone pixels
        let skinTonePixels = 0;
        for (let y = 30; y < 90; y++) {
            for (let x = 40; x < 120; x++) {
                const idx = (y * 160 + x) * 4;
                const r = data[idx], g = data[idx+1], b = data[idx+2];
                // Rough skin tone detection (works for varied skin tones)
                if (r > 60 && g > 40 && b > 20 && r > g && r > b && (r - g) > 10 && Math.abs(r - b) > 5) {
                    skinTonePixels++;
                }
            }
        }

        const skinRatio = skinTonePixels / (60 * 80);
        const hasFace = skinRatio > 0.05; // at least 5% skin-tone pixels in center
        const isTooDark = avgBrightness < 30;
        const isTooBright = avgBrightness > 220;

        return { hasFace, isTooDark, isTooBright, avgBrightness, skinRatio };
    }, [videoRef, canvasRef]);

    // ── Run Face Detection API ─────────────────────────────────────────────────
    const detect = useCallback(async () => {
        if (!enabledRef.current) return;
        const video = videoRef?.current;
        if (!video || video.readyState < 2) return;

        let count = 0;
        let lookingAway = false;

        if (detectorRef.current) {
            try {
                const faces = await detectorRef.current.detect(video);
                count = faces.length;

                // Check if face is centered (crude eye/head direction estimation)
                if (faces.length === 1) {
                    const face = faces[0];
                    const videoWidth = video.videoWidth || 640;
                    const videoHeight = video.videoHeight || 480;
                    const faceCenterX = face.boundingBox.x + face.boundingBox.width / 2;
                    const faceCenterY = face.boundingBox.y + face.boundingBox.height / 2;
                    // If face center is not roughly in the middle half of the frame
                    const xOff = Math.abs(faceCenterX - videoWidth / 2) / videoWidth;
                    const yOff = Math.abs(faceCenterY - videoHeight / 2) / videoHeight;
                    lookingAway = xOff > 0.35 || yOff > 0.35;
                }
            } catch {
                // API failed, use canvas fallback
                const result = analyzeCanvas();
                count = result?.hasFace ? 1 : 0;
            }
        } else {
            // Canvas fallback
            const result = analyzeCanvas();
            count = result?.hasFace ? 1 : 0;
        }

        setFaceCount(count);
        setIsLookingAway(lookingAway);

        if (onResult) {
            onResult({ faceCount: count, isLookingAway: lookingAway });
        }
    }, [videoRef, analyzeCanvas, onResult]);

    // ── Polling ───────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!detectionReady) return;

        clearInterval(intervalRef.current);

        if (enabled) {
            intervalRef.current = setInterval(detect, DETECTION_INTERVAL_MS);
        }

        return () => clearInterval(intervalRef.current);
    }, [enabled, detectionReady, detect]);

    return { faceCount, isLookingAway, detectionReady };
};
