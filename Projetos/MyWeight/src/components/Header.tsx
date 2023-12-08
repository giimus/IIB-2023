import { Weight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useWeightContext } from '@/context/WeightContext'

export default function Header() {
  const { userInfo, setUserInfo } = useWeightContext()

  return userInfo === 'adult' ? (
    <div className="mb-6 flex items-center justify-between">
      <Weight className="text-amber-500" size={32} />
      <div className="flex items-center gap-2">
        <p className="text-zinc-200">
          Hello, <span className="font-medium text-amber-500">Elon</span>
        </p>
        <Avatar className="h-12 w-12 border-[2px] border-amber-500 p-[2px]">
          <AvatarImage
            className="rounded-full"
            src="https://cdn.discordapp.com/attachments/894670812504805436/1181721599313969232/image.png?ex=65821700&is=656fa200&hm=f5b5870308d814f160ea4d233e27cbd044c7dafbc5aa3ec2780a3a58d46fe6ae&"
          />
          <AvatarFallback>EM</AvatarFallback>
        </Avatar>
      </div>
    </div>
  ) : (
    <div className="mb-6 flex items-center justify-between">
      <Weight className="text-amber-500" size={32} />
      <div className="flex items-center gap-2">
        <p className="text-zinc-200">
          Hello, <span className="font-medium text-amber-500">X 12</span>
        </p>
        <Avatar className="h-12 w-12 border-[2px] border-amber-500 p-[2px]">
          <AvatarImage
            className="rounded-full"
            src="https://cdn.discordapp.com/attachments/894670812504805436/1181718204792438854/image.png?ex=658213d7&is=656f9ed7&hm=3f88872533a7d6ca7f84b2c266951acaeffd15ad36b1485b96412fef9b2d236f&"
          />
          <AvatarFallback>XA</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
