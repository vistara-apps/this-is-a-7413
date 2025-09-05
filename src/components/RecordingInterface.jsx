import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, Phone, AlertTriangle, Download, Trash2 } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import Card from './ui/Card';
import Button from './ui/Button';

const RecordingInterface = () => {
  const { user, addRecording, addAlertLog } = useUser();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState('audio');
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [hasAlerted, setHasAlerted] = useState(false);

  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mediaStream]);

  const startRecording = async () => {
    try {
      const constraints = {
        audio: true,
        video: recordingType === 'video'
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMediaStream(stream);

      if (recordingType === 'video' && videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const chunks = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { 
          type: recordingType === 'video' ? 'video/webm' : 'audio/webm' 
        });
        
        const recording = {
          filePath: URL.createObjectURL(blob),
          duration: recordingDuration,
          type: recordingType,
          location: null // Would need geolocation API
        };

        addRecording(recording);
        setRecordedChunks([...chunks]);
        chunks.length = 0;
      };

      recorder.start();
      setIsRecording(true);

      // Start duration counter
      intervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access camera/microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }

    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsRecording(false);
    setRecordingDuration(0);
  };

  const sendAlert = async () => {
    if (!user.trustedContacts.length) {
      alert('Please add trusted contacts in your profile first.');
      return;
    }

    try {
      // Get current location
      let location = null;
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      }

      const message = `EMERGENCY ALERT: I am currently in a police interaction. My location: ${
        location ? `https://maps.google.com/?q=${location.lat},${location.lng}` : 'Location unavailable'
      }. This is an automated message from Pocket Protector.`;

      // In a real app, this would send SMS/email to trusted contacts
      user.trustedContacts.forEach(contact => {
        addAlertLog({
          recipient: contact,
          message,
          locationSent: location
        });
      });

      setHasAlerted(true);
      alert('Emergency alert sent to your trusted contacts!');
    } catch (error) {
      console.error('Error sending alert:', error);
      alert('Could not send alert. Please try again.');
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center text-white mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Record Interaction</h2>
        <p className="text-white/80">Document your interaction safely and securely</p>
      </div>

      {/* Emergency Alert */}
      <Card className="bg-red-500/20 border-red-400/30">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h3 className="font-semibold text-white">Emergency Alert</h3>
          </div>
          <p className="text-white/80 text-sm mb-4">
            Send an immediate alert to your trusted contacts with your location
          </p>
          <Button
            variant="destructive"
            onClick={sendAlert}
            disabled={hasAlerted}
            className="w-full"
          >
            <Phone className="w-4 h-4 mr-2" />
            {hasAlerted ? 'Alert Sent!' : 'Send Emergency Alert'}
          </Button>
        </div>
      </Card>

      {/* Recording Controls */}
      <Card>
        <div className="p-6">
          <div className="text-center space-y-6">
            {/* Recording Type Selector */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setRecordingType('audio')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  recordingType === 'audio'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                    : 'bg-white/10 text-white/70 hover:text-white'
                }`}
                disabled={isRecording}
              >
                <Mic className="w-4 h-4" />
                Audio Only
              </button>
              <button
                onClick={() => setRecordingType('video')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  recordingType === 'video'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                    : 'bg-white/10 text-white/70 hover:text-white'
                }`}
                disabled={isRecording}
              >
                <Video className="w-4 h-4" />
                Video + Audio
              </button>
            </div>

            {/* Video Preview */}
            {recordingType === 'video' && (
              <div className="mx-auto max-w-md">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full rounded-lg bg-black"
                  style={{ display: isRecording ? 'block' : 'none' }}
                />
              </div>
            )}

            {/* Recording Duration */}
            {isRecording && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full recording-pulse"></div>
                <span className="text-white font-mono text-lg">
                  {formatDuration(recordingDuration)}
                </span>
              </div>
            )}

            {/* Main Recording Button */}
            <div className="space-y-4">
              {!isRecording ? (
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={startRecording}
                  className="w-full py-4 text-lg"
                >
                  {recordingType === 'video' ? (
                    <Video className="w-6 h-6 mr-2" />
                  ) : (
                    <Mic className="w-6 h-6 mr-2" />
                  )}
                  Start Recording
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={stopRecording}
                  className="w-full py-4 text-lg"
                >
                  {recordingType === 'video' ? (
                    <VideoOff className="w-6 h-6 mr-2" />
                  ) : (
                    <MicOff className="w-6 h-6 mr-2" />
                  )}
                  Stop Recording
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Recording Tips */}
      <Card>
        <div className="p-4">
          <h3 className="font-semibold text-white mb-3">Recording Tips</h3>
          <ul className="text-white/80 text-sm space-y-2">
            <li>• Keep your phone visible and announce you are recording</li>
            <li>• State the date, time, and location clearly</li>
            <li>• Keep your hands visible at all times</li>
            <li>• Do not interfere with police activities</li>
            <li>• Continue recording until the interaction is completely over</li>
            <li>• Save recordings immediately to cloud storage if possible</li>
          </ul>
        </div>
      </Card>

      {/* Legal Notice */}
      <Card className="bg-amber-500/20 border-amber-400/30">
        <div className="p-4">
          <h3 className="font-semibold text-white mb-2">Legal Notice</h3>
          <p className="text-white/80 text-sm">
            Recording laws vary by state. In most jurisdictions, you have the right to record police in public spaces. 
            However, always prioritize your safety over recording. This app does not provide legal advice.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RecordingInterface;