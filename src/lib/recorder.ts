import { useRef, useState, useCallback } from "react"
import { toast } from "sonner"

export function useAudioRecorder(onAudioData: (audio: Blob) => void) {
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioStream = useRef<MediaStream | null>(null)

  const isRecordingSupported =
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function' &&
    typeof window.MediaRecorder === 'function'

  const stopRecording = useCallback(() => {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    if (audioStream.current) {
      audioStream.current.getTracks().forEach(track => track.stop())
      audioStream.current = null
    }
  }, [])

  const createRecorder = useCallback((audio: MediaStream) => {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = event => {
      if (event.data.size > 0) {
        onAudioData(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('Gravação iniciada.')
    }

    recorder.current.onstop = () => {
      console.log('Gravação encerrada/pausada')
    }

    recorder.current.start()
  }, [onAudioData])

  const startRecording = useCallback(async () => {
    if (!isRecordingSupported) {
      toast.error('Seu navegador não suporta gravação de áudio.')
      return
    }

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    audioStream.current = audio
    createRecorder(audio)

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()
      createRecorder(audio)
    }, 5000)
  }, [isRecordingSupported, createRecorder])

  return {
    isRecording,
    startRecording,
    stopRecording,
    isRecordingSupported,
  }
}