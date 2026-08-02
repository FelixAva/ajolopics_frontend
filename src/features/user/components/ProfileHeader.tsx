import Button from '@/components/ui/Button';
import { DynamicIcon } from 'lucide-react/dynamic';
import type { User } from '../types/user.types';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <section className="py-3 flex flex-col items-center justify-center md:flex-row md:h-80">
      <img
        src="https://placehold.net/avatar.png"
        loading='lazy'
        alt={user.username}
        className="w-55 h-55 rounded-full md:w-70 md:h-70"
      />

      <div className="pt-2 text-center md:self-center md:pl-5 md:pt-0 md:text-left">
        <div className="flex gap-3">
          <h2 className="text-[28px] font-semibold">{user.name}</h2>

          <>
            <Button variant="none" size="none" className='hidden!' aria-label='Edit profile'>
              <DynamicIcon name='pencil' size={22} />
            </Button>
            <Button variant="none" size="none" className='hidden!' aria-label='Share profile'>
              <DynamicIcon name='share' size={22} />
            </Button>
          </>
        </div>
        <h3 className="text-[22px]">@{user.username}</h3>
      </div>
    </section>
  );
};

export default ProfileHeader;
