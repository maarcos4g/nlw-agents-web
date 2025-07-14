import { ArrowLeft, Copy, Disc2, Radio } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { QuestionForm } from '@/components/question-form'
import { QuestionList } from '@/components/question-list'
import { toast } from 'sonner'
import { useRoom } from '@/http/use-room'
import { RoomSkeleton } from '@/components/skeletons/room-skeleton'
import { isRoomOwner } from '@/lib/auth'
import { useAudioRecorder } from '@/lib/recorder'
import { env } from '@/env'
import { Error } from '@/components/error'

type RoomParams = {
  roomCode: string
}

export function Room() {
  const params = useParams<RoomParams>()

  if (!params.roomCode) {
    return <Navigate replace to="/" />
  }

  function handleCopyRoomURL() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success('URL da sala copiada para a área de transferência. Compartilhe!'))
      .catch(() => toast.error('Não foi possível copiar a URL da sala.'))
  }

  const { data, isLoading, isError } = useRoom(params.roomCode)

  const room = data?.room

  const {
    isRecording,
    startRecording,
    stopRecording,
  } = useAudioRecorder((audio) => {
    if (!room) return
    uploadAudio(audio, room.id)
  })

  if (isLoading) {
    return <RoomSkeleton />
  }

  if (isError || !room) {
    return (
      <Error
        title='Sala não encontrada'
        description='O código da sala informado não existe ou ocorreu um erro ao buscar os dados.<br />
          Verifique o código e tente novamente.'
      />
    )
  }

  const isOwner = isRoomOwner(room.code)

  async function uploadAudio(audio: Blob, roomId: string) {
    const formData = new FormData()

    formData.append('file', audio, 'audio.webm')

    const response = await fetch(`${env.VITE_API_URL}/rooms/${roomId}/audio`, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()
    console.log(result)
  }

  return (
    <div className="container mx-auto max-w-4xl mb-2">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 size-4" />
              Voltar ao Início
            </Button>
          </Link>
          <div className='flex gap-2'>

            <button onClick={handleCopyRoomURL} className='flex items-center gap-3 border border-secondary rounded-md pr-3 cursor-pointer'>
              <div className='flex items-center gap-2 bg-secondary px-3 py-2.5 rounded-l-md'>
                <Copy className='size-4' />
              </div>
              <span className='font-medium text-sm'>Sala #{room?.code}</span>
            </button>

            {isOwner && (
              isRecording ? (
                <Button onClick={stopRecording} className="flex items-center gap-2" variant="secondary">
                  <Disc2 className="size-3 text-red-500 animate-ping" />
                  Gravando...
                </Button>
              ) : (
                <Button onClick={startRecording} className="flex items-center gap-2" variant="secondary">
                  <Radio className="size-4" />
                  Gravar Áudio
                </Button>
              )
            )}
          </div>
        </div>
        <h1 className="mb-2 font-bold text-3xl text-foreground">
          Sala de Perguntas
        </h1>
        <p className="text-muted-foreground">
          Faça perguntas e receba respostas com IA
        </p>
      </div>

      <div className="mb-8">
        <QuestionForm roomId={room.id} />
      </div>

      <QuestionList roomId={room.id} />
    </div >
  )
}
