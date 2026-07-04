import Button from '@/components/ui/Button';
import type { User } from '../types/user.types';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <section className="h-80 flex items-center justify-center">
      <img
        src="https://placehold.co/200"
        alt={user.username}
        className="w-70 h-70 rounded-full"
      />

      <div className="pl-5 self-center">
        <div className="flex gap-3">
          <h2 className="text-[28px] font-semibold">{user.name}</h2>

          <>
            <Button icon="pencil" variant="none" size="none" />
            <Button icon="share" variant="none" size="none" />
          </>
        </div>
        <h3 className="text-[22px]">@{user.username}</h3>
      </div>
    </section>
  );
};

export default ProfileHeader;
