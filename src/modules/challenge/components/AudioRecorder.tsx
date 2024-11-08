import { useState, useRef } from 'react'
import { Mic, Square, Play, RotateCcw } from 'lucide-react'

import { Button } from "@core/design-system/Button"
import { AudioRecorderProps } from '@interfaces/AudioRecorder.interface'

export function AudioRecorder({ onAudioRecorded }: AudioRecorderProps) {
    const [isRecording, setIsRecording] = useState(false)
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            mediaRecorderRef.current = new MediaRecorder(stream)
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data)
                }
            }
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
                setAudioBlob(blob)
                onAudioRecorded(blob)
                chunksRef.current = []
            }
            mediaRecorderRef.current.start()
            setIsRecording(true)
        } catch (error) {
            console.error('Error accessing microphone:', error)
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
    }

    const playRecording = () => {
        if (audioBlob) {
            const audio = new Audio(URL.createObjectURL(audioBlob))
            audio.play()
        }
    }

    const resetRecording = () => {
        setAudioBlob(null)
        chunksRef.current = []
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <p className="text-sm text-textPrimary">Graba tu respuesta</p>
            <div className="flex space-x-2">
                {!isRecording && !audioBlob && (
                    <Button onClick={startRecording} variant="outline" size="icon">
                        <Mic className="h-4 w-4" />
                        <span className="sr-only">Iniciar grabación</span>
                    </Button>
                )}
                {isRecording && (
                    <Button onClick={stopRecording} variant="breathing" size="icon">
                        <Square className="h-4 w-4" />
                        <span className="sr-only">Detener Grabación</span>
                    </Button>
                )}
                {audioBlob && (
                    <>
                        <Button onClick={playRecording} variant="outline" size="icon">
                            <Play className="h-4 w-4" />
                            <span className="sr-only">Reproducir Audio</span>
                        </Button>
                        <Button onClick={resetRecording} variant="outline" size="icon">
                            <RotateCcw className="h-4 w-4" />
                            <span className="sr-only">Grabar nuevamente</span>
                        </Button>
                    </>
                )}
            </div>
            {audioBlob && (
                <p className="text-sm text-[#06E98A]">Respuesta grabada correctamente!</p>
            )}
        </div>
    )
}