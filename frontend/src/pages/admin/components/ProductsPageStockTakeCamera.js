import React, { useRef, useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException, ChecksumException, FormatException } from '@zxing/library';

const ProductsPageStockTakeCamera = ({ onDetected }) => {
    const videoRef = useRef(null);
    const codeReader = new BrowserMultiFormatReader();

    useEffect(() => {
        const startScanning = (deviceId) => {
            codeReader.decodeOnceFromVideoDevice(deviceId, 'video')
                .then((result) => {
                    onDetected(result.text);
                }).catch((err) => {
                    if (!(err instanceof NotFoundException || err instanceof ChecksumException || err instanceof FormatException)) {
                        console.error(err);
                    }
                    setTimeout(() => startScanning(deviceId), 1000);
                });
        };

        codeReader.listVideoInputDevices()
            .then((videoInputDevices) => {
                const backCameraDevice = videoInputDevices.find(device => device.label.toLowerCase().includes('back'));
                if (backCameraDevice) {
                    startScanning(backCameraDevice.deviceId);
                } else {
                    // Fallback to the first available device if no back camera is found
                    startScanning(videoInputDevices[0].deviceId);
                }
            })
            .catch((err) => {
                console.error(err);
            });

        return () => {
            codeReader.reset();
        };
    }, []);

    return (
        <div>
            <video
                id="video"
                ref={videoRef}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default ProductsPageStockTakeCamera;
