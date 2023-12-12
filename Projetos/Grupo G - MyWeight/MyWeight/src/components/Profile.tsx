import { Label } from '@radix-ui/react-label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useState } from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useWeightContext } from '@/context/WeightContext'
import { LogOut, Plus } from 'lucide-react'

const profilesUrl = [
  {
    url: 'https://cdn.discordapp.com/attachments/894670812504805436/1181721599313969232/image.png?ex=65821700&is=656fa200&hm=f5b5870308d814f160ea4d233e27cbd044c7dafbc5aa3ec2780a3a58d46fe6ae&',
  },
  {
    url: 'https://cdn.discordapp.com/attachments/894670812504805436/1181718204792438854/image.png?ex=658213d7&is=656f9ed7&hm=3f88872533a7d6ca7f84b2c266951acaeffd15ad36b1485b96412fef9b2d236f&',
  },
]

export default function Profile() {
  const [profile, setProfile] = useState('adult')
  const { userInfo, setUserInfo } = useWeightContext()

  function handleToggleProfile() {
    setUserInfo(profile)
  }

  return (
    <div className="dark mb-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-amber-500">
            Account settings
            <p>
              <LogOut className="text-red-400" size={20} />
            </p>
          </CardTitle>
          <CardDescription>Manage your information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">First name</Label>
              <Input id="name" value={'Elon'} />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="surname">Surname</Label>
              <Input id="surname" value={'Reeve Musk'} />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={'elon@spacex.com'} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="mr-2 w-1/2" variant={'outline'}>
            Discard
          </Button>
          <Button className="ml-2 w-1/2">Save changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-amber-500">
            Change profile
            <p>
              <Plus className="text-zinc-200" size={20} />
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select onValueChange={setProfile} defaultValue="adult">
              <SelectTrigger className="w-2/3">
                <SelectValue placeholder="Select a profile" />
              </SelectTrigger>
              <SelectContent className="dark">
                <SelectGroup>
                  <SelectLabel>Profile</SelectLabel>
                  <SelectItem value="adult">Elon Musk</SelectItem>
                  <SelectItem value="baby">X Æ A-12</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              className="w-1/3"
              disabled={profile === userInfo}
              onClick={handleToggleProfile}
            >
              Change
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          {profile === 'adult' ? (
            <div className="flex w-full justify-center gap-8">
              <Avatar className="h-[72px] w-[72px] border-[2px] border-amber-500 p-[4px]">
                <AvatarImage
                  src={profilesUrl[0].url}
                  className="rounded-full"
                />
                <AvatarFallback>EM</AvatarFallback>
              </Avatar>
              <Avatar className="h-[72px] w-[72px] border-[2px] border-amber-500 object-cover p-[4px] opacity-30">
                <AvatarImage
                  src={profilesUrl[1].url}
                  className="rounded-full"
                />
                <AvatarFallback>XA</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="flex w-full justify-center gap-8">
              <Avatar className="h-[72px] w-[72px] border-[2px] border-amber-500 p-[4px] opacity-30">
                <AvatarImage
                  src={profilesUrl[0].url}
                  className="rounded-full"
                />
                <AvatarFallback>EM</AvatarFallback>
              </Avatar>
              <Avatar className="h-[72px] w-[72px] border-[2px] border-amber-500 object-cover p-[4px]">
                <AvatarImage
                  src={profilesUrl[1].url}
                  className="rounded-full"
                />
                <AvatarFallback>XA</AvatarFallback>
              </Avatar>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
