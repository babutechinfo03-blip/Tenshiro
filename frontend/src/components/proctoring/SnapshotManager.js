/**
 * SnapshotManager.js
 * Manages periodic webcam snapshot captures every 30 seconds.
 * Uses a canvas offscreen render to produce base64 JPEG images.
 */

import { useEffect, useRef, useCallback } from 'react';

const SNAPSHOT_INTERVAL_MS = 30000;

export const useSnapshotManager = (videoRef, { enabled = false, onSnapshot } = {}) => {
    const intervalRef = useRef(null);
    const enabledRef  = useRef(enabled);

    useEffect(() => { enabledRef.current = enabled; }, [enabled]);

    const takeSnapshot = useCallback(() => {
        if (!enabledRef.current) return;
        const video = videoRef?.current;
        if (!video || video.readyState < 2) return;

        try {
            const canvas = document.createElement('canvas');
            canvas.width  = 320;
            canvas.height = 240;
            const ctx = canvas.getContext('2d');
            // Mirror the video (since webcam is typically mirrored in display)
            ctx.scale(-1, 1);
            ctx.drawImage(video, -320, 0, 320, 240);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
            const snapshot = {
                id:        Date.now().toString(),
                dataUrl,
                timestamp: new Date().toISOString()
            };

            if (onSnapshot) onSnapshot(snapshot);
        } catch (e) {
            console.warn('SnapshotManager: Capture failed', e);
        }
    }, [videoRef, onSnapshot]);

    useEffect(() => {
        clearInterval(intervalRef.current);
        if (enabled) {
            // Take first snapshot immediately
            takeSnapshot();
            intervalRef.current = setInterval(takeSnapshot, SNAPSHOT_INTERVAL_MS);
        }
        return () => clearInterval(intervalRef.current);
    }, [enabled, takeSnapshot]);

    return { takeSnapshot };
};
