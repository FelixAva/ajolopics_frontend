import { DynamicIcon } from 'lucide-react/dynamic';
import Button from './Button';

const ProfileButton = () => {
  return (
    <Button size='none' variant='none' className='pr-1.5 pl-0.5 md:pr-0'>
      <DynamicIcon name='user-circle-2' size={32} className='stroke-[1.8]' />
    </Button>
  )
};

export default ProfileButton;
